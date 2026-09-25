"use client";

import { cn } from "cn";
import { motion } from "motion/react";
import type { ReactNode } from "react";

export function AnimatedUnderline({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={cn("title-underline inline", className)}
      initial={{ backgroundSize: "0% 3px" }}
      whileInView={{ backgroundSize: "100% 3px" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 + delay / 1000 }}
    >
      {children}
    </motion.span>
  );
}
