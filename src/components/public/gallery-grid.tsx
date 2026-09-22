"use client";

import { useState } from "react";

import { ImageLightbox } from "@/components/public/image-lightbox";
import { SmartImage } from "@/components/media/smart-image";
import { useDictionary } from "@/components/providers/locale-provider";
import type { MediaImage } from "@/types/domain";

export function GalleryGrid({ images }: { images: MediaImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dict = useDictionary();

  if (images.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">{dict.gallery.empty}</p>
    );
  }

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group mb-4 block w-full break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <SmartImage
              src={image.url}
              alt={image.alt}
              blurDataURL={image.blurDataURL}
              aspectRatio={image.width / image.height}
              wrapperClassName="rounded-md"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <ImageLightbox images={images} index={activeIndex} onIndexChange={setActiveIndex} />
    </>
  );
}
