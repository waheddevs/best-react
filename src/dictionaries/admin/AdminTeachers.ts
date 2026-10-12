import type { Locale } from "@/config/Locales";
import type { AdminTeachersCopy } from "@/types/admin/AdminTeachers";

const copy: Record<Locale, AdminTeachersCopy> = {
  uz: {
    actionsLabel: "Amallar",
    deleteCancelLabel: "Bekor qilish",
    deleteConfirmLabel: "O'chirish",
    deleteErrorLabel: "O'qituvchini o'chirib bo'lmadi.",
    deleteLabel: "O'qituvchini o'chirish",
    deleteMessage: "{name} o'qituvchisini o'chirmoqchimisiz? Hisob tizimdan yashiriladi.",
    deleteSuccessLabel: "{name} o'qituvchilar ro'yxatidan o'chirildi.",
    deleteTitle: "O'qituvchini o'chirish",
    detailsLabel: "Batafsil",
    groupsLabel: "Guruhlar",
    nameLabel: "Ism",
    shareLabel: "jami o'qituvchidan",
    statusLabels: {
      ALL: "Barchasi",
      ACTIVE: "Faol",
      PAUSED: "Tanaffusda",
      DEBTOR: "Qarzdorlar",
    },
    summaryLabel: "O'qituvchilar holati",
  },
  ru: {
    actionsLabel: "Действия",
    deleteCancelLabel: "Отмена",
    deleteConfirmLabel: "Удалить",
    deleteErrorLabel: "Не удалось удалить преподавателя.",
    deleteLabel: "Удалить преподавателя",
    deleteMessage: "Удалить преподавателя {name}? Аккаунт будет скрыт из системы.",
    deleteSuccessLabel: "Преподаватель {name} удалён из списка.",
    deleteTitle: "Удаление преподавателя",
    detailsLabel: "Подробнее",
    groupsLabel: "Группы",
    nameLabel: "Имя",
    shareLabel: "от всех преподавателей",
    statusLabels: {
      ALL: "Все",
      ACTIVE: "Активные",
      PAUSED: "На паузе",
      DEBTOR: "Должники",
    },
    summaryLabel: "Статусы преподавателей",
  },
  en: {
    actionsLabel: "Actions",
    deleteCancelLabel: "Cancel",
    deleteConfirmLabel: "Delete",
    deleteErrorLabel: "The teacher could not be deleted.",
    deleteLabel: "Delete teacher",
    deleteMessage: "Delete {name}? The teacher account will be hidden from the system.",
    deleteSuccessLabel: "{name} was removed from the teacher directory.",
    deleteTitle: "Delete teacher",
    detailsLabel: "Details",
    groupsLabel: "Groups",
    nameLabel: "Name",
    shareLabel: "of all teachers",
    statusLabels: {
      ALL: "All",
      ACTIVE: "Active",
      PAUSED: "Pause",
      DEBTOR: "Debtors",
    },
    summaryLabel: "Teacher status overview",
  },
};

export function getAdminTeachersCopy(locale: Locale): AdminTeachersCopy {
  return copy[locale];
}
