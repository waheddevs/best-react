import type { MockExamDate, PublicExamOption } from "@/types/ExamPreview";

// Client-preview content; replace with client-approved exam formats and dates before production.
export const publicExamOptions: PublicExamOption[] = [
  {
    key: "ielts",
    title: { uz: "IELTS", ru: "IELTS", en: "IELTS" },
    description: {
      uz: "Academic yoki General Training imtihoniga ro‘yxatdan o‘tish bo‘yicha shaxsiy yordam.",
      ru: "Персональная помощь с регистрацией на IELTS Academic или General Training.",
      en: "Personal registration guidance for IELTS Academic or General Training.",
    },
    format: {
      uz: "Rasmiy imtihon so‘rovi",
      ru: "Заявка на официальный экзамен",
      en: "Official exam request",
    },
    duration: { uz: "Taxminan 2 soat 45 daqiqa", ru: "Около 2 ч 45 мин", en: "About 2h 45m" },
    level: { uz: "B1+ tavsiya etiladi", ru: "Рекомендуется B1+", en: "B1+ recommended" },
    highlights: [
      {
        uz: "Academic yoki General Training",
        ru: "Academic или General Training",
        en: "Academic or General Training",
      },
      { uz: "Administrator yordami", ru: "Помощь администратора", en: "Administrator guidance" },
      { uz: "Telegram orqali aloqa", ru: "Связь через Telegram", en: "Telegram follow-up" },
    ],
  },
  {
    key: "cefr",
    title: { uz: "CEFR", ru: "CEFR", en: "CEFR" },
    description: {
      uz: "Til darajasini tasdiqlash uchun CEFR imtihoniga ariza va tashkiliy ko‘mak.",
      ru: "Заявка и организационная поддержка для подтверждения уровня CEFR.",
      en: "Application and practical support for a CEFR level assessment.",
    },
    format: { uz: "Daraja imtihoni", ru: "Экзамен на уровень", en: "Level assessment" },
    duration: { uz: "Taxminan 2 soat", ru: "Около 2 часов", en: "About 2 hours" },
    level: { uz: "A1–C1", ru: "A1–C1", en: "A1–C1" },
    highlights: [
      { uz: "Mos darajani tanlash", ru: "Выбор подходящего уровня", en: "Level selection" },
      { uz: "Hujjatlar bo‘yicha yo‘riq", ru: "Подсказки по документам", en: "Document guidance" },
      { uz: "Telegram orqali aloqa", ru: "Связь через Telegram", en: "Telegram follow-up" },
    ],
  },
  {
    key: "mock",
    title: { uz: "MOCK", ru: "MOCK", en: "MOCK" },
    description: {
      uz: "Vaqt cheklovi va imtihon muhitiga yaqin sharoitdagi to‘liq sinov sessiyasi.",
      ru: "Полная пробная сессия с таймингом и условиями, близкими к экзамену.",
      en: "A full timed practice session in conditions close to the real exam.",
    },
    format: { uz: "To‘liq simulyatsiya", ru: "Полная симуляция", en: "Full simulation" },
    duration: { uz: "3 soat", ru: "3 часа", en: "3 hours" },
    level: { uz: "A2–C1", ru: "A2–C1", en: "A2–C1" },
    highlights: [
      { uz: "Sana va vaqt tanlash", ru: "Выбор даты и времени", en: "Date and time selection" },
      { uz: "Imtihon muhiti", ru: "Экзаменационная атмосфера", en: "Exam-style setting" },
      {
        uz: "Admin ro‘yxatiga qo‘shilish",
        ru: "Добавление в список администратора",
        en: "Admin registration queue",
      },
    ],
  },
];

export const mockExamDates: MockExamDate[] = [
  {
    value: "2026-09-05T09:00",
    dateLabel: { uz: "5-sentabr, shanba", ru: "5 сентября, суббота", en: "Saturday, September 5" },
    timeLabel: { uz: "09:00", ru: "09:00", en: "09:00" },
  },
  {
    value: "2026-09-12T14:00",
    dateLabel: {
      uz: "12-sentabr, shanba",
      ru: "12 сентября, суббота",
      en: "Saturday, September 12",
    },
    timeLabel: { uz: "14:00", ru: "14:00", en: "14:00" },
  },
  {
    value: "2026-09-19T09:00",
    dateLabel: {
      uz: "19-sentabr, shanba",
      ru: "19 сентября, суббота",
      en: "Saturday, September 19",
    },
    timeLabel: { uz: "09:00", ru: "09:00", en: "09:00" },
  },
];
