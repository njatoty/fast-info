import type { MetadataRoute } from "next";

import { getEvents } from "@/lib/data/events";
import { getProducts } from "@/lib/data/products";
import { getServices } from "@/lib/data/services";
import { siteConfig } from "@/lib/site-config";

const STATIC_ROUTES = [
  "",
  "/produits",
  "/services",
  "/offres",
  "/galerie",
  "/evenements",
  "/a-propos",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, services, events] = await Promise.all([
    getProducts(),
    getServices(),
    getEvents(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/produits/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteConfig.url}/evenements/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...productEntries, ...serviceEntries, ...eventEntries];
}
