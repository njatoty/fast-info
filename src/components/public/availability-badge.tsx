import { cn } from "cn";

import type { AvailabilityStatus } from "@/types/database";

const LABELS: Record<AvailabilityStatus, string> = {
  in_stock: "En stock",
  out_of_stock: "Rupture de stock",
  on_order: "Sur commande",
};

const DOT_CLASSES: Record<AvailabilityStatus, string> = {
  in_stock: "bg-emerald-500",
  out_of_stock: "bg-destructive",
  on_order: "bg-amber-500",
};

export function AvailabilityBadge({
  availability,
  className,
}: {
  availability: AvailabilityStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", DOT_CLASSES[availability])} />
      {LABELS[availability]}
    </span>
  );
}
