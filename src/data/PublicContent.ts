import footballMatchImage from "@/assets/events/FootballMatchLocker.webp";
import graduationCeremonyImage from "@/assets/events/GraduationCeremony.webp";
import movieDayImage from "@/assets/events/MovieDayCinema.webp";
import spellingBeeImage from "@/assets/events/SpellingBeeDesk.webp";
import webinarDrEdmundImage from "@/assets/events/WebinarDrEdmund.webp";
import type { FaqItem, PublicEvent } from "@/types/PublicContent";

// Client-preview content; replace with client-approved data before production.
export const events: PublicEvent[] = [
  {
    slug: "language-thinking-webinar",
    status: "upcoming",
    image: webinarDrEdmundImage,
    imageAlt: {
      uz: "Professor Edmund sahnada til va tafakkur mavzusida nutq so‘zlamoqda",
      ru: "Профессор Эдмунд выступает на сцене с лекцией о языке и мышлении",
      en: "Professor Edmund speaking on stage about language and thinking",
    },
    title: {
      uz: "Webinar",
      ru: "Webinar",
      en: "Webinar",
    },
    summary: {
      uz: "Dr. Edmund bilan tilning ishonchli fikrlash va g‘oyalarni ifodalashga ta’siri haqidagi amaliy vebinar.",
      ru: "Практический вебинар с доктором Эдмундом о влиянии языка на уверенное мышление и выражение идей.",
      en: "A practical webinar with Dr. Edmund on how language shapes confident thinking and clear expression.",
    },
    formatLabel: { uz: "Onlayn", ru: "Онлайн", en: "Online" },
    dateLabel: { uz: "7-iyun", ru: "7 июня", en: "June 7" },
    timeLabel: { uz: "18:30", ru: "18:30", en: "18:30" },
    durationLabel: { uz: "1,5 soat", ru: "1,5 ч", en: "1.5h" },
    locationLabel: {
      uz: "BEST onlayn studiyasi",
      ru: "Онлайн-студия BEST",
      en: "BEST Online Studio",
    },
    topics: {
      uz: ["Til va tafakkur", "Ishonchli nutq", "G‘oyalarni aniq ifodalash"],
      ru: ["Язык и мышление", "Уверенная речь", "Ясное выражение идей"],
      en: ["Language and thought", "Confident speaking", "Clear expression"],
    },
    requiresConfirmation: true,
  },
  {
    slug: "football-match",
    status: "upcoming",
    image: footballMatchImage,
    imageAlt: {
      uz: "Ochiq maydonda futbol o‘ynayotgan yoshlar",
      ru: "Молодые люди играют в футбол на открытом поле",
      en: "Young adults playing football on an outdoor pitch",
    },
    title: {
      uz: "Futbol uchrashuvi",
      ru: "Футбольный матч",
      en: "Football match",
    },
    summary: {
      uz: "Jamoaviy ruh, faol harakat va do‘stona raqobat uchun ochiq futbol uchrashuvi.",
      ru: "Открытый футбольный матч для командного духа, движения и дружеского соперничества.",
      en: "An open football match built around teamwork, movement, and friendly competition.",
    },
    formatLabel: { uz: "Oflayn", ru: "Офлайн", en: "In person" },
    dateLabel: { uz: "19-may", ru: "19 мая", en: "May 19" },
    timeLabel: { uz: "19:00", ru: "19:00", en: "19:00" },
    durationLabel: { uz: "2 soat", ru: "2 ч", en: "2h" },
    locationLabel: {
      uz: "BEST Arena, Toshkent",
      ru: "BEST Arena, Ташкент",
      en: "BEST Arena, Tashkent",
    },
    topics: {
      uz: ["Jamoaviy o‘yin", "Do‘stona bellashuv", "Faol hordiq"],
      ru: ["Командная игра", "Дружеское соревнование", "Активный отдых"],
      en: ["Team play", "Friendly competition", "Active recreation"],
    },
    requiresConfirmation: true,
  },
  {
    slug: "movie-day",
    status: "upcoming",
    image: movieDayImage,
    imageAlt: {
      uz: "Qizil kinoteatr o‘rindig‘idagi popkorn va 3D ko‘zoynak",
      ru: "Попкорн и 3D-очки на красном кресле кинотеатра",
      en: "Popcorn and 3D glasses on a red cinema chair",
    },
    title: {
      uz: "Kino kuni",
      ru: "День кино",
      en: "Movie day",
    },
    summary: {
      uz: "“Paddington” filmini inglizcha subtitrlar bilan tomosha qilish, popkorn va kichik guruh muhokamasidan iborat kino kuni.",
      ru: "Кинодень с показом «Приключений Паддингтона» с английскими субтитрами, попкорном и обсуждением в малых группах.",
      en: "A screening of “Paddington” with English subtitles, popcorn, and a guided small-group discussion.",
    },
    formatLabel: { uz: "Oflayn", ru: "Офлайн", en: "In person" },
    dateLabel: { uz: "24-may", ru: "24 мая", en: "May 24" },
    timeLabel: { uz: "16:00", ru: "16:00", en: "16:00" },
    durationLabel: { uz: "2 soat", ru: "2 ч", en: "2h" },
    locationLabel: {
      uz: "BEST Cinema Hall, Toshkent",
      ru: "BEST Cinema Hall, Ташкент",
      en: "BEST Cinema Hall, Tashkent",
    },
    topics: {
      uz: ["“Paddington” namoyishi", "Britancha ingliz tili", "Mehribonlik mavzusi"],
      ru: ["Показ «Паддингтона»", "Британский английский", "Тема доброты"],
      en: ["“Paddington” screening", "British English", "Kindness and belonging"],
    },
    requiresConfirmation: true,
  },
  {
    slug: "spelling-bee",
    status: "past",
    image: spellingBeeImage,
    imageAlt: {
      uz: "Stol ortida imlo topshirig‘ini bajarayotgan 3D ari",
      ru: "Трёхмерная пчела выполняет задание по правописанию за столом",
      en: "A 3D bee completing a spelling task at a desk",
    },
    title: {
      uz: "Spelling bee",
      ru: "Конкурс Spelling bee",
      en: "Spelling bee",
    },
    summary: {
      uz: "Inglizcha so‘zlarni to‘g‘ri harflab aytish, tez fikrlash va ishonch bilan javob berish bellashuvi.",
      ru: "Соревнование на правильное произношение английских слов по буквам, быстроту мышления и уверенные ответы.",
      en: "A friendly challenge in spelling English words, thinking quickly, and answering with confidence.",
    },
    formatLabel: { uz: "Oflayn", ru: "Офлайн", en: "In person" },
    dateLabel: { uz: "27-may", ru: "27 мая", en: "May 27" },
    timeLabel: { uz: "15:00", ru: "15:00", en: "15:00" },
    durationLabel: { uz: "1,5 soat", ru: "1,5 ч", en: "1.5h" },
    locationLabel: {
      uz: "BEST Academic Hall, Toshkent",
      ru: "BEST Academic Hall, Ташкент",
      en: "BEST Academic Hall, Tashkent",
    },
    topics: {
      uz: ["So‘zlarni harflash", "Tezkor bosqichlar", "Final bellashuv"],
      ru: ["Произнесение по буквам", "Быстрые раунды", "Финальное состязание"],
      en: ["Word spelling", "Quick rounds", "Final challenge"],
    },
    requiresConfirmation: true,
  },
  {
    slug: "graduation-ceremony",
    status: "past",
    image: graduationCeremonyImage,
    imageAlt: {
      uz: "Ko‘k akademik tasma va bitiruv qalpog‘idagi bitiruvchi",
      ru: "Выпускник в синей академической ленте и конфедератке",
      en: "A graduate wearing a blue academic stole and mortarboard",
    },
    title: {
      uz: "Bitiruv marosimi",
      ru: "Выпускная церемония",
      en: "Graduation ceremony",
    },
    summary: {
      uz: "O‘quvchilar yutuqlari, esdalik taqdirlashlari va umumiy fotosessiya bilan o‘tgan tantanali bitiruv kuni.",
      ru: "Торжественный выпускной день с признанием достижений учащихся, памятными наградами и общей фотосессией.",
      en: "A celebratory graduation day featuring learner achievements, commemorative awards, and a group photo session.",
    },
    formatLabel: { uz: "Oflayn", ru: "Офлайн", en: "In person" },
    dateLabel: { uz: "10-may", ru: "10 мая", en: "May 10" },
    timeLabel: { uz: "16:00", ru: "16:00", en: "16:00" },
    durationLabel: { uz: "2 soat", ru: "2 ч", en: "2h" },
    locationLabel: {
      uz: "BEST Celebration Hall, Toshkent",
      ru: "BEST Celebration Hall, Ташкент",
      en: "BEST Celebration Hall, Tashkent",
    },
    topics: {
      uz: ["Taqdirlash marosimi", "O‘quvchilar hikoyalari", "Fotosessiya"],
      ru: ["Церемония награждения", "Истории учащихся", "Фотосессия"],
      en: ["Awards ceremony", "Learner stories", "Photo session"],
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
