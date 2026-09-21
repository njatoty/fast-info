import Link from "next/link";

import { Container } from "@/components/public/container";
import { GalleryGrid } from "@/components/public/gallery-grid";
import { Section } from "@/components/public/section";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/types/domain";

export function GalleryTeaser({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;

  return (
    <Section bleed className="border-t border-border">
      <Container size="wide">
        <SectionHeading
          eyebrow="Photographie"
          title="Nos moments capturés"
          description="Mariages, anniversaires, événements d'entreprise — un aperçu de notre travail photographique."
          action={
            <Button variant="outline" asChild>
              <Link href="/galerie">Voir la galerie complète</Link>
            </Button>
          }
          className="mb-10 px-4 sm:px-6 lg:px-8"
        />
      </Container>
      <Container size="wide">
        <GalleryGrid images={items.slice(0, 10).map((item) => item.image)} />
      </Container>
    </Section>
  );
}
