export const siteConfig = {
  name: "FastInfo",
  shortName: "FastInfo",
  description:
    "FastInfo : téléphonie, informatique et services de proximité à Antananarivo — vente de mobiles et accessoires, impression, saisie de documents et photographie d'événements.",
  tagline: "La technologie, les services et la créativité, réunis.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr-MG",
  currency: "MGA",
} as const;
