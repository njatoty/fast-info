import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SmartImage } from "@/components/media/smart-image";
import type { Service } from "@/types/domain";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <SmartImage
        src={service.coverImage?.url}
        alt={service.coverImage?.alt ?? service.title}
        blurDataURL={service.coverImage?.blurDataURL}
        aspectRatio={4 / 3}
        wrapperClassName="rounded-[8px]"
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-heading text-lg font-medium">{service.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{service.shortDescription}</p>
        </div>
        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>
    </Link>
  );
}
