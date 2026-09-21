import { cn } from "cn";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/public/container";
import { Eyebrow } from "@/components/public/eyebrow";
import { GalleryGrid } from "@/components/public/gallery-grid";
import { Reveal } from "@/components/public/reveal";
import { getGalleryCategories } from "@/lib/data/categories";
import { getGalleryItems } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Mariages, anniversaires, événements d'entreprise et portraits — la galerie photo FastInfo.",
  alternates: { canonical: "/galerie" },
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const [categories, items] = await Promise.all([
    getGalleryCategories(),
    getGalleryItems({ categorySlug: categorie }),
  ]);

  return (
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container size="wide">
        <Reveal className="px-4 sm:px-6 lg:px-8">
          <Eyebrow>Photographie</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.05] font-medium tracking-tight">
            Galerie
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Un aperçu de nos couvertures de mariages, anniversaires et événements d&apos;entreprise.
          </p>
        </Reveal>

        <div className="scrollbar-none mt-8 flex gap-6 overflow-x-auto border-b border-border px-4 sm:px-6 lg:px-8">
          <Link
            href="/galerie"
            className={cn(
              "shrink-0 border-b-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors",
              !categorie
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            Tout
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/galerie?categorie=${cat.slug}`}
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

        <div className="mt-4 px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={items.map((item) => item.image)} />
        </div>
      </Container>
    </div>
  );
}
