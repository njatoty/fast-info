import { Clock, MapPin, Navigation } from "lucide-react";

import { Eyebrow } from "@/components/public/eyebrow";
import { AnimatedUnderline } from "@/components/public/motion/animated-underline";
import { Blob } from "@/components/public/motion/blob";
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
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>{dict.home.location.eyebrow}</Eyebrow>
          <h2 className="font-heading text-3xl font-normal tracking-tight sm:text-4xl">
            <AnimatedUnderline>
              {t(dict.home.location.titleTemplate, { city: settings.city.split(",")[0] })}
            </AnimatedUnderline>
          </h2>
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-sky text-surface-sky-foreground">
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="font-medium">{settings.address}</p>
                <p className="text-sm text-muted-foreground">{settings.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-yellow text-surface-yellow-foreground">
                <Clock className="size-4" />
              </span>
              <div className="space-y-1 pt-1.5">
                {settings.openingHours.map((hour) => (
                  <p key={hour.day} className="text-sm">
                    <span className="text-muted-foreground">{hour.day} : </span>
                    {hour.hours}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {settings.mapUrl ? (
            <Button variant="ink" className="mt-8 gap-2" asChild>
              <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-4" />
                {dict.home.location.directions}
              </a>
            </Button>
          ) : null}
        </Reveal>

        <Reveal delay={120} className="relative">
          <Blob color="yellow" className="-top-6 -right-6 size-32 sm:size-40" />
          <Blob color="orange" className="-bottom-8 -left-8 size-28 sm:size-36" delay={100} />
          <div className="relative min-h-64 overflow-hidden rounded-2xl border border-border shadow-lg">
            <iframe
              src={mapEmbedSrc}
              title={t(dict.home.location.titleTemplate, { city: settings.city.split(",")[0] })}
              className="size-full min-h-64"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
