import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    instructionLabel: "Speaking yo‘riqnomasi",
    instruction:
      "Savolga aniq va tabiiy javob bering. Davom etishdan oldin audio javobingizni yozib saqlang.",
  },
  ru: {
    instructionLabel: "Инструкция по Speaking",
    instruction:
      "Отвечайте на вопрос ясно и естественно. Запишите и сохраните аудиоответ, прежде чем продолжить.",
  },
  en: {
    instructionLabel: "Speaking instructions",
    instruction:
      "Answer the question clearly and naturally. Record and save your audio response before continuing.",
  },
} as const;

export function getStudentSpeakingSimulatorCopy(locale: Locale) {
  return copy[locale];
}
