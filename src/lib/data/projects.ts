import type { Project } from "@/types";
import { createClient } from "@/lib/supabase/server";

type ProjectRow = {
  id: string;
  slug: string;
  client_name: string;
  location: string;
  category: Project["category"];
  description: string;
  image_url: string | null;
  featured: boolean;
};

function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    clientName: row.client_name,
    location: row.location,
    category: row.category,
    description: row.description,
    imageUrl: row.image_url,
    featured: row.featured,
  };
}

/**
 * Datos de ejemplo con la misma forma que la tabla `projects` de Supabase
 * (ver BLUEPRINT.md, Sección 4). Sirven de respaldo si Supabase no está
 * configurado todavía — agregar las fotos reales en public/images/projects/
 * y setear `imageUrl` con esa ruta una vez conectada la base de datos real.
 */
const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "cooperativa-jesus-nazareno",
    clientName: "Cooperativa Jesús Nazareno",
    location: "Santa Cruz de la Sierra",
    category: "cooperativa",
    description: "Climatización de oficinas en la zona Chiquitania, Pampa de la Isla y Cochabamba.",
    imageUrl: null,
    featured: true,
  },
  {
    id: "2",
    slug: "caja-petrolera-quirofanos",
    clientName: "Caja Petrolera de Santa Cruz",
    location: "Santa Cruz de la Sierra",
    category: "salud",
    description: "Remodelación integral del sistema de climatización de los quirófanos de la Caja Petrolera.",
    imageUrl: null,
    featured: true,
  },
  {
    id: "3",
    slug: "hotel-mito-andino",
    clientName: "Hotel Mito Andino",
    location: "Uyuni",
    category: "hoteleria",
    description: "Climatización de Hotel Mito Andino, hotel boutique 5 estrellas en el salar de Uyuni.",
    imageUrl: null,
    featured: true,
  },
  {
    id: "4",
    slug: "qq-medical",
    clientName: "Q&Q Medical",
    location: "Santa Cruz de la Sierra",
    category: "edificio",
    description: "Climatización de las nuevas oficinas de Q&Q Medical en Santa Cruz.",
    imageUrl: null,
    featured: true,
  },
];

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) return (data as ProjectRow[]).map(mapProjectRow);
  }

  return PROJECTS;
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();

  if (supabase) {
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
    if (!error && data) return mapProjectRow(data as ProjectRow);
  }

  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export const CATEGORY_LABELS: Record<Project["category"], string> = {
  salud: "Salud",
  hoteleria: "Hotelería",
  cooperativa: "Cooperativa",
  edificio: "Edificio corporativo",
};
