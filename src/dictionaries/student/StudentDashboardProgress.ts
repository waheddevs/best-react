import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    select: "Practice testni tanlang",
    open: "Progressni ko‘rish",
    empty: "Birinchi testingizdan so‘ng progress shu yerda ko‘rinadi.",
    error: "Progressni yuklab bo‘lmadi.",
    retry: "Qayta urinish",
    pending: "Tekshirilmoqda",
    inProgress: "Davom etmoqda",
    notStarted: "Boshlanmagan",
    ready: "Natija tayyor",
    compared: "Oldingi practice bilan",
    answers: "ta javob",
    band: "band",
    latest: "Oxirgi faollik",
  },
  ru: {
    select: "Выберите пробный тест",
    open: "Открыть прогресс",
    empty: "Прогресс появится здесь после первого теста.",
    error: "Не удалось загрузить прогресс.",
    retry: "Повторить",
    pending: "На проверке",
    inProgress: "В процессе",
    notStarted: "Не начато",
    ready: "Результат готов",
    compared: "С предыдущей практикой",
    answers: "ответов",
    band: "балла",
    latest: "Последняя активность",
  },
  en: {
    select: "Select a practice test",
    open: "View progress",
    empty: "Your progress will appear here after your first test.",
    error: "Could not load your progress.",
    retry: "Try again",
    pending: "Under review",
    inProgress: "In progress",
    notStarted: "Not started",
    ready: "Result ready",
    compared: "Compared with previous practice",
    answers: "answers",
    band: "band",
    latest: "Latest activity",
  },
} as const;

export function getStudentDashboardProgressCopy(locale: Locale) {
  return copy[locale];
}
