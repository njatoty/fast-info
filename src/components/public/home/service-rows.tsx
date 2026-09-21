import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types/domain";

export function ServiceRows({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Services"
        title="Des services pensés pour votre quotidien"
        description="De l'impression à la photographie, une équipe FastInfo dédiée à chaque besoin."
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
                wrapperClassName="rounded-md"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
              <span className="block h-px w-10 bg-primary" aria-hidden />
              <h3 className="mt-4 font-heading text-2xl font-medium tracking-tight sm:text-3xl">
                {service.title}
              </h3>
              <p className="mt-4 max-w-md text-muted-foreground">{service.description}</p>
              <Button variant="link" asChild className="mt-4 gap-1.5 px-0">
                <Link href={`/services/${service.slug}`}>
                  En savoir plus
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
