import { createClient } from "@/lib/supabase/client";
import type { MediaProvider } from "@/lib/media/provider";

const BUCKET = "media";

async function readDimensions(file: File): Promise<{ width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  const dimensions = { width: bitmap.width, height: bitmap.height };
  bitmap.close();
  return dimensions;
}

export function createSupabaseMediaProvider(): MediaProvider {
  const supabase = createClient();

  function publicUrl(path: string) {
    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  return {
    async upload(file, folder) {
      const { width, height } = await readDimensions(file);
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;

      return { path, publicUrl: publicUrl(path), width, height };
    },
    async remove(path) {
      const { error } = await supabase.storage.from(BUCKET).remove([path]);
      if (error) throw error;
    },
    publicUrl,
  };
}
