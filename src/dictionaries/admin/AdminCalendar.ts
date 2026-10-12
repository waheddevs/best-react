import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    date: "Sana",
    time: "Vaqt",
    required: "Sanani tanlang.",
    afterStart: "Tugash vaqti boshlanish vaqtidan keyin bo‘lishi kerak.",
    placeholder: "Sanani tanlang",
    today: "Bugun",
    clear: "Tozalash",
    previous: "Oldingi",
    next: "Keyingi",
    chooseMonth: "Oy va yilni tanlash",
  },
  ru: {
    date: "Дата",
    time: "Время",
    required: "Выберите дату.",
    afterStart: "Окончание должно быть позже начала.",
    placeholder: "Выберите дату",
    today: "Сегодня",
    clear: "Очистить",
    previous: "Назад",
    next: "Далее",
    chooseMonth: "Выбрать месяц и год",
  },
  en: {
    date: "Date",
    time: "Time",
    required: "Select a date.",
    afterStart: "The end must be after the start.",
    placeholder: "Select date",
    today: "Today",
    clear: "Clear",
    previous: "Previous",
    next: "Next",
    chooseMonth: "Choose month and year",
  },
};

export function getAdminCalendarCopy(locale: Locale) {
  return copy[locale];
}
