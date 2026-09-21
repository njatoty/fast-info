import type { Metadata } from "next";

import { Container } from "@/components/public/container";
import { Eyebrow } from "@/components/public/eyebrow";
import { OfferCard } from "@/components/public/offer-card";
import { Reveal } from "@/components/public/reveal";
import { getActiveOffers } from "@/lib/data/offers";

export const metadata: Metadata = {
  title: "Offres",
  description: "Les promotions en cours chez FastInfo — produits et services à prix réduit.",
  alternates: { canonical: "/offres" },
};

export default async function OffersPage() {
  const offers = await getActiveOffers();

  return (
    <div className="dark bg-background pt-8 pb-20 text-foreground sm:pt-12 sm:pb-28">
      <Container>
        <Reveal>
          <Eyebrow>Offres</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            Offres du moment
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Des réductions limitées dans le temps sur une sélection de produits et services.
          </p>
        </Reveal>

        {offers.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            Aucune offre active pour le moment. Revenez bientôt !
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <Reveal key={offer.id} delay={(index % 3) * 80}>
                <OfferCard offer={offer} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
