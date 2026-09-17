import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    heading: "O‘qituvchiga vazifa yuborish",
    teacher: "O‘qituvchi",
    title: "Vazifa nomi",
    kind: "Turi",
    dueAt: "Muddat (ixtiyoriy)",
    submit: "Vazifa yuborish",
    sending: "Yuborilmoqda…",
    sent: "Vazifa yuborildi va bildirishnoma yaratildi.",
    error: "Vazifani yuborib bo‘lmadi. Qayta urining.",
    noTeachers: "Faol o‘qituvchi topilmadi.",
    kinds: {
      FOLLOW_UP: "Bog‘lanish",
      PREPARATION: "Tayyorgarlik",
      ADMINISTRATIVE: "Ma’muriy vazifa",
    },
  },
  ru: {
    heading: "Отправить задачу преподавателю",
    teacher: "Преподаватель",
    title: "Название задачи",
    kind: "Тип",
    dueAt: "Срок (необязательно)",
    submit: "Отправить задачу",
    sending: "Отправка…",
    sent: "Задача отправлена, уведомление создано.",
    error: "Не удалось отправить задачу. Повторите попытку.",
    noTeachers: "Активных преподавателей нет.",
    kinds: {
      FOLLOW_UP: "Связаться",
      PREPARATION: "Подготовка",
      ADMINISTRATIVE: "Административная задача",
    },
  },
  en: {
    heading: "Send a task to a teacher",
    teacher: "Teacher",
    title: "Task title",
    kind: "Type",
    dueAt: "Due date (optional)",
    submit: "Send task",
    sending: "Sending…",
    sent: "Task sent and notification created.",
    error: "Could not send the task. Please try again.",
    noTeachers: "No active teachers found.",
    kinds: {
      FOLLOW_UP: "Follow up",
      PREPARATION: "Preparation",
      ADMINISTRATIVE: "Administrative task",
    },
  },
} as const;

export function getAdminTeacherTaskCopy(locale: Locale) {
  return copy[locale];
}
