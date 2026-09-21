import type { Metadata } from "next";

import { CategoryManager } from "@/components/admin/category-manager";
import {
  createGalleryCategory,
  createProductCategory,
  deleteGalleryCategory,
  deleteProductCategory,
  updateGalleryCategory,
  updateProductCategory,
} from "@/lib/actions/categories";
import { getGalleryCategories } from "@/lib/data/categories";
import { getProductCategories } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Catégories",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const [productCategories, galleryCategories] = await Promise.all([
    getProductCategories(),
    getGalleryCategories(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Catégories</h1>
        <p className="text-sm text-muted-foreground">
          Organisez les catégories utilisées par le catalogue produits et la galerie photo.
        </p>
      </div>

      <CategoryManager
        title="Catégories de produits"
        description="Utilisées pour filtrer le catalogue."
        categories={productCategories}
        createAction={createProductCategory}
        updateAction={updateProductCategory}
        deleteAction={deleteProductCategory}
      />

      <CategoryManager
        title="Catégories de galerie"
        description="Utilisées pour filtrer les photos de la galerie."
        categories={galleryCategories}
        createAction={createGalleryCategory}
        updateAction={updateGalleryCategory}
        deleteAction={deleteGalleryCategory}
      />
    </div>
  );
}
