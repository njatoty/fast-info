"use client";

import { cn } from "cn";
import { ImageOff } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { shimmerDataUrl } from "@/lib/media/blur";

interface SmartImageProps extends Omit<ImageProps, "src" | "alt" | "onError" | "placeholder"> {
  src?: string | null;
  alt: string;
  aspectRatio?: number;
  wrapperClassName?: string;
  blurDataURL?: string;
}

export function SmartImage({
  src,
  alt,
  aspectRatio,
  className,
  wrapperClassName,
  fill = true,
  sizes = "100vw",
  blurDataURL,
  style,
  ...props
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-muted", wrapperClassName)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {showFallback ? (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
          <ImageOff className="size-8" strokeWidth={1.25} aria-hidden />
          <span className="sr-only">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          onError={() => setErrored(true)}
          placeholder="blur"
          blurDataURL={blurDataURL ?? shimmerDataUrl()}
          className={cn("object-cover", className)}
          style={style}
          {...props}
        />
      )}
    </div>
  );
}
