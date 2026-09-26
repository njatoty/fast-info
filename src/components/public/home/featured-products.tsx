import { Blob } from "@/components/public/motion/blob";
import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { ProductCard } from "@/components/public/product-card";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { ViewAllLink } from "@/components/public/view-all-link";
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
        action={<ViewAllLink href="/produits">{dict.home.featuredProducts.cta}</ViewAllLink>}
      />

      <Stagger className="mt-10 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
        <StaggerItem className="relative">
          <Blob color="sky" className="-top-8 -left-8 size-40 sm:size-52" parallax={14} />
          <Blob color="yellow" className="-right-8 -bottom-8 size-28 sm:size-40" delay={100} parallax={-14} />
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
