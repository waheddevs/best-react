export const navigationItems = [
  { key: "home", href: "/website" },
  { key: "courses", href: "/website/courses" },
  { key: "events", href: "/website/events" },
  { key: "results", href: "/website/results" },
  { key: "library", href: "/website/library" },
  { key: "exams", href: "/website/exams" },
  { key: "about", href: "/website/about" },
  { key: "faq", href: "/website/faq" },
  { key: "contact", href: "/website/contact" },
] as const;

export type NavigationKey = (typeof navigationItems)[number]["key"];
