import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/public/container";
import { GalleryGrid } from "@/components/public/gallery-grid";
import { Reveal } from "@/components/public/reveal";
import { SmartImage } from "@/components/media/smart-image";
import { getEventBySlug } from "@/lib/data/events";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { formatDateRange } from "@/lib/utils/format";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `/evenements/${event.slug}` },
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.coverImage ? [{ url: event.coverImage.url }] : undefined,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <div className="pb-20 sm:pb-28">
      <div className="relative h-[45vh] min-h-80 w-full sm:h-[55vh]">
        <SmartImage
          src={event.coverImage?.url}
          alt={event.coverImage?.alt ?? event.title}
          blurDataURL={event.coverImage?.blurDataURL}
          wrapperClassName="absolute inset-0"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-8 text-white">
          <Badge variant="secondary" className="font-normal">
            {event.category}
          </Badge>
          <h1 className="mt-3 font-heading text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] leading-tight font-medium tracking-tight">
            {event.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span>{formatDateRange(event.date, event.endDate, locale)}</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              {event.location}
            </span>
          </div>
        </Container>
      </div>

      <Container className="mt-4">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/evenements" className="hover:text-foreground">
            {dict.events.detail.breadcrumb}
          </Link>
        </nav>

        <Reveal>
          <p className="max-w-2xl text-muted-foreground">{event.description}</p>
        </Reveal>

        <div className="mt-12">
          <GalleryGrid images={event.gallery} />
        </div>
      </Container>
    </div>
  );
}
