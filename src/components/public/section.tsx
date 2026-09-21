import { cn } from "cn";
import type { ReactNode } from "react";

import { Container } from "@/components/public/container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  containerSize?: "default" | "narrow" | "wide";
  bleed?: boolean;
  tone?: "default" | "muted" | "dark";
  id?: string;
}

const toneClasses = {
  default: "",
  muted: "bg-secondary/40",
  // Forces the dark palette for this subtree regardless of the active site
  // theme (globals.css defines `.dark { ... }` as ordinary CSS variable
  // overrides, so nesting the class works the same as at the html root).
  // This keeps the offers band a deliberate, literal "dark band" instead of
  // inverting to light when a visitor already has dark mode on.
  dark: "dark bg-background text-foreground",
};

export function Section({
  children,
  className,
  containerClassName,
  containerSize = "default",
  bleed = false,
  tone = "default",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-28", toneClasses[tone], className)}>
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
