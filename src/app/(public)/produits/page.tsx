import { cn } from "cn";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/public/container";
import { Eyebrow } from "@/components/public/eyebrow";
import { ProductCard } from "@/components/public/product-card";
import { Reveal } from "@/components/public/reveal";
import { getProductCategories, getProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Produits",
  description:
    "Téléphones, accessoires, écrans, stockage, audio et informatique — le catalogue FastInfo à Antananarivo.",
  alternates: { canonical: "/produits" },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const [categories, products] = await Promise.all([
    getProductCategories(),
    getProducts({ categorySlug: categorie }),
  ]);

  return (
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <Reveal>
          <Eyebrow>Catalogue</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            Nos produits
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Téléphones, accessoires, écrans, stockage et informatique — une sélection pensée pour
            durer.
          </p>
        </Reveal>

        <div className="scrollbar-none mt-8 flex gap-6 overflow-x-auto border-b border-border">
          <Link
            href="/produits"
            className={cn(
              "shrink-0 border-b-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors",
              !categorie
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            Tous
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/produits?categorie=${cat.slug}`}
              className={cn(
                "shrink-0 border-b-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors",
                categorie === cat.slug
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            Aucun produit dans cette catégorie pour le moment.
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
      </Container>
    </div>
  );
}
