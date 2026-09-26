import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/public/eyebrow";
import { Blob } from "@/components/public/motion/blob";
import { HeroCarousel } from "@/components/public/motion/hero-carousel";
import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { Button } from "@/components/ui/button";
import { demoImage } from "@/lib/demo/images";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { SiteSettings } from "@/types/domain";

const FALLBACK_HERO_IMAGE = {
  id: "hero-fallback",
  url: demoImage("techHeroCircuit", 1600, 1280),
  alt: "",
  width: 1600,
  height: 1280,
  position: 0,
};

export async function Hero({ settings }: { settings: SiteSettings }) {
  const dict = await getDictionary();
  const titleWords = settings.heroTitle.split(" ");
  const heroImages =
    settings.heroImages.length > 0
      ? settings.heroImages
      : [{ ...FALLBACK_HERO_IMAGE, alt: dict.home.hero.imageAlt1 }];

  return (
    <Section
      tone="blue"
      className="flex min-h-screen items-center"
      containerClassName="grid items-center gap-12 lg:grid-cols-12 lg:gap-10"
    >
      <div className="lg:col-span-5">
        <Eyebrow>{dict.home.hero.eyebrow}</Eyebrow>
        <h1 className="text-balance font-heading text-[clamp(2.25rem,1.4rem+3.6vw,4rem)] leading-[1.05] font-normal tracking-tight">
          <Stagger as="span">
            {titleWords.map((word, index) => (
              <StaggerItem key={`${word}-${index}`} as="span" className="mr-[0.25em] inline-block">
                {word}
              </StaggerItem>
            ))}
          </Stagger>
        </h1>
        <Reveal delay={200}>
          <p className="mt-6 max-w-md text-balance text-base text-surface-blue-muted sm:text-lg">
            {settings.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button variant="ink" size="xl" asChild className="gap-2">
              <Link href="/produits">
                {dict.home.hero.ctaProducts}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="xl" variant="soft" asChild className="gap-2">
              <Link href="/contact">
                <MessageCircle className="size-4" />
                {dict.home.hero.ctaContact}
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <Reveal delay={150} className="relative">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-surface-sky p-6 sm:p-10">
            <Blob color="yellow" className="-top-10 -left-10 size-40 sm:size-52" parallax={16} />
            <Blob color="blue" className="-right-14 -bottom-16 size-56 sm:size-72" delay={100} parallax={-20} />
            <Blob color="pink" className="bottom-6 left-1/3 size-24 sm:size-32" delay={200} />

            <HeroCarousel images={heroImages} className="relative" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
