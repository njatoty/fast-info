"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/supabase/guard";
import { createClient } from "@/lib/supabase/server";
import { categorySchema, type CategoryValues } from "@/lib/validation/category";

type ActionResult = { success: true } | { success: false; error: string };

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  revalidatePath("/produits");
  revalidatePath("/galerie");
  revalidatePath("/");
}

export async function createProductCategory(values: CategoryValues): Promise<ActionResult> {
  await requireAdmin();
  const parsed = categorySchema.safeParse(values);
  if (!parsed.success) return { success: false, error: "Formulaire invalide." };

  const supabase = await createClient();
  const { error } = await supabase.from("product_categories").insert(parsed.data);
  if (error) return { success: false, error: "Ce slug est peut-être déjà utilisé." };

  revalidateCategoryPaths();
  return { success: true };
}

export async function updateProductCategory(
  id: string,
  values: CategoryValues,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = categorySchema.safeParse(values);
  if (!parsed.success) return { success: false, error: "Formulaire invalide." };

  const supabase = await createClient();
  const { error } = await supabase.from("product_categories").update(parsed.data).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  revalidateCategoryPaths();
  return { success: true };
}

export async function deleteProductCategory(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("product_categories").delete().eq("id", id);
  if (error) return { success: false, error: "Échec de la suppression." };

  revalidateCategoryPaths();
  return { success: true };
}

export async function createGalleryCategory(values: CategoryValues): Promise<ActionResult> {
  await requireAdmin();
  const parsed = categorySchema.safeParse(values);
  if (!parsed.success) return { success: false, error: "Formulaire invalide." };

  const supabase = await createClient();
  const { error } = await supabase.from("gallery_categories").insert(parsed.data);
  if (error) return { success: false, error: "Ce slug est peut-être déjà utilisé." };

  revalidateCategoryPaths();
  return { success: true };
}

export async function updateGalleryCategory(
  id: string,
  values: CategoryValues,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = categorySchema.safeParse(values);
  if (!parsed.success) return { success: false, error: "Formulaire invalide." };

  const supabase = await createClient();
  const { error } = await supabase.from("gallery_categories").update(parsed.data).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  revalidateCategoryPaths();
  return { success: true };
}

export async function deleteGalleryCategory(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_categories").delete().eq("id", id);
  if (error) return { success: false, error: "Échec de la suppression." };

  revalidateCategoryPaths();
  return { success: true };
}
