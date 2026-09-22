import Link from "next/link";

import { ProductCard } from "@/components/public/product-card";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Product } from "@/types/domain";

export async function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const [first, ...rest] = products;
  const dict = await getDictionary();

  return (
    <Section>
      <SectionHeading
        eyebrow={dict.home.featuredProducts.eyebrow}
        title={dict.home.featuredProducts.title}
        description={dict.home.featuredProducts.description}
        action={
          <Button variant="outline" asChild className="rounded-none">
            <Link href="/produits">{dict.home.featuredProducts.cta}</Link>
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
