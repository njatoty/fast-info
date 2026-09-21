import { cn } from "cn";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        (action || align === "left") && "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <Eyebrow align={align}>{eyebrow}</Eyebrow> : null}
        <h2 className="text-balance font-heading text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.05] font-medium tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
