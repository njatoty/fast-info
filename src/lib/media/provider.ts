/**
 * The DB and app code never depend on Supabase Storage directly — everything
 * goes through this interface. Swapping to Cloudinary (or anything else)
 * later means writing one new file that implements `MediaProvider` and
 * flipping the export in `index.ts`; no schema or component changes.
 */
export interface UploadedMedia {
  path: string;
  publicUrl: string;
  width: number;
  height: number;
}

export interface MediaProvider {
  upload(file: File, folder: string): Promise<UploadedMedia>;
  remove(path: string): Promise<void>;
  publicUrl(path: string): string;
}
