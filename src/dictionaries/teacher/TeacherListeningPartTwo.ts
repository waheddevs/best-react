import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    audioPending: "Part 2 uchun audio hali yaratilmagan.",
    audioReady: "Part 2 audio biriktirilgan.",
    correctAnswer: "To'g'ri javob",
    defaultInstructions: "To'g'ri A, B yoki C harfini tanlang.",
    defaultTitle: "Jamoat markazi haqida ma'lumot",
    optionA: "A varianti",
    optionB: "B varianti",
    optionC: "C varianti",
    publishConfirm: "Saqlash va e'lon qilish",
    publishMessage: "Saqlasangiz, test ham e'lon qilinadi. E'lon qilishni tasdiqlaysizmi?",
    publishTitle: "Saqlash va e'lon qilish",
    select: "Tanlang",
    studentQuestions: "Student savollari",
  },
  ru: {
    audioPending: "Аудио для Part 2 ещё не создано.",
    audioReady: "Аудио Part 2 прикреплено.",
    correctAnswer: "Правильный ответ",
    defaultInstructions: "Выберите правильную букву: A, B или C.",
    defaultTitle: "Информация об общественном центре",
    optionA: "Вариант A",
    optionB: "Вариант B",
    optionC: "Вариант C",
    publishConfirm: "Сохранить и опубликовать",
    publishMessage: "При сохранении тест также будет опубликован. Опубликовать его?",
    publishTitle: "Сохранить и опубликовать",
    select: "Выберите",
    studentQuestions: "Вопросы для студента",
  },
  en: {
    audioPending: "Part 2 audio has not been created yet.",
    audioReady: "Part 2 audio is attached.",
    correctAnswer: "Correct answer",
    defaultInstructions: "Choose the correct letter, A, B or C.",
    defaultTitle: "Community centre orientation",
    optionA: "Option A",
    optionB: "Option B",
    optionC: "Option C",
    publishConfirm: "Save and publish",
    publishMessage:
      "If you save, the test will be published also. Are you sure you want to publish?",
    publishTitle: "Save and publish",
    select: "Select",
    studentQuestions: "Student questions",
  },
} as const;

export function getTeacherListeningPartTwoCopy(locale: Locale) {
  return copy[locale];
}
