"use server";

import { revalidatePath } from "next/cache";

import { pathFromPublicUrl } from "@/lib/media/url";
import { requireAdmin } from "@/lib/supabase/guard";
import { createClient } from "@/lib/supabase/server";
import { productSchema, type ProductValues } from "@/lib/validation/product";
import type { MediaImage } from "@/types/domain";

type ActionResult = { success: true; id?: string } | { success: false; error: string };
type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

function toRow(values: ProductValues) {
  return {
    name: values.name,
    slug: values.slug,
    short_description: values.shortDescription || null,
    description: values.description || null,
    category_id: values.categoryId,
    price: values.price,
    promo_price: values.promoPrice,
    availability: values.availability,
    is_featured: values.isFeatured,
    is_published: values.isPublished,
  };
}

async function syncProductImages(supabase: SupabaseServerClient, productId: string, images: MediaImage[]) {
  await supabase.from("product_images").delete().eq("product_id", productId);
  if (images.length === 0) return;

  const rows = images.map((image, index) => ({
    product_id: productId,
    path: pathFromPublicUrl(image.url),
    alt: image.alt || "",
    width: image.width,
    height: image.height,
    blur_data_url: image.blurDataURL ?? null,
    is_main: index === 0,
    position: index,
  }));

  await supabase.from("product_images").insert(rows);
}

function revalidateProductPaths(slug?: string) {
  revalidatePath("/admin/products");
  revalidatePath("/produits");
  revalidatePath("/");
  if (slug) revalidatePath(`/produits/${slug}`);
}

export async function createProduct(values: ProductValues, images: MediaImage[]): Promise<ActionResult> {
  await requireAdmin();
  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .insert(toRow(parsed.data))
    .select("id")
    .single();

  if (error || !data) return { success: false, error: "Échec de la création (slug déjà utilisé ?)." };

  await syncProductImages(supabase, data.id, images);
  revalidateProductPaths(parsed.data.slug);
  return { success: true, id: data.id };
}

export async function updateProduct(
  id: string,
  values: ProductValues,
  images: MediaImage[],
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("products").update(toRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  await syncProductImages(supabase, id, images);
  revalidateProductPaths(parsed.data.slug);
  return { success: true, id };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { success: false, error: "Échec de la suppression." };

  revalidateProductPaths();
  return { success: true };
}

export async function toggleProductPublished(id: string, isPublished: boolean): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ is_published: isPublished }).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  revalidateProductPaths();
  return { success: true };
}
