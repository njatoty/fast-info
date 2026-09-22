import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Service } from "@/types/domain";

export async function ServiceRows({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  const dict = await getDictionary();

  return (
    <Section tone="blue" edge="top">
      <SectionHeading
        eyebrow={dict.home.services.eyebrow}
        title={dict.home.services.title}
        description={dict.home.services.description}
        descriptionClassName="text-surface-blue-muted"
      />

      <div className="mt-12 flex flex-col gap-16 lg:gap-20">
        {services.map((service, index) => (
          <Reveal
            key={service.id}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <SmartImage
                src={service.coverImage?.url}
                alt={service.coverImage?.alt ?? service.title}
                blurDataURL={service.coverImage?.blurDataURL}
                aspectRatio={16 / 10}
                wrapperClassName="rounded-none"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
              <span className="block h-px w-10 bg-primary" aria-hidden />
              <h3 className="mt-4 font-heading text-2xl font-medium tracking-tight sm:text-3xl">
                {service.title}
              </h3>
              <p className="mt-4 max-w-md text-surface-blue-muted">{service.description}</p>
              <Button variant="link" asChild className="mt-4 gap-1.5 px-0">
                <Link href={`/services/${service.slug}`}>
                  {dict.home.services.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
