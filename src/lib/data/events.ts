import { mapEvent, type EventRow } from "@/lib/data/mappers";
import { demoEvents } from "@/lib/demo/fixtures";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { EventProject } from "@/types/domain";

const EVENT_SELECT = "*, images:event_images(*)";

export async function getEvents(limit?: number): Promise<EventProject[]> {
  if (!isSupabaseConfigured) {
    const sorted = [...demoEvents].sort((a, b) => (a.date < b.date ? 1 : -1));
    return limit ? sorted.slice(0, limit) : sorted;
  }

  const supabase = await createClient();
  let query = supabase
    .from("events")
    .select(EVENT_SELECT)
    .eq("is_published", true)
    .order("event_date", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return ((data ?? []) as unknown as EventRow[]).map(mapEvent);
}

export async function getEventBySlug(slug: string): Promise<EventProject | null> {
  if (!isSupabaseConfigured) {
    return demoEvents.find((e) => e.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data ? mapEvent(data as unknown as EventRow) : null;
}

export async function getAllEventsAdmin(): Promise<EventProject[]> {
  if (!isSupabaseConfigured) {
    return [...demoEvents].sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_SELECT)
    .order("event_date", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as unknown as EventRow[]).map(mapEvent);
}

export async function getEventByIdAdmin(id: string): Promise<EventProject | null> {
  if (!isSupabaseConfigured) {
    return demoEvents.find((e) => e.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapEvent(data as unknown as EventRow) : null;
}
