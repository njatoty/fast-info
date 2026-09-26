"use client";

import { cn } from "cn";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useTransition } from "react";

import { useDictionary, useLocale } from "@/components/providers/locale-provider";
import { locales, setLocaleCookie } from "@/lib/i18n/locales";

// Windows' emoji font has no glyph for flag emoji (it falls back to showing
// the two bare letter tiles instead of a flag), so the flags are drawn as
// tiny inline SVGs instead — renders identically on every platform.
const FLAGS: Record<(typeof locales)[number], ReactNode> = {
  fr: (
    <svg viewBox="0 0 3 2" className="h-full w-full">
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  ),
  mg: (
    <svg viewBox="0 0 3 2" className="h-full w-full">
      <rect width="1" height="2" x="0" fill="#FFFFFF" />
      <rect width="2" height="1" x="1" y="0" fill="#FC3D32" />
      <rect width="2" height="1" x="1" y="1" fill="#007E3A" />
    </svg>
  ),
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const dict = useDictionary();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setLocale(next: (typeof locales)[number]) {
    if (next === locale || pending) return;
    setLocaleCookie(next);
    startTransition(() => router.refresh());
  }

  return (
    <div role="group" aria-label={dict.language.toggleLabel} className={cn("flex items-center", className)}>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          aria-label={dict.language[code]}
          title={dict.language[code]}
          className={cn(
            "flex size-9 items-center justify-center p-2 transition-colors hover:bg-secondary",
            locale === code ? "opacity-100" : "opacity-45 hover:opacity-100",
          )}
        >
          <span aria-hidden="true" className="h-full w-full overflow-hidden">
            {FLAGS[code]}
          </span>
        </button>
      ))}
    </div>
  );
}
