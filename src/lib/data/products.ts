import type { Product } from "@/types";
import { createClient } from "@/lib/supabase/server";

type ProductRow = {
  id: string;
  name: string;
  brand: string;
  capacity_btu: number;
  type: Product["type"];
  price: number | null;
  image_url: string | null;
  description: string | null;
  active: boolean;
};

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    capacityBtu: row.capacity_btu,
    type: row.type,
    price: row.price,
    imageUrl: row.image_url,
    description: row.description,
    active: row.active,
  };
}

/**
 * Datos de ejemplo con la misma forma que la tabla `products` de Supabase
 * (ver BLUEPRINT.md, Sección 4). Reemplazar por una consulta real a Supabase
 * una vez creado el proyecto (`lib/supabase/server.ts`) — la firma de
 * `getActiveProducts`/`getFeaturedProducts` no debería cambiar.
 */
const PRODUCTS: Product[] = [
  { id: "1", name: "Split LG 9000 BTU", brand: "LG", capacityBtu: 9000, type: "split", price: 2800, imageUrl: null, description: "Ideal para dormitorios y ambientes pequeños.", active: true },
  { id: "2", name: "Split Samsung 9000 BTU", brand: "Samsung", capacityBtu: 9000, type: "split", price: 2900, imageUrl: null, description: "Ideal para dormitorios y ambientes pequeños.", active: true },
  { id: "3", name: "Split LG 12000 BTU", brand: "LG", capacityBtu: 12000, type: "split", price: 3400, imageUrl: null, description: "Para salas y oficinas medianas.", active: true },
  { id: "4", name: "Split Samsung 12000 BTU", brand: "Samsung", capacityBtu: 12000, type: "split", price: 3500, imageUrl: null, description: "Para salas y oficinas medianas.", active: true },
  { id: "5", name: "Split LG 18000 BTU", brand: "LG", capacityBtu: 18000, type: "split", price: 4600, imageUrl: null, description: "Para ambientes amplios o comercios pequeños.", active: true },
  { id: "6", name: "Split Samsung 18000 BTU", brand: "Samsung", capacityBtu: 18000, type: "split", price: 4750, imageUrl: null, description: "Para ambientes amplios o comercios pequeños.", active: true },
  { id: "7", name: "Split LG 24000 BTU", brand: "LG", capacityBtu: 24000, type: "split", price: 5900, imageUrl: null, description: "Para oficinas grandes y locales comerciales.", active: true },
  { id: "8", name: "Split Samsung 24000 BTU", brand: "Samsung", capacityBtu: 24000, type: "split", price: 6100, imageUrl: null, description: "Para oficinas grandes y locales comerciales.", active: true },
  { id: "9", name: "Split LG 36000 BTU", brand: "LG", capacityBtu: 36000, type: "split", price: 8200, imageUrl: null, description: "Para espacios comerciales de gran superficie.", active: true },
  { id: "10", name: "Split Samsung 60000 BTU", brand: "Samsung", capacityBtu: 60000, type: "split", price: 13500, imageUrl: null, description: "Alta capacidad para naves y salones grandes.", active: true },
  { id: "11", name: "Central LG 60000 BTU", brand: "LG", capacityBtu: 60000, type: "central", price: 15800, imageUrl: null, description: "Sistema central para climatización de múltiples ambientes.", active: true },
  { id: "12", name: "Sistema VRF LG Multi V", brand: "LG", capacityBtu: 60000, type: "vrf", price: 24500, imageUrl: null, description: "Sistema VRF para edificios y proyectos grandes, cotización según diseño.", active: true },
];

export async function getActiveProducts(): Promise<Product[]> {
  const supabase = await createClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (!error && data) return (data as ProductRow[]).map(mapProductRow);
  }

  return PRODUCTS.filter((p) => p.active);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const active = await getActiveProducts();
  return active.slice(0, limit);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();

  if (supabase) {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (!error && data) return mapProductRow(data as ProductRow);
  }

  return PRODUCTS.find((p) => p.id === id) ?? null;
}

/**
 * Consulta admin: trae TODOS los productos (activos e inactivos) directo de
 * Supabase. Retorna null si Supabase no está configurado todavía.
 */
export async function getAllProductsAdmin(): Promise<Product[] | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as ProductRow[]).map(mapProductRow);
}

export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error || !data) return null;
  return mapProductRow(data as ProductRow);
}
