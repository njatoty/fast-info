import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { AvailabilityBadge } from "@/components/public/availability-badge";
import { SmartImage } from "@/components/media/smart-image";
import { formatCurrency } from "@/lib/utils/format";
import type { Product } from "@/types/domain";

export function ProductCard({
  product,
  size = "default",
  className,
}: {
  product: Product;
  size?: "default" | "large";
  className?: string;
}) {
  return (
    <Link href={`/produits/${product.slug}`} className={cn("group block", className)}>
      <div className="relative">
        <SmartImage
          src={product.mainImage?.url}
          alt={product.mainImage?.alt ?? product.name}
          blurDataURL={product.mainImage?.blurDataURL}
          aspectRatio={size === "large" ? 4 / 5 : 1}
          wrapperClassName="rounded-2xl bg-secondary"
          sizes={size === "large" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 bottom-3 flex size-9 translate-y-1 scale-75 items-center justify-center rounded-full bg-surface-ink text-surface-ink-foreground opacity-0 shadow-md transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {product.category ? (
            <p className="text-xs font-medium text-muted-foreground">{product.category.name}</p>
          ) : null}
          <h3
            className={cn(
              "mt-1 truncate font-medium",
              size === "large" ? "font-heading text-xl" : "text-sm",
            )}
          >
            {product.name}
          </h3>
          <AvailabilityBadge availability={product.availability} className="mt-1.5" />
        </div>
        <div className="shrink-0 text-right">
          {product.promoPrice ? (
            <>
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </p>
              <p className="text-sm font-medium text-primary">{formatCurrency(product.promoPrice)}</p>
            </>
          ) : (
            <p className={cn("font-medium", size === "large" ? "text-base" : "text-sm")}>
              {formatCurrency(product.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
