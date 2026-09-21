import Link from "next/link";

import { ProductCard } from "@/components/public/product-card";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/domain";

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const [first, ...rest] = products;

  return (
    <Section>
      <SectionHeading
        eyebrow="Catalogue"
        title="Produits en vedette"
        description="Une sélection de téléphones, accessoires et équipements pensée pour l'usage quotidien."
        action={
          <Button variant="outline" asChild>
            <Link href="/produits">Voir tout le catalogue</Link>
          </Button>
        }
      />

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <ProductCard product={first} size="large" />
        </Reveal>
        <div className="grid grid-cols-2 gap-6 lg:gap-8">
          {rest.slice(0, 4).map((product, index) => (
            <Reveal key={product.id} delay={(index + 1) * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
