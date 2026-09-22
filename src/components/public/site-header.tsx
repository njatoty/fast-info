"use client";

import { cn } from "cn";
import { Menu, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/public/language-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/providers/theme-toggle";
import { useDictionary } from "@/components/providers/locale-provider";
import { t } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/types/domain";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const dict = useDictionary();
  const [scrolled, setScrolled] = useState(false);

  const NAV_LINKS = [
    { href: "/", label: dict.nav.home },
    { href: "/produits", label: dict.nav.products },
    { href: "/services", label: dict.nav.services },
    { href: "/offres", label: dict.nav.offers },
    { href: "/galerie", label: dict.nav.gallery },
    { href: "/evenements", label: dict.nav.events },
    { href: "/a-propos", label: dict.nav.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark-160.png"
            alt=""
            width={160}
            height={114}
            priority
            className="h-9 w-auto"
          />
          <span className="font-heading text-xl font-semibold tracking-tight">
            Fast<span className="text-primary">Info</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${settings.phone.replace(/\s+/g, "")}`}
            className="hidden items-center gap-2 text-sm font-medium sm:flex"
          >
            <Button size="sm" className="gap-2">
              <Phone className="size-3.5" />
              {dict.common.call}
            </Button>
          </a>
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={dict.common.openMenu}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle className="flex items-center gap-2 px-4 pt-4">
                <Image src="/brand/logo-mark-160.png" alt="" width={160} height={114} className="h-8 w-auto" />
                <span className="font-heading text-lg font-semibold">
                  Fast<span className="text-primary">Info</span>
                </span>
              </SheetTitle>
              <nav className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
                  >
                    {dict.nav.contact}
                  </Link>
                </SheetClose>
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <LanguageSwitcher className="self-start sm:hidden" />
                <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
                  <Button className="w-full gap-2">
                    <Phone className="size-4" />
                    {t(dict.common.callBrandTemplate, { brand: "FastInfo" })}
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
