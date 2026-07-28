import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ProjectImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getProjectBySlug, CATEGORY_LABELS } from "@/lib/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.clientName,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article>
      {project.imageUrl ? (
        <div className="relative h-64 w-full sm:h-96">
          <Image src={project.imageUrl} alt={project.clientName} fill className="object-cover" priority />
        </div>
      ) : (
        <ProjectImagePlaceholder className="h-64 w-full sm:h-96" />
      )}
      <div className="mx-auto max-w-[800px] px-4 py-12 sm:px-6">
        <Link href="/proyectos" className="text-sm font-semibold text-primary-accent hover:underline">
          ← Ver todos los proyectos
        </Link>
        <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-secondary">
          {CATEGORY_LABELS[project.category]}
        </span>
        <h1 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">{project.clientName}</h1>
        <p className="mt-1 text-muted">{project.location}</p>
        <p className="mt-6 text-text">{project.description}</p>
      </div>
    </article>
  );
}
