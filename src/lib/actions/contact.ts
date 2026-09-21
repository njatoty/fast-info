"use server";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";

export async function submitContactMessage(values: ContactFormValues) {
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  if (!isSupabaseConfigured) {
    return { success: true as const };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    subject: parsed.data.subject || null,
    message: parsed.data.message,
  });

  if (error) {
    return { success: false as const, error: "Une erreur est survenue. Merci de réessayer." };
  }

  return { success: true as const };
}
