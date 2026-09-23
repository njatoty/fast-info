"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";

import { SmartImage } from "@/components/media/smart-image";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { getCategoryIcon } from "@/lib/icons";
import { formatCurrency } from "@/lib/utils/format";
import type { Product, ProductCategory } from "@/types/domain";

export function MegaMenuProducts({
  categories,
  featuredProduct,
  dict,
}: {
  categories: ProductCategory[];
  featuredProduct: Product | null;
  dict: Dictionary;
}) {
  const copy = dict.nav.megaMenu.products;

  return (
    <div className="grid w-[640px] grid-cols-[1fr_1.15fr]">
      <div className="p-6">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {copy.categoriesLabel}
        </p>
        <ul className="mt-3 flex flex-col gap-0.5">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.slug);
            return (
              <li key={category.id}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={`/produits?categorie=${category.slug}`}
                    className="group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm text-foreground/90 transition-colors hover:bg-accent"
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    {category.name}
                  </Link>
                </NavigationMenu.Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 border-t border-border pt-3">
          <NavigationMenu.Link asChild>
            <Link
              href="/produits"
              className="group flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-primary"
            >
              {copy.viewAll}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </NavigationMenu.Link>
        </div>
      </div>

      {featuredProduct ? (
        <div className="border-l border-border bg-muted/30 p-6">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {copy.featuredLabel}
          </p>
          <NavigationMenu.Link asChild>
            <Link href={`/produits/${featuredProduct.slug}`} className="group mt-3 block">
              <SmartImage
                src={featuredProduct.mainImage?.url}
                alt={featuredProduct.mainImage?.alt ?? featuredProduct.name}
                blurDataURL={featuredProduct.mainImage?.blurDataURL}
                aspectRatio={4 / 3}
                sizes="240px"
                wrapperClassName="rounded-[8px]"
                className="transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <p className="mt-3 font-heading text-base font-medium">{featuredProduct.name}</p>
              <p className="mt-1 text-sm text-primary">
                {formatCurrency(featuredProduct.promoPrice ?? featuredProduct.price)}
              </p>
            </Link>
          </NavigationMenu.Link>
        </div>
      ) : null}
    </div>
  );
}
