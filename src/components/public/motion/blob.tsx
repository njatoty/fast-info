"use client";

import { cn } from "cn";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const colorClass = {
  sky: "bg-surface-sky",
  blue: "bg-surface-blue",
  yellow: "bg-surface-yellow",
  orange: "bg-surface-orange",
  pink: "bg-surface-pink",
  ink: "bg-surface-ink",
} as const;

interface BlobProps {
  color: keyof typeof colorClass;
  /** Positioning + sizing utilities, e.g. "-right-24 -bottom-24 size-72". */
  className?: string;
  /** Vertical scroll-linked drift range in px (0 disables parallax). */
  parallax?: number;
  delay?: number;
}

/** Decorative flat-color disc. Parent sections clip it with `overflow-hidden`
 * so only an arc peeks past the edge — the Overpass "blob divider" look
 * without needing actual blob SVG paths. */
export function Blob({ color, className, parallax = 0, delay = 0 }: BlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", colorClass[color], className)}
      style={parallax ? { y } : undefined}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    />
  );
}
