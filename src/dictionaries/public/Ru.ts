import type { Dictionary } from "@/dictionaries/public/Types";

export const ruDictionary = {
  navigation: {
    home: "Главная",
    courses: "Курсы",
    events: "События",
    results: "Результаты",
    exams: "Экзамены",
    about: "О нас",
    faq: "FAQ",
    contact: "Контакты",
    menu: "Открыть меню",
    closeMenu: "Закрыть меню",
    language: "Выбрать язык",
    coursesCta: "Посмотреть курсы",
    login: "Войти",
    courseMenu: {
      ielts: "IELTS",
      cefr: "CEFR",
      englishGeneral: "Английский (общий)",
      russian: "Русский",
      french: "Французский",
      german: "Немецкий",
      chinese: "Китайский",
    },
    examMenu: {
      ielts: "IELTS",
      cefr: "CEFR",
      mock: "MOCK",
    },
  },
  home: {
    eyebrow: "Практические знания. Уверенный путь.",
    titleLead: "Начните своё",
    titleAccent: "будущее сегодня.",
    description:
      "Современные курсы, понятная траектория обучения и практический подход для уверенного следующего шага.",
    primaryCta: "Посмотреть курсы",
    secondaryCta: "Связаться с нами",
    visualLabel: "Ваш учебный маршрут",
    visualTitle: "От знаний к практическому результату",
    visualProgress: "Гибкий процесс обучения",
    highlights: [
      {
        value: "11+",
        label: "Лет опыта",
      },
      {
        value: "7 850",
        label: "Количество учащихся",
      },
      {
        value: "4",
        label: "Количество филиалов",
      },
      {
        value: "75+",
        label: "Количество сотрудников BEST LC",
      },
    ],
  },
} satisfies Dictionary;
