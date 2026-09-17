import type { Locale } from "@/config/Locales";
import type { Language } from "@/gql/graphql";

const languageByLocale: Record<Locale, Language> = { en: "EN", ru: "RU", uz: "UZ" };

export function getApiLanguage(locale: Locale): Language {
  return languageByLocale[locale];
}
