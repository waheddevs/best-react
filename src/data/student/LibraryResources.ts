import type { LibraryResource } from "@/types/student/Library";

export const libraryResources = [
  {
    slug: "weekly-study-plan",
    type: "checklist",
    title: { uz: "Haftalik o‘quv rejasi", ru: "Недельный учебный план", en: "Weekly study plan" },
    summary: {
      uz: "O‘quv maqsadini kichik, bajariladigan qadamlarga ajratish uchun sodda chek-list.",
      ru: "Простой чек-лист, который помогает разделить учебную цель на небольшие выполнимые шаги.",
      en: "A simple checklist for turning a learning goal into small, achievable steps.",
    },
    typeLabel: { uz: "Chek-list", ru: "Чек-лист", en: "Checklist" },
    readingTime: { uz: "5 daqiqa", ru: "5 минут", en: "5 min" },
    sections: {
      uz: [
        {
          heading: "Bitta asosiy maqsad",
          body: "Hafta oxiriga qadar erishmoqchi bo‘lgan bitta aniq natijani yozing.",
        },
        {
          heading: "Kichik qadamlar",
          body: "Maqsadni 20–40 daqiqalik amaliy vazifalarga ajrating.",
        },
        {
          heading: "Qisqa tahlil",
          body: "Hafta yakunida nima ishlagani va nimani o‘zgartirish kerakligini belgilang.",
        },
      ],
      ru: [
        {
          heading: "Одна главная цель",
          body: "Запишите один конкретный результат, которого хотите достичь к концу недели.",
        },
        {
          heading: "Небольшие шаги",
          body: "Разделите цель на практические задачи длительностью 20–40 минут.",
        },
        {
          heading: "Короткий разбор",
          body: "В конце недели отметьте, что сработало и что стоит изменить.",
        },
      ],
      en: [
        {
          heading: "One main goal",
          body: "Write one clear outcome you want to reach by the end of the week.",
        },
        {
          heading: "Small steps",
          body: "Break the goal into practical tasks that take 20–40 minutes.",
        },
        {
          heading: "Quick review",
          body: "At the end of the week, note what worked and what should change.",
        },
      ],
    },
  },
  {
    slug: "active-learning-guide",
    type: "guide",
    title: {
      uz: "Faol o‘rganish bo‘yicha qo‘llanma",
      ru: "Гид по активному обучению",
      en: "Active learning guide",
    },
    summary: {
      uz: "Materialni faqat o‘qish emas, balki savol, tushuntirish va amaliyot orqali o‘zlashtirish usullari.",
      ru: "Способы усваивать материал через вопросы, объяснение и практику, а не только чтение.",
      en: "Ways to learn through questions, explanation, and practice rather than reading alone.",
    },
    typeLabel: { uz: "Qo‘llanma", ru: "Гид", en: "Guide" },
    readingTime: { uz: "7 daqiqa", ru: "7 минут", en: "7 min" },
    sections: {
      uz: [
        {
          heading: "Savol bilan boshlang",
          body: "Mavzudan oldin bilmoqchi bo‘lgan uchta savolni yozing.",
        },
        {
          heading: "O‘z so‘zingiz bilan ayting",
          body: "O‘rgangan fikrni sodda jumlalar bilan qayta tushuntiring.",
        },
        {
          heading: "Darhol qo‘llang",
          body: "Yangi bilimdan foydalanadigan kichik mashq bajaring.",
        },
      ],
      ru: [
        {
          heading: "Начните с вопроса",
          body: "До изучения темы запишите три вопроса, на которые хотите получить ответ.",
        },
        {
          heading: "Объясните своими словами",
          body: "Перескажите изученную идею простыми предложениями.",
        },
        {
          heading: "Сразу примените",
          body: "Выполните небольшое упражнение с использованием нового знания.",
        },
      ],
      en: [
        {
          heading: "Start with a question",
          body: "Before the topic, write three questions you want to answer.",
        },
        { heading: "Explain it simply", body: "Restate the idea in your own clear words." },
        {
          heading: "Apply it now",
          body: "Complete one small exercise that uses the new knowledge.",
        },
      ],
    },
  },
  {
    slug: "exam-day-routine",
    type: "article",
    title: {
      uz: "Imtihon kuni uchun sokin reja",
      ru: "Спокойный план на день экзамена",
      en: "A calm exam-day routine",
    },
    summary: {
      uz: "Imtihon kuni diqqatni saqlashga yordam beradigan sodda va xavfsiz tayyorgarlik odatlari.",
      ru: "Простые и безопасные привычки, которые помогают сохранять концентрацию в день экзамена.",
      en: "Simple, safe preparation habits that help maintain focus on exam day.",
    },
    typeLabel: { uz: "Maqola", ru: "Статья", en: "Article" },
    readingTime: { uz: "4 daqiqa", ru: "4 минуты", en: "4 min" },
    sections: {
      uz: [
        {
          heading: "Oldindan tayyorlang",
          body: "Kerakli hujjat va anjomlarni bir kun oldin tekshiring.",
        },
        {
          heading: "Vaqt zaxirasi",
          body: "Yo‘l va ro‘yxatdan o‘tish uchun qo‘shimcha vaqt qoldiring.",
        },
        {
          heading: "Qisqa takrorlash",
          body: "Faqat asosiy eslatmalarni ko‘rib chiqing; yangi mavzu boshlamang.",
        },
      ],
      ru: [
        {
          heading: "Подготовьте заранее",
          body: "Проверьте необходимые документы и принадлежности за день до экзамена.",
        },
        {
          heading: "Запас времени",
          body: "Оставьте дополнительное время на дорогу и регистрацию.",
        },
        {
          heading: "Короткое повторение",
          body: "Просмотрите только основные заметки и не начинайте новую тему.",
        },
      ],
      en: [
        {
          heading: "Prepare ahead",
          body: "Check required documents and materials the day before.",
        },
        { heading: "Leave extra time", body: "Allow a buffer for travel and registration." },
        {
          heading: "Review briefly",
          body: "Look at key notes only and avoid starting a new topic.",
        },
      ],
    },
  },
] satisfies LibraryResource[];
