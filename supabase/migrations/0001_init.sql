-- IMPYSERV — esquema inicial (ver BLUEPRINT.md, Sección 4)

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  capacity_btu integer not null,
  type text not null check (type in ('split', 'central', 'vrf')),
  price numeric(10,2),
  image_url text,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  client_name text not null,
  location text not null,
  category text not null check (category in ('salud', 'hoteleria', 'cooperativa', 'edificio')),
  description text not null,
  image_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  city text,
  property_type text check (property_type in ('casa', 'oficina', 'hotel_edificio')),
  service_type text not null check (service_type in ('instalacion', 'mantenimiento', 'proyecto_grande', 'cotizacion_equipo')),
  message text,
  product_id uuid references products(id) on delete set null,
  status text not null default 'nuevo' check (status in ('nuevo', 'contactado', 'cerrado')),
  created_at timestamptz not null default now()
);

alter table products enable row level security;
alter table projects enable row level security;
alter table leads enable row level security;

create policy "public_read_active_products" on products for select using (active = true);
create policy "public_read_projects" on projects for select using (true);
create policy "admin_write_products" on products for all using (auth.role() = 'authenticated');
create policy "admin_write_projects" on projects for all using (auth.role() = 'authenticated');

create policy "public_insert_leads" on leads for insert with check (true);
create policy "admin_read_leads" on leads for select using (auth.role() = 'authenticated');
create policy "admin_update_leads" on leads for update using (auth.role() = 'authenticated');

-- Storage: crear buckets públicos de lectura "products" y "projects" desde el
-- dashboard de Supabase (Storage → New bucket → Public bucket).
