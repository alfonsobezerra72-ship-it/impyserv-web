import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) {
    throw new Error(
      "Supabase no está configurado. Completa las variables de entorno (ver BLUEPRINT.md, Sección 10)."
    );
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado.");
  return supabase;
}
