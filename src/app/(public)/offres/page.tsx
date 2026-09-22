import type { Metadata } from "next";

import { OfferCard } from "@/components/public/offer-card";
import { PageHeader } from "@/components/public/page-header";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { getActiveOffers } from "@/lib/data/offers";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.offers.title,
    description: dict.meta.offers.description,
    alternates: { canonical: "/offres" },
  };
}

export default async function OffersPage() {
  const [offers, dict] = await Promise.all([getActiveOffers(), getDictionary()]);

  return (
    <>
      <PageHeader eyebrow={dict.offers.eyebrow} title={dict.offers.title} description={dict.offers.description} />
      <Section tone="blue">
        {offers.length === 0 ? (
          <p className="py-20 text-center text-sm text-surface-blue-muted">{dict.offers.empty}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <Reveal key={offer.id} delay={(index % 3) * 80}>
                <OfferCard offer={offer} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
