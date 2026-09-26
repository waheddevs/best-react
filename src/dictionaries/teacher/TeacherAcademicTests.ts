import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    draft: "Qoralama",
    minutes: "daqiqa",
    published: "Faol",
    questions: "savol",
    source: "Manba",
    year: "Yil",
  },
  ru: {
    draft: "Черновик",
    minutes: "минут",
    published: "Активен",
    questions: "вопросов",
    source: "Источник",
    year: "Год",
  },
  en: {
    draft: "Draft",
    minutes: "minutes",
    published: "Active",
    questions: "questions",
    source: "Source",
    year: "Year",
  },
} as const;

export function getTeacherAcademicTestsCopy(locale: Locale) {
  return copy[locale];
}
