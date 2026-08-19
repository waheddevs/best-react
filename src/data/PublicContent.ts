import type {
  ContactDetails,
  Course,
  FaqItem,
  LibraryResource,
  PublicEvent,
} from "@/types/PublicContent";

export const courses = [
  {
    slug: "english-foundations",
    category: "language",
    image: "/images/generated/english-foundations-class.webp",
    imageAlt: {
      uz: "Yorug‘ sinfda suhbat mashqini bajarayotgan o‘quvchilar guruhi",
      ru: "Группа учащихся практикует разговорную речь в светлом классе",
      en: "A group of learners practising conversation in a bright classroom",
    },
    title: {
      uz: "Ingliz tili: mustahkam asos",
      ru: "Английский язык: прочная база",
      en: "English: strong foundations",
    },
    summary: {
      uz: "Kundalik muloqot va keyingi darajalar uchun zarur til ko‘nikmalarini tizimli rivojlantirish dasturi.",
      ru: "Системная программа развития языковых навыков для повседневного общения и дальнейшего роста.",
      en: "A structured programme for building the language skills needed for daily communication and future progress.",
    },
    level: { uz: "Boshlang‘ich", ru: "Начальный", en: "Beginner" },
    format: "offline",
    formatLabel: { uz: "Oflayn", ru: "Офлайн", en: "In person" },
    duration: {
      uz: "Davomiyligi tasdiqlanmoqda",
      ru: "Продолжительность уточняется",
      en: "Duration to be confirmed",
    },
    audience: {
      uz: "Ingliz tilini tizimli boshlash yoki asosiy bilimlarini mustahkamlashni istagan o‘quvchilar uchun.",
      ru: "Для тех, кто хочет системно начать изучение английского или укрепить базовые знания.",
      en: "For learners who want to begin English systematically or strengthen their core knowledge.",
    },
    outcomes: {
      uz: [
        "Asosiy grammatik tuzilmalarni tushunish",
        "Kundalik mavzularda muloqot qilish",
        "Keyingi bosqich uchun o‘quv rejasini shakllantirish",
      ],
      ru: [
        "Понимать базовые грамматические конструкции",
        "Общаться на повседневные темы",
        "Сформировать план дальнейшего обучения",
      ],
      en: [
        "Understand core grammar structures",
        "Communicate about everyday topics",
        "Build a plan for the next learning stage",
      ],
    },
    curriculum: {
      uz: [
        "Talaffuz va asosiy lug‘at",
        "Kundalik grammatika",
        "Tinglab tushunish va suhbat",
        "Amaliy yakuniy topshiriq",
      ],
      ru: [
        "Произношение и базовая лексика",
        "Практическая грамматика",
        "Аудирование и разговор",
        "Итоговое практическое задание",
      ],
      en: [
        "Pronunciation and core vocabulary",
        "Practical grammar",
        "Listening and conversation",
        "Final practical task",
      ],
    },
    prerequisites: {
      uz: "Boshlang‘ich diagnostika tavsiya etiladi; aniq talablar tasdiqlanmoqda.",
      ru: "Рекомендуется стартовая диагностика; точные требования уточняются.",
      en: "An initial diagnostic is recommended; exact requirements are being confirmed.",
    },
    requiresConfirmation: true,
  },
  {
    slug: "digital-skills",
    category: "technology",
    image: "/images/generated/digital-skills-workshop.webp",
    imageAlt: {
      uz: "Zamonaviy sinfda noutbuk bilan birga ishlayotgan o‘quvchilar",
      ru: "Учащиеся совместно работают за ноутбуками в современном классе",
      en: "Learners collaborating with laptops in a modern classroom",
    },
    title: {
      uz: "Raqamli ko‘nikmalar",
      ru: "Цифровые навыки",
      en: "Digital skills",
    },
    summary: {
      uz: "O‘qish va ish jarayonida kerak bo‘ladigan zamonaviy raqamli vositalardan ongli foydalanish yo‘nalishi.",
      ru: "Практическое направление по осознанному использованию современных цифровых инструментов в учёбе и работе.",
      en: "A practical pathway for using modern digital tools confidently in study and work.",
    },
    level: { uz: "Boshlang‘ich", ru: "Начальный", en: "Beginner" },
    format: "hybrid",
    formatLabel: { uz: "Gibrid", ru: "Гибрид", en: "Hybrid" },
    duration: {
      uz: "Davomiyligi tasdiqlanmoqda",
      ru: "Продолжительность уточняется",
      en: "Duration to be confirmed",
    },
    audience: {
      uz: "Raqamli ish jarayonini tartibga solish va amaliy vositalarni o‘rganishni istaganlar uchun.",
      ru: "Для тех, кто хочет организовать цифровой рабочий процесс и освоить практические инструменты.",
      en: "For learners who want to organise their digital workflow and master practical tools.",
    },
    outcomes: {
      uz: [
        "Fayl va axborotni tartibli boshqarish",
        "Hamkorlik vositalaridan foydalanish",
        "Raqamli xavfsizlik asoslarini bilish",
      ],
      ru: [
        "Организовывать файлы и информацию",
        "Использовать инструменты совместной работы",
        "Знать основы цифровой безопасности",
      ],
      en: [
        "Organise files and information",
        "Use collaboration tools",
        "Understand digital safety basics",
      ],
    },
    curriculum: {
      uz: [
        "Raqamli ish muhiti",
        "Hujjatlar va taqdimotlar",
        "Onlayn hamkorlik",
        "Xavfsiz raqamli odatlar",
      ],
      ru: [
        "Цифровая рабочая среда",
        "Документы и презентации",
        "Онлайн-сотрудничество",
        "Безопасные цифровые привычки",
      ],
      en: [
        "Digital workspace",
        "Documents and presentations",
        "Online collaboration",
        "Safe digital habits",
      ],
    },
    prerequisites: {
      uz: "Shaxsiy qurilmadan asosiy darajada foydalana olish.",
      ru: "Базовое умение пользоваться личным устройством.",
      en: "Basic ability to use a personal device.",
    },
    requiresConfirmation: true,
  },
  {
    slug: "academic-preparation",
    category: "academic",
    image: "/images/generated/best-learning-environment-concept.webp",
    imageAlt: {
      uz: "Yorug‘ o‘quv muhitida materiallarni birga o‘rganayotgan talabalar",
      ru: "Студенты вместе изучают материалы в светлой учебной среде",
      en: "Students studying materials together in a bright learning environment",
    },
    title: {
      uz: "Akademik tayyorgarlik",
      ru: "Академическая подготовка",
      en: "Academic preparation",
    },
    summary: {
      uz: "Maqsad qo‘yish, samarali o‘qish va imtihonga tartibli tayyorlanish ko‘nikmalari uchun modul dastur.",
      ru: "Модульная программа по постановке целей, эффективному обучению и системной подготовке к экзаменам.",
      en: "A modular programme for goal setting, effective study, and structured exam preparation.",
    },
    level: { uz: "Barcha darajalar", ru: "Все уровни", en: "All levels" },
    format: "offline",
    formatLabel: { uz: "Oflayn", ru: "Офлайн", en: "In person" },
    duration: {
      uz: "Modullar bo‘yicha",
      ru: "По модулям",
      en: "Module based",
    },
    audience: {
      uz: "O‘qish jarayonini samarali rejalashtirish va tayyorgarlik usullarini yaxshilashni istagan o‘quvchilar uchun.",
      ru: "Для учащихся, которые хотят лучше планировать обучение и улучшить методы подготовки.",
      en: "For learners who want to plan their studies more effectively and improve preparation methods.",
    },
    outcomes: {
      uz: [
        "Aniq o‘quv maqsadini belgilash",
        "Vaqt va materialni rejalashtirish",
        "Tayyorgarlik natijasini tahlil qilish",
      ],
      ru: [
        "Ставить ясные учебные цели",
        "Планировать время и материалы",
        "Анализировать результат подготовки",
      ],
      en: ["Set clear learning goals", "Plan time and materials", "Review preparation outcomes"],
    },
    curriculum: {
      uz: [
        "Maqsad va diagnostika",
        "O‘qish strategiyalari",
        "Amaliy rejalashtirish",
        "Sinov va tahlil",
      ],
      ru: [
        "Цели и диагностика",
        "Стратегии обучения",
        "Практическое планирование",
        "Проверка и анализ",
      ],
      en: [
        "Goals and diagnostics",
        "Study strategies",
        "Practical planning",
        "Practice and review",
      ],
    },
    prerequisites: {
      uz: "Maxsus boshlang‘ich talab yo‘q.",
      ru: "Специальных начальных требований нет.",
      en: "No special entry requirement.",
    },
    requiresConfirmation: true,
  },
] satisfies Course[];

export const events: PublicEvent[] = [
  {
    slug: "open-learning-session",
    status: "upcoming",
    title: {
      uz: "Ochiq tanishuv darsi",
      ru: "Открытый вводный урок",
      en: "Open introduction session",
    },
    summary: {
      uz: "BEST LC o‘quv yondashuvi va dars jarayoni bilan tanishish uchun ochiq uchrashuv.",
      ru: "Открытая встреча, чтобы познакомиться с подходом BEST LC и форматом занятий.",
      en: "An open session introducing the BEST LC learning approach and class experience.",
    },
    formatLabel: { uz: "Oflayn", ru: "Офлайн", en: "In person" },
    dateLabel: { uz: "Sana tasdiqlanmoqda", ru: "Дата уточняется", en: "Date to be confirmed" },
    timeLabel: { uz: "Vaqt tasdiqlanmoqda", ru: "Время уточняется", en: "Time to be confirmed" },
    locationLabel: {
      uz: "Manzil tasdiqlanmoqda",
      ru: "Место уточняется",
      en: "Location to be confirmed",
    },
    topics: {
      uz: ["O‘quv yondashuvi", "Kurs yo‘nalishini tanlash", "Savol-javob"],
      ru: ["Подход к обучению", "Выбор направления", "Вопросы и ответы"],
      en: ["Learning approach", "Choosing a course direction", "Questions and answers"],
    },
    requiresConfirmation: true,
  },
  {
    slug: "study-planning-workshop",
    status: "upcoming",
    title: {
      uz: "O‘qishni rejalash ustaxonasi",
      ru: "Практикум по планированию обучения",
      en: "Study planning workshop",
    },
    summary: {
      uz: "Maqsadni aniq belgilash va haftalik o‘quv rejasini tuzishga bag‘ishlangan amaliy uchrashuv.",
      ru: "Практическая встреча по постановке целей и созданию недельного учебного плана.",
      en: "A practical workshop on setting goals and creating a weekly learning plan.",
    },
    formatLabel: { uz: "Onlayn yoki oflayn", ru: "Онлайн или офлайн", en: "Online or in person" },
    dateLabel: { uz: "Sana tasdiqlanmoqda", ru: "Дата уточняется", en: "Date to be confirmed" },
    timeLabel: { uz: "Vaqt tasdiqlanmoqda", ru: "Время уточняется", en: "Time to be confirmed" },
    locationLabel: {
      uz: "Format tasdiqlanmoqda",
      ru: "Формат уточняется",
      en: "Format to be confirmed",
    },
    topics: {
      uz: ["O‘quv maqsadi", "Haftalik reja", "Rivojlanishni kuzatish"],
      ru: ["Учебная цель", "Недельный план", "Отслеживание прогресса"],
      en: ["Learning goals", "Weekly planning", "Tracking progress"],
    },
    requiresConfirmation: true,
  },
];

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

export const faqItems = [
  {
    id: "course-choice",
    category: "courses",
    question: {
      uz: "Qaysi kurs menga mosligini qanday bilaman?",
      ru: "Как понять, какой курс мне подходит?",
      en: "How do I choose the right course?",
    },
    answer: {
      uz: "Maqsadingiz va hozirgi darajangizni aniqlashdan boshlang. Kurs tafsilotlari tasdiqlangach, mos yo‘nalishni tanlash uchun konsultatsiya jarayoni ham aniq ko‘rsatiladi.",
      ru: "Начните с определения цели и текущего уровня. После подтверждения программ будет описан и процесс консультации по выбору направления.",
      en: "Start by identifying your goal and current level. Once programmes are confirmed, the consultation path for choosing a direction will also be published.",
    },
  },
  {
    id: "lesson-format",
    category: "format",
    question: {
      uz: "Darslar qaysi formatda o‘tadi?",
      ru: "В каком формате проходят занятия?",
      en: "What learning formats are available?",
    },
    answer: {
      uz: "Katalogda oflayn, onlayn yoki gibrid format belgilanadi. Har bir yo‘nalishning yakuniy jadvali va formati BEST LC tomonidan tasdiqlangach yangilanadi.",
      ru: "В каталоге указывается офлайн, онлайн или гибридный формат. Итоговое расписание и формат обновятся после подтверждения BEST LC.",
      en: "The catalogue marks in-person, online, or hybrid delivery. Final schedules and formats will be updated after BEST LC confirmation.",
    },
  },
  {
    id: "exam-online",
    category: "exams",
    question: {
      uz: "Saytda imtihon topshirish mumkinmi?",
      ru: "Можно ли сдавать экзамен на сайте?",
      en: "Can I take an exam on this website?",
    },
    answer: {
      uz: "Yo‘q. Ushbu bosqichda sayt faqat imtihon yo‘nalishlari, qoidalar va tayyorgarlik qadamlari haqida ma’lumot beradi.",
      ru: "Нет. На этом этапе сайт предоставляет только информацию о направлениях, правилах и подготовке к экзаменам.",
      en: "No. At this stage, the website only explains exam directions, rules, and preparation steps.",
    },
  },
  {
    id: "event-registration",
    category: "events",
    question: {
      uz: "Tadbirga qanday yozilaman?",
      ru: "Как зарегистрироваться на событие?",
      en: "How do I register for an event?",
    },
    answer: {
      uz: "Tadbir sanasi va aloqa ma’lumotlari tasdiqlangach, ro‘yxatdan o‘tish bo‘yicha aniq ko‘rsatma shu sahifada beriladi.",
      ru: "После подтверждения даты и контактов на странице появится точная инструкция по регистрации.",
      en: "Once the date and contact details are confirmed, clear registration instructions will appear on the event page.",
    },
  },
  {
    id: "contact-service",
    category: "registration",
    question: {
      uz: "Aloqa formasi hozir ishlaydimi?",
      ru: "Форма связи уже работает?",
      en: "Is the contact form connected?",
    },
    answer: {
      uz: "Forma hozircha faqat ma’lumotlarni tekshiradi; yuborish xizmati keyingi bosqichda ulanadi va shaxsiy ma’lumot saqlanmaydi.",
      ru: "Сейчас форма только проверяет поля; отправка будет подключена на следующем этапе, а личные данные не сохраняются.",
      en: "The form currently validates fields only; submission will be connected later, and personal data is not stored.",
    },
  },
] satisfies FaqItem[];

export const contactDetails: ContactDetails = {
  email: null,
  phone: null,
  address: null,
  socials: [],
  requiresConfirmation: true,
};
