"use server";

import { revalidatePath } from "next/cache";

import { pathFromPublicUrl } from "@/lib/media/url";
import { requireAdmin } from "@/lib/supabase/guard";
import { createClient } from "@/lib/supabase/server";
import { serviceSchema, type ServiceValues } from "@/lib/validation/service";
import type { MediaImage } from "@/types/domain";

type ActionResult = { success: true; id?: string } | { success: false; error: string };
type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

function toRow(values: ServiceValues) {
  return {
    title: values.title,
    slug: values.slug,
    short_description: values.shortDescription || null,
    description: values.description || null,
    is_featured: values.isFeatured,
    is_published: values.isPublished,
  };
}

async function syncServiceImages(supabase: SupabaseServerClient, serviceId: string, images: MediaImage[]) {
  await supabase.from("service_images").delete().eq("service_id", serviceId);
  if (images.length === 0) return;

  const rows = images.map((image, index) => ({
    service_id: serviceId,
    path: pathFromPublicUrl(image.url),
    alt: image.alt || "",
    width: image.width,
    height: image.height,
    blur_data_url: image.blurDataURL ?? null,
    is_cover: index === 0,
    position: index,
  }));

  await supabase.from("service_images").insert(rows);
}

function revalidateServicePaths(slug?: string) {
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  if (slug) revalidatePath(`/services/${slug}`);
}

export async function createService(values: ServiceValues, images: MediaImage[]): Promise<ActionResult> {
  await requireAdmin();
  const parsed = serviceSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .insert(toRow(parsed.data))
    .select("id")
    .single();

  if (error || !data) return { success: false, error: "Échec de la création (slug déjà utilisé ?)." };

  await syncServiceImages(supabase, data.id, images);
  revalidateServicePaths(parsed.data.slug);
  return { success: true, id: data.id };
}

export async function updateService(
  id: string,
  values: ServiceValues,
  images: MediaImage[],
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = serviceSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("services").update(toRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  await syncServiceImages(supabase, id, images);
  revalidateServicePaths(parsed.data.slug);
  return { success: true, id };
}

export async function deleteService(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { success: false, error: "Échec de la suppression." };

  revalidateServicePaths();
  return { success: true };
}

export async function toggleServicePublished(id: string, isPublished: boolean): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("services").update({ is_published: isPublished }).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  revalidateServicePaths();
  return { success: true };
}
