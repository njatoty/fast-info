import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/public/contact-form";
import { PageHeader } from "@/components/public/page-header";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { getSiteSettings } from "@/lib/data/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sujet?: string }>;
}) {
  const [settings, { sujet }, dict] = await Promise.all([
    getSiteSettings(),
    searchParams,
    getDictionary(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        description={dict.contact.description}
      />
      <Section edge="top">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal delay={80} className="lg:col-span-2">
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{dict.contact.phoneLabel}</p>
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
                  <p className="text-sm text-muted-foreground">{dict.contact.whatsappLabel}</p>
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
                    <p className="text-sm text-muted-foreground">{dict.contact.emailLabel}</p>
                    <a href={`mailto:${settings.email}`} className="font-medium hover:text-primary">
                      {settings.email}
                    </a>
                  </div>
                </li>
              ) : null}
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{dict.contact.addressLabel}</p>
                  <p className="font-medium">
                    {settings.address}, {settings.city}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{dict.contact.hoursLabel}</p>
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
      </Section>
    </>
  );
}
