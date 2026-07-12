export const navigationItems = [
  { key: "home", href: "" },
  { key: "courses", href: "/courses" },
  { key: "events", href: "/events" },
  { key: "results", href: "/results" },
  { key: "library", href: "/library" },
  { key: "exams", href: "/exams" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export type NavigationKey = (typeof navigationItems)[number]["key"];
