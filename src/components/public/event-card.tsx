import { MapPin } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/media/smart-image";
import { getLocale } from "@/lib/i18n/get-locale";
import { formatDateRange } from "@/lib/utils/format";
import type { EventProject } from "@/types/domain";

export async function EventCard({ event }: { event: EventProject }) {
  const locale = await getLocale();

  return (
    <Link href={`/evenements/${event.slug}`} className="group block">
      <SmartImage
        src={event.coverImage?.url}
        alt={event.coverImage?.alt ?? event.title}
        blurDataURL={event.coverImage?.blurDataURL}
        aspectRatio={4 / 5}
        wrapperClassName="rounded-2xl"
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="mt-3.5">
        <Badge variant="secondary" className="rounded-full font-normal">
          {event.category}
        </Badge>
        <h3 className="mt-2 font-heading text-lg font-medium">{event.title}</h3>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDateRange(event.date, event.endDate, locale)}</span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {event.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
