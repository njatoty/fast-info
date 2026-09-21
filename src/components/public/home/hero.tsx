import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/public/container";
import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { demoImage } from "@/lib/demo/images";
import type { SiteSettings } from "@/types/domain";

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow className="mb-5">
              Antananarivo · Téléphonie, informatique &amp; photographie
            </Eyebrow>
            <h1 className="text-balance font-heading text-[clamp(2.25rem,1.4rem+3.6vw,4rem)] leading-[1.02] font-medium tracking-tight">
              {settings.heroTitle}
            </h1>
            <p className="mt-6 max-w-md text-balance text-base text-muted-foreground sm:text-lg">
              {settings.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild className="gap-2">
                <Link href="/produits">
                  Découvrir les produits
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link href="/contact">
                  <MessageCircle className="size-4" />
                  Nous contacter
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
                alt="Univers technologique FastInfo"
                aspectRatio={5 / 4}
                sizes="(min-width: 1024px) 55vw, 100vw"
                wrapperClassName="absolute inset-0 rounded-md"
                priority
              />
              <div className="absolute -bottom-6 -left-4 w-[45%] sm:-bottom-8 sm:-left-8 sm:w-[42%]">
                <SmartImage
                  src={demoImage("cameraGear", 900, 1125)}
                  alt="Matériel de photographie FastInfo"
                  aspectRatio={4 / 5}
                  sizes="(min-width: 1024px) 25vw, 45vw"
                  wrapperClassName="rounded-md ring-4 ring-background"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
