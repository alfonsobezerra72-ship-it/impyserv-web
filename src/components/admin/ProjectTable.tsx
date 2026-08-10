"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteProject, toggleProjectFeatured } from "@/lib/actions/projects";
import { CATEGORY_OPTIONS } from "@/lib/validations/project";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectTable({ projects }: { projects: Project[] }) {
  const [isPending, startTransition] = useTransition();

  if (projects.length === 0) {
    return <p className="text-muted">Todavía no hay proyectos en el portafolio.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-surface text-left text-muted">
          <tr>
            <th className="px-4 py-3">Cliente / obra</th>
            <th className="px-4 py-3">Ubicación</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Destacado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t border-black/5">
              <td className="px-4 py-3 font-medium text-text">{project.clientName}</td>
              <td className="px-4 py-3 text-muted">{project.location}</td>
              <td className="px-4 py-3 text-muted">{CATEGORY_OPTIONS[project.category]}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    project.featured ? "bg-success/15 text-success" : "bg-muted/15 text-muted"
                  )}
                >
                  {project.featured ? "Sí" : "No"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <Link href={`/admin/proyectos/${project.id}`} className="text-primary-accent hover:underline">
                    Editar
                  </Link>
                  <button
                    disabled={isPending}
                    onClick={() =>
                      startTransition(() => toggleProjectFeatured(project.id, project.featured))
                    }
                    className="text-primary-accent hover:underline"
                  >
                    {project.featured ? "Quitar de Inicio" : "Destacar en Inicio"}
                  </button>
                  <button
                    disabled={isPending}
                    onClick={() => {
                      if (confirm(`¿Borrar "${project.clientName}"? Esta acción no se puede deshacer.`)) {
                        startTransition(() => deleteProject(project.id));
                      }
                    }}
                    className="text-destructive hover:underline"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
