import { mapGalleryItem, type GalleryItemRow } from "@/lib/data/mappers";
import { demoGalleryItems } from "@/lib/demo/fixtures";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/types/domain";

export async function getGalleryItems(options?: { categorySlug?: string }): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) {
    let items = demoGalleryItems;
    if (options?.categorySlug) {
      items = items.filter((i) => i.category?.slug === options.categorySlug);
    }
    return items;
  }

  const supabase = await createClient();
  let query = supabase
    .from("gallery_items")
    .select("*, category:gallery_categories(*)")
    .eq("is_published", true);

  if (options?.categorySlug) {
    const { data: category } = await supabase
      .from("gallery_categories")
      .select("id")
      .eq("slug", options.categorySlug)
      .single();
    if (!category) return [];
    query = query.eq("category_id", category.id);
  }

  const { data, error } = await query.order("position");
  if (error) throw error;
  return ((data ?? []) as unknown as GalleryItemRow[]).map(mapGalleryItem);
}

export async function getAllGalleryItemsAdmin(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) return demoGalleryItems;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*, category:gallery_categories(*)")
    .order("position");

  if (error) throw error;
  return ((data ?? []) as unknown as GalleryItemRow[]).map(mapGalleryItem);
}
