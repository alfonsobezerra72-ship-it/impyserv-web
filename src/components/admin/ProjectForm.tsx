"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { CATEGORY_OPTIONS } from "@/lib/validations/project";
import type { ProjectActionState } from "@/lib/actions/projects";
import type { Project } from "@/types";

const initialState: ProjectActionState = { error: null };

type ProjectFormProps = {
  action: (state: ProjectActionState, formData: FormData) => Promise<ProjectActionState>;
  project?: Project;
};

export function ProjectForm({ action, project }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium text-text">Nombre del cliente / obra</label>
        <input
          name="clientName"
          required
          defaultValue={project?.clientName}
          placeholder="Ej. Hotel Mito Andino"
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-text">Ubicación</label>
          <input
            name="location"
            required
            defaultValue={project?.location}
            placeholder="Ej. Santa Cruz de la Sierra"
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text">Categoría</label>
          <select
            name="category"
            required
            defaultValue={project?.category ?? ""}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="" disabled>
              Selecciona...
            </option>
            {Object.entries(CATEGORY_OPTIONS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text">Descripción</label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={project?.description ?? ""}
          placeholder="Ej. Climatización de las nuevas oficinas..."
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-text">Foto del proyecto</label>
        <input type="file" name="image" accept="image/*" className="mt-1 w-full text-sm" />
        {project?.imageUrl && (
          <p className="mt-1 text-xs text-muted">Ya tiene una foto — sube una nueva solo si quieres reemplazarla.</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-text">
        <input type="checkbox" name="featured" defaultChecked={project?.featured ?? true} />
        Destacar en la sección "Confían en nosotros" del Inicio
      </label>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" variant="dark" disabled={pending}>
        {pending ? "Guardando..." : project ? "Guardar cambios" : "Crear proyecto"}
      </Button>
    </form>
  );
}
