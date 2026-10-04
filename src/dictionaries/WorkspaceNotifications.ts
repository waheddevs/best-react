import type { Locale } from "@/config/Locales";
import type { WorkspaceNotice } from "@/types/WorkspaceNotification";

const copy = {
  en: {
    eyebrow: "Notification center",
    title: "Notifications",
    empty: "No notifications yet",
    error: "Notifications could not be loaded.",
    loading: "Loading notifications…",
    retry: "Retry",
    viewAll: "View all",
    markAll: "Mark all as read",
    all: "All",
    unread: "Unread",
    more: "Load more",
    preview: "Notifications are unavailable in preview mode.",
    reviewTitle: "Test review required",
    reviewBody: "A student submitted a Writing or Speaking test for your review.",
    debtTitle: "Overdue balance follow-up",
    debtBody:
      "A tuition charge became overdue. Check the current balance before contacting the student.",
  },
  ru: {
    eyebrow: "Центр уведомлений",
    title: "Уведомления",
    empty: "Уведомлений пока нет",
    error: "Не удалось загрузить уведомления.",
    loading: "Загрузка уведомлений…",
    retry: "Повторить",
    viewAll: "Посмотреть все",
    markAll: "Отметить все прочитанными",
    all: "Все",
    unread: "Непрочитанные",
    more: "Загрузить ещё",
    preview: "Уведомления недоступны в режиме просмотра.",
    reviewTitle: "Требуется проверка теста",
    reviewBody: "Ученик отправил тест Writing или Speaking на проверку.",
    debtTitle: "Просроченная задолженность",
    debtBody: "Срок оплаты прошёл. Проверьте текущий баланс перед связью с учеником.",
  },
  uz: {
    eyebrow: "Bildirishnomalar markazi",
    title: "Bildirishnomalar",
    empty: "Hozircha bildirishnomalar yo‘q",
    error: "Bildirishnomalarni yuklab bo‘lmadi.",
    loading: "Bildirishnomalar yuklanmoqda…",
    retry: "Qayta urinish",
    viewAll: "Barchasini ko‘rish",
    markAll: "Barchasini o‘qildi deb belgilash",
    all: "Barchasi",
    unread: "O‘qilmagan",
    more: "Yana yuklash",
    preview: "Preview rejimida bildirishnomalar mavjud emas.",
    reviewTitle: "Testni tekshirish kerak",
    reviewBody: "O‘quvchi Writing yoki Speaking testini tekshirish uchun yubordi.",
    debtTitle: "Qarzdorlik bo‘yicha bog‘lanish",
    debtBody:
      "To‘lov muddati o‘tgan. O‘quvchi bilan bog‘lanishdan oldin joriy balansni tekshiring.",
  },
} as const;

export function getWorkspaceNotificationsCopy(locale: Locale) {
  return copy[locale];
}

export function getWorkspaceNotificationText(locale: Locale, notice: WorkspaceNotice) {
  const localized = copy[locale];
  if (notice.kind === "REVIEW_REQUIRED") {
    return { title: localized.reviewTitle, body: localized.reviewBody };
  }
  if (notice.kind === "DEBT_FOLLOW_UP") {
    return { title: localized.debtTitle, body: localized.debtBody };
  }
  return { title: notice.title, body: notice.body };
}
