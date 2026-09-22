import type { Metadata } from "next";

import { CategoryStrip } from "@/components/public/home/category-strip";
import { ContactBand } from "@/components/public/home/contact-band";
import { FeaturedProducts } from "@/components/public/home/featured-products";
import { GalleryTeaser } from "@/components/public/home/gallery-teaser";
import { Hero } from "@/components/public/home/hero";
import { LocationStrip } from "@/components/public/home/location-strip";
import { OffersBand } from "@/components/public/home/offers-band";
import { RecentEvents } from "@/components/public/home/recent-events";
import { ServiceRows } from "@/components/public/home/service-rows";
import { getGalleryItems } from "@/lib/data/gallery";
import { getEvents } from "@/lib/data/events";
import { getActiveOffers } from "@/lib/data/offers";
import { getFeaturedProducts, getProductCategories } from "@/lib/data/products";
import { getFeaturedServices } from "@/lib/data/services";
import { getSiteSettings } from "@/lib/data/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.home.title,
    description: siteConfig.description,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [settings, categories, featuredProducts, services, offers, galleryItems, events] =
    await Promise.all([
      getSiteSettings(),
      getProductCategories(),
      getFeaturedProducts(5),
      getFeaturedServices(5),
      getActiveOffers(),
      getGalleryItems(),
      getEvents(4),
    ]);

  return (
    <>
      <Hero settings={settings} />
      <CategoryStrip categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <ServiceRows services={services} />
      <OffersBand offers={offers} />
      <GalleryTeaser items={galleryItems} />
      <RecentEvents events={events} />
      <LocationStrip settings={settings} />
      <ContactBand settings={settings} />
    </>
  );
}
