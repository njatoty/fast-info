"use client";

import { cn } from "cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

import { SmartImage } from "@/components/media/smart-image";
import type { MediaImage } from "@/types/domain";

interface HeroCarouselProps {
  images: MediaImage[];
  className?: string;
}

export function HeroCarousel({ images, className }: HeroCarouselProps) {
  // Lazy useState init (not useRef) so the plugin instance is still created
  // exactly once, without reading a ref's `.current` during render.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28 }, [autoplay]);
  // Starts accurate at 0 (no custom startIndex), so the effect only needs to
  // subscribe going forward — no synchronous setState on mount.
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length === 0) return null;

  return (
    <div className={cn("group/carousel relative", className)}>
      <div className="overflow-hidden rounded-[1.25rem]" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={image.id} className="relative min-w-0 flex-[0_0_100%]">
              <SmartImage
                src={image.url}
                alt={image.alt}
                blurDataURL={image.blurDataURL}
                aspectRatio={5 / 4}
                sizes="(min-width: 1024px) 50vw, 100vw"
                wrapperClassName="rounded-[1.25rem] shadow-xl"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Image précédente"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-surface-ink opacity-0 shadow-md transition-opacity duration-200 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-surface-ink opacity-0 shadow-md transition-opacity duration-200 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="size-4" />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            <AnimatePresence initial={false}>
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  aria-label={`Aller à l'image ${index + 1}`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="relative flex h-3 items-center"
                >
                  <motion.span
                    layout
                    className={cn(
                      "block h-1.5 rounded-full",
                      index === selected ? "bg-white" : "bg-white/50",
                    )}
                    animate={{ width: index === selected ? 18 : 6 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </button>
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : null}
    </div>
  );
}
