import { supabaseUrl } from "@/lib/supabase/env";

const BUCKET = "media";

/**
 * Pure string construction matching Supabase Storage's public URL scheme —
 * used when mapping DB rows to domain objects, where creating a full client
 * just to resolve a URL would be wasteful.
 */
export function mediaPublicUrl(path: string): string {
  // seed.sql seeds a few rows with a full external URL (demo photography)
  // instead of a Storage path, so real content shows up immediately after
  // seeding a fresh project. Real uploads always produce a relative path.
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${path}`;
}

/** Inverse of `mediaPublicUrl` — admin forms hold the resolved public URL in
 * `MediaImage.url`, but write the storage-relative path back to the DB. */
export function pathFromPublicUrl(url: string): string {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  return index === -1 ? url : url.slice(index + marker.length);
}
