import type { Dictionary } from "@/dictionaries/types";

export const uzDictionary = {
  navigation: {
    home: "Bosh sahifa",
    courses: "Kurslar",
    events: "Tadbirlar",
    results: "Natijalar",
    library: "Kutubxona",
    exams: "Imtihonlar",
    about: "Biz haqimizda",
    faq: "FAQ",
    contact: "Aloqa",
    menu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    language: "Tilni tanlash",
    themeLight: "Yorug‘ rejimga o‘tish",
    themeDark: "Tungi rejimga o‘tish",
    coursesCta: "Kurslarni ko‘rish",
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
    benefits: [
      {
        title: "Amaliy yondashuv",
        description: "Nazariyani real mashqlar va loyihalar bilan mustahkamlang.",
      },
      {
        title: "Tajribali ustozlar",
        description: "Yo‘nalishni soha amaliyotini biladigan mentorlar bilan o‘rganing.",
      },
      {
        title: "Natijaga yo‘naltirilgan",
        description: "Har bir bosqichda aniq maqsad va tushunarli rivojlanish yo‘li.",
      },
    ],
  },
} satisfies Dictionary;
