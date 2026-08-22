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
    signup: "Signup",
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
        value: "100,000+",
        label: "Students who have learned English",
      },
      {
        value: "16",
        label: "Number of branches throughout Uzbekistan",
      },
      {
        value: "500+",
        label: "The number of employees in Cambridge",
      },
    ],
  },
} satisfies Dictionary;
