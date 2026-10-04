import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    task: "Task {number}",
    questions: "Task 1 va Task 2 savollari",
    unsaved: "Saqlanmagan o‘zgarishlar bor",
    clear: "Ikkala savol matnini tozalash",
    publishTitle: "Saqlash va e’lon qilish",
    publishMessage: "Saqlasangiz, Writing testi studentlarga ham e’lon qilinadi. Davom etasizmi?",
    publishConfirm: "Saqlash va e’lon qilish",
    saving: "Writing saqlanmoqda…",
    saved: "Writing saqlandi va student testiga e’lon qilindi.",
    error: "Writing saqlanmadi. Qayta urinib ko‘ring.",
    validation: "Ikkala task savolini to‘ldiring.",
    empty: "Writing ma’lumotlari topilmadi.",
  },
  ru: {
    task: "Задание {number}",
    questions: "Вопросы заданий 1 и 2",
    unsaved: "Есть несохранённые изменения",
    clear: "Очистить оба вопроса",
    publishTitle: "Сохранить и опубликовать",
    publishMessage:
      "При сохранении тест Writing также будет опубликован для студентов. Продолжить?",
    publishConfirm: "Сохранить и опубликовать",
    saving: "Сохранение Writing…",
    saved: "Writing сохранён и опубликован для студентов.",
    error: "Не удалось сохранить Writing. Повторите попытку.",
    validation: "Заполните вопросы обоих заданий.",
    empty: "Данные Writing недоступны.",
  },
  en: {
    task: "Task {number}",
    questions: "Task 1 and Task 2 questions",
    unsaved: "There are unsaved changes",
    clear: "Clear both question texts",
    publishTitle: "Save and publish",
    publishMessage: "Saving will also publish the Writing test for students. Continue?",
    publishConfirm: "Save and publish",
    saving: "Saving Writing…",
    saved: "Writing was saved and published for students.",
    error: "Writing could not be saved. Try again.",
    validation: "Complete both task questions.",
    empty: "Writing data is unavailable.",
  },
} as const;

export function getTeacherWritingAuthoringCopy(locale: Locale) {
  return copy[locale];
}
