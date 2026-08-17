export const navigationItems = [
  { key: "home", href: "/website" },
  { key: "events", href: "/website/events" },
  { key: "courses", href: "/website/courses" },
  { key: "results", href: "/website/results" },
  { key: "exams", href: "/website/exams" },
  { key: "about", href: "/website/about" },
  { key: "contact", href: "/website/contact" },
  { key: "library", href: "/website/library" },
  { key: "faq", href: "/website/faq" },
] as const;

export const navbarNavigationItems = navigationItems.filter(
  (item) => item.key !== "library" && item.key !== "faq",
);

export type NavigationKey = (typeof navigationItems)[number]["key"];
