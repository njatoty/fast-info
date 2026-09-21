import type { Metadata } from "next";

import { ServiceForm } from "@/components/admin/service-form";
import { createService } from "@/lib/actions/services";

export const metadata: Metadata = {
  title: "Nouveau service",
  robots: { index: false, follow: false },
};

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Nouveau service</h1>
        <p className="text-sm text-muted-foreground">Ajoutez un service au site.</p>
      </div>
      <ServiceForm onSubmit={createService} />
    </div>
  );
}
