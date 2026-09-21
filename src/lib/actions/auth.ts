"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";

export async function signInAdmin(values: LoginValues) {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false as const, error: "Identifiants invalides." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    return { success: false as const, error: "E-mail ou mot de passe incorrect." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    return {
      success: false as const,
      error: "Ce compte n'a pas accès au tableau de bord administrateur.",
    };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
