# IMPYSERV

Sitio web corporativo de IMPYSERV (especialistas en climatización, Santa Cruz, Bolivia): páginas de marketing/generación de leads + catálogo de equipos con panel de administración propio.

> Plano completo (16 secciones) en [BLUEPRINT.md](./BLUEPRINT.md).

## Commands

- `npm run dev` — Servidor de desarrollo
- `npm run build` — Build de producción
- `npm run lint` — Linter

## Tech Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Supabase (Postgres + Auth + Storage) + Resend + Vercel

## Architecture

### Directory Structure
- `src/app/(site)/` — Páginas públicas (Home, Servicios, Catálogo, Proyectos, Nosotros, Contacto) — comparten `Header`/`Footer`/`WhatsAppButton` vía `(site)/layout.tsx`
- `src/app/admin/login/` — Login del panel (sin chrome público ni del panel)
- `src/app/admin/(protected)/` — Panel de catálogo, protegido por `middleware.ts` — usa `AdminNav`
- `src/app/api/leads/route.ts` — Recibe el formulario público de contacto
- `src/components/` — Organizados por dominio: `layout/`, `sections/`, `catalog/`, `forms/`, `admin/`, `ui/`
- `src/lib/` — `supabase/` (clientes), `validations/` (Zod), `actions/` (Server Actions), `data/` (capa de datos), `email.ts`, `constants.ts`
- `src/types/` — Tipos compartidos (`Product`, `Project`, etc.)

### Data Flow
Páginas públicas: Server Component → `src/lib/data/{products,projects}.ts` (hoy retorna datos de ejemplo con la misma forma que las tablas de Supabase; swap directo a queries reales cuando el proyecto de Supabase esté conectado — ver `getAllProductsAdmin`/`getProductByIdAdmin` en el mismo archivo como referencia de esa migración).
Formulario de leads: `QuoteForm` (client) → `POST /api/leads` → inserta en `leads` (si Supabase está configurado) + notifica por Resend (si `RESEND_API_KEY` está configurada). Ninguna de las dos es obligatoria para que el formulario funcione en desarrollo.
Panel admin: `ProductForm` (client, `useActionState`) → Server Action en `lib/actions/products.ts` → sube imagen a Supabase Storage (bucket `products`) → insert/update → `revalidatePath('/catalogo')`.

### Key Patterns
- **Server Components por defecto.** `"use client"` solo en `ProductFilters`/`CatalogClient`, `QuoteForm`, `LoginForm`, `ProductForm`, `ProductTable`.
- **Sin ORM.** Queries directas con `@supabase/supabase-js` / `@supabase/ssr`, mapeadas a los tipos de `src/types/`.
- **Server Actions para el panel admin**, no rutas REST adicionales.
- **RLS como única capa real de autorización de datos** (`supabase/migrations/0001_init.sql`). Cada Server Action además llama `requireAdmin()` — nunca confiar solo en el chequeo de sesión del middleware.
- **Toda función que use Supabase retorna `null` con gracia si las env vars no están configuradas** (ver `lib/supabase/server.ts`) — así el sitio público y el catálogo de ejemplo funcionan sin backend conectado.

## Code Organization Rules

1. **Un componente por archivo.** Máximo 300 líneas.
2. **Alias de rutas:** `@/` para imports desde `src/`.
3. **Sin barrel exports.** Importar directo del archivo fuente.
4. **Server Components por defecto.** Agregar `"use client"` solo con interactividad real.
5. **Colocar archivos relacionados juntos** (componentes de una página, junto a esa página).

## Design System

### Colors
- Primary (azul marino): `#0d3b54`
- Primary accent (azul corporativo): `#1f5c8b`
- Secondary (celeste): `#5aace3`
- Background: `#ffffff` · Surface: `#f4f6f8` · Text: `#1a2733` · Muted: `#6b7a85`
- Destructive: `#d64545` · Success: `#2e9e5b`

### Typography
- Headings: Poppins (`--font-heading`), 600–700
- Body: Inter (`--font-sans`), 400–500, 16px base

### Style
- Border radius: 8px (12px en cards)
- Sombras sutiles, sin efectos decorativos excesivos
- Estética corporativa-industrial, mobile-first, botón de WhatsApp siempre visible

## Environment Variables

Ver `.env.example`. Todas son opcionales en desarrollo — su ausencia degrada con gracia (datos de ejemplo, sin envío de correo, panel admin muestra aviso de configuración) en vez de romper el build.

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Conectan el catálogo real y el login admin |
| `SUPABASE_SERVICE_ROLE_KEY` | Reservada para uso futuro server-side (no usada aún) |
| `RESEND_API_KEY` | Notificación por correo de nuevos leads |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No se usa todavía en código — el número vive en `lib/constants.ts` (`BRAND.phoneWhatsApp`) |

## Reglas No Negociables

1. TypeScript estricto — nunca `any`.
2. RLS activo en toda tabla de Supabase; ninguna mutación admin sin pasar por Server Action con `requireAdmin()`.
3. Nunca exponer `SUPABASE_SERVICE_ROLE_KEY` al cliente.
4. Nunca commitear `.env.local`.
5. Mobile-first; el botón de WhatsApp flotante siempre visible.
6. Precios siempre en Bs., formateados con `formatPriceBs()`.
7. Fotos de proyectos/productos van en `public/images/` y se referencian desde `lib/data/*.ts` — hasta entonces, usar `ImagePlaceholder`.
