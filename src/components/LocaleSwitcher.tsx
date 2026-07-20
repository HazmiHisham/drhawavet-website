"use client";

import { LOCALES, type Locale } from "@/i18n/types";
import { useI18n } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-white/70 p-0.5 text-xs font-semibold shadow-sm backdrop-blur-sm dark:bg-slate-900/70",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code as Locale)}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            locale === code
              ? "bg-pink-400 text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
