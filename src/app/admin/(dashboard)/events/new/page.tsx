import type { Metadata } from "next";

import { EventForm } from "@/components/admin/event-form";
import { createEvent } from "@/lib/actions/events";

export const metadata: Metadata = {
  title: "Nouvel événement",
  robots: { index: false, follow: false },
};

export default function NewEventPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Nouvel événement</h1>
        <p className="text-sm text-muted-foreground">Ajoutez un projet photo au site.</p>
      </div>
      <EventForm onSubmit={createEvent} />
    </div>
  );
}
