import type { Metadata } from "next";

import { CategoryTabs } from "@/components/public/category-tabs";
import { PageHeader } from "@/components/public/page-header";
import { ProductCard } from "@/components/public/product-card";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { getProductCategories, getProducts } from "@/lib/data/products";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.products.title,
    description: dict.meta.products.description,
    alternates: { canonical: "/produits" },
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const [categories, products, dict] = await Promise.all([
    getProductCategories(),
    getProducts({ categorySlug: categorie }),
    getDictionary(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={dict.products.list.eyebrow}
        title={dict.products.list.title}
        description={dict.products.list.description}
      />
      <Section edge="top">
        <CategoryTabs
          basePath="/produits"
          activeSlug={categorie}
          allLabel={dict.products.list.all}
          categories={categories}
          className="border-b border-border pb-px"
        />

        {products.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            {dict.products.list.empty}
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
