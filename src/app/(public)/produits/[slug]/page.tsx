import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AvailabilityBadge } from "@/components/public/availability-badge";
import { Container } from "@/components/public/container";
import { InquiryActions } from "@/components/public/inquiry-actions";
import { ProductCard } from "@/components/public/product-card";
import { ProductGallery } from "@/components/public/product-gallery";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { getSiteSettings } from "@/lib/data/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { t } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/site-config";
import { formatCurrency } from "@/lib/utils/format";
import type { AvailabilityStatus } from "@/types/database";

const SCHEMA_AVAILABILITY: Record<AvailabilityStatus, string> = {
  in_stock: "https://schema.org/InStock",
  out_of_stock: "https://schema.org/OutOfStock",
  on_order: "https://schema.org/PreOrder",
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/produits/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.mainImage ? [{ url: product.mainImage.url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, settings, dict] = await Promise.all([
    getRelatedProducts(product),
    getSiteSettings(),
    getDictionary(),
  ]);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((image) => image.url),
    category: product.category?.name,
    offers: {
      "@type": "Offer",
      priceCurrency: "MGA",
      price: product.promoPrice ?? product.price,
      availability: SCHEMA_AVAILABILITY[product.availability],
      url: `${siteConfig.url}/produits/${product.slug}`,
    },
  };

  return (
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Container>
        <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/produits" className="hover:text-foreground">
            {dict.products.detail.breadcrumb}
          </Link>
          {product.category ? (
            <>
              <span>/</span>
              <Link
                href={`/produits?categorie=${product.category.slug}`}
                className="hover:text-foreground"
              >
                {product.category.name}
              </Link>
            </>
          ) : null}
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ProductGallery images={product.images} name={product.name} />
          </Reveal>

          <Reveal delay={100}>
            {product.category ? <Badge variant="secondary">{product.category.name}</Badge> : null}
            <h1 className="mt-3 font-heading text-[clamp(1.75rem,1.3rem+2vw,2.5rem)] leading-tight font-medium tracking-tight">
              {product.name}
            </h1>
            <AvailabilityBadge availability={product.availability} className="mt-3" />

            <div className="mt-5 flex items-baseline gap-3">
              {product.promoPrice ? (
                <>
                  <span className="text-2xl font-medium text-primary">
                    {formatCurrency(product.promoPrice)}
                  </span>
                  <span className="text-base text-muted-foreground line-through">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-medium">{formatCurrency(product.price)}</span>
              )}
            </div>

            <p className="mt-6 text-muted-foreground">{product.description}</p>

            <div className="mt-8">
              <InquiryActions
                phone={settings.phone}
                whatsapp={settings.whatsapp}
                message={t(dict.products.detail.inquiryMessageTemplate, { name: product.name })}
                contactHref={`/contact?sujet=${encodeURIComponent(product.name)}`}
              />
            </div>
          </Reveal>
        </div>
      </Container>

      {related.length > 0 ? (
        <Section>
          <SectionHeading
            eyebrow={dict.products.detail.relatedEyebrow}
            title={dict.products.detail.relatedTitle}
          />
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
