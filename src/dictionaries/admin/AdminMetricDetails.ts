import type { Locale } from "@/config/Locales";

const copy = {
  uz: {
    current: "joriy jami",
    NEW: "ko‘rib chiqish kutilmoqda",
    IN_REVIEW: "ko‘rib chiqilmoqda",
    RESOLVED: "ko‘rib chiqilgan",
    REJECTED: "rad etilgan",
    PUBLISHED: "saytda e’lon qilingan",
    DRAFT: "hali e’lon qilinmagan",
    ARCHIVED: "arxivga olingan",
    ACTIVE: "faol guruhlar",
    full: "to‘lgan guruhlar",
    students: "faol a’zoliklar",
    seats: "bo‘sh o‘rinlar",
    billed: "hisoblangan jami summa",
    billedShare: "hisoblangan summadan",
    allocated: "guruhlarga biriktirilgan",
    revenueShare: "tushumdan ajratiladi",
  },
  ru: {
    current: "текущее количество",
    NEW: "ожидают рассмотрения",
    IN_REVIEW: "на рассмотрении",
    RESOLVED: "обработано",
    REJECTED: "отклонено",
    PUBLISHED: "опубликовано на сайте",
    DRAFT: "ещё не опубликовано",
    ARCHIVED: "в архиве",
    ACTIVE: "активные группы",
    full: "заполненные группы",
    students: "активные зачисления",
    seats: "свободные места",
    billed: "общая начисленная сумма",
    billedShare: "от начисленной суммы",
    allocated: "распределено по группам",
    revenueShare: "доля поступлений",
  },
  en: {
    current: "current total",
    NEW: "awaiting review",
    IN_REVIEW: "being reviewed",
    RESOLVED: "processed",
    REJECTED: "declined",
    PUBLISHED: "published on the website",
    DRAFT: "not published yet",
    ARCHIVED: "archived",
    ACTIVE: "active groups",
    full: "groups at capacity",
    students: "active memberships",
    seats: "available seats",
    billed: "total invoiced amount",
    billedShare: "of invoiced amount",
    allocated: "allocated to groups",
    revenueShare: "share of payments received",
  },
};

export function getAdminMetricDetails(locale: Locale) {
  return copy[locale];
}

export function adminMetricDetail(locale: Locale, key: string) {
  const labels = copy[locale];
  return labels[key as keyof typeof labels] ?? labels.current;
}
