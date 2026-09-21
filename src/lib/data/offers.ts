import { mapOffer } from "@/lib/data/mappers";
import { demoOffers } from "@/lib/demo/fixtures";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { isOfferActive } from "@/lib/utils/format";
import type { Offer } from "@/types/domain";

export async function getActiveOffers(): Promise<Offer[]> {
  if (!isSupabaseConfigured) {
    return demoOffers.filter((o) =>
      isOfferActive({ is_active: o.isActive, starts_at: o.startsAt, ends_at: o.endsAt }),
    );
  }

  // Expiry is already enforced by RLS (see 0002_rls.sql) — this query only
  // adds is_active as a defense-in-depth filter, not the source of truth.
  const supabase = await createClient();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("is_active", true)
    .or(`starts_at.is.null,starts_at.lte.${nowIso}`)
    .or(`ends_at.is.null,ends_at.gte.${nowIso}`)
    .order("position");

  if (error) throw error;
  return (data ?? []).map(mapOffer);
}

export async function getAllOffersAdmin(): Promise<Offer[]> {
  if (!isSupabaseConfigured) return demoOffers;

  const supabase = await createClient();
  const { data, error } = await supabase.from("offers").select("*").order("position");
  if (error) throw error;
  return (data ?? []).map(mapOffer);
}

export async function getOfferByIdAdmin(id: string): Promise<Offer | null> {
  if (!isSupabaseConfigured) {
    return demoOffers.find((o) => o.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("offers").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapOffer(data) : null;
}
