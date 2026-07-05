import type { Dictionary } from "@/dictionaries/types";

export const enDictionary = {
  navigation: {
    home: "Home",
    courses: "Courses",
    events: "Events",
    results: "Results",
    library: "Library",
    exams: "Exams",
    about: "About us",
    faq: "FAQ",
    contact: "Contact",
    menu: "Open menu",
    closeMenu: "Close menu",
    language: "Choose language",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    coursesCta: "Explore courses",
  },
  home: {
    eyebrow: "Practical knowledge. A confident direction.",
    titleLead: "Start your future",
    titleAccent: "today.",
    description:
      "Take your next step with modern courses, a clear learning path, and a practical approach built around real progress.",
    primaryCta: "Explore courses",
    secondaryCta: "Contact us",
    visualLabel: "Your learning path",
    visualTitle: "From knowledge to practical outcomes",
    visualProgress: "A flexible learning process",
    benefits: [
      {
        title: "Practical learning",
        description: "Turn theory into confidence through real exercises and projects.",
      },
      {
        title: "Experienced teachers",
        description: "Learn with mentors who understand real industry practice.",
      },
      {
        title: "Outcome focused",
        description: "Clear goals and a visible path forward at every stage.",
      },
    ],
  },
} satisfies Dictionary;
