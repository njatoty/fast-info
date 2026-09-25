import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { AnimatedUnderline } from "@/components/public/motion/animated-underline";
import { Blob } from "@/components/public/motion/blob";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { SiteSettings } from "@/types/domain";

export async function ContactBand({ settings }: { settings: SiteSettings }) {
  const dict = await getDictionary();

  return (
    <Section tone="muted" edge="top" className="relative overflow-hidden text-center">
      <Blob color="sky" className="-top-10 -left-14 size-40 opacity-40" />
      <Blob color="pink" className="-right-14 -bottom-10 size-48 opacity-50" delay={100} />
      <Reveal className="relative mx-auto max-w-2xl">
        <h2 className="text-balance font-heading text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-[1.15] font-normal tracking-tight">
          <AnimatedUnderline>{dict.home.contactBand.title}</AnimatedUnderline>
        </h2>
        <p className="mt-4 text-muted-foreground">{dict.home.contactBand.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="sky" size="xl" asChild className="gap-2">
            <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
              <Phone className="size-4" />
              {settings.phone}
            </a>
          </Button>
          <Button size="xl" variant="outline" asChild className="gap-2 rounded-full">
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
