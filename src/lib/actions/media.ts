"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/supabase/guard";
import { createClient } from "@/lib/supabase/server";
import { mediaPublicUrl } from "@/lib/media/url";

const FOLDERS = ["products", "services", "events", "offers", "gallery"] as const;

export interface MediaLibraryFile {
  path: string;
  url: string;
  folder: string;
  size: number;
  updatedAt: string | null;
}

export async function listMediaLibrary(): Promise<MediaLibraryFile[]> {
  await requireAdmin();
  const supabase = await createClient();

  const results = await Promise.all(
    FOLDERS.map(async (folder) => {
      const { data, error } = await supabase.storage.from("media").list(folder, {
        sortBy: { column: "updated_at", order: "desc" },
      });
      if (error || !data) return [];
      return data
        .filter((entry) => entry.id)
        .map((entry) => ({
          path: `${folder}/${entry.name}`,
          url: mediaPublicUrl(`${folder}/${entry.name}`),
          folder,
          size: entry.metadata?.size ?? 0,
          updatedAt: entry.updated_at ?? null,
        }));
    }),
  );

  return results.flat();
}

export async function deleteMediaFile(path: string): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.storage.from("media").remove([path]);
  if (error) return { success: false, error: "Échec de la suppression du fichier." };

  revalidatePath("/admin/media");
  return { success: true };
}
