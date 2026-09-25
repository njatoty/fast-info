import { Camera } from "lucide-react";
import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { getCategoryIcon } from "@/lib/icons";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { ProductCategory } from "@/types/domain";

const PILL_COLORS = ["bg-surface-sky", "bg-surface-yellow", "bg-surface-orange", "bg-surface-pink"];

export async function CategoryStrip({ categories }: { categories: ProductCategory[] }) {
  const dict = await getDictionary();
  const extraLinks = [
    { slug: "photographie", name: dict.home.categories.photography, icon: Camera, href: "/services" },
  ];
  const allLinks = [
    ...categories.map((category) => ({
      key: category.id,
      href: `/produits?categorie=${category.slug}`,
      name: category.name,
      icon: getCategoryIcon(category.slug),
    })),
    ...extraLinks.map((link) => ({ key: link.slug, href: link.href, name: link.name, icon: link.icon })),
  ];

  return (
    <Stagger className="relative border-y border-border">
      <div className="scrollbar-none flex gap-3 overflow-x-auto px-4 py-5 sm:px-6 lg:justify-center lg:px-8">
        {allLinks.map((link, index) => (
          <StaggerItem key={link.key} className="shrink-0">
            <Link
              href={link.href}
              className="group flex items-center gap-2.5 rounded-full border border-border bg-background py-2 pr-4 pl-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-foreground"
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-surface-ink transition-transform group-hover:scale-110 ${PILL_COLORS[index % PILL_COLORS.length]}`}
              >
                <link.icon className="size-3.5" />
              </span>
              {link.name}
            </Link>
          </StaggerItem>
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
    </Stagger>
  );
}
