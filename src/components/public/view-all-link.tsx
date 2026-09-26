import { cn } from "cn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function ViewAllLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}
