import type { ReactNode } from "react";

import { Eyebrow } from "@/components/public/eyebrow";
import { AnimatedUnderline } from "@/components/public/motion/animated-underline";
import { Blob } from "@/components/public/motion/blob";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}

/** Blue title band opening every inner page; the page's own content Section
 * cuts into it with `edge="top"` (see Section). */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <Section tone="blue" className="relative overflow-hidden">
      <Blob color="sky" className="-top-16 -right-16 size-64 sm:size-80" />
      <Blob color="yellow" className="-right-10 -bottom-24 size-48 sm:size-56" delay={100} />
      <Reveal className="relative max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-heading text-[clamp(2.25rem,1.6rem+3vw,4rem)] leading-[1.15] font-normal tracking-tight">
          <AnimatedUnderline>{title}</AnimatedUnderline>
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-surface-blue-muted">{description}</p>
        ) : null}
      </Reveal>
    </Section>
  );
}
