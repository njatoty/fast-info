import { cn } from "cn";

import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { AvailabilityStatus } from "@/types/database";

const DOT_CLASSES: Record<AvailabilityStatus, string> = {
  in_stock: "bg-emerald-500",
  out_of_stock: "bg-destructive",
  on_order: "bg-amber-500",
};

export async function AvailabilityBadge({
  availability,
  className,
}: {
  availability: AvailabilityStatus;
  className?: string;
}) {
  const dict = await getDictionary();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", DOT_CLASSES[availability])} />
      {dict.products.availability[availability]}
    </span>
  );
}
