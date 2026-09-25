import Link from "next/link";

import { EventCard } from "@/components/public/event-card";
import { HoverLift } from "@/components/public/motion/hover-lift";
import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { EventProject } from "@/types/domain";

export async function RecentEvents({ events }: { events: EventProject[] }) {
  if (events.length === 0) return null;
  const dict = await getDictionary();

  return (
    <Section edge="top">
      <SectionHeading
        eyebrow={dict.home.events.eyebrow}
        title={dict.home.events.title}
        action={
          <Button variant="outline" asChild className="rounded-full">
            <Link href="/evenements">{dict.home.events.cta}</Link>
          </Button>
        }
      />

      <Stagger className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {events.slice(0, 4).map((event) => (
          <StaggerItem key={event.id}>
            <HoverLift>
              <EventCard event={event} />
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
