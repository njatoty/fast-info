import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/public/container";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/social-icons";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { SiteSettings } from "@/types/domain";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

export async function SiteFooter({ settings }: { settings: SiteSettings }) {
  const dict = await getDictionary();

  const EXPLORE_LINKS = [
    { href: "/produits", label: dict.nav.products },
    { href: "/services", label: dict.nav.services },
    { href: "/offres", label: dict.nav.offers },
    { href: "/galerie", label: dict.nav.gallery },
    { href: "/evenements", label: dict.nav.events },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/brand/logo-mark-160.png" alt="" width={160} height={114} className="h-9 w-auto" />
            <span className="font-heading text-xl font-semibold tracking-tight">
              Fast<span className="text-primary">Info</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{settings.heroSubtitle}</p>
          <div className="mt-5 flex gap-3">
            {settings.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform];
              if (!Icon) return null;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label={social.platform}
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium tracking-wide">{dict.footer.explore}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium tracking-wide">{dict.footer.company}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link href="/a-propos" className="transition-colors hover:text-foreground">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-foreground">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium tracking-wide">{dict.footer.contact}</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
                {settings.phone}
              </a>
            </li>
            {settings.email ? (
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-foreground">
                  {settings.email}
                </a>
              </li>
            ) : null}
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {settings.address}, {settings.city}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} FastInfo. {dict.footer.rights}
          </p>
          <p>Antananarivo, Madagascar</p>
        </Container>
      </div>
    </footer>
  );
}
