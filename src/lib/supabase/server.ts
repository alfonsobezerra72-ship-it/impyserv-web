import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente de Supabase para Server Components, Route Handlers y Server Actions.
 * Retorna null si las variables de entorno no están configuradas todavía
 * (permite que el sitio funcione con datos de ejemplo antes de conectar Supabase —
 * ver BLUEPRINT.md Sección 10 para las variables requeridas).
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Se llama desde un Server Component — se ignora si hay middleware refrescando la sesión.
        }
      },
    },
  });
}
