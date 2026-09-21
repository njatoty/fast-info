"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { MediaImage } from "@/types/domain";

interface ImageLightboxProps {
  images: MediaImage[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

export function ImageLightbox({ images, index, onIndexChange }: ImageLightboxProps) {
  const open = index !== null;
  const current = index !== null ? images[index] : null;

  const goTo = useCallback(
    (delta: number) => {
      if (index === null) return;
      const next = (index + delta + images.length) % images.length;
      onIndexChange(next);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goTo]);

  useEffect(() => {
    if (index === null) return;
    [1, -1].forEach((delta) => {
      const neighbour = images[(index + delta + images.length) % images.length];
      if (neighbour) {
        const preload = new window.Image();
        preload.src = neighbour.url;
      }
    });
  }, [index, images]);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[92vh] w-[96vw] max-w-6xl flex-col items-center justify-center border-none bg-transparent p-0 shadow-none sm:max-w-6xl"
      >
        <DialogTitle className="sr-only">{current?.alt ?? "Galerie photo"}</DialogTitle>
        {current ? (
          <div className="relative flex size-full items-center justify-center">
            <Image
              src={current.url}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="96vw"
              className="h-auto max-h-[85vh] w-auto max-w-[92vw] object-contain"
              priority
            />

            <button
              type="button"
              onClick={() => onIndexChange(null)}
              aria-label="Fermer"
              className="absolute top-2 right-2 flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <X className="size-5" />
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Image précédente"
                  className="absolute top-1/2 left-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Image suivante"
                  className="absolute top-1/2 right-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                  <ChevronRight className="size-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  {index! + 1} / {images.length}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
