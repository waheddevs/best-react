import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    answer: "Javob maydoni",
    audio: "Audio material Student dashboardda himoyalangan holda ijro etiladi.",
    back: "Practice testga qaytish",
    duration: "{count} daqiqa",
    listening: "Listening",
    part: "PART {number}",
    preview: "READ-ONLY PREVIEW",
    previewHint:
      "Bu dinamik kontent preview. Javoblar, autosave, timer va submit Student dashboardda ishlaydi.",
    question: "Savol {number}",
    questions: "{count} ta savol",
    reading: "Reading",
    readOnly: "Faqat ko'rish",
    title: "{skill} · Practice test {number}",
    visual: "Vizual material",
  },
  ru: {
    answer: "Поле ответа",
    audio: "Защищённое аудио воспроизводится в кабинете студента.",
    back: "Вернуться к practice test",
    duration: "{count} минут",
    listening: "Listening",
    part: "ЧАСТЬ {number}",
    preview: "ТОЛЬКО ПРОСМОТР",
    previewHint:
      "Это динамический предварительный просмотр. Ответы, автосохранение, таймер и отправка работают в кабинете студента.",
    question: "Вопрос {number}",
    questions: "{count} вопросов",
    reading: "Reading",
    readOnly: "Только чтение",
    title: "{skill} · Тренировочный тест {number}",
    visual: "Визуальный материал",
  },
  en: {
    answer: "Answer field",
    audio: "Protected audio is played in the Student workspace.",
    back: "Return to practice test",
    duration: "{count} minutes",
    listening: "Listening",
    part: "PART {number}",
    preview: "READ-ONLY PREVIEW",
    previewHint:
      "This is a dynamic content preview. Answers, autosave, timing and submission run in the Student workspace.",
    question: "Question {number}",
    questions: "{count} questions",
    reading: "Reading",
    readOnly: "Read only",
    title: "{skill} · Practice test {number}",
    visual: "Visual material",
  },
} as const;

export function getTeacherObjectivePracticeCopy(locale: Locale) {
  return copy[locale];
}
