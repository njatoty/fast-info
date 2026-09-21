import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventForm } from "@/components/admin/event-form";
import { updateEvent } from "@/lib/actions/events";
import { getEventByIdAdmin } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Modifier l'événement",
  robots: { index: false, follow: false },
};

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventByIdAdmin(id);

  if (!event) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">{event.title}</h1>
        <p className="text-sm text-muted-foreground">Modifier l&apos;événement.</p>
      </div>
      <EventForm event={event} onSubmit={(values, images) => updateEvent(event.id, values, images)} />
    </div>
  );
}
