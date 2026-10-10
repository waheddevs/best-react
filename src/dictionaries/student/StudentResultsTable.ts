import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    title: "Natijalar",
    test: "Test",
    empty: "Hozircha test urinishlari yo'q.",
    notStarted: "Boshlanmagan",
    inProgress: "Davom etmoqda",
    pending: "Tekshirilmoqda",
    released: "Natija tayyor",
    open: "Natijani ko'rish",
  },
  ru: {
    title: "Результаты",
    test: "Тест",
    empty: "Попыток прохождения тестов пока нет.",
    notStarted: "Не начато",
    inProgress: "В процессе",
    pending: "На проверке",
    released: "Результат готов",
    open: "Посмотреть результат",
  },
  en: {
    title: "Results",
    test: "Test",
    empty: "There are no test attempts yet.",
    notStarted: "Not started",
    inProgress: "In progress",
    pending: "Under review",
    released: "Result ready",
    open: "View result",
  },
} as const;

export function getStudentResultsTableCopy(locale: Locale) {
  return copy[locale];
}
