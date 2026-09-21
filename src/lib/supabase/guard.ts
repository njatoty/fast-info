import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

export interface AdminUser {
  id: string;
  email: string | null;
  role: UserRole;
  fullName: string | null;
}

/**
 * Verifies the caller is an authenticated admin. Runs in the admin layout
 * AND again at the top of every server action — the layout check alone
 * would not stop a server action from being invoked directly.
 *
 * Uses `auth.getUser()`, which re-validates the JWT against Supabase, never
 * `auth.getSession()`, which only trusts the cookie's own claims.
 */
export async function requireAdmin(): Promise<AdminUser> {
  if (!isSupabaseConfigured) {
    redirect("/admin/login?setup=1");
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    redirect("/admin/login?unauthorized=1");
  }

  return {
    id: user.id,
    email: user.email ?? null,
    role: profile.role,
    fullName: profile.full_name,
  };
}
