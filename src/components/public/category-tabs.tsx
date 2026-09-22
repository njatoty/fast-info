import { cn } from "cn";
import Link from "next/link";
import type { ReactNode } from "react";

interface CategoryTabsProps {
  basePath: string;
  activeSlug?: string;
  allLabel: string;
  categories: { id: string; slug: string; name: string }[];
  className?: string;
}

export function CategoryTabs({
  basePath,
  activeSlug,
  allLabel,
  categories,
  className,
}: CategoryTabsProps) {
  return (
    <div className={cn("scrollbar-none flex gap-2 overflow-x-auto", className)}>
      <CategoryTab href={basePath} active={!activeSlug}>
        {allLabel}
      </CategoryTab>
      {categories.map((cat) => (
        <CategoryTab
          key={cat.id}
          href={`${basePath}?categorie=${cat.slug}`}
          active={activeSlug === cat.slug}
        >
          {cat.name}
        </CategoryTab>
      ))}
    </div>
  );
}

function CategoryTab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "border-surface-yellow bg-surface-yellow text-surface-yellow-foreground"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
