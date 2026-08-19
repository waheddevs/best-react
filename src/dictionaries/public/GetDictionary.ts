import "server-only";

import type { Locale } from "@/config/Locales";
import { enDictionary } from "@/dictionaries/public/En";
import { ruDictionary } from "@/dictionaries/public/Ru";
import type { Dictionary } from "@/dictionaries/public/Types";
import { uzDictionary } from "@/dictionaries/public/Uz";

const dictionaries: Record<Locale, Dictionary> = {
  uz: uzDictionary,
  ru: ruDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
