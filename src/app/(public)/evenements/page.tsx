import type { Metadata } from "next";

import { Container } from "@/components/public/container";
import { EventCard } from "@/components/public/event-card";
import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { getEvents } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Événements",
  description: "Mariages, anniversaires et événements d'entreprise couverts par FastInfo.",
  alternates: { canonical: "/evenements" },
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <Reveal>
          <Eyebrow>Événements</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            Nos projets photo
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Une sélection d&apos;événements couverts par notre équipe, du mariage au séminaire
            d&apos;entreprise.
          </p>
        </Reveal>

        {events.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            Aucun événement publié pour le moment.
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
