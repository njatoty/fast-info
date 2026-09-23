import {
  Cable,
  Camera,
  FileText,
  Headphones,
  Heart,
  Laptop,
  PartyPopper,
  Printer,
  Smartphone,
  SmartphoneCharging,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Shared slug → icon lookups so the category strip, nav mega menus and
// mobile drawer all render the same icon for a given category/service
// instead of drifting apart over time.
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  telephones: Smartphone,
  "accessoires-telephone": SmartphoneCharging,
  "ecrans-reparation": Wrench,
  "stockage-cables": Cable,
  audio: Headphones,
  informatique: Laptop,
};

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "photocopie-impression": Printer,
  "saisie-frappe-documents": FileText,
  "prise-de-photos": Camera,
  "photographie-evenements": PartyPopper,
  "mariages-ceremonies": Heart,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? Smartphone;
}

export function getServiceIcon(slug: string): LucideIcon {
  return SERVICE_ICONS[slug] ?? Sparkles;
}
