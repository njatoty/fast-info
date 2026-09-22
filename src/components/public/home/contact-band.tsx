import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { SiteSettings } from "@/types/domain";

export async function ContactBand({ settings }: { settings: SiteSettings }) {
  const dict = await getDictionary();

  return (
    <Section className="text-center">
      <Reveal className="mx-auto max-w-2xl">
        <h2 className="text-balance font-heading text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight font-semibold tracking-tight">
          {dict.home.contactBand.title}
        </h2>
        <p className="mt-4 text-muted-foreground">{dict.home.contactBand.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="cta" size="xl" asChild className="gap-2">
            <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
              <Phone className="size-4" />
              {settings.phone}
            </a>
          </Button>
          <Button size="xl" variant="outline" asChild className="gap-2 rounded-[8px]">
            <Link href="/contact">
              <MessageCircle className="size-4" />
              {dict.home.contactBand.formCta}
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
