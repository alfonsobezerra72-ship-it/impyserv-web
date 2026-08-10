import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/projects";

export default function NuevoProyectoPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Agregar proyecto</h1>
      <div className="mt-6">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
