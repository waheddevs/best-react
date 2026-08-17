import type { Dictionary } from "@/dictionaries/types";

export const ruDictionary = {
  navigation: {
    home: "Главная",
    courses: "Курсы",
    events: "События",
    results: "Результаты",
    library: "Библиотека",
    exams: "Экзамены",
    about: "О нас",
    faq: "FAQ",
    contact: "Контакты",
    menu: "Открыть меню",
    closeMenu: "Закрыть меню",
    language: "Выбрать язык",
    themeLight: "Включить светлую тему",
    themeDark: "Включить тёмную тему",
    coursesCta: "Посмотреть курсы",
    login: "Войти",
    signup: "Регистрация",
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
    benefits: [
      {
        title: "Практический подход",
        description: "Закрепляйте теорию реальными заданиями и проектами.",
      },
      {
        title: "Опытные преподаватели",
        description: "Учитесь у наставников, знакомых с практикой индустрии.",
      },
      {
        title: "Фокус на результате",
        description: "Понятные цели и прозрачный путь развития на каждом этапе.",
      },
    ],
  },
} satisfies Dictionary;
