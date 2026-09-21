import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceForm } from "@/components/admin/service-form";
import { updateService } from "@/lib/actions/services";
import { getServiceByIdAdmin } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Modifier le service",
  robots: { index: false, follow: false },
};

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceByIdAdmin(id);

  if (!service) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">{service.title}</h1>
        <p className="text-sm text-muted-foreground">Modifier le service.</p>
      </div>
      <ServiceForm service={service} onSubmit={(values, images) => updateService(service.id, values, images)} />
    </div>
  );
}
