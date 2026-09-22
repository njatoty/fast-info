import { cn } from "cn";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  align = "left",
  className,
}: {
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-3 flex items-center gap-2.5",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span className="h-px w-6 shrink-0 bg-primary" aria-hidden />
      <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        {children}
      </span>
    </div>
  );
}
