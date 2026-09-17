import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    empty: "Yangi bildirishnoma yo‘q",
    loadError: "Bildirishnomalarni yuklab bo‘lmadi",
    retry: "Qayta urinish",
    settings: "Sozlamalar",
    taskLoadError: "Vazifalarni yuklab bo‘lmadi",
    taskKind: {
      FOLLOW_UP: "Bog‘lanish",
      PREPARATION: "Tayyorgarlik",
      ADMINISTRATIVE: "Ma’muriy vazifa",
    },
    dueAt: "Muddat",
    createdAt: "Yuborilgan",
    tryAgain: "Qayta urining",
  },
  ru: {
    empty: "Новых уведомлений нет",
    loadError: "Не удалось загрузить уведомления",
    retry: "Повторить",
    settings: "Настройки",
    taskLoadError: "Не удалось загрузить задачи",
    taskKind: {
      FOLLOW_UP: "Связаться",
      PREPARATION: "Подготовка",
      ADMINISTRATIVE: "Административная задача",
    },
    dueAt: "Срок",
    createdAt: "Отправлено",
    tryAgain: "Попробуйте ещё раз",
  },
  en: {
    empty: "No new notifications",
    loadError: "Could not load notifications",
    retry: "Retry",
    settings: "Settings",
    taskLoadError: "Could not load tasks",
    taskKind: {
      FOLLOW_UP: "Follow up",
      PREPARATION: "Preparation",
      ADMINISTRATIVE: "Administrative task",
    },
    dueAt: "Due",
    createdAt: "Sent",
    tryAgain: "Try again",
  },
} as const;

export function getTeacherNotificationsCopy(locale: Locale) {
  return copy[locale];
}
