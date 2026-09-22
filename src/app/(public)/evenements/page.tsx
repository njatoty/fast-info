import type { Metadata } from "next";

import { EventCard } from "@/components/public/event-card";
import { PageHeader } from "@/components/public/page-header";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { getEvents } from "@/lib/data/events";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.events.title,
    description: dict.meta.events.description,
    alternates: { canonical: "/evenements" },
  };
}

export default async function EventsPage() {
  const [events, dict] = await Promise.all([getEvents(), getDictionary()]);

  return (
    <>
      <PageHeader
        eyebrow={dict.events.list.eyebrow}
        title={dict.events.list.title}
        description={dict.events.list.description}
      />
      <Section edge="top">
        {events.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            {dict.events.list.empty}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {events.map((event, index) => (
              <Reveal key={event.id} delay={(index % 4) * 70}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
