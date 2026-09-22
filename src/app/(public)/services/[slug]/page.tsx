import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/public/container";
import { InquiryActions } from "@/components/public/inquiry-actions";
import { Reveal } from "@/components/public/reveal";
import { SmartImage } from "@/components/media/smart-image";
import { getServiceBySlug } from "@/lib/data/services";
import { getSiteSettings } from "@/lib/data/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { t } from "@/lib/i18n/locales";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      images: service.coverImage ? [{ url: service.coverImage.url }] : undefined,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [settings, dict] = await Promise.all([getSiteSettings(), getDictionary()]);

  return (
    <div className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container size="narrow">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/services" className="hover:text-foreground">
            {dict.services.detail.breadcrumb}
          </Link>
        </nav>

        <Reveal>
          <h1 className="font-heading text-[clamp(2rem,1.4rem+2.2vw,3rem)] leading-[1.05] font-semibold tracking-tight">
            {service.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{service.description}</p>
          <div className="mt-8">
            <InquiryActions
              phone={settings.phone}
              whatsapp={settings.whatsapp}
              message={t(dict.services.detail.inquiryMessageTemplate, { title: service.title })}
              contactHref={`/contact?sujet=${encodeURIComponent(service.title)}`}
            />
          </div>
        </Reveal>
      </Container>

      <Container className="mt-14">
        <div className="grid gap-6 sm:grid-cols-2">
          {service.gallery.map((image, index) => (
            <Reveal
              key={image.id}
              delay={index * 80}
              className={index === 0 ? "sm:col-span-2" : undefined}
            >
              <SmartImage
                src={image.url}
                alt={image.alt}
                blurDataURL={image.blurDataURL}
                aspectRatio={index === 0 ? 21 / 9 : 4 / 3}
                wrapperClassName="rounded-none"
                sizes={index === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
