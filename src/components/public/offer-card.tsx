import { SmartImage } from "@/components/media/smart-image";
import { formatCurrency, formatDateRange } from "@/lib/utils/format";
import type { Offer } from "@/types/domain";

export function OfferCard({ offer }: { offer: Offer }) {
  const hasPrices = offer.originalPrice !== null && offer.promoPrice !== null;
  const discountPercent =
    hasPrices && offer.originalPrice
      ? Math.round(((offer.originalPrice - (offer.promoPrice ?? 0)) / offer.originalPrice) * 100)
      : null;

  return (
    <div className="group overflow-hidden rounded-md border border-border bg-card">
      <SmartImage
        src={offer.image?.url}
        alt={offer.image?.alt ?? offer.title}
        blurDataURL={offer.image?.blurDataURL}
        aspectRatio={16 / 10}
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-medium">{offer.title}</h3>
          {discountPercent ? (
            <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
              -{discountPercent}%
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{offer.description}</p>
        {hasPrices ? (
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-lg font-medium text-primary">
              {formatCurrency(offer.promoPrice!)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(offer.originalPrice!)}
            </span>
          </div>
        ) : null}
        {offer.endsAt ? (
          <p className="mt-3 text-xs text-muted-foreground/70">
            Valable jusqu&apos;au {formatDateRange(offer.endsAt)}
          </p>
        ) : null}
      </div>
    </div>
  );
}
