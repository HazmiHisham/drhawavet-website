export type Locale = "en" | "bm";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "bm", label: "BM" },
];

export const LOCALE_STORAGE_KEY = "drhawavet-locale";
