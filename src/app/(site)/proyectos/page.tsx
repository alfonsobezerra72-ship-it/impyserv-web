import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { ProjectImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getProjects, CATEGORY_LABELS } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Proyectos y casos de éxito",
  description:
    "Conoce los proyectos de climatización que hemos realizado en hoteles, hospitales, edificios y cooperativas de Bolivia.",
};

export default async function ProyectosPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        title="Proyectos"
        subtitle="Confían en nosotros hospitales, hoteles y empresas de todo el país."
      />
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/proyectos/${project.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                {project.imageUrl ? (
                  <div className="relative h-44 w-full">
                    <Image src={project.imageUrl} alt={project.clientName} fill className="object-cover" />
                  </div>
                ) : (
                  <ProjectImagePlaceholder className="h-44 w-full" />
                )}
                <div className="p-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {CATEGORY_LABELS[project.category]}
                  </span>
                  <h2 className="mt-1 font-semibold text-primary">{project.clientName}</h2>
                  <p className="text-sm text-muted">{project.location}</p>
                  <p className="mt-2 text-sm text-text">{project.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
