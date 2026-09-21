import type { Metadata } from "next";

import { ProductsTable } from "@/components/admin/products-table";
import { getAllProductsAdmin } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Produits",
  robots: { index: false, follow: false },
};

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Produits</h1>
        <p className="text-sm text-muted-foreground">Gérez le catalogue de produits FastInfo.</p>
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
