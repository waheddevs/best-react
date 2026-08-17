export const navigationItems = [
  { key: "home", href: "" },
  { key: "events", href: "/events" },
  { key: "courses", href: "/courses" },
  { key: "results", href: "/results" },
  { key: "exams", href: "/exams" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "library", href: "/library" },
  { key: "faq", href: "/faq" },
] as const;

export const navbarNavigationItems = navigationItems.filter(
  (item) => item.key !== "library" && item.key !== "faq",
);

export type NavigationKey = (typeof navigationItems)[number]["key"];
