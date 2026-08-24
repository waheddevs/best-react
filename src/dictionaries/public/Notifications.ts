import type { Locale } from "@/config/Locales";
import type { NotificationCopy } from "@/types/Notification";

const notificationCopy = {
  uz: {
    containerAriaLabel: "Bildirishnomalar",
    closeAriaLabel: "Bildirishnomani yopish",
    defaults: {
      success: {
        title: "Tayyor",
        message: "Amal muvaffaqiyatli bajarildi.",
      },
      error: {
        title: "Xatolik yuz berdi",
        message: "Amalni bajarib bo‘lmadi. Qayta urinib ko‘ring.",
      },
      warning: {
        title: "E’tibor bering",
        message: "Davom etishdan oldin ma’lumotlarni qayta tekshiring.",
      },
      info: {
        title: "Ma’lumot",
        message: "Siz uchun yangi ma’lumot mavjud.",
      },
      loading: {
        title: "Jarayon davom etmoqda",
        message: "Iltimos, amal yakunlanishini kuting.",
      },
    },
    confirm: {
      title: "Amalni tasdiqlang",
      message: "Bu amalni davom ettirmoqchimisiz?",
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
        message: "Действие успешно выполнено.",
      },
      error: {
        title: "Произошла ошибка",
        message: "Не удалось выполнить действие. Попробуйте ещё раз.",
      },
      warning: {
        title: "Обратите внимание",
        message: "Перед продолжением ещё раз проверьте информацию.",
      },
      info: {
        title: "Информация",
        message: "Для вас доступна новая информация.",
      },
      loading: {
        title: "Идёт обработка",
        message: "Пожалуйста, дождитесь завершения действия.",
      },
    },
    confirm: {
      title: "Подтвердите действие",
      message: "Вы уверены, что хотите продолжить?",
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
        message: "The action was completed successfully.",
      },
      error: {
        title: "Something went wrong",
        message: "The action could not be completed. Please try again.",
      },
      warning: {
        title: "Please check",
        message: "Review the information before you continue.",
      },
      info: {
        title: "Information",
        message: "There is a new update for you.",
      },
      loading: {
        title: "Working on it",
        message: "Please wait while the action is completed.",
      },
    },
    confirm: {
      title: "Confirm action",
      message: "Are you sure you want to continue?",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
    },
  },
} satisfies Record<Locale, NotificationCopy>;

export function getNotificationCopy(locale: Locale): NotificationCopy {
  return notificationCopy[locale];
}
