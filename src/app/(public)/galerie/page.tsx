import type { Metadata } from "next";

import { CategoryTabs } from "@/components/public/category-tabs";
import { Container } from "@/components/public/container";
import { GalleryGrid } from "@/components/public/gallery-grid";
import { PageHeader } from "@/components/public/page-header";
import { Section } from "@/components/public/section";
import { getGalleryCategories } from "@/lib/data/categories";
import { getGalleryItems } from "@/lib/data/gallery";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.gallery.title,
    description: dict.meta.gallery.description,
    alternates: { canonical: "/galerie" },
  };
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const [categories, items, dict] = await Promise.all([
    getGalleryCategories(),
    getGalleryItems({ categorySlug: categorie }),
    getDictionary(),
  ]);

  return (
    <>
      <PageHeader eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} description={dict.gallery.description} />
      <Section bleed edge="top">
        <Container size="wide">
          <CategoryTabs
            basePath="/galerie"
            activeSlug={categorie}
            allLabel={dict.gallery.all}
            categories={categories}
            className="border-b border-border pb-px"
          />
          <div className="mt-8">
            <GalleryGrid images={items.map((item) => item.image)} />
          </div>
        </Container>
      </Section>
    </>
  );
}
