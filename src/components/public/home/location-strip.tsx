import { Clock, MapPin, Navigation } from "lucide-react";

import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { t } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/types/domain";

export async function LocationStrip({ settings }: { settings: SiteSettings }) {
  const dict = await getDictionary();

  return (
    <Section tone="muted">
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
                <p className="text-sm text-muted-foreground">{settings.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="space-y-1">
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
            <Button variant="outline" className="mt-8 gap-2" asChild>
              <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-4" />
                {dict.home.location.directions}
              </a>
            </Button>
          ) : null}
        </Reveal>

        <Reveal
          delay={120}
          className="flex min-h-64 items-center justify-center rounded-md border border-border bg-card"
        >
          <div className="text-center">
            <MapPin className="mx-auto size-8 text-primary" strokeWidth={1.25} />
            <p className="mt-3 text-sm font-medium">{settings.city}</p>
            <p className="text-sm text-muted-foreground">{settings.address}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
