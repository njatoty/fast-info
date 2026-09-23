import { Camera } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/public/reveal";
import { getCategoryIcon } from "@/lib/icons";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { ProductCategory } from "@/types/domain";

export async function CategoryStrip({ categories }: { categories: ProductCategory[] }) {
  const dict = await getDictionary();
  const extraLinks = [
    { slug: "photographie", name: dict.home.categories.photography, icon: Camera, href: "/services" },
  ];

  return (
    <Reveal as="div" className="relative border-y border-border">
      <div className="scrollbar-none flex gap-3 overflow-x-auto px-4 py-5 sm:px-6 lg:justify-center lg:px-8">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.slug);
          return (
            <Link
              key={category.id}
              href={`/produits?categorie=${category.slug}`}
              className="group flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-background py-2 pr-4 pl-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-foreground"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-3.5" />
              </span>
              {category.name}
            </Link>
          );
        })}
        {extraLinks.map((link) => (
          <Link
            key={link.slug}
            href={link.href}
            className="group flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-background py-2 pr-4 pl-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-foreground"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <link.icon className="size-3.5" />
            </span>
            {link.name}
          </Link>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent sm:w-16"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent sm:w-16"
      />
    </Reveal>
  );
}
