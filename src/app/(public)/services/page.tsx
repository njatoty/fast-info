import type { Metadata } from "next";

import { Container } from "@/components/public/container";
import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { ServiceCard } from "@/components/public/service-card";
import { getServices } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Photocopie, impression, saisie de documents et photographie d'événements — les services FastInfo à Antananarivo.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            Nos services
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            De l&apos;impression à la photographie d&apos;événements, une équipe dédiée à chaque
            besoin.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 80}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
