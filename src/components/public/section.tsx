import { cn } from "cn";
import type { ReactNode } from "react";

import { Container } from "@/components/public/container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  containerSize?: "default" | "narrow" | "wide";
  bleed?: boolean;
  tone?: "default" | "muted" | "blue" | "sky";
  /** "top" rounds this section's own top-left corner into a wide arc and
   * pulls it up over the previous section (see `.curve-top` in
   * globals.css). Skip it on the first section of a page — there's nothing
   * above to curve into. */
  edge?: "top";
  id?: string;
}

const toneClasses = {
  // Explicit (not inherited-transparent) so `edge="top"` always has an
  // opaque background of its own to clip into an arc — see `.curve-top`.
  default: "bg-background",
  muted: "bg-secondary",
  // Fixed blue brand surface (same hue as --primary, pushed darker) for
  // marketing bands. Also applies the `.dark` class — the site has no dark
  // mode, but that class is what makes descendants using generic semantic
  // tokens (bg-card, border-border, text-muted-foreground — e.g. inside
  // OfferCard) resolve to values that read well on a dark surface, instead
  // of their light-theme ones; the section's own visible surface is the
  // fixed blue pair below, not --background/--foreground.
  blue: "dark bg-surface-blue text-surface-blue-foreground",
  sky: "bg-surface-sky text-surface-sky-foreground",
};

const edgeClasses = {
  top: "curve-top",
};

export function Section({
  children,
  className,
  containerClassName,
  containerSize = "default",
  bleed = false,
  tone = "default",
  edge,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        toneClasses[tone],
        edge && edgeClasses[edge],
        className,
      )}
    >
      {bleed ? (
        children
      ) : (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      )}
    </section>
  );
}
