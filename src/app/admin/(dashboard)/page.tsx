import { ExternalLink, Images, Package, PartyPopper, Tag, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAllEventsAdmin } from "@/lib/data/events";
import { getAllGalleryItemsAdmin } from "@/lib/data/gallery";
import { getActiveOffers, getAllOffersAdmin } from "@/lib/data/offers";
import { getAllProductsAdmin } from "@/lib/data/products";
import { getAllServicesAdmin } from "@/lib/data/services";
import { requireAdmin } from "@/lib/supabase/guard";

export const metadata: Metadata = {
  title: "Vue d'ensemble",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  const [products, services, offers, activeOffers, gallery, events] = await Promise.all([
    getAllProductsAdmin(),
    getAllServicesAdmin(),
    getAllOffersAdmin(),
    getActiveOffers(),
    getAllGalleryItemsAdmin(),
    getAllEventsAdmin(),
  ]);

  const stats = [
    { label: "Produits", value: products.length, href: "/admin/products", icon: Package },
    { label: "Services", value: services.length, href: "/admin/services", icon: Wrench },
    {
      label: "Offres actives",
      value: `${activeOffers.length} / ${offers.length}`,
      href: "/admin/offers",
      icon: Tag,
    },
    { label: "Photos galerie", value: gallery.length, href: "/admin/gallery", icon: Images },
    { label: "Événements", value: events.length, href: "/admin/events", icon: PartyPopper },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Bonjour{user.fullName ? `, ${user.fullName}` : ""}</h1>
          <p className="text-sm text-muted-foreground">Vue d&apos;ensemble du contenu FastInfo.</p>
        </div>
        <Button variant="outline" asChild className="gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer">
            Voir le site public
            <ExternalLink className="size-4" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="rounded-lg border border-border p-5 transition-colors hover:border-primary/40"
          >
            <stat.icon className="size-5 text-primary" strokeWidth={1.5} />
            <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
