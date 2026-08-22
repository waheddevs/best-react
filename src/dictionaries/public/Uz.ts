import type { Dictionary } from "@/dictionaries/public/Types";

export const uzDictionary = {
  navigation: {
    home: "Bosh sahifa",
    courses: "Kurslar",
    events: "Tadbirlar",
    results: "Natijalar",
    exams: "Imtihonlar",
    about: "Biz haqimizda",
    faq: "FAQ",
    contact: "Aloqa",
    menu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    language: "Tilni tanlash",
    coursesCta: "Kurslarni ko‘rish",
    login: "Kirish",
    signup: "Ro‘yxatdan o‘tish",
    courseMenu: {
      ielts: "IELTS",
      cefr: "CEFR",
      englishGeneral: "Ingliz tili (umumiy)",
      russian: "Rus tili",
      french: "Fransuz tili",
      german: "Nemis tili",
      chinese: "Xitoy tili",
    },
    examMenu: {
      ielts: "IELTS",
      cefr: "CEFR",
      mock: "MOCK",
    },
  },
  home: {
    eyebrow: "Amaliy bilim. Ishonchli yo‘nalish.",
    titleLead: "Kelajagingizni",
    titleAccent: "bugun boshlang.",
    description:
      "Zamonaviy kurslar, aniq o‘quv yo‘li va amaliy yondashuv bilan keyingi qadamingizni ishonch bilan tashlang.",
    primaryCta: "Kurslarni ko‘rish",
    secondaryCta: "Biz bilan bog‘lanish",
    visualLabel: "Sizning o‘quv yo‘lingiz",
    visualTitle: "Bilimdan amaliy natijagacha",
    visualProgress: "Moslashuvchan o‘quv jarayoni",
    highlights: [
      {
        value: "11+",
        label: "Yillik tajriba",
      },
      {
        value: "100 000+",
        label: "Ingliz tilini o‘rgangan o‘quvchilar",
      },
      {
        value: "16",
        label: "O‘zbekiston bo‘ylab filiallar soni",
      },
      {
        value: "500+",
        label: "Cambridge’dagi xodimlar soni",
      },
    ],
  },
} satisfies Dictionary;
