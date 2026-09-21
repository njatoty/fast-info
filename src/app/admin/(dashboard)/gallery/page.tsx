import type { Metadata } from "next";

import { GalleryAdminGrid } from "@/components/admin/gallery-admin-grid";
import { getGalleryCategories } from "@/lib/data/categories";
import { getAllGalleryItemsAdmin } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  robots: { index: false, follow: false },
};

export default async function AdminGalleryPage() {
  const [items, categories] = await Promise.all([getAllGalleryItemsAdmin(), getGalleryCategories()]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Galerie photo</h1>
        <p className="text-sm text-muted-foreground">
          Ajoutez et organisez les photos affichées dans la galerie publique.
        </p>
      </div>
      <GalleryAdminGrid items={items} categories={categories} />
    </div>
  );
}
