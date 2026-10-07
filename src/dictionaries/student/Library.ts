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
  pdfBooks: string;
  pdfEmpty: string;
  pdfOpen: string;
  pdfError: string;
  pdfLoadMore: string;
  pdfRetry: string;
  materialTypes: Record<"all" | "Books" | "Guides" | "Articles", string>;
  sortLabel: string;
  sortLatest: string;
  sortOldest: string;
  sortAlphabetical: string;
  materialsTitle: string;
};

const libraryCopy: Record<Locale, StudentLibraryCopy> = {
  uz: {
    eyebrow: "Talaba kutubxonasi",
    title: "Kutubxona",
    description: "O‘qish va tayyorgarlik uchun ustozingiz ulashgan PDF materiallar.",
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
    pdfBooks: "PDF kitoblar",
    pdfEmpty: "Hozircha PDF material yo‘q.",
    pdfOpen: "PDFni ochish",
    pdfError: "PDF materiallarni yuklab bo‘lmadi.",
    pdfLoadMore: "Yana ko‘rsatish",
    pdfRetry: "Qayta urinish",
    materialTypes: { all: "Barchasi", Books: "Kitoblar", Guides: "Qo‘llanmalar", Articles: "Maqolalar" },
    sortLabel: "Saralash",
    sortLatest: "Yangilari",
    sortOldest: "Eskilari",
    sortAlphabetical: "A–Z",
    materialsTitle: "PDF materiallar",
  },
  ru: {
    eyebrow: "Библиотека ученика",
    title: "Библиотека",
    description: "PDF-материалы от вашего преподавателя для учёбы и подготовки.",
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
    pdfBooks: "PDF-книги",
    pdfEmpty: "PDF-материалов пока нет.",
    pdfOpen: "Открыть PDF",
    pdfError: "Не удалось загрузить PDF-материалы.",
    pdfLoadMore: "Показать ещё",
    pdfRetry: "Повторить",
    materialTypes: { all: "Все", Books: "Книги", Guides: "Руководства", Articles: "Статьи" },
    sortLabel: "Сортировка",
    sortLatest: "Сначала новые",
    sortOldest: "Сначала старые",
    sortAlphabetical: "А–Я",
    materialsTitle: "PDF-материалы",
  },
  en: {
    eyebrow: "Student library",
    title: "Library",
    description: "PDF materials shared by your teacher for studying and preparation.",
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
    pdfBooks: "PDF books",
    pdfEmpty: "No PDF materials yet.",
    pdfOpen: "Open PDF",
    pdfError: "PDF materials could not be loaded.",
    pdfLoadMore: "Show more",
    pdfRetry: "Retry",
    materialTypes: { all: "All", Books: "Books", Guides: "Guides", Articles: "Articles" },
    sortLabel: "Sort",
    sortLatest: "Latest",
    sortOldest: "Oldest",
    sortAlphabetical: "A–Z",
    materialsTitle: "PDF materials",
  },
};

export function getStudentLibraryCopy(locale: Locale) {
  return libraryCopy[locale];
}
