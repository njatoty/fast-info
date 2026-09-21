import { mapGalleryCategory } from "@/lib/data/mappers";
import { demoGalleryCategories } from "@/lib/demo/fixtures";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export async function getGalleryCategories() {
  if (!isSupabaseConfigured) return demoGalleryCategories;

  const supabase = await createClient();
  const { data, error } = await supabase.from("gallery_categories").select("*").order("position");
  if (error) throw error;
  return data.map(mapGalleryCategory);
}
