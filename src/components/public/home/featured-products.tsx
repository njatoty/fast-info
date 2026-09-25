import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { ProductCard } from "@/components/public/product-card";
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
          <Button variant="outline" asChild className="rounded-full">
            <Link href="/produits">{dict.home.featuredProducts.cta}</Link>
          </Button>
        }
      />

      <Stagger className="mt-10 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
        <StaggerItem>
          <ProductCard product={first} size="large" />
        </StaggerItem>
        <div className="grid grid-cols-2 gap-6 lg:gap-8">
          {rest.slice(0, 4).map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </div>
      </Stagger>
    </Section>
  );
}
