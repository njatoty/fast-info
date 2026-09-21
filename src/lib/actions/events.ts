"use server";

import { revalidatePath } from "next/cache";

import { pathFromPublicUrl } from "@/lib/media/url";
import { requireAdmin } from "@/lib/supabase/guard";
import { createClient } from "@/lib/supabase/server";
import { eventSchema, type EventValues } from "@/lib/validation/event";
import type { MediaImage } from "@/types/domain";

type ActionResult = { success: true; id?: string } | { success: false; error: string };
type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

function toRow(values: EventValues) {
  return {
    title: values.title,
    slug: values.slug,
    category: values.category,
    event_date: values.eventDate,
    end_date: values.endDate,
    location: values.location,
    description: values.description || null,
    is_published: values.isPublished,
  };
}

async function syncEventImages(supabase: SupabaseServerClient, eventId: string, images: MediaImage[]) {
  await supabase.from("event_images").delete().eq("event_id", eventId);
  if (images.length === 0) return;

  const rows = images.map((image, index) => ({
    event_id: eventId,
    path: pathFromPublicUrl(image.url),
    alt: image.alt || "",
    width: image.width,
    height: image.height,
    blur_data_url: image.blurDataURL ?? null,
    is_cover: index === 0,
    position: index,
  }));

  await supabase.from("event_images").insert(rows);
}

function revalidateEventPaths(slug?: string) {
  revalidatePath("/admin/events");
  revalidatePath("/evenements");
  revalidatePath("/");
  if (slug) revalidatePath(`/evenements/${slug}`);
}

export async function createEvent(values: EventValues, images: MediaImage[]): Promise<ActionResult> {
  await requireAdmin();
  const parsed = eventSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .insert(toRow(parsed.data))
    .select("id")
    .single();

  if (error || !data) return { success: false, error: "Échec de la création (slug déjà utilisé ?)." };

  await syncEventImages(supabase, data.id, images);
  revalidateEventPaths(parsed.data.slug);
  return { success: true, id: data.id };
}

export async function updateEvent(
  id: string,
  values: EventValues,
  images: MediaImage[],
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = eventSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("events").update(toRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  await syncEventImages(supabase, id, images);
  revalidateEventPaths(parsed.data.slug);
  return { success: true, id };
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) return { success: false, error: "Échec de la suppression." };

  revalidateEventPaths();
  return { success: true };
}

export async function toggleEventPublished(id: string, isPublished: boolean): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("events").update({ is_published: isPublished }).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  revalidateEventPaths();
  return { success: true };
}
