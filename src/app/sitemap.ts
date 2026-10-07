import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getProjects } from "@/lib/data/projects";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/servicios", priority: 0.9 },
  { path: "/servicios/instalacion", priority: 0.8 },
  { path: "/servicios/mantenimiento", priority: 0.8 },
  { path: "/servicios/proyectos-grandes", priority: 0.8 },
  { path: "/catalogo", priority: 0.8 },
  { path: "/proyectos", priority: 0.7 },
  { path: "/nosotros", priority: 0.6 },
  { path: "/contacto", priority: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projects = await getProjects();

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      priority,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/proyectos/${p.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
