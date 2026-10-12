import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    placeholder: "Sanani tanlang",
    today: "Bugun",
    clear: "Tozalash",
    previous: "Oldingi",
    next: "Keyingi",
    chooseMonth: "Oy va yilni tanlash",
  },
  ru: {
    placeholder: "Выберите дату",
    today: "Сегодня",
    clear: "Очистить",
    previous: "Назад",
    next: "Далее",
    chooseMonth: "Выбрать месяц и год",
  },
  en: {
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
