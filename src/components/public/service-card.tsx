import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SmartImage } from "@/components/media/smart-image";
import type { Service } from "@/types/domain";

// Bottom-left corner sliced off at 45° — the same cut on the image and its
// accent block behind it is what makes the yellow peek through as a notch
// instead of just a drop-shadow offset.
const CARD_CLIP = "[clip-path:polygon(0_0,100%_0,100%_100%,28px_100%,0_calc(100%-28px))]";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div className="relative">
        <div
          aria-hidden
          className={`absolute inset-0 translate-x-2 translate-y-2 bg-surface-yellow transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:translate-y-3 ${CARD_CLIP}`}
        />
        <SmartImage
          src={service.coverImage?.url}
          alt={service.coverImage?.alt ?? service.title}
          blurDataURL={service.coverImage?.blurDataURL}
          aspectRatio={4 / 3}
          wrapperClassName={`relative ${CARD_CLIP}`}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.08]"
        />
        <span className="absolute bottom-0 left-0 flex size-10 -translate-x-1 translate-y-1 scale-75 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-md transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="mt-5">
        <h3 className="font-heading text-lg font-medium">{service.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{service.shortDescription}</p>
      </div>
    </Link>
  );
}
