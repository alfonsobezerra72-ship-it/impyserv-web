import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ProjectImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CATEGORY_LABELS } from "@/lib/data/projects";
import type { Project } from "@/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          Confían en nosotros
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
          Hospitales, hoteles y empresas de todo el país. Estos son algunos de nuestros proyectos.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/proyectos/${project.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                {project.imageUrl ? (
                  <div className="relative h-40 w-full">
                    <Image src={project.imageUrl} alt={project.clientName} fill className="object-cover" />
                  </div>
                ) : (
                  <ProjectImagePlaceholder className="h-40 w-full" />
                )}
                <div className="p-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {CATEGORY_LABELS[project.category]}
                  </span>
                  <h3 className="mt-1 font-semibold text-primary">{project.clientName}</h3>
                  <p className="text-sm text-muted">{project.location}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/proyectos" className="text-sm font-semibold text-primary-accent hover:underline">
            Ver todos los proyectos →
          </Link>
        </div>
      </div>
    </section>
  );
}
