import type { Metadata } from "next";

import { Container } from "@/components/public/container";
import { EventCard } from "@/components/public/event-card";
import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
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
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <Reveal>
          <Eyebrow>{dict.events.list.eyebrow}</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            {dict.events.list.title}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">{dict.events.list.description}</p>
        </Reveal>

        {events.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            {dict.events.list.empty}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {events.map((event, index) => (
              <Reveal key={event.id} delay={(index % 4) * 70}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
