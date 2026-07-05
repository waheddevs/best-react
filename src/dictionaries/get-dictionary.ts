import "server-only";

import type { Locale } from "@/config/locales";
import { enDictionary } from "@/dictionaries/en";
import { ruDictionary } from "@/dictionaries/ru";
import type { Dictionary } from "@/dictionaries/types";
import { uzDictionary } from "@/dictionaries/uz";

const dictionaries: Record<Locale, Dictionary> = {
  uz: uzDictionary,
  ru: ruDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
