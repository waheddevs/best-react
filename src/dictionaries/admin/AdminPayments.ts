import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    history: "To‘lov tarixi",
    filteredTotals: "Tanlangan filterlar bo‘yicha",
    historyEmpty: "Hali to‘lov yoki tuzatishlar yo‘q.",
    type: "Amal turi",
    currentMonth: "Shu oy",
  },
  ru: {
    history: "История платежей",
    filteredTotals: "По выбранным фильтрам",
    historyEmpty: "Платежей и корректировок пока нет.",
    type: "Тип операции",
    currentMonth: "Текущий месяц",
  },
  en: {
    history: "Payment history",
    filteredTotals: "For the selected filters",
    historyEmpty: "No payments or adjustments yet.",
    type: "Transaction type",
    currentMonth: "This month",
  },
};

export function getAdminPaymentsCopy(locale: Locale) {
  return copy[locale];
}
