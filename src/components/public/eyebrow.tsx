import { cn } from "cn";
import type { ReactNode } from "react";

const DOT_COLORS = ["bg-surface-sky", "bg-surface-yellow", "bg-surface-orange", "bg-surface-blue"];

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
        "mb-3 flex items-center gap-1.5",
        align === "center" && "justify-center",
        className,
      )}
    >
      {DOT_COLORS.map((color) => (
        <span key={color} className={cn("size-1.5 shrink-0 rounded-full", color)} aria-hidden />
      ))}
      <span className="text-xs font-semibold tracking-normal text-primary hidden">
        {children}
      </span>
    </div>
  );
}
