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
    // Fixed (non-theme-relative) colors throughout: this card always sits
    // inside OffersBand's `.dark`-scoped blue Section, so semantic tokens
    // like bg-card/text-foreground would resolve to their dark-mode values
    // (made for a dark surface) instead of these — a white "browser" card
    // needs colors that don't flip with the ambient theme.
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/10">
      {/* Browser-chrome bar, Overpass "profile card" motif. */}
      <div className="flex items-center gap-1.5 border-b border-black/10 px-4 py-3">
        <span className="size-2 rounded-full bg-surface-pink" aria-hidden />
        <span className="size-2 rounded-full bg-surface-yellow" aria-hidden />
        <span className="size-2 rounded-full bg-surface-sky" aria-hidden />
      </div>
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
          <h3 className="font-heading text-lg font-medium text-surface-ink">{offer.title}</h3>
          {discountPercent ? (
            <span className="shrink-0 rounded-full bg-surface-yellow px-2.5 py-1 text-xs font-semibold text-surface-yellow-foreground">
              -{discountPercent}%
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-surface-ink/60">{offer.description}</p>
        {hasPrices ? (
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-lg font-medium text-surface-blue">
              {formatCurrency(offer.promoPrice!)}
            </span>
            <span className="text-sm text-surface-ink/50 line-through">
              {formatCurrency(offer.originalPrice!)}
            </span>
          </div>
        ) : null}
        {offer.endsAt ? (
          <p className="mt-3 text-xs text-surface-ink/40">
            {t(dict.offers.validUntilTemplate, { date: formatDateRange(offer.endsAt, null, locale) })}
          </p>
        ) : null}
      </div>
    </div>
  );
}
