import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { HoverLift } from "@/components/public/motion/hover-lift";
import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Service } from "@/types/domain";

const DOT_COLORS = [
  ["bg-surface-sky", "bg-surface-yellow"],
  ["bg-surface-orange", "bg-surface-blue"],
  ["bg-surface-pink", "bg-surface-sky"],
  ["bg-surface-yellow", "bg-surface-orange"],
  ["bg-surface-blue", "bg-surface-pink"],
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
        action={
          <Button variant="outline" asChild className="rounded-full">
            <Link href="/services">{dict.nav.megaMenu.services.viewAll}</Link>
          </Button>
        }
      />

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const [dotA, dotB] = DOT_COLORS[index % DOT_COLORS.length];
          return (
            <StaggerItem key={service.id}>
              <HoverLift>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl bg-secondary p-6 sm:p-7"
                >
                  <span className="flex items-center gap-1.5" aria-hidden>
                    <span className={`size-1.5 rounded-full ${dotA}`} />
                    <span className={`size-1.5 rounded-full ${dotB}`} />
                  </span>
                  <h3 className="mt-5 max-w-[14rem] font-heading text-xl font-normal tracking-tight sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                    {service.shortDescription}
                  </p>
                  <span className="mt-8 flex size-10 items-center justify-center self-end rounded-full bg-surface-ink text-surface-ink-foreground transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </HoverLift>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
