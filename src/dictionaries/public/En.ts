import type { Dictionary } from "@/dictionaries/public/Types";

export const enDictionary = {
  navigation: {
    home: "Home",
    courses: "Courses",
    events: "Events",
    results: "Results",
    exams: "Exams",
    about: "About us",
    faq: "FAQ",
    contact: "Contact",
    menu: "Open menu",
    closeMenu: "Close menu",
    language: "Choose language",
    coursesCta: "Explore courses",
    login: "Login",
    logout: "Log out",
    signedInAs: "Signed in as",
    courseMenu: {
      ielts: "IELTS",
      cefr: "CEFR",
      englishGeneral: "English (general)",
      russian: "Russian",
      french: "French",
      german: "German",
      chinese: "Chinese",
    },
    examMenu: {
      ielts: "IELTS",
      cefr: "CEFR",
      mock: "MOCK",
    },
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
    highlights: [
      {
        value: "11+",
        label: "Years of experience",
      },
      {
        value: "7,850",
        label: "Number of students",
      },
      {
        value: "4",
        label: "Number of branches",
      },
      {
        value: "75+",
        label: "Number of employees at BEST LC",
      },
    ],
  },
} satisfies Dictionary;
