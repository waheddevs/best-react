import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    passage: "Matn",
    instructionLabel: "Reading yo‘riqnomasi",
    instruction:
      "Matnni diqqat bilan o‘qing va undagi ma’lumotlarga asoslanib {range}-savollarga javob bering. Har bir savol ko‘rsatmasi va so‘z chegarasiga rioya qiling.",
  },
  ru: {
    passage: "Текст",
    instructionLabel: "Инструкция по Reading",
    instruction:
      "Внимательно прочитайте текст и ответьте на вопросы {range}, опираясь на его содержание. Соблюдайте инструкции и ограничения по количеству слов для каждого вопроса.",
  },
  en: {
    passage: "Passage",
    instructionLabel: "Reading instructions",
    instruction:
      "Read the passage carefully and answer questions {range} using information from the text. Follow the instructions and word limits for each question.",
  },
} as const;

export function getStudentReadingSimulatorCopy(locale: Locale) {
  return copy[locale];
}
