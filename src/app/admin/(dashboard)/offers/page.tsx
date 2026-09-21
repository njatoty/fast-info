import type { Metadata } from "next";

import { OffersTable } from "@/components/admin/offers-table";
import { getAllOffersAdmin } from "@/lib/data/offers";

export const metadata: Metadata = {
  title: "Offres",
  robots: { index: false, follow: false },
};

export default async function AdminOffersPage() {
  const offers = await getAllOffersAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Offres</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les promotions affichées sur le site. Une offre expirée disparaît automatiquement
          de la page publique.
        </p>
      </div>
      <OffersTable offers={offers} />
    </div>
  );
}
