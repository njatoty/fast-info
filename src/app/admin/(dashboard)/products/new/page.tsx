import type { Metadata } from "next";

import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/lib/actions/products";
import { getProductCategories } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Nouveau produit",
  robots: { index: false, follow: false },
};

export default async function NewProductPage() {
  const categories = await getProductCategories();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Nouveau produit</h1>
        <p className="text-sm text-muted-foreground">Ajoutez un produit au catalogue.</p>
      </div>
      <ProductForm categories={categories} onSubmit={createProduct} />
    </div>
  );
}
