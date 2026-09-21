"use server";

import { revalidatePath } from "next/cache";

import { pathFromPublicUrl } from "@/lib/media/url";
import { requireAdmin } from "@/lib/supabase/guard";
import { createClient } from "@/lib/supabase/server";
import { offerSchema, type OfferValues } from "@/lib/validation/offer";
import type { MediaImage } from "@/types/domain";

type ActionResult = { success: true } | { success: false; error: string };

function toRow(values: OfferValues, image: MediaImage | null) {
  return {
    title: values.title,
    description: values.description || null,
    original_price: values.originalPrice,
    promo_price: values.promoPrice,
    starts_at: values.startsAt ? new Date(values.startsAt).toISOString() : null,
    ends_at: values.endsAt ? new Date(values.endsAt).toISOString() : null,
    is_active: values.isActive,
    image_path: image ? pathFromPublicUrl(image.url) : null,
    image_alt: image ? image.alt || values.title : null,
    image_width: image ? image.width : null,
    image_height: image ? image.height : null,
  };
}

function revalidateOfferPaths() {
  revalidatePath("/admin/offers");
  revalidatePath("/offres");
  revalidatePath("/");
}

export async function createOffer(values: OfferValues, image: MediaImage | null): Promise<ActionResult> {
  await requireAdmin();
  const parsed = offerSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };

  const supabase = await createClient();
  const { error } = await supabase.from("offers").insert(toRow(parsed.data, image));
  if (error) return { success: false, error: "Échec de la création de l'offre." };

  revalidateOfferPaths();
  return { success: true };
}

export async function updateOffer(
  id: string,
  values: OfferValues,
  image: MediaImage | null,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = offerSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };

  const supabase = await createClient();
  const { error } = await supabase.from("offers").update(toRow(parsed.data, image)).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  revalidateOfferPaths();
  return { success: true };
}

export async function deleteOffer(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("offers").delete().eq("id", id);
  if (error) return { success: false, error: "Échec de la suppression." };

  revalidateOfferPaths();
  return { success: true };
}

export async function toggleOfferActive(id: string, isActive: boolean): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("offers").update({ is_active: isActive }).eq("id", id);
  if (error) return { success: false, error: "Échec de la mise à jour." };

  revalidateOfferPaths();
  return { success: true };
}
