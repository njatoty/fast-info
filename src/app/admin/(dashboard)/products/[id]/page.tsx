import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/product-form";
import { updateProduct } from "@/lib/actions/products";
import { getProductByIdAdmin, getProductCategories } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Modifier le produit",
  robots: { index: false, follow: false },
};

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductByIdAdmin(id), getProductCategories()]);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <p className="text-sm text-muted-foreground">Modifier le produit.</p>
      </div>
      <ProductForm
        product={product}
        categories={categories}
        onSubmit={(values, images) => updateProduct(product.id, values, images)}
      />
    </div>
  );
}
