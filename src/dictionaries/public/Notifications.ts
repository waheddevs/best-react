import type { Locale } from "@/config/Locales";
import type { NotificationCopy } from "@/types/Notification";

const notificationCopy = {
  uz: {
    containerAriaLabel: "Bildirishnomalar",
    closeAriaLabel: "Bildirishnomani yopish",
    defaults: {
      success: {
        title: "Tayyor",
        message: "Amal bajarildi. Hammasi siz uchun tayyor.",
      },
      error: {
        title: "Xatolik",
        message: "Amal bajarilmadi. Sizga yordam berishga tayyormiz.",
      },
      warning: {
        title: "E’tibor",
        message: "Ma’lumotlarni tekshiring. Kichik tekshiruvning o‘zi kifoya.",
      },
      info: {
        title: "Ma’lumot",
        message: "Yangi ma’lumot mavjud. U sizga foydali bo‘lishiga umid qilamiz.",
      },
      loading: {
        title: "Kutilmoqda",
        message: "Jarayon davom etmoqda. Bu uzoq vaqt olmaydi.",
      },
    },
    confirm: {
      title: "Tasdiqlash",
      message: "Tanlovingizni tasdiqlang. Qarorni xotirjam tekshirishingiz mumkin.",
      confirmLabel: "Tasdiqlash",
      cancelLabel: "Bekor qilish",
    },
  },
  ru: {
    containerAriaLabel: "Уведомления",
    closeAriaLabel: "Закрыть уведомление",
    defaults: {
      success: {
        title: "Готово",
        message: "Действие выполнено. Всё готово для вас.",
      },
      error: {
        title: "Ошибка",
        message: "Действие не выполнено. Мы готовы помочь вам.",
      },
      warning: {
        title: "Внимание",
        message: "Проверьте информацию. Достаточно одного быстрого взгляда.",
      },
      info: {
        title: "Информация",
        message: "Доступно новое обновление. Надеемся, оно будет полезным.",
      },
      loading: {
        title: "Загрузка",
        message: "Действие выполняется. Это не займёт много времени.",
      },
    },
    confirm: {
      title: "Подтверждение",
      message: "Подтвердите свой выбор. При необходимости спокойно проверьте решение.",
      confirmLabel: "Подтвердить",
      cancelLabel: "Отмена",
    },
  },
  en: {
    containerAriaLabel: "Notifications",
    closeAriaLabel: "Close notification",
    defaults: {
      success: {
        title: "Done",
        message: "Action completed. Everything is ready for you.",
      },
      error: {
        title: "Error",
        message: "The action could not be completed. We’re here if you need help.",
      },
      warning: {
        title: "Check",
        message: "Please review the information. A quick check should sort it out.",
      },
      info: {
        title: "Update",
        message: "New information is available. We hope it helps.",
      },
      loading: {
        title: "Loading",
        message: "The action is in progress. This won’t take long.",
      },
    },
    confirm: {
      title: "Confirmation",
      message: "Please confirm your choice. Take a moment if you need it.",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
    },
  },
} satisfies Record<Locale, NotificationCopy>;

export function getNotificationCopy(locale: Locale): NotificationCopy {
  return notificationCopy[locale];
}
