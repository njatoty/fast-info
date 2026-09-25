import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/public/eyebrow";
import { AnimatedUnderline } from "@/components/public/motion/animated-underline";
import { HoverLift } from "@/components/public/motion/hover-lift";
import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { Section } from "@/components/public/section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Service } from "@/types/domain";

export async function ServiceRows({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  const dict = await getDictionary();

  return (
    <Section>
      {/* Matches the Overpass reference: the heading is the grid's own first
          cell (not a separate header above it), tiles are flush against
          each other with no gap, and their fill alternates gray/white —
          that's what makes adjoining tiles read as one seamless surface. */}
      <Stagger className="flex flex-wrap items-end justify-end">
        <StaggerItem className="flex h-72 w-full flex-col justify-center p-6 sm:w-1/2 sm:p-7 lg:w-1/3">
          <Eyebrow>{dict.home.services.eyebrow}</Eyebrow>
          <h2 className="font-heading text-[clamp(1.75rem,1.3rem+2vw,2.5rem)] leading-[1.1] font-normal tracking-tight">
            <AnimatedUnderline>{dict.home.services.title}</AnimatedUnderline>
          </h2>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{dict.home.services.description}</p>
          <Button variant="outline" asChild className="my-6 w-fit rounded-full">
            <Link href="/services">{dict.nav.megaMenu.services.viewAll}</Link>
          </Button>
        </StaggerItem>

        {services.map((service, index) => {
          const isGray = index % 2 === 0;
          return (
            <StaggerItem key={service.id} className="w-full sm:w-1/2 lg:w-1/3">
              <HoverLift className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group flex h-72 flex-col p-6 sm:p-7",
                    isGray ? "bg-secondary" : "bg-background",
                  )}
                >
                  <h3 className="max-w-48 font-heading text-xl font-light tracking-tight sm:text-2xl">
                    {service.title}
                  </h3>
                  {/* Hidden until hover, in place of always-on body copy — keeps
                      the tile's resting state as clean as the reference's
                      title-plus-arrow tiles while still surfacing the detail. */}
                  <p className="mt-3 max-w-52 translate-y-1 text-sm text-muted-foreground opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    {service.shortDescription}
                  </p>
                  <span
                    className={cn(
                      "mt-auto flex size-11 items-center justify-center self-end rounded-full transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1",
                      isGray ? "bg-background" : "bg-secondary",
                    )}
                  >
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
