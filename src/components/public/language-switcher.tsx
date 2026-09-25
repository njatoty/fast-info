"use client";

import { cn } from "cn";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { useDictionary, useLocale } from "@/components/providers/locale-provider";
import { locales, setLocaleCookie } from "@/lib/i18n/locales";

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
    <div
      role="group"
      aria-label={dict.language.toggleLabel}
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-border p-0.5 text-xs font-medium",
        className,
      )}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-2 py-1 uppercase transition-colors",
            locale === code
              ? "bg-primary text-primary-foreground"
              : // dark:text-surface-blue-muted: see ITEM_CLASS in site-header.tsx —
                // same fix, this renders inside the header's blue scope too.
                "text-muted-foreground hover:text-foreground dark:text-surface-blue-muted",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
