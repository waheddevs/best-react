import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    title: "Ish haqi",
    description: "O‘quvchi to‘lovlaridan avtomatik hisoblangan ulushlar.",
    received: "Tushgan to‘lovlar",
    center: "Markaz ulushi · 30%",
    teacher: "O‘qituvchi ulushi · 70%",
    rule: "Guruhga biriktirilgan to‘lovlar asosida. Oy to‘lov sanasi bo‘yicha olinadi.",
    history: "To‘lovlar va ulushlar",
    groups: "Guruhlar kesimi",
    payments: "To‘lov tarixi",
    comparison: "Oldingi oyga nisbatan",
    noPrevious: "Oldingi oyda tushum bo‘lmagan",
    current: "Joriy oy davom etmoqda",
    rounding:
      "Har to‘lovda 70% ulush butun so‘mgacha pastga yaxlitlanadi, qoldiq markazga qo‘shiladi.",
    empty: "Tanlangan filterlar bo‘yicha to‘lovlar topilmadi.",
  },
  ru: {
    title: "Зарплата",
    description: "Автоматическое распределение платежей учеников.",
    received: "Полученные платежи",
    center: "Доля центра · 30%",
    teacher: "Доля преподавателя · 70%",
    rule: "По платежам, распределённым на группы. Месяц определяется датой оплаты.",
    history: "Платежи и доли",
    groups: "По группам",
    payments: "История платежей",
    comparison: "К предыдущему месяцу",
    noPrevious: "В предыдущем месяце поступлений не было",
    current: "Текущий месяц ещё не завершён",
    rounding: "70% каждого платежа округляется вниз до целого сума; остаток относится к центру.",
    empty: "По выбранным фильтрам платежей нет.",
  },
  en: {
    title: "Salary",
    description: "Automatic revenue shares from student payments.",
    received: "Payments received",
    center: "Center share · 30%",
    teacher: "Teacher share · 70%",
    rule: "Based on payments allocated to groups. Months follow the payment date.",
    history: "Payments and shares",
    groups: "By group",
    payments: "Payment history",
    comparison: "Compared with previous month",
    noPrevious: "No revenue in the previous month",
    current: "Current month is still in progress",
    rounding: "Each 70% share is rounded down to whole UZS; the remainder goes to the center.",
    empty: "No payments match the selected filters.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function getAdminSalaryCopy(locale: Locale) {
  return copy[locale];
}
