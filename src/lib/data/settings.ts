import { cache } from "react";

import { demoSiteSettings } from "@/lib/demo/fixtures";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";
import type { MediaImage, OpeningHour, SiteSettings, SocialLink } from "@/types/domain";

// Both the public layout (header/footer) and several pages need settings —
// React's cache() dedupes these into a single fetch per request.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSupabaseConfigured) return demoSiteSettings;

  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();

  if (error) throw error;
  if (!data) return demoSiteSettings;

  return {
    phone: data.phone,
    whatsapp: data.whatsapp,
    email: data.email,
    address: data.address,
    city: data.city,
    openingHours: (data.opening_hours as Json[] as unknown as OpeningHour[]) ?? [],
    socials: (data.socials as Json[] as unknown as SocialLink[]) ?? [],
    heroTitle: data.hero_title,
    heroSubtitle: data.hero_subtitle,
    heroImages: (
      (data.hero_images as Json[] as unknown as Omit<MediaImage, "id" | "position">[]) ?? []
    ).map((image, index) => ({ ...image, id: `hero-${index}`, position: index })),
    mapUrl: data.map_url,
  };
});
