import type { Course, FaqItem, PublicEvent } from "@/types/PublicContent";

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

export const aboutFaqItems = [
  {
    id: "offline-application",
    category: "registration",
    question: {
      uz: "Oflayn kursga qanday ariza topshiraman?",
      ru: "Как подать заявку на офлайн-курс?",
      en: "How can I apply for an offline course?",
    },
    answer: {
      uz: "Kontakt formasida kurs nomini mavzu sifatida yozing, xabarda esa oflayn format va sizga qulay vaqtni ko‘rsating. Jamoa mavjud guruhlar va keyingi qadamlar bo‘yicha yo‘l-yo‘riq beradi.",
      ru: "Укажите название курса в теме формы, а в сообщении напишите, что вам нужен офлайн-формат, и добавьте удобное время. Команда подскажет доступные группы и следующие шаги.",
      en: "Add the course name as the form title, then mention that you prefer in-person learning and include a convenient time. The team will guide you through available groups and next steps.",
    },
  },
  {
    id: "course-guidance",
    category: "courses",
    question: {
      uz: "Qaysi kurs menga mosligini tanlashda yordam berasizmi?",
      ru: "Вы поможете выбрать подходящий курс?",
      en: "Can you help me choose the right course?",
    },
    answer: {
      uz: "Maqsadingiz, hozirgi darajangiz va haftalik jadvalingizni yozib qoldiring. Shu ma’lumotlar asosida sizga mos yo‘nalish va o‘quv formatini tavsiya qilish mumkin.",
      ru: "Расскажите о своей цели, текущем уровне и удобном недельном расписании. На основе этой информации можно подобрать подходящее направление и формат обучения.",
      en: "Share your goal, current level, and preferred weekly schedule. This information helps identify a suitable course direction and learning format.",
    },
  },
  {
    id: "placement-check",
    category: "courses",
    question: {
      uz: "Kursni boshlashdan oldin daraja testi kerakmi?",
      ru: "Нужно ли проходить тест уровня перед началом курса?",
      en: "Do I need a level check before starting?",
    },
    answer: {
      uz: "Til kurslarida mos guruhni aniqlash uchun qisqa daraja tekshiruvi tavsiya qilinishi mumkin. Uning formati tanlangan yo‘nalish va boshlang‘ich darajaga qarab belgilanadi.",
      ru: "Для языковых курсов может быть рекомендована короткая проверка уровня, чтобы подобрать подходящую группу. Формат зависит от выбранного направления и стартового уровня.",
      en: "A short level check may be recommended for language courses to find the right group. Its format depends on the selected direction and starting level.",
    },
  },
  {
    id: "class-schedule",
    category: "format",
    question: {
      uz: "Darslar qaysi kun va vaqtlarda o‘tkaziladi?",
      ru: "В какие дни и время проходят занятия?",
      en: "What days and times are classes available?",
    },
    answer: {
      uz: "Jadval kurs va shakllanayotgan guruhga bog‘liq. Murojaatda sizga qulay kun va vaqtni ko‘rsatsangiz, mos variantlarni solishtirish osonroq bo‘ladi.",
      ru: "Расписание зависит от курса и формирующейся группы. Укажите удобные дни и время в обращении, чтобы было проще сопоставить подходящие варианты.",
      en: "Schedules depend on the course and the group being formed. Include your preferred days and times so suitable options can be compared more easily.",
    },
  },
  {
    id: "format-change",
    category: "format",
    question: {
      uz: "Keyinchalik guruh yoki o‘qish formatini almashtirsam bo‘ladimi?",
      ru: "Можно ли позже сменить группу или формат обучения?",
      en: "Can I change my group or learning format later?",
    },
    answer: {
      uz: "Almashtirish imkoniyati tanlangan kurs, bo‘sh joylar va mavjud guruhlarga bog‘liq. Yangi variantga o‘tishdan oldin jadval va daraja mosligi tekshiriladi.",
      ru: "Возможность перехода зависит от курса, свободных мест и доступных групп. Перед сменой варианта проверяется соответствие расписания и уровня.",
      en: "Changes depend on the selected course, available places, and active groups. Schedule and level compatibility are checked before moving to another option.",
    },
  },
  {
    id: "reply-time",
    category: "registration",
    question: {
      uz: "Murojaatimga qachon javob olaman?",
      ru: "Когда я получу ответ на своё обращение?",
      en: "How soon will I receive a reply?",
    },
    answer: {
      uz: "Jamoa murojaatlarni imkon qadar tez ko‘rib chiqadi. Savolda kurs nomi, maqsad va qulay aloqa ma’lumoti bo‘lsa, aniqroq javob tayyorlash osonlashadi.",
      ru: "Команда старается рассматривать обращения как можно быстрее. Название курса, цель и удобный способ связи помогут подготовить более точный ответ.",
      en: "The team reviews enquiries as soon as possible. Including the course name, your goal, and a convenient contact detail makes it easier to prepare a useful reply.",
    },
  },
] satisfies FaqItem[];
