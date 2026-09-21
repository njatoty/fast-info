import Link from "next/link";

import { OfferCard } from "@/components/public/offer-card";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import type { Offer } from "@/types/domain";

export function OffersBand({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;

  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="Offres du moment"
        title="Des promotions à ne pas manquer"
        description="Des réductions limitées dans le temps sur une sélection de produits et services."
        action={
          <Button variant="outline" asChild>
            <Link href="/offres">Voir toutes les offres</Link>
          </Button>
        }
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.slice(0, 3).map((offer, index) => (
          <Reveal key={offer.id} delay={index * 80}>
            <OfferCard offer={offer} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
