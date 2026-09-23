import { Clock, MapPin, Navigation } from "lucide-react";

import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { t } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/types/domain";

function extractLatLng(mapUrl: string): string | null {
  // Google "place" links repeat several !3d<lat>!4d<lng> pairs — earlier ones
  // are often a containing district used for disambiguation, so the last
  // pair is the one closest to the actual pinned place.
  const pairs = [...mapUrl.matchAll(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/g)];
  if (pairs.length > 0) {
    const [, lat, lng] = pairs[pairs.length - 1];
    return `${lat},${lng}`;
  }
  const center = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  return center ? `${center[1]},${center[2]}` : null;
}

function buildMapEmbedSrc(settings: SiteSettings) {
  if (settings.mapUrl) {
    const latLng = extractLatLng(settings.mapUrl);
    if (latLng) return `https://www.google.com/maps?q=${latLng}&output=embed`;

    try {
      const query = new URL(settings.mapUrl).searchParams.get("q");
      if (query) return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    } catch {
      // mapUrl isn't a parseable/query-based link (e.g. a shortened share link) — fall back below.
    }
  }
  return `https://www.google.com/maps?q=${encodeURIComponent(`${settings.address}, ${settings.city}`)}&output=embed`;
}

export async function LocationStrip({ settings }: { settings: SiteSettings }) {
  const dict = await getDictionary();
  const mapEmbedSrc = buildMapEmbedSrc(settings);

  return (
    <Section tone="blue" edge="top">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>{dict.home.location.eyebrow}</Eyebrow>
          <h2 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
            {t(dict.home.location.titleTemplate, { city: settings.city.split(",")[0] })}
          </h2>
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">{settings.address}</p>
                <p className="text-sm text-surface-blue-muted">{settings.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="space-y-1">
                {settings.openingHours.map((hour) => (
                  <p key={hour.day} className="text-sm">
                    <span className="text-surface-blue-muted">{hour.day} : </span>
                    {hour.hours}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {settings.mapUrl ? (
            <Button
              variant="outline"
              className="mt-8 gap-2 rounded-[8px] border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-4" />
                {dict.home.location.directions}
              </a>
            </Button>
          ) : null}
        </Reveal>

        <Reveal
          delay={120}
          className="min-h-64 overflow-hidden rounded-[8px] border border-surface-blue-border"
        >
          <iframe
            src={mapEmbedSrc}
            title={t(dict.home.location.titleTemplate, { city: settings.city.split(",")[0] })}
            className="size-full min-h-64"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </Section>
  );
}
