"use client";

import { cn } from "cn";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { useCallback, useEffect, useRef, useState } from "react";

import { useDictionary } from "@/components/providers/locale-provider";
import { LanguageSwitcher } from "@/components/public/language-switcher";
import { MegaMenuProducts } from "@/components/public/nav/mega-menu-products";
import { MegaMenuServices } from "@/components/public/nav/mega-menu-services";
import { MobileNav } from "@/components/public/nav/mobile-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Product, ProductCategory, Service, SiteSettings } from "@/types/domain";

// Shared so every trigger/link in the bar lines up pixel-for-pixel.
const ITEM_CLASS =
  "group relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 data-active:bg-secondary data-active:text-foreground data-open:bg-secondary data-open:text-foreground";

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild active={active}>
        <Link href={href} className={ITEM_CLASS}>
          {label}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

// Radix's NavigationMenu.Content is a plain block box, so without this it
// stretches to its containing block's width instead of shrinking to fit —
// which then feeds a wrong (too wide) size into the shared Viewport's
// width transition for every panel, not just this one.
const MENU_CONTENT_CLASS = "inline-block outline-none";

function GalleryMenuLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={href}
        className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 text-surface-ink transition-colors hover:bg-black/5"
      >
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-surface-ink/60">{description}</span>
      </Link>
    </NavigationMenu.Link>
  );
}

interface SiteHeaderProps {
  settings: SiteSettings;
  categories: ProductCategory[];
  featuredProduct: Product | null;
  services: Service[];
  featuredService: Service | null;
}

export function SiteHeader({
  settings,
  categories,
  featuredProduct,
  services,
  featuredService,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const dict: Dictionary = useDictionary();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Each mega menu shares one panel/Viewport (so its size can collapse
  // fluidly between items instead of popping), but that means the panel
  // must be manually slid under whichever trigger is actually open —
  // otherwise it stays pinned at the start of the nav for every item.
  const [panelOffset, setPanelOffset] = useState(0);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  const setProductsTrigger = useCallback((el: HTMLButtonElement | null) => {
    if (el) triggerRefs.current.set("products", el);
    else triggerRefs.current.delete("products");
  }, []);
  const setServicesTrigger = useCallback((el: HTMLButtonElement | null) => {
    if (el) triggerRefs.current.set("services", el);
    else triggerRefs.current.delete("services");
  }, []);
  const setGalleryTrigger = useCallback((el: HTMLButtonElement | null) => {
    if (el) triggerRefs.current.set("gallery", el);
    else triggerRefs.current.delete("gallery");
  }, []);

  function handleMenuValueChange(value: string) {
    const trigger = value ? triggerRefs.current.get(value) : undefined;
    if (trigger) setPanelOffset(trigger.offsetLeft);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on route change (e.g. a link inside it was
  // clicked), following React's "adjust state during render" pattern rather
  // than an effect, so it never lingers open over the new page.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const galleryActive = isActive("/galerie") || isActive("/evenements");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow,color] duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/85 text-foreground shadow-sm backdrop-blur-md"
          : // `dark` re-scopes every semantic token used by nav links, the
            // language switcher, etc. below to their dark-surface values —
            // same mechanic as Section's tone="blue" — so this only needs
            // to set the header's own paint plus the inherited text color.
            "dark border-b border-transparent bg-surface-blue text-surface-blue-foreground",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <Image
            src="/brand/logo-mark-160.png"
            alt=""
            width={160}
            height={114}
            priority
            className="h-9 w-auto transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-105"
          />
          <span className="font-heading text-xl font-semibold tracking-tight transition-colors duration-300">
            Fast<span className="text-primary">Info</span>
          </span>
        </Link>

        <NavigationMenu.Root
          className="relative hidden lg:block"
          delayDuration={150}
          skipDelayDuration={300}
          onValueChange={handleMenuValueChange}
        >
          <NavigationMenu.List className="flex items-center gap-1">
            <NavLink href="/" label={dict.nav.home} active={isActive("/")} />

            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger
                ref={setProductsTrigger}
                className={ITEM_CLASS}
                data-active={isActive("/produits")}
              >
                {dict.nav.products}
                <ChevronDown className="size-3.5 transition-transform duration-200 motion-reduce:transition-none group-data-open:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={MENU_CONTENT_CLASS}>
                <MegaMenuProducts categories={categories} featuredProduct={featuredProduct} dict={dict} />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item value="services">
              <NavigationMenu.Trigger
                ref={setServicesTrigger}
                className={ITEM_CLASS}
                data-active={isActive("/services")}
              >
                {dict.nav.services}
                <ChevronDown className="size-3.5 transition-transform duration-200 motion-reduce:transition-none group-data-open:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={MENU_CONTENT_CLASS}>
                <MegaMenuServices services={services} featuredService={featuredService} dict={dict} />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavLink href="/offres" label={dict.nav.offers} active={isActive("/offres")} />

            <NavigationMenu.Item value="gallery">
              <NavigationMenu.Trigger
                ref={setGalleryTrigger}
                className={ITEM_CLASS}
                data-active={galleryActive}
              >
                {dict.nav.gallery}
                <ChevronDown className="size-3.5 transition-transform duration-200 motion-reduce:transition-none group-data-open:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={MENU_CONTENT_CLASS}>
                <div className="w-72 p-2">
                  <GalleryMenuLink href="/galerie" title={dict.nav.gallery} description={dict.gallery.description} />
                  <GalleryMenuLink
                    href="/evenements"
                    title={dict.nav.events}
                    description={dict.events.list.description}
                  />
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavLink href="/a-propos" label={dict.nav.about} active={isActive("/a-propos")} />
            <NavLink href="/contact" label={dict.nav.contact} active={isActive("/contact")} />
          </NavigationMenu.List>

          {/* Positioned under whichever trigger is open (no transition on
              left: it must snap instantly, otherwise the very first open of
              the day would visibly slide over from a stale 0 offset) so the
              panel below only ever needs to animate its own collapse. */}
          <div className="absolute top-full flex justify-start pt-2" style={{ left: panelOffset }}>
            <NavigationMenu.Viewport
              className={cn(
                "relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width)",
                // Fixed, not bg-popover/text-popover-foreground: this panel
                // must stay a light card even while the header above it is
                // in its `.dark`-scoped blue (unscrolled) state.
                "origin-top overflow-hidden rounded-2xl border border-black/10 bg-white text-surface-ink shadow-xl ring-1 ring-black/5",
                "transition-[width,height,opacity] duration-250 ease-out motion-reduce:transition-none",
                "data-open:animate-in data-open:fade-in-0",
                "data-closed:animate-out data-closed:fade-out-0",
                "motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none",
              )}
            />
          </div>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${settings.phone.replace(/\s+/g, "")}`}
            className="hidden items-center gap-2 text-sm font-medium sm:flex"
          >
            <Button variant="sky" size="sm" className="gap-2 rounded-full">
              <Phone className="size-3.5" />
              {dict.common.call}
            </Button>
          </a>
          <LanguageSwitcher className="hidden sm:flex" />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full lg:hidden"
                aria-label={dict.common.openMenu}
                aria-expanded={mobileOpen}
              >
                <Menu
                  className={cn(
                    "size-5 transition-all duration-200 motion-reduce:transition-none",
                    mobileOpen ? "scale-0 -rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100",
                  )}
                />
                <X
                  className={cn(
                    "absolute size-5 transition-all duration-200 motion-reduce:transition-none",
                    mobileOpen ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-45 opacity-0",
                  )}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[300px] flex-col">
              <SheetTitle className="flex items-center gap-2 px-4 pt-4">
                <Image src="/brand/logo-mark-160.png" alt="" width={160} height={114} className="h-8 w-auto" />
                <span className="font-heading text-lg font-semibold">
                  Fast<span className="text-primary">Info</span>
                </span>
              </SheetTitle>
              <MobileNav settings={settings} categories={categories} services={services} dict={dict} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
