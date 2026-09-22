import type { ReactNode } from "react";

import { Eyebrow } from "@/components/public/eyebrow";
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
    <Section tone="blue">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-heading text-[clamp(2.25rem,1.6rem+3vw,4rem)] leading-[1.02] font-semibold tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-surface-blue-muted">{description}</p>
        ) : null}
      </Reveal>
    </Section>
  );
}
