import type { Locale } from "../types";
import { en, type Dictionary } from "./en";
import { bm } from "./bm";

const dictionaries: Record<Locale, Dictionary> = { en, bm };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
