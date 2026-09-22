import type { Metadata } from "next";

import { PageHeader } from "@/components/public/page-header";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
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
    <>
      <PageHeader
        eyebrow={dict.services.list.eyebrow}
        title={dict.services.list.title}
        description={dict.services.list.description}
      />
      <Section edge="top">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 80}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
