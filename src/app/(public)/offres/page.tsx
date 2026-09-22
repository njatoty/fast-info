import type { Metadata } from "next";

import { Container } from "@/components/public/container";
import { Eyebrow } from "@/components/public/eyebrow";
import { OfferCard } from "@/components/public/offer-card";
import { Reveal } from "@/components/public/reveal";
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
    <div className="dark bg-background pt-8 pb-20 text-foreground sm:pt-12 sm:pb-28">
      <Container>
        <Reveal>
          <Eyebrow>{dict.offers.eyebrow}</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            {dict.offers.title}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">{dict.offers.description}</p>
        </Reveal>

        {offers.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">{dict.offers.empty}</p>
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
