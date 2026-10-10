import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    task: "Task",
    notes: "Qaydlar",
    notesPlaceholder: "Fikrlaringiz va rejangizni shu yerga yozing...",
    instructionLabel: "Writing yo‘riqnomasi",
    instruction:
      "Bu task uchun taxminan {minutes} daqiqa ajrating va kamida {words} ta so‘z yozing. Javobingizni yuborishdan oldin tekshiring.",
  },
  ru: {
    task: "Задание",
    notes: "Заметки",
    notesPlaceholder: "Запишите здесь идеи и план ответа...",
    instructionLabel: "Инструкция по Writing",
    instruction:
      "Отведите на это задание около {minutes} минут и напишите не менее {words} слов. Проверьте ответ перед отправкой.",
  },
  en: {
    task: "Task",
    notes: "Notes",
    notesPlaceholder: "Write your ideas and response outline here...",
    instructionLabel: "Writing instructions",
    instruction:
      "Spend about {minutes} minutes on this task and write at least {words} words. Review your response before submitting.",
  },
} as const;

export function getStudentWritingSimulatorCopy(locale: Locale) {
  return copy[locale];
}
