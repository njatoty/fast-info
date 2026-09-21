import type { Metadata } from "next";

import { EventsTable } from "@/components/admin/events-table";
import { getAllEventsAdmin } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Événements",
  robots: { index: false, follow: false },
};

export default async function AdminEventsPage() {
  const events = await getAllEventsAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Événements</h1>
        <p className="text-sm text-muted-foreground">Gérez les projets photo mis en avant.</p>
      </div>
      <EventsTable events={events} />
    </div>
  );
}
