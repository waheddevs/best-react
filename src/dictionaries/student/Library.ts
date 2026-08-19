import type { Locale } from "@/config/Locales";

export type StudentLibraryCopy = {
  eyebrow: string;
  title: string;
  description: string;
  searchLabel: string;
  searchPlaceholder: string;
  noResults: string;
  back: string;
  types: Record<"all" | "guide" | "checklist" | "article", string>;
  related: string;
  readResource: string;
};

const libraryCopy: Record<Locale, StudentLibraryCopy> = {
  uz: {
    eyebrow: "Talaba kutubxonasi",
    title: "Kutubxona",
    description: "O‘qish, rejalash va tayyorgarlik uchun maqola, qo‘llanma va chek-listlar.",
    searchLabel: "Qidirish",
    searchPlaceholder: "Resurs nomi yoki mavzusini qidiring",
    noResults: "Tanlangan mezonlarga mos natija topilmadi.",
    back: "Orqaga",
    types: {
      all: "Barchasi",
      guide: "Qo‘llanmalar",
      checklist: "Chek-listlar",
      article: "Maqolalar",
    },
    related: "O‘xshash resurslar",
    readResource: "O‘qish",
  },
  ru: {
    eyebrow: "Библиотека ученика",
    title: "Библиотека",
    description: "Статьи, руководства и чек-листы для учёбы, планирования и подготовки.",
    searchLabel: "Поиск",
    searchPlaceholder: "Поиск по названию или теме",
    noResults: "По выбранным параметрам ничего не найдено.",
    back: "Назад",
    types: {
      all: "Все",
      guide: "Руководства",
      checklist: "Чек-листы",
      article: "Статьи",
    },
    related: "Похожие материалы",
    readResource: "Читать",
  },
  en: {
    eyebrow: "Student library",
    title: "Library",
    description: "Articles, guides, and checklists for studying, planning, and preparation.",
    searchLabel: "Search",
    searchPlaceholder: "Search by resource title or topic",
    noResults: "No results match the selected filters.",
    back: "Back",
    types: {
      all: "All",
      guide: "Guides",
      checklist: "Checklists",
      article: "Articles",
    },
    related: "Related resources",
    readResource: "Read",
  },
};

export function getStudentLibraryCopy(locale: Locale) {
  return libraryCopy[locale];
}
