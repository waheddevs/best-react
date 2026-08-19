export const navigationItems = [
  { key: "home", href: "" },
  { key: "events", href: "/events" },
  { key: "courses", href: "/courses" },
  { key: "results", href: "/results" },
  { key: "exams", href: "/exams" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "faq", href: "/faq" },
] as const;

export const navbarNavigationItems = navigationItems.filter((item) => item.key !== "faq");

export const courseNavigationItems = [
  { key: "ielts", href: "/courses/ielts" },
  { key: "cefr", href: "/courses/cefr" },
  { key: "englishGeneral", href: "/courses/english-general" },
  { key: "russian", href: "/courses/russian" },
  { key: "french", href: "/courses/french" },
  { key: "german", href: "/courses/german" },
  { key: "chinese", href: "/courses/chinese" },
] as const;

export const examNavigationItems = [
  { key: "ielts", href: "/exams/ielts" },
  { key: "cefr", href: "/exams/cefr" },
  { key: "mock", href: "/exams/mock" },
] as const;

export type NavigationKey = (typeof navigationItems)[number]["key"];
export type CourseNavigationKey = (typeof courseNavigationItems)[number]["key"];
export type ExamNavigationKey = (typeof examNavigationItems)[number]["key"];
