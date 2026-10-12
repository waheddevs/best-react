import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    payments: "To‘lovlar",
    allPeriods: "Barcha hisoblangan davrlar bo‘yicha",
    noCharges: "Hali o‘qish uchun hisob chiqarilmagan.",
    activeGroups: "Faol guruhlar",
  },
  ru: {
    payments: "Оплата",
    allPeriods: "За все начисленные периоды",
    noCharges: "Начислений за обучение пока нет.",
    activeGroups: "Активные группы",
  },
  en: {
    payments: "Payments",
    allPeriods: "Across all billed periods",
    noCharges: "No tuition charges yet.",
    activeGroups: "Active groups",
  },
};

export function getAdminPersonDetailsCopy(locale: Locale) {
  return copy[locale];
}
