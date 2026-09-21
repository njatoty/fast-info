import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/public/container";
import { ContactForm } from "@/components/public/contact-form";
import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez FastInfo par téléphone, WhatsApp, e-mail ou via le formulaire en ligne.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sujet?: string }>;
}) {
  const [settings, { sujet }] = await Promise.all([getSiteSettings(), searchParams]);

  return (
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-muted-foreground">
            Une question sur un produit, un service ou un événement à couvrir ? Écrivez-nous, nous
            vous répondons rapidement.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal delay={80} className="lg:col-span-2">
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="font-medium hover:text-primary"
                  >
                    {settings.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary"
                  >
                    {settings.whatsapp}
                  </a>
                </div>
              </li>
              {settings.email ? (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <a href={`mailto:${settings.email}`} className="font-medium hover:text-primary">
                      {settings.email}
                    </a>
                  </div>
                </li>
              ) : null}
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="font-medium">
                    {settings.address}, {settings.city}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Horaires</p>
                  {settings.openingHours.map((hour) => (
                    <p key={hour.day} className="font-medium">
                      {hour.day} : {hour.hours}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-3">
            <ContactForm defaultSubject={sujet} />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
