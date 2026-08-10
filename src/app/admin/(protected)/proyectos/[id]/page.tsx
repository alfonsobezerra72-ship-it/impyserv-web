import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { updateProject } from "@/lib/actions/projects";
import { getProjectByIdAdmin } from "@/lib/data/projects";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProyectoPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectByIdAdmin(id);

  if (!project) notFound();

  const action = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Editar proyecto</h1>
      <div className="mt-6">
        <ProjectForm action={action} project={project} />
      </div>
    </div>
  );
}
