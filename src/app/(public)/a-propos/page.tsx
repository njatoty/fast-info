import { Camera, Printer, ShieldCheck, Smartphone } from "lucide-react";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SmartImage } from "@/components/media/smart-image";
import { demoImage } from "@/lib/demo/images";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'histoire, la mission et l'équipe de FastInfo à Antananarivo.",
  alternates: { canonical: "/a-propos" },
};

const VALUES = [
  {
    icon: Smartphone,
    title: "Technologie accessible",
    description: "Des produits fiables, sélectionnés pour durer, à des prix justes.",
  },
  {
    icon: Printer,
    title: "Services de proximité",
    description: "Impression, copie et saisie de documents, sans rendez-vous nécessaire.",
  },
  {
    icon: Camera,
    title: "Regard photographique",
    description: "Une équipe formée pour capturer vos événements avec sensibilité.",
  },
  {
    icon: ShieldCheck,
    title: "Confiance locale",
    description: "Une entreprise ancrée à Antananarivo, au service de sa communauté.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pb-20 sm:pb-28">
      <Section className="pt-8 sm:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>À propos</Eyebrow>
            <h1 className="font-heading text-[clamp(2rem,1.4rem+2.4vw,3rem)] leading-[1.05] font-medium tracking-tight">
              Une équipe, trois expertises complémentaires
            </h1>
            <p className="mt-6 text-muted-foreground">{settings.heroSubtitle}</p>
            <p className="mt-4 text-muted-foreground">
              Depuis nos locaux d&apos;{settings.city.split(",")[0]}, nous accompagnons
              particuliers et professionnels dans leurs besoins technologiques, administratifs et
              créatifs. Ce qui nous distingue : la polyvalence, la réactivité et un vrai sens du
              service.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SmartImage
              src={demoImage("techWorkspace", 1200, 1500)}
              alt="Équipe FastInfo au travail"
              aspectRatio={4 / 5}
              wrapperClassName="rounded-md"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 80}>
              <value.icon className="size-6 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 font-medium">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
            Pourquoi choisir FastInfo ?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Parce que nous réunissons, au même endroit, la vente de produits technologiques, des
            services administratifs essentiels et une expertise en photographie d&apos;événements.
            Un interlocuteur unique, une équipe qui vous connaît, et un engagement de qualité sur
            chaque prestation.
          </p>
        </Reveal>
      </Section>
    </div>
  );
}
