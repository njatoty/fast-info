import type { Metadata } from "next";

import { Container } from "@/components/public/container";
import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { ServiceCard } from "@/components/public/service-card";
import { getServices } from "@/lib/data/services";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.services.title,
    description: dict.meta.services.description,
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const [services, dict] = await Promise.all([getServices(), getDictionary()]);

  return (
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <Reveal>
          <Eyebrow>{dict.services.list.eyebrow}</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            {dict.services.list.title}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">{dict.services.list.description}</p>
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
