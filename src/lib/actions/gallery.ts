"use server";

import { revalidatePath } from "next/cache";

import { pathFromPublicUrl } from "@/lib/media/url";
import { requireAdmin } from "@/lib/supabase/guard";
import { createClient } from "@/lib/supabase/server";
import { galleryItemSchema, type GalleryItemValues } from "@/lib/validation/gallery-item";
import type { MediaImage } from "@/types/domain";

type ActionResult = { success: true } | { success: false; error: string };

function revalidateGalleryPaths() {
  revalidatePath("/admin/gallery");
  revalidatePath("/galerie");
  revalidatePath("/");
}

export async function createGalleryItems(
  images: MediaImage[],
  categoryId: string | null,
): Promise<ActionResult> {
  await requireAdmin();
  if (images.length === 0) return { success: true };

  const supabase = await createClient();
  const { count } = await supabase.from("gallery_items").select("id", { count: "exact", head: true });
  const startPosition = count ?? 0;

  const rows = images.map((image, index) => ({
    category_id: categoryId,
    path: pathFromPublicUrl(image.url),
    alt: image.alt || "",
    width: image.width,
    height: image.height,
    blur_data_url: image.blurDataURL ?? null,
    is_published: true,
    position: startPosition + index,
  }));

  const { error } = await supabase.from("gallery_items").insert(rows);
  if (error) return { success: false, error: "Échec de l'ajout des photos." };

  revalidateGalleryPaths();
  return { success: true };
}

export async function updateGalleryItem(id: string, values: GalleryItemValues): Promise<ActionResult> {
  await requireAdmin();
  const parsed = galleryItemSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: "Formulaire invalide." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("gallery_items")
    .update({
      category_id: parsed.data.categoryId,
      caption: parsed.data.caption || null,
      is_published: parsed.data.isPublished,
    })
    .eq("id", id);

  if (error) return { success: false, error: "Échec de la mise à jour." };

  revalidateGalleryPaths();
  return { success: true };
}

export async function deleteGalleryItem(id: string, imagePath: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) return { success: false, error: "Échec de la suppression." };

  await supabase.storage.from("media").remove([imagePath]).catch(() => {});

  revalidateGalleryPaths();
  return { success: true };
}
