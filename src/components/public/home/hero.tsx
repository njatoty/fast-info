import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { demoImage } from "@/lib/demo/images";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { SiteSettings } from "@/types/domain";

export async function Hero({ settings }: { settings: SiteSettings }) {
  const dict = await getDictionary();

  return (
    <Section
      className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32"
      containerClassName="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 text-center font-heading text-[22vw] leading-none font-bold whitespace-nowrap text-primary/5 select-none"
      >
        FastInfo
      </span>
      <div className="lg:col-span-5">
        <Reveal>
          <Eyebrow className="mb-5">{dict.home.hero.eyebrow}</Eyebrow>
          <h1 className="text-balance font-heading text-[clamp(2.25rem,1.4rem+3.6vw,4rem)] leading-[1.02] font-semibold tracking-tight">
            {settings.heroTitle}
          </h1>
          <p className="mt-6 max-w-md text-balance text-base text-muted-foreground sm:text-lg">
            {settings.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button variant="cta" size="xl" asChild className="gap-2">
              <Link href="/produits">
                {dict.home.hero.ctaProducts}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="gap-2 rounded-[8px]">
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
          <div className="relative aspect-[6/5] w-full sm:aspect-[16/10] lg:aspect-[5/4]">
            <SmartImage
              src={demoImage("techHeroCircuit", 1600, 1280)}
              alt={dict.home.hero.imageAlt1}
              aspectRatio={5 / 4}
              sizes="(min-width: 1024px) 55vw, 100vw"
              wrapperClassName="absolute inset-0 rounded-[8px]"
              priority
            />
            <div className="absolute -bottom-6 -left-4 w-[45%] sm:-bottom-8 sm:-left-8 sm:w-[42%]">
              <SmartImage
                src={demoImage("cameraGear", 900, 1125)}
                alt={dict.home.hero.imageAlt2}
                aspectRatio={4 / 5}
                sizes="(min-width: 1024px) 25vw, 45vw"
                wrapperClassName="rounded-[8px] ring-4 ring-background"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
