import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    audioPending: "Part 3 uchun audio hali yaratilmagan.",
    audioReady: "Part 3 audio biriktirilgan.",
    correctAnswer: "To'g'ri javob",
    defaultInstructions:
      "21–25 savollar uchun A, B yoki C javobini tanlang. 26–30 savollar uchun fikrni bildirgan speakerni tanlang.",
    defaultTitle: "Barqaror transport loyihasi",
    matchingHeading: "26–30 · Fikrlarni speakerlar bilan moslang",
    multipleChoiceHeading: "21–25 · A, B yoki C javobini tanlang",
    optionA: "A varianti",
    optionB: "B varianti",
    optionC: "C varianti",
    publishConfirm: "Saqlash va e'lon qilish",
    publishMessage: "Saqlasangiz, test ham e'lon qilinadi. E'lon qilishni tasdiqlaysizmi?",
    publishTitle: "Saqlash va e'lon qilish",
    select: "Tanlang",
    speakerA: "Speaker A",
    speakerB: "Speaker B",
    speakerC: "Speaker C",
    speakerOptions: "Speaker variantlari",
    studentQuestions: "Student savollari",
  },
  ru: {
    audioPending: "Аудио для Part 3 ещё не создано.",
    audioReady: "Аудио Part 3 прикреплено.",
    correctAnswer: "Правильный ответ",
    defaultInstructions:
      "Для вопросов 21–25 выберите A, B или C. Для вопросов 26–30 выберите говорящего, который выразил это мнение.",
    defaultTitle: "Проект устойчивого транспорта",
    matchingHeading: "26–30 · Сопоставьте мнения с говорящими",
    multipleChoiceHeading: "21–25 · Выберите A, B или C",
    optionA: "Вариант A",
    optionB: "Вариант B",
    optionC: "Вариант C",
    publishConfirm: "Сохранить и опубликовать",
    publishMessage: "При сохранении тест также будет опубликован. Опубликовать его?",
    publishTitle: "Сохранить и опубликовать",
    select: "Выберите",
    speakerA: "Говорящий A",
    speakerB: "Говорящий B",
    speakerC: "Говорящий C",
    speakerOptions: "Варианты говорящих",
    studentQuestions: "Вопросы для студента",
  },
  en: {
    audioPending: "Part 3 audio has not been created yet.",
    audioReady: "Part 3 audio is attached.",
    correctAnswer: "Correct answer",
    defaultInstructions:
      "Questions 21–25: choose the correct letter, A, B or C. Questions 26–30: choose the speaker who expresses each view.",
    defaultTitle: "Sustainable transport project",
    matchingHeading: "26–30 · Match the views to the speakers",
    multipleChoiceHeading: "21–25 · Choose A, B or C",
    optionA: "Option A",
    optionB: "Option B",
    optionC: "Option C",
    publishConfirm: "Save and publish",
    publishMessage:
      "If you save, the test will be published also. Are you sure you want to publish?",
    publishTitle: "Save and publish",
    select: "Select",
    speakerA: "Speaker A",
    speakerB: "Speaker B",
    speakerC: "Speaker C",
    speakerOptions: "Speaker options",
    studentQuestions: "Student questions",
  },
} as const;

export function getTeacherListeningPartThreeCopy(locale: Locale) {
  return copy[locale];
}
