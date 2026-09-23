"use client";

import { useState } from "react";

import { ImageLightbox } from "@/components/public/image-lightbox";
import { SmartImage } from "@/components/media/smart-image";
import type { MediaImage } from "@/types/domain";

export function ProductGallery({ images, name }: { images: MediaImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const current = images[active] ?? images[0];

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxIndex(active)}
        className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <SmartImage
          src={current?.url}
          alt={current?.alt ?? name}
          blurDataURL={current?.blurDataURL}
          aspectRatio={1}
          wrapperClassName="rounded-[8px]"
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
        />
      </button>

      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(index)}
              className={`overflow-hidden rounded-[8px] ring-2 transition-colors ${
                index === active ? "ring-primary" : "ring-transparent hover:ring-border"
              }`}
            >
              <SmartImage
                src={image.url}
                alt={image.alt}
                blurDataURL={image.blurDataURL}
                aspectRatio={1}
                wrapperClassName="rounded-[8px]"
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      ) : null}

      <ImageLightbox images={images} index={lightboxIndex} onIndexChange={setLightboxIndex} />
    </div>
  );
}
