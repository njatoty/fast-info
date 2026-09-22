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
  /** Override the description's text color — e.g. `text-surface-blue-muted` on a blue Section. */
  descriptionClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
  descriptionClassName,
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
        <h2 className="text-balance font-heading text-[clamp(2rem,1.3rem+3.2vw,4rem)] leading-[1.02] font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 text-balance text-base text-muted-foreground sm:text-lg",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
