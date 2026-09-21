import type { Metadata } from "next";

import { ServicesTable } from "@/components/admin/services-table";
import { getAllServicesAdmin } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  robots: { index: false, follow: false },
};

export default async function AdminServicesPage() {
  const services = await getAllServicesAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Services</h1>
        <p className="text-sm text-muted-foreground">Gérez les services proposés par FastInfo.</p>
      </div>
      <ServicesTable services={services} />
    </div>
  );
}
