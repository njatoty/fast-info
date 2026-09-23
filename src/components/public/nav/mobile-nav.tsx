"use client";

import { Accordion } from "radix-ui";
import { ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/public/language-switcher";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { t } from "@/lib/i18n/locales";
import { getCategoryIcon, getServiceIcon } from "@/lib/icons";
import type { ProductCategory, Service, SiteSettings } from "@/types/domain";

const LINK_CLASS = "rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted";

function AccordionSection({
  value,
  trigger,
  viewAllHref,
  viewAllLabel,
  children,
}: {
  value: string;
  trigger: string;
  viewAllHref: string;
  viewAllLabel: string;
  children: ReactNode;
}) {
  return (
    <Accordion.Item value={value} className="border-b border-border/60">
      <Accordion.Trigger className="group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted">
        {trigger}
        <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none group-data-open:rotate-180" />
      </Accordion.Trigger>
      <Accordion.Content className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none">
        <div className="flex flex-col gap-0.5 py-1 pl-3">
          {children}
          <SheetClose asChild>
            <Link href={viewAllHref} className="rounded-md px-3 py-2 text-sm font-medium text-primary">
              {viewAllLabel}
            </Link>
          </SheetClose>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export function MobileNav({
  settings,
  categories,
  services,
  dict,
}: {
  settings: SiteSettings;
  categories: ProductCategory[];
  services: Service[];
  dict: Dictionary;
}) {
  const simpleLinks = [
    { href: "/offres", label: dict.nav.offers },
    { href: "/galerie", label: dict.nav.gallery },
    { href: "/evenements", label: dict.nav.events },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <nav className="flex flex-col gap-1 p-4">
        <SheetClose asChild>
          <Link href="/" className={LINK_CLASS}>
            {dict.nav.home}
          </Link>
        </SheetClose>

        <Accordion.Root type="multiple">
          <AccordionSection
            value="products"
            trigger={dict.nav.products}
            viewAllHref="/produits"
            viewAllLabel={dict.nav.megaMenu.products.viewAll}
          >
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.slug);
              return (
                <SheetClose asChild key={category.id}>
                  <Link
                    href={`/produits?categorie=${category.slug}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4 shrink-0" />
                    {category.name}
                  </Link>
                </SheetClose>
              );
            })}
          </AccordionSection>

          <AccordionSection
            value="services"
            trigger={dict.nav.services}
            viewAllHref="/services"
            viewAllLabel={dict.nav.megaMenu.services.viewAll}
          >
            {services.map((service) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <SheetClose asChild key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4 shrink-0" />
                    {service.title}
                  </Link>
                </SheetClose>
              );
            })}
          </AccordionSection>
        </Accordion.Root>

        {simpleLinks.map((link) => (
          <SheetClose asChild key={link.href}>
            <Link href={link.href} className={LINK_CLASS}>
              {link.label}
            </Link>
          </SheetClose>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
        <LanguageSwitcher className="self-start sm:hidden" />
        <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
          <Button variant="cta" className="w-full gap-2 rounded-[8px]">
            <Phone className="size-4" />
            {t(dict.common.callBrandTemplate, { brand: "FastInfo" })}
          </Button>
        </a>
      </div>
    </div>
  );
}
