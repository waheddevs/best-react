import type { Locale } from "@/config/Locales";
import type { StudentTestsCopy } from "@/types/student/StudentTests";

const copy: Record<Locale, StudentTestsCopy> = {
  uz: {
    allSkillsLabel: "4 ta bo'lim",
    availableLabel: "Mavjud",
    continueLabel: "Davom etish",
    emptyLabel: "Hozircha siz uchun test biriktirilmagan.",
    eyebrow: "ACADEMIC PRACTICE",
    minutesLabel: "daqiqa",
    questionsLabel: "savol",
    resultLabel: "Natijani ko'rish",
    sourceLabel: "Manba",
    startLabel: "Boshlash",
    startingLabel: "Ochilmoqda...",
    subtitle: "Listening, Reading, Writing va Speaking bir joyda.",
    submittedLabel: "Tekshirilmoqda",
    title: "BEST LC Academic Tests",
    yearLabel: "Yil",
  },
  ru: {
    allSkillsLabel: "4 раздела",
    availableLabel: "Доступен",
    continueLabel: "Продолжить",
    emptyLabel: "Для вас пока не назначен тест.",
    eyebrow: "ACADEMIC PRACTICE",
    minutesLabel: "минут",
    questionsLabel: "вопросов",
    resultLabel: "Посмотреть результат",
    sourceLabel: "Источник",
    startLabel: "Начать",
    startingLabel: "Открываем...",
    subtitle: "Listening, Reading, Writing и Speaking в одном тесте.",
    submittedLabel: "На проверке",
    title: "BEST LC Academic Tests",
    yearLabel: "Год",
  },
  en: {
    allSkillsLabel: "4 sections",
    availableLabel: "Available",
    continueLabel: "Continue",
    emptyLabel: "No test has been assigned to you yet.",
    eyebrow: "ACADEMIC PRACTICE",
    minutesLabel: "minutes",
    questionsLabel: "questions",
    resultLabel: "View result",
    sourceLabel: "Source",
    startLabel: "Start",
    startingLabel: "Opening...",
    subtitle: "Listening, Reading, Writing and Speaking in one test.",
    submittedLabel: "Awaiting review",
    title: "BEST LC Academic Tests",
    yearLabel: "Year",
  },
};

export function getStudentTestsCopy(locale: Locale): StudentTestsCopy {
  return copy[locale];
}
