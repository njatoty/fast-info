import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/public/container";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/social-icons";
import { Blob } from "@/components/public/motion/blob";
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
    <footer className="curve-top dark relative overflow-hidden bg-surface-blue text-surface-blue-foreground">
      <Blob color="sky" className="-top-20 -right-20 size-72 opacity-20" parallax={20} />
      <Container className="grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-surface-yellow p-6 text-surface-yellow-foreground lg:col-span-1">
          <Blob color="blue" className="-right-14 -bottom-16 size-28 opacity-90" />
          <Link href="/" className="relative flex items-center gap-2.5">
            <Image src="/brand/logo-mark-160.png" alt="" width={160} height={114} className="h-9 w-auto" />
            <span className="font-heading text-xl font-semibold tracking-tight">
              Fast<span className="text-surface-blue">Info</span>
            </span>
          </Link>
          <p className="relative mt-4 max-w-xs text-sm">{settings.heroSubtitle}</p>
          <div className="relative mt-5 flex gap-3">
            {settings.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform];
              if (!Icon) return null;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-surface-yellow-foreground/10 transition-colors hover:bg-surface-yellow-foreground/20"
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
          <ul className="mt-4 space-y-2.5 text-sm text-surface-blue-muted">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-surface-blue-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium tracking-wide">{dict.footer.company}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-surface-blue-muted">
            <li>
              <Link href="/a-propos" className="transition-colors hover:text-surface-blue-foreground">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-surface-blue-foreground">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium tracking-wide">{dict.footer.contact}</p>
          <ul className="mt-4 space-y-3 text-sm text-surface-blue-muted">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-surface-blue-foreground">
                {settings.phone}
              </a>
            </li>
            {settings.email ? (
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-surface-blue-foreground">
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

      <div className="relative border-t border-surface-blue-border py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-surface-blue-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} FastInfo. {dict.footer.rights}
          </p>
          <p>Antananarivo, Madagascar</p>
        </Container>
      </div>
    </footer>
  );
}
