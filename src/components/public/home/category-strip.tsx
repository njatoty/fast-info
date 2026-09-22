import {
  Cable,
  Camera,
  Headphones,
  Laptop,
  Smartphone,
  SmartphoneCharging,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/public/reveal";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { ProductCategory } from "@/types/domain";

const ICONS: Record<string, LucideIcon> = {
  telephones: Smartphone,
  "accessoires-telephone": SmartphoneCharging,
  "ecrans-reparation": Wrench,
  "stockage-cables": Cable,
  audio: Headphones,
  informatique: Laptop,
};

export async function CategoryStrip({ categories }: { categories: ProductCategory[] }) {
  const dict = await getDictionary();
  const extraLinks = [
    { slug: "photographie", name: dict.home.categories.photography, icon: Camera, href: "/services" },
  ];

  return (
    <Reveal as="div" className="border-y border-border">
      <div className="scrollbar-none flex gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:justify-center lg:px-8">
        {categories.map((category) => {
          const Icon = ICONS[category.slug] ?? Smartphone;
          return (
            <Link
              key={category.id}
              href={`/produits?categorie=${category.slug}`}
              className="flex shrink-0 items-center gap-2 border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Icon className="size-4" />
              {category.name}
            </Link>
          );
        })}
        {extraLinks.map((link) => (
          <Link
            key={link.slug}
            href={link.href}
            className="flex shrink-0 items-center gap-2 border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <link.icon className="size-4" />
            {link.name}
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
