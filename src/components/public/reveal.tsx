"use client";

import { cn } from "cn";
import type { ElementType, ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "reveal-visible", className)}
      style={{ "--reveal-delay": delay } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
