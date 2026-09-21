import { mapService, type ServiceRow } from "@/lib/data/mappers";
import { demoServices } from "@/lib/demo/fixtures";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/types/domain";

const SERVICE_SELECT = "*, images:service_images(*)";

export async function getFeaturedServices(limit = 4): Promise<Service[]> {
  if (!isSupabaseConfigured) {
    return demoServices.filter((s) => s.isFeatured).slice(0, limit);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SERVICE_SELECT)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("position")
    .limit(limit);

  if (error) throw error;
  return ((data ?? []) as unknown as ServiceRow[]).map(mapService);
}

export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) return demoServices;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SERVICE_SELECT)
    .eq("is_published", true)
    .order("position");

  if (error) throw error;
  return ((data ?? []) as unknown as ServiceRow[]).map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!isSupabaseConfigured) {
    return demoServices.find((s) => s.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SERVICE_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data ? mapService(data as unknown as ServiceRow) : null;
}

export async function getAllServicesAdmin(): Promise<Service[]> {
  if (!isSupabaseConfigured) return demoServices;

  const supabase = await createClient();
  const { data, error } = await supabase.from("services").select(SERVICE_SELECT).order("position");
  if (error) throw error;
  return ((data ?? []) as unknown as ServiceRow[]).map(mapService);
}

export async function getServiceByIdAdmin(id: string): Promise<Service | null> {
  if (!isSupabaseConfigured) {
    return demoServices.find((s) => s.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SERVICE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapService(data as unknown as ServiceRow) : null;
}
