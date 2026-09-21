import Link from "next/link";

import { EventCard } from "@/components/public/event-card";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import type { EventProject } from "@/types/domain";

export function RecentEvents({ events }: { events: EventProject[] }) {
  if (events.length === 0) return null;

  return (
    <Section>
      <SectionHeading
        eyebrow="Événements récents"
        title="Nos derniers projets photo"
        action={
          <Button variant="outline" asChild>
            <Link href="/evenements">Voir tous les événements</Link>
          </Button>
        }
      />

      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {events.slice(0, 4).map((event, index) => (
          <Reveal key={event.id} delay={index * 80}>
            <EventCard event={event} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
