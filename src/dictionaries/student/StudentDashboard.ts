import type { Locale } from "@/config/Locales";

const copy = {
  uz: { group: "Mening guruhim", progress: "Progress", tests: "Yangi testlar" },
  ru: { group: "Моя группа", progress: "Прогресс", tests: "Новые тесты" },
  en: { group: "My group", progress: "Progress", tests: "New tests" },
} as const;

export function getStudentDashboardCopy(locale: Locale) {
  return copy[locale];
}
