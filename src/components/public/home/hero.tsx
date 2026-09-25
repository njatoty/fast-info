import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/public/eyebrow";
import { Blob } from "@/components/public/motion/blob";
import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { demoImage } from "@/lib/demo/images";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { SiteSettings } from "@/types/domain";

export async function Hero({ settings }: { settings: SiteSettings }) {
  const dict = await getDictionary();
  const titleWords = settings.heroTitle.split(" ");

  return (
    <Section
      className="pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-24"
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
          <p className="mt-6 max-w-md text-balance text-base text-muted-foreground sm:text-lg">
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

            <div className="relative aspect-6/5 w-full sm:aspect-16/10 lg:aspect-5/4">
              <SmartImage
                src={demoImage("techHeroCircuit", 1600, 1280)}
                alt={dict.home.hero.imageAlt1}
                aspectRatio={5 / 4}
                sizes="(min-width: 1024px) 50vw, 100vw"
                wrapperClassName="absolute inset-0 rounded-2xl shadow-xl"
                priority
              />
              <div className="absolute -bottom-6 -left-4 w-[45%] sm:-bottom-8 sm:-left-8 sm:w-[42%]">
                <SmartImage
                  src={demoImage("cameraGear", 900, 1125)}
                  alt={dict.home.hero.imageAlt2}
                  aspectRatio={4 / 5}
                  sizes="(min-width: 1024px) 25vw, 45vw"
                  wrapperClassName="rounded-2xl ring-4 ring-background"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
