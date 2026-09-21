"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/supabase/guard";
import { createClient } from "@/lib/supabase/server";
import { settingsSchema, type SettingsValues } from "@/lib/validation/settings";

type ActionResult = { success: true } | { success: false; error: string };

export async function updateSiteSettings(values: SettingsValues): Promise<ActionResult> {
  await requireAdmin();
  const parsed = settingsSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    phone: parsed.data.phone,
    whatsapp: parsed.data.whatsapp,
    email: parsed.data.email || null,
    address: parsed.data.address,
    city: parsed.data.city,
    hero_title: parsed.data.heroTitle,
    hero_subtitle: parsed.data.heroSubtitle,
    map_url: parsed.data.mapUrl || null,
    opening_hours: parsed.data.openingHours,
    socials: parsed.data.socials,
  });

  if (error) return { success: false, error: "Échec de l'enregistrement des paramètres." };

  // Settings feed the shared public layout (header/footer) and several
  // pages — revalidate the whole public tree rather than enumerating routes.
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { success: true };
}
