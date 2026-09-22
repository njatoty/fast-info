import { SmartImage } from "@/components/media/smart-image";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { t } from "@/lib/i18n/locales";
import { formatCurrency, formatDateRange } from "@/lib/utils/format";
import type { Offer } from "@/types/domain";

export async function OfferCard({ offer }: { offer: Offer }) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const hasPrices = offer.originalPrice !== null && offer.promoPrice !== null;
  const discountPercent =
    hasPrices && offer.originalPrice
      ? Math.round(((offer.originalPrice - (offer.promoPrice ?? 0)) / offer.originalPrice) * 100)
      : null;

  return (
    <div className="group overflow-hidden rounded-[8px] border border-surface-blue-border bg-white/8">
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
            <span className="shrink-0 rounded-[8px] bg-surface-yellow px-2.5 py-1 text-xs font-semibold text-surface-yellow-foreground">
              -{discountPercent}%
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-surface-blue-muted">{offer.description}</p>
        {hasPrices ? (
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-lg font-medium text-primary">
              {formatCurrency(offer.promoPrice!)}
            </span>
            <span className="text-sm text-surface-blue-muted line-through">
              {formatCurrency(offer.originalPrice!)}
            </span>
          </div>
        ) : null}
        {offer.endsAt ? (
          <p className="mt-3 text-xs text-surface-blue-muted/70">
            {t(dict.offers.validUntilTemplate, { date: formatDateRange(offer.endsAt, null, locale) })}
          </p>
        ) : null}
      </div>
    </div>
  );
}
