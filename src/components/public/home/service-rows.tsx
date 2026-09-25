import { cn } from "cn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Blob } from "@/components/public/motion/blob";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Service } from "@/types/domain";

const ROW_PALETTES = [
  ["sky", "blue"],
  ["yellow", "orange"],
  ["pink", "yellow"],
] as const;

export async function ServiceRows({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  const dict = await getDictionary();

  return (
    <Section>
      <SectionHeading
        eyebrow={dict.home.services.eyebrow}
        title={dict.home.services.title}
        description={dict.home.services.description}
      />

      <div className="mt-12 flex flex-col gap-16 lg:gap-20">
        {services.map((service, index) => {
          const [colorA, colorB] = ROW_PALETTES[index % ROW_PALETTES.length];
          return (
            <Reveal key={service.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={cn("relative", index % 2 === 1 ? "lg:order-2" : undefined)}>
                <Blob color={colorA} className="-top-8 -left-8 size-36 sm:size-52" parallax={14} />
                <Blob color={colorB} className="-right-8 -bottom-8 size-28 sm:size-40" delay={100} parallax={-14} />
                <SmartImage
                  src={service.coverImage?.url}
                  alt={service.coverImage?.alt ?? service.title}
                  blurDataURL={service.coverImage?.blurDataURL}
                  aspectRatio={16 / 10}
                  wrapperClassName="relative rounded-2xl"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
                <h3 className="font-heading text-2xl font-normal tracking-tight sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-muted-foreground">{service.description}</p>
                <Button variant="soft" size="sm" asChild className="mt-5 gap-1.5">
                  <Link href={`/services/${service.slug}`}>
                    {dict.home.services.cta}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
