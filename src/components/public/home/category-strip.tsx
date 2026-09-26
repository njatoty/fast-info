import { Camera } from "lucide-react";
import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/public/motion/stagger";
import { getCategoryIcon } from "@/lib/icons";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { ProductCategory } from "@/types/domain";

const PILL_COLORS = ["text-surface-sky", "text-surface-yellow", "text-surface-orange", "text-surface-pink"];

// Left and right edges cut at the same slant so the fill reads as a
// parallelogram card instead of a rounded pill.
const ITEM_CLIP = "[clip-path:polygon(14px_0,100%_0,calc(100%_-_14px)_100%,0_100%)]";

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
    <Stagger className="relative bg-muted">
      <div className="scrollbar-none flex overflow-x-auto px-4 py-1 sm:px-6 lg:justify-center lg:px-8">
        {allLinks.map((link, index) => (
          <StaggerItem key={link.key} className={`shrink-0 ${index === 0 ? "" : "-ml-2.5"}`}>
            <Link
              href={link.href}
              className={`group relative flex items-center gap-2.5 bg-white py-2.5 pr-6 pl-5 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:z-10 hover:bg-surface-ink hover:text-surface-ink-foreground focus-visible:z-10 ${ITEM_CLIP}`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-surface-ink transition-transform duration-300 group-hover:scale-110 ${PILL_COLORS[index % PILL_COLORS.length]}`}
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
