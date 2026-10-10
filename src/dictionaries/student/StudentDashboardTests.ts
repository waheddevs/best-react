import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    open: "Ochish",
    all: "Barcha testlar",
    empty: "Barcha mavjud testlar topshirilgan. Yangi testlar shu yerda ko‘rinadi.",
    unavailable: "Hozircha testlar mavjud emas.",
    count: "Boshlash yoki davom ettirish mumkin bo‘lgan testlar",
    pagination: "Testlar sahifalari",
  },
  ru: {
    open: "Открыть",
    all: "Все тесты",
    empty: "Все доступные тесты отправлены. Новые тесты появятся здесь.",
    unavailable: "Пока нет доступных тестов.",
    count: "Тесты, которые можно начать или продолжить",
    pagination: "Страницы тестов",
  },
  en: {
    open: "Open",
    all: "All tests",
    empty: "All available tests have been submitted. New tests will appear here.",
    unavailable: "No tests are available yet.",
    count: "Tests available to start or continue",
    pagination: "Test pages",
  },
} as const;

export function getStudentDashboardTestsCopy(locale: Locale) {
  return copy[locale];
}
