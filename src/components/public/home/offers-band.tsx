import Link from "next/link";

import { Blob } from "@/components/public/motion/blob";
import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { OfferCard } from "@/components/public/offer-card";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Offer } from "@/types/domain";

export async function OffersBand({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;
  const dict = await getDictionary();

  return (
    <Section tone="blue" edge="top" className="relative overflow-hidden">
      <Blob color="sky" className="-top-32 -right-32 size-96 opacity-25" parallax={30} />

      <SectionHeading
        eyebrow={dict.home.offers.eyebrow}
        title={dict.home.offers.title}
        description={dict.home.offers.description}
        descriptionClassName="text-surface-blue-muted"
        action={
          <Button
            variant="outline"
            asChild
            className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/offres">{dict.home.offers.cta}</Link>
          </Button>
        }
        className="relative"
      />

      <Stagger className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.slice(0, 3).map((offer) => (
          <StaggerItem key={offer.id}>
            <OfferCard offer={offer} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
