const numberFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return `${numberFormatter.format(amount)} Ar`;
}

export function formatDate(
  date: string | Date,
  style: "long" | "short" | "day-month" = "long",
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (style === "short") {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  }

  if (style === "day-month") {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
    }).format(d);
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDateRange(start: string | Date, end?: string | Date | null): string {
  if (!end) return formatDate(start);

  const startDate = typeof start === "string" ? new Date(start) : start;
  const endDate = typeof end === "string" ? new Date(end) : end;

  if (startDate.toDateString() === endDate.toDateString()) {
    return formatDate(startDate);
  }

  const sameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth) {
    return `${startDate.getDate()} – ${formatDate(endDate)}`;
  }

  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
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
