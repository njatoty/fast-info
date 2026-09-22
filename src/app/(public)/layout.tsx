import type { ReactNode } from "react";

import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { WhatsAppFab } from "@/components/public/whatsapp-fab";
import { getSiteSettings } from "@/lib/data/settings";
import { siteConfig } from "@/lib/site-config";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.city,
    },
    sameAs: settings.socials.map((social) => social.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <SiteHeader settings={settings} />
      {/* [&>*:last-child]:flex-1 makes the page's own last section (whatever
          its tone) absorb any leftover viewport height on short pages,
          instead of leaving a blank body-background gap before the footer. */}
      <main className="flex flex-1 flex-col [&>*:last-child]:flex-1">{children}</main>
      <SiteFooter settings={settings} />
      <WhatsAppFab whatsapp={settings.whatsapp} />
    </>
  );
}
