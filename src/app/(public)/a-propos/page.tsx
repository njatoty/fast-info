import { Camera, Printer, ShieldCheck, Smartphone } from "lucide-react";
import type { Metadata } from "next";

import { BibleVerse } from "@/components/public/bible-verse";
import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SmartImage } from "@/components/media/smart-image";
import { demoImage } from "@/lib/demo/images";
import { getSiteSettings } from "@/lib/data/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { t } from "@/lib/i18n/locales";

const VALUE_ICONS = [Smartphone, Printer, Camera, ShieldCheck];

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: { canonical: "/a-propos" },
  };
}

export default async function AboutPage() {
  const [settings, dict] = await Promise.all([getSiteSettings(), getDictionary()]);

  return (
    <>
      <Section tone="blue">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{dict.about.eyebrow}</Eyebrow>
            <h1 className="font-heading text-[clamp(2.25rem,1.6rem+3vw,4rem)] leading-[1.02] font-semibold tracking-tight">
              {dict.about.title}
            </h1>
            <p className="mt-6 text-surface-blue-muted">{settings.heroSubtitle}</p>
            <p className="mt-4 text-surface-blue-muted">
              {t(dict.about.intro, { city: settings.city.split(",")[0] })}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SmartImage
              src={demoImage("techWorkspace", 1200, 1500)}
              alt={dict.about.imageAlt}
              aspectRatio={4 / 5}
              wrapperClassName="rounded-2xl"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      <Section edge="top">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {dict.about.values.map((value, index) => {
            const Icon = VALUE_ICONS[index];
            return (
              <Reveal key={value.title} delay={index * 80}>
                <Icon className="size-6 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 font-medium">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="muted">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.about.whyTitle}
          </h2>
          <p className="mt-4 text-muted-foreground">{dict.about.whyDescription}</p>
        </Reveal>
      </Section>

      <Section>
        <BibleVerse />
      </Section>
    </>
  );
}
