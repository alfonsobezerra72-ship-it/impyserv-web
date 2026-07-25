"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/validations/product";

export type ProductActionState = { error: string | null };

async function requireAdmin() {
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

async function uploadProductImage(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  file: File | null
) {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("products").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`Error subiendo la imagen: ${error.message}`);

  const { data } = supabase.storage.from("products").getPublicUrl(path);
  return data.publicUrl;
}

export async function createProduct(
  _prevState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  try {
    const supabase = await requireAdmin();

    const parsed = productSchema.safeParse({
      name: formData.get("name"),
      brand: formData.get("brand"),
      capacityBtu: formData.get("capacityBtu"),
      type: formData.get("type"),
      price: formData.get("price"),
      description: formData.get("description"),
      active: formData.get("active") === "on",
    });

    if (!parsed.success) {
      return { error: Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? "Datos inválidos." };
    }

    const imageUrl = await uploadProductImage(supabase, formData.get("image") as File | null);

    const { error } = await supabase.from("products").insert({
      name: parsed.data.name,
      brand: parsed.data.brand,
      capacity_btu: parsed.data.capacityBtu,
      type: parsed.data.type,
      price: parsed.data.price,
      description: parsed.data.description || null,
      active: parsed.data.active,
      image_url: imageUrl,
    });

    if (error) return { error: error.message };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Error inesperado." };
  }

  revalidatePath("/catalogo");
  revalidatePath("/admin/catalogo");
  redirect("/admin/catalogo");
}

export async function updateProduct(
  id: string,
  _prevState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  try {
    const supabase = await requireAdmin();

    const parsed = productSchema.safeParse({
      name: formData.get("name"),
      brand: formData.get("brand"),
      capacityBtu: formData.get("capacityBtu"),
      type: formData.get("type"),
      price: formData.get("price"),
      description: formData.get("description"),
      active: formData.get("active") === "on",
    });

    if (!parsed.success) {
      return { error: Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? "Datos inválidos." };
    }

    const newImageUrl = await uploadProductImage(supabase, formData.get("image") as File | null);

    const { error } = await supabase
      .from("products")
      .update({
        name: parsed.data.name,
        brand: parsed.data.brand,
        capacity_btu: parsed.data.capacityBtu,
        type: parsed.data.type,
        price: parsed.data.price,
        description: parsed.data.description || null,
        active: parsed.data.active,
        ...(newImageUrl ? { image_url: newImageUrl } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) return { error: error.message };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Error inesperado." };
  }

  revalidatePath("/catalogo");
  revalidatePath("/admin/catalogo");
  redirect("/admin/catalogo");
}

export async function deleteProduct(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/catalogo");
  revalidatePath("/admin/catalogo");
}

export async function toggleProductActive(id: string, active: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("products").update({ active: !active }).eq("id", id);
  revalidatePath("/catalogo");
  revalidatePath("/admin/catalogo");
}
