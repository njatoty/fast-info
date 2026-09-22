import type { Locale } from "@/lib/i18n/locales";

// Number grouping stays the Madagascar convention (space-separated) regardless of UI language.
const numberFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

const DATE_INTL_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  mg: "mg-MG",
};

export function formatCurrency(amount: number): string {
  return `${numberFormatter.format(amount)} Ar`;
}

export function formatDate(
  date: string | Date,
  style: "long" | "short" | "day-month" = "long",
  locale: Locale = "fr",
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const intlLocale = DATE_INTL_LOCALE[locale];

  if (style === "short") {
    return new Intl.DateTimeFormat(intlLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  }

  if (style === "day-month") {
    return new Intl.DateTimeFormat(intlLocale, {
      day: "numeric",
      month: "long",
    }).format(d);
  }

  return new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDateRange(
  start: string | Date,
  end?: string | Date | null,
  locale: Locale = "fr",
): string {
  if (!end) return formatDate(start, "long", locale);

  const startDate = typeof start === "string" ? new Date(start) : start;
  const endDate = typeof end === "string" ? new Date(end) : end;

  if (startDate.toDateString() === endDate.toDateString()) {
    return formatDate(startDate, "long", locale);
  }

  const sameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth) {
    return `${startDate.getDate()} – ${formatDate(endDate, "long", locale)}`;
  }

  return `${formatDate(startDate, "long", locale)} – ${formatDate(endDate, "long", locale)}`;
}

export function isOfferActive(offer: {
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
}): boolean {
  if (!offer.is_active) return false;
  const now = Date.now();
  if (offer.starts_at && new Date(offer.starts_at).getTime() > now) return false;
  if (offer.ends_at && new Date(offer.ends_at).getTime() < now) return false;
  return true;
}
