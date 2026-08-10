"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { projectSchema, slugFromClientName } from "@/lib/validations/project";
import { requireAdmin } from "@/lib/actions/require-admin";

export type ProjectActionState = { error: string | null };

async function uploadProjectImage(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  file: File | null
) {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("projects").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`Error subiendo la imagen: ${error.message}`);

  const { data } = supabase.storage.from("projects").getPublicUrl(path);
  return data.publicUrl;
}

async function uniqueSlug(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  base: string,
  excludeId?: string
) {
  let slug = base || "proyecto";
  let suffix = 2;

  while (true) {
    let query = supabase.from("projects").select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return slug;
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function createProject(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  try {
    const supabase = await requireAdmin();

    const parsed = projectSchema.safeParse({
      clientName: formData.get("clientName"),
      location: formData.get("location"),
      category: formData.get("category"),
      description: formData.get("description"),
      featured: formData.get("featured") === "on",
    });

    if (!parsed.success) {
      return { error: Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? "Datos inválidos." };
    }

    const imageUrl = await uploadProjectImage(supabase, formData.get("image") as File | null);
    const slug = await uniqueSlug(supabase, slugFromClientName(parsed.data.clientName));

    const { error } = await supabase.from("projects").insert({
      slug,
      client_name: parsed.data.clientName,
      location: parsed.data.location,
      category: parsed.data.category,
      description: parsed.data.description,
      featured: parsed.data.featured,
      image_url: imageUrl,
    });

    if (error) return { error: error.message };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Error inesperado." };
  }

  revalidatePath("/proyectos");
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  redirect("/admin/proyectos");
}

export async function updateProject(
  id: string,
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  try {
    const supabase = await requireAdmin();

    const parsed = projectSchema.safeParse({
      clientName: formData.get("clientName"),
      location: formData.get("location"),
      category: formData.get("category"),
      description: formData.get("description"),
      featured: formData.get("featured") === "on",
    });

    if (!parsed.success) {
      return { error: Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? "Datos inválidos." };
    }

    const newImageUrl = await uploadProjectImage(supabase, formData.get("image") as File | null);

    const { error } = await supabase
      .from("projects")
      .update({
        client_name: parsed.data.clientName,
        location: parsed.data.location,
        category: parsed.data.category,
        description: parsed.data.description,
        featured: parsed.data.featured,
        ...(newImageUrl ? { image_url: newImageUrl } : {}),
      })
      .eq("id", id);

    if (error) return { error: error.message };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Error inesperado." };
  }

  revalidatePath("/proyectos");
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  redirect("/admin/proyectos");
}

export async function deleteProject(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/proyectos");
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
}

export async function toggleProjectFeatured(id: string, featured: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("projects").update({ featured: !featured }).eq("id", id);
  revalidatePath("/proyectos");
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
}
