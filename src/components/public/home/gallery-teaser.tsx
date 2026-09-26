import { Container } from "@/components/public/container";
import { GalleryGrid } from "@/components/public/gallery-grid";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { ViewAllLink } from "@/components/public/view-all-link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { GalleryItem } from "@/types/domain";

export async function GalleryTeaser({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;
  const dict = await getDictionary();

  return (
    <Section bleed edge="top" tone="muted">
      <Container size="wide">
        <SectionHeading
          eyebrow={dict.home.gallery.eyebrow}
          title={dict.home.gallery.title}
          description={dict.home.gallery.description}
          action={<ViewAllLink href="/galerie">{dict.home.gallery.cta}</ViewAllLink>}
          className="mb-10 px-4 sm:px-6 lg:px-8"
        />
      </Container>
      <Container size="wide">
        <GalleryGrid images={items.slice(0, 10).map((item) => item.image)} />
      </Container>
    </Section>
  );
}
