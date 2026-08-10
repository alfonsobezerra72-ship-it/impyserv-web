import Link from "next/link";
import { getProjects } from "@/lib/data/projects";
import { createClient } from "@/lib/supabase/server";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { Button } from "@/components/ui/Button";

export default async function AdminProyectosPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-lg font-bold text-primary">Supabase no está configurado</h1>
        <p className="mt-2 text-muted">
          Completa las variables <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> y <code>SUPABASE_SERVICE_ROLE_KEY</code> en{" "}
          <code>.env.local</code> (ver BLUEPRINT.md, Sección 10) para activar el panel de
          administración de proyectos.
        </p>
      </div>
    );
  }

  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Proyectos (portafolio)</h1>
        <Link href="/admin/proyectos/nuevo">
          <Button variant="dark">Agregar proyecto</Button>
        </Link>
      </div>
      <div className="mt-6">
        <ProjectTable projects={projects} />
      </div>
    </div>
  );
}
