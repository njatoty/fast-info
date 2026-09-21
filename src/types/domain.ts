import type { AvailabilityStatus } from "@/types/database";

export interface MediaImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  position: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  position: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ProductCategory | null;
  price: number;
  promoPrice: number | null;
  availability: AvailabilityStatus;
  isFeatured: boolean;
  isPublished: boolean;
  mainImage: MediaImage;
  images: MediaImage[];
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage: MediaImage;
  gallery: MediaImage[];
  isFeatured: boolean;
  isPublished: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: MediaImage | null;
  originalPrice: number | null;
  promoPrice: number | null;
  startsAt: string | null;
  endsAt: string | null;
  isActive: boolean;
}

export interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  position: number;
}

export interface GalleryItem {
  id: string;
  image: MediaImage;
  category: GalleryCategory | null;
  caption: string | null;
  position: number;
  isPublished: boolean;
}

export interface EventProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  endDate: string | null;
  location: string;
  description: string;
  coverImage: MediaImage;
  gallery: MediaImage[];
  isPublished: boolean;
}

export interface OpeningHour {
  day: string;
  hours: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string | null;
  address: string;
  city: string;
  openingHours: OpeningHour[];
  socials: SocialLink[];
  heroTitle: string;
  heroSubtitle: string;
  mapUrl: string | null;
}
