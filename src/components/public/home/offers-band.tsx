import Link from "next/link";

import { OfferCard } from "@/components/public/offer-card";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Offer } from "@/types/domain";

export async function OffersBand({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;
  const dict = await getDictionary();

  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow={dict.home.offers.eyebrow}
        title={dict.home.offers.title}
        description={dict.home.offers.description}
        action={
          <Button variant="outline" asChild>
            <Link href="/offres">{dict.home.offers.cta}</Link>
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
