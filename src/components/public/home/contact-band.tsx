import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/types/domain";

export function ContactBand({ settings }: { settings: SiteSettings }) {
  return (
    <Section className="text-center">
      <Reveal className="mx-auto max-w-2xl">
        <h2 className="text-balance font-heading text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] leading-tight font-medium tracking-tight">
          Une question, un projet ? Parlons-en.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Notre équipe vous répond rapidement, par téléphone, WhatsApp ou via le formulaire de
          contact.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild className="gap-2">
            <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
              <Phone className="size-4" />
              {settings.phone}
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2">
            <Link href="/contact">
              <MessageCircle className="size-4" />
              Formulaire de contact
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
