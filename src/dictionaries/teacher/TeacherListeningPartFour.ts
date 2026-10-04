import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    audioPending: "Part 4 uchun audio hali yaratilmagan.",
    audioReady: "Part 4 audio biriktirilgan.",
    answer: "Javob",
    description: "Tavsif",
    factor: "Omil",
    noteCompletion: "31–35 · Eslatmalarni toʻldiring",
    publishConfirm: "Saqlash va eʼlon qilish",
    publishMessage: "Saqlasangiz, test ham eʼlon qilinadi. Eʼlon qilishni tasdiqlaysizmi?",
    publishTitle: "Saqlash va eʼlon qilish",
    studentQuestions: "Student savollari",
    tableCompletion: "36–40 · Jadvalni toʻldiring",
    textAfterGap: "Boʻshliqdan keyingi matn",
    textBeforeGap: "Boʻshliqdan oldingi matn",
  },
  ru: {
    audioPending: "Аудио для Part 4 ещё не создано.",
    audioReady: "Аудио Part 4 прикреплено.",
    answer: "Ответ",
    description: "Описание",
    factor: "Фактор",
    noteCompletion: "31–35 · Заполните заметки",
    publishConfirm: "Сохранить и опубликовать",
    publishMessage: "При сохранении тест также будет опубликован. Опубликовать его?",
    publishTitle: "Сохранить и опубликовать",
    studentQuestions: "Вопросы для студента",
    tableCompletion: "36–40 · Заполните таблицу",
    textAfterGap: "Текст после пропуска",
    textBeforeGap: "Текст до пропуска",
  },
  en: {
    audioPending: "Part 4 audio has not been created yet.",
    audioReady: "Part 4 audio is attached.",
    answer: "Answer",
    description: "Description",
    factor: "Factor",
    noteCompletion: "31–35 · Complete the notes",
    publishConfirm: "Save and publish",
    publishMessage:
      "If you save, the test will be published also. Are you sure you want to publish?",
    publishTitle: "Save and publish",
    studentQuestions: "Student questions",
    tableCompletion: "36–40 · Complete the table",
    textAfterGap: "Text after gap",
    textBeforeGap: "Text before gap",
  },
} as const;

export function getTeacherListeningPartFourCopy(locale: Locale) {
  return copy[locale];
}
