import type { Locale } from "@/config/Locales";

export type PageCopy = {
  common: {
    draftBadge: string;
    draftNote: string;
    learnMore: string;
    contactCta: string;
    coursesCta: string;
    noResults: string;
    search: string;
    all: string;
    details: string;
    back: string;
  };
  home: {
    coursesEyebrow: string;
    coursesTitle: string;
    coursesDescription: string;
    whyEyebrow: string;
    whyTitle: string;
    whyItems: Array<{ title: string; description: string }>;
    processEyebrow: string;
    processTitle: string;
    processItems: Array<{ title: string; description: string }>;
    resultsEyebrow: string;
    resultsTitle: string;
    resultsDescription: string;
    eventsEyebrow: string;
    eventsTitle: string;
    faqEyebrow: string;
    faqTitle: string;
    finalTitle: string;
    finalDescription: string;
  };
  courses: {
    title: string;
    description: string;
    searchPlaceholder: string;
    categoryLabel: string;
    categories: Record<"all" | "language" | "technology" | "academic", string>;
    level: string;
    format: string;
    duration: string;
    overview: string;
    audience: string;
    outcomes: string;
    curriculum: string;
    prerequisites: string;
    detailCtaTitle: string;
  };
  events: {
    title: string;
    description: string;
    upcoming: string;
    past: string;
    date: string;
    time: string;
    format: string;
    location: string;
    topics: string;
    registrationNote: string;
    noPast: string;
  };
  results: {
    title: string;
    description: string;
    noticeTitle: string;
    noticeBody: string;
    journeyTitle: string;
    journeySteps: Array<{ title: string; description: string }>;
    categoriesTitle: string;
    categories: Array<{ title: string; description: string }>;
    ctaTitle: string;
  };
  exams: {
    title: string;
    description: string;
    notice: string;
    directionsTitle: string;
    directions: Array<{ title: string; description: string }>;
    rulesTitle: string;
    rules: string[];
    preparationTitle: string;
    preparation: Array<{ title: string; description: string }>;
    scheduleTitle: string;
    scheduleBody: string;
  };
  about: {
    title: string;
    description: string;
    missionEyebrow: string;
    missionTitle: string;
    missionBody: string;
    approachTitle: string;
    values: Array<{ title: string; description: string }>;
    storyTitle: string;
    storyBody: string;
    environmentTitle: string;
    environmentBody: string;
  };
  faq: {
    title: string;
    description: string;
    categories: Record<"all" | "courses" | "format" | "exams" | "events" | "registration", string>;
    ctaTitle: string;
  };
  contact: {
    title: string;
    description: string;
    formTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    required: string;
    invalidEmail: string;
    serviceNotice: string;
    responseNotice: string;
  };
  footer: {
    summary: string;
    pages: string;
    courses: string;
    exams: string;
    contact: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    social: string;
    legalPlaceholder: string;
    copyright: string;
  };
};

const uz: PageCopy = {
  common: {
    draftBadge: "Tasdiqlanishi kutilmoqda",
    draftNote: "Dastur, jadval va biznes tafsilotlari BEST LC tomonidan tasdiqlangach yangilanadi.",
    learnMore: "Batafsil",
    contactCta: "Bog‘lanish",
    coursesCta: "Kurslarni ko‘rish",
    noResults: "Tanlangan mezonlarga mos natija topilmadi.",
    search: "Qidirish",
    all: "Barchasi",
    details: "Tafsilotlar",
    back: "Orqaga",
  },
  home: {
    coursesEyebrow: "Yo‘nalishni tanlang",
    coursesTitle: "Maqsadingizga mos o‘quv yo‘li",
    coursesDescription: "Har bir kurs amaliy rivojlanish uchun tushunarli bosqichlarga ajratilgan.",
    whyEyebrow: "Nima uchun BEST",
    whyTitle: "Bilimni harakatga aylantiradigan muhit",
    whyItems: [
      {
        title: "Aniq tuzilma",
        description: "Har bir bosqichda nima va nima uchun o‘rganayotganingizni ko‘rasiz.",
      },
      {
        title: "Faol ishtirok",
        description: "Mashq, savol va tahlil dars jarayonining markazida turadi.",
      },
      {
        title: "Insoniy qo‘llab-quvvatlash",
        description: "O‘quv yo‘li savol berish va fikr olishga qulay tashkil etiladi.",
      },
    ],
    processEyebrow: "O‘quv jarayoni",
    processTitle: "Tushunarli to‘rt qadam",
    processItems: [
      {
        title: "Maqsadni aniqlang",
        description: "Nimani o‘rganmoqchi ekaningiz va hozirgi darajangizni belgilang.",
      },
      {
        title: "Mos yo‘lni tanlang",
        description: "Format, daraja va maqsadga mos dastur bilan tanishing.",
      },
      {
        title: "Amaliyot qiling",
        description: "Bilimni mashq, loyiha va muntazam fikr-mulohaza bilan mustahkamlang.",
      },
      {
        title: "Keyingi qadamni ko‘ring",
        description: "Rivojlanishni tahlil qilib, navbatdagi o‘quv maqsadini belgilang.",
      },
    ],
    resultsEyebrow: "Ochiq natijalar",
    resultsTitle: "Haqiqiy hikoyalar uchun halol joy",
    resultsDescription:
      "Tasdiqlangan o‘quvchi hikoyalari va natijalar taqdim etilgach, ular shu bo‘limda faktlar bilan e’lon qilinadi.",
    eventsEyebrow: "Tadbirlar",
    eventsTitle: "O‘rganish uchun yangi uchrashuvlar",
    faqEyebrow: "Savollar",
    faqTitle: "Boshlashdan oldin bilish foydali bo‘lgan javoblar",
    finalTitle: "Keyingi qadamingizni birga aniqlaymiz",
    finalDescription:
      "Kurslar bilan tanishing yoki savolingizni aloqa sahifasida qoldirishga tayyorlang.",
  },
  courses: {
    title: "Kurslar",
    description:
      "Tillar, imtihon tayyorgarligi va amaliy ko‘nikmalar uchun maqsadingizga mos o‘quv yo‘lini tanlang.",
    searchPlaceholder: "Kurs nomi yoki yo‘nalishini qidiring",
    categoryLabel: "Kurs toifasi",
    categories: {
      all: "Barchasi",
      language: "Tillar",
      technology: "Texnologiya",
      academic: "Akademik",
    },
    level: "Daraja",
    format: "Format",
    duration: "Davomiylik",
    overview: "Kurs haqida",
    audience: "Kimlar uchun",
    outcomes: "Nimalarni o‘rganasiz",
    curriculum: "Dastur ko‘rinishi",
    prerequisites: "Boshlash uchun",
    detailCtaTitle: "Bu yo‘nalish sizga mosmi?",
  },
  events: {
    title: "Tadbirlar",
    description:
      "Ochiq darslar, suhbat uchrashuvlari va amaliy workshoplar orqali bilimni jonli muhitda sinab ko‘ring.",
    upcoming: "Kutilayotgan",
    past: "O‘tgan",
    date: "Sana",
    time: "Vaqt",
    format: "Format",
    location: "Manzil",
    topics: "Asosiy mavzular",
    registrationNote:
      "Ro‘yxatdan o‘tish xizmati ulanmagan. Tasdiqlangan aloqa yo‘li keyin qo‘shiladi.",
    noPast: "Tasdiqlangan o‘tgan tadbirlar hozircha kiritilmagan.",
  },
  results: {
    title: "Natijalar",
    description:
      "Maqsadni belgilang, muntazam mashq qiling va har bir bosqichdagi o‘sishni aniq mezonlar bilan kuzating.",
    noticeTitle: "Soxta raqamlar o‘rniga ochiq mezonlar",
    noticeBody:
      "Real statistika, ism, surat, iqtibos va ballar berilmagani sababli biz ularni uydirmaymiz. Tasdiqlangan materiallar kelgach, ular markazlashtirilgan kontent orqali qo‘shiladi.",
    journeyTitle: "Rivojlanish yo‘li qanday ko‘rsatiladi",
    journeySteps: [
      {
        title: "Boshlang‘ich nuqta",
        description:
          "O‘quvchining maqsadi va boshlang‘ich holati faqat rozilik bilan qayd etiladi.",
      },
      {
        title: "Amaliy jarayon",
        description:
          "Bajarilgan vazifalar va rivojlangan ko‘nikmalar aniq dalillar bilan ko‘rsatiladi.",
      },
      {
        title: "Tasdiqlangan natija",
        description: "Faqat tekshirilgan yakun va o‘quvchining ruxsati bilan e’lon qilinadi.",
      },
    ],
    categoriesTitle: "Natija yo‘nalishlari",
    categories: [
      {
        title: "Til ko‘nikmalari",
        description: "Muloqot, tinglash, yozish va tushunishdagi tasdiqlangan rivojlanish.",
      },
      {
        title: "Amaliy loyihalar",
        description: "O‘quv jarayonida yaratilgan ishlar va qo‘llangan ko‘nikmalar.",
      },
      {
        title: "O‘quv odatlari",
        description: "Rejalash, mustaqil o‘rganish va muntazamlikdagi ijobiy o‘zgarishlar.",
      },
    ],
    ctaTitle: "O‘z o‘quv yo‘lingizni boshlashga tayyormisiz?",
  },
  exams: {
    title: "Imtihonlar",
    description:
      "IELTS, CEFR va MOCK formatlarini tushuning, shaxsiy reja tuzing va tartibli tayyorgarlikni boshlang.",
    notice:
      "Bu sahifada imtihon topshirib bo‘lmaydi: savol, taymer, javob yuborish, ball va sertifikat funksiyasi mavjud emas.",
    directionsTitle: "Yo‘nalishlar",
    directions: [
      {
        title: "Til darajasini aniqlash",
        description: "Format va sanalar BEST LC tomonidan tasdiqlangach e’lon qilinadi.",
      },
      {
        title: "Akademik diagnostika",
        description: "Tayyorgarlik ehtiyojini tushunishga yordam beruvchi axborot yo‘nalishi.",
      },
      {
        title: "Sinov formati bilan tanishish",
        description: "Tasdiqlangan namunalar va qoidalar mavjud bo‘lganda shu yerga qo‘shiladi.",
      },
    ],
    rulesTitle: "Umumiy qoidalar",
    rules: [
      "Tasdiqlangan hujjat va ro‘yxatdan o‘tish talablarini oldindan tekshiring.",
      "Belgilangan vaqtdan oldin kelish uchun zaxira reja tuzing.",
      "Faqat ruxsat etilgan anjomlardan foydalaning.",
      "Yakuniy qoidalar e’lon qilingan imtihon yo‘riqnomasiga bog‘liq.",
    ],
    preparationTitle: "Tayyorgarlik qadamlari",
    preparation: [
      {
        title: "Talabni aniqlang",
        description: "Imtihon turi, maqsad va kerakli darajani tushunib oling.",
      },
      {
        title: "Boshlang‘ich holatni tekshiring",
        description: "Kuchli tomon va rivojlantirish kerak bo‘lgan mavzularni belgilang.",
      },
      {
        title: "Reja bilan mashq qiling",
        description: "Muntazam qisqa mashq va tahlil orqali tayyorlaning.",
      },
      {
        title: "Rasmiy ma’lumotni tekshiring",
        description: "Sana, joy va qoidalarni tasdiqlangan manbadan qayta ko‘ring.",
      },
    ],
    scheduleTitle: "Imtihon jadvali",
    scheduleBody: "Tasdiqlangan sana va joy ma’lumoti hozircha taqdim etilmagan.",
  },
  about: {
    title: "Biz haqimizda",
    description:
      "Aniq maqsad, amaliy mashq va insoniy qo‘llab-quvvatlashni birlashtiradigan zamonaviy ta’lim muhiti.",
    missionEyebrow: "Missiya",
    missionTitle: "O‘rganishni aniq yo‘lga aylantirish",
    missionBody:
      "Bizning yo‘nalishimiz — o‘quvchiga maqsadini tushunish, amaliy bilim olish va keyingi qadamni ishonch bilan ko‘rishga yordam beradigan muhit yaratish.",
    approachTitle: "Ta’lim yondashuvi",
    values: [
      {
        title: "Aniqlik",
        description: "Maqsad, jarayon va kutilayotgan natija sodda tilda tushuntiriladi.",
      },
      {
        title: "Amaliylik",
        description: "Bilim faqat eslab qolish emas, qo‘llash orqali mustahkamlanadi.",
      },
      {
        title: "Hurmat",
        description: "Har bir o‘quvchining tempi, savoli va rivojlanish yo‘li qadrlanadi.",
      },
      {
        title: "Halollik",
        description: "Tasdiqlanmagan raqam, hamkorlik yoki yutuq fakt sifatida berilmaydi.",
      },
    ],
    storyTitle: "BEST hikoyasi",
    storyBody:
      "Asos solingan yil, filiallar, jamoa va hamkorliklar haqida tasdiqlangan ma’lumot hali berilmagan. Bu bo‘lim real brend tarixi kelgach yangilanadi.",
    environmentTitle: "O‘quv muhiti",
    environmentBody:
      "Yorug‘, tartibli va hamkorlikka mos o‘quv muhiti konsepsiyasi. Tasvir real BEST LC manzili sifatida emas, brend yo‘nalishi sifatida taqdim etiladi.",
  },
  faq: {
    title: "Ko‘p so‘raladigan savollar",
    description:
      "Kurslar, dars formati, imtihonlar, tadbirlar va bog‘lanish jarayoni haqida qisqa javoblar.",
    categories: {
      all: "Barchasi",
      courses: "Kurslar",
      format: "Format",
      exams: "Imtihonlar",
      events: "Tadbirlar",
      registration: "Bog‘lanish",
    },
    ctaTitle: "Javob topilmadimi?",
  },
  contact: {
    title: "Aloqa",
    description:
      "Kurs tanlash, imtihon yo‘nalishi yoki o‘quv rejasi haqidagi savolingizni bir joyda tayyorlang.",
    formTitle: "Savollaringiz bormi?",
    firstName: "Ism",
    lastName: "Familiya",
    email: "Email manzilingiz",
    subject: "Mavzu",
    message: "Xabaringiz",
    send: "Yuborish",
    required: "Bu maydonni to‘ldiring.",
    invalidEmail: "Email manzilini to‘g‘ri kiriting.",
    serviceNotice: "Yuborish xizmati keyingi bosqichda ulanadi.",
    responseNotice:
      "Savolingiz bo‘lsa, biz bilan bog‘laning — jamoamiz sizga tez orada javob beradi.",
  },
  footer: {
    summary:
      "Til o‘rganish, imtihonlarga tayyorgarlik va ishonchli natija sari zamonaviy ta’lim muhiti.",
    pages: "Sahifalar",
    courses: "Kurslar",
    exams: "Imtihonlar",
    contact: "Aloqa",
    address: "12 Ta’lim ko‘chasi, Toshkent 100000",
    phone: "+998 71 000 00 00",
    email: "hello@bestlc.example",
    hours: "Du–Ju: 09:00–18:00",
    social: "Ijtimoiy tarmoqlar",
    legalPlaceholder: "Maxfiylik va foydalanish shartlari keyingi bosqichda tasdiqlanadi.",
    copyright: "BEST LC. Barcha huquqlar himoyalangan.",
  },
};

const ru: PageCopy = {
  ...uz,
  common: {
    draftBadge: "Ожидает подтверждения",
    draftNote: "Программа, расписание и бизнес-данные обновятся после подтверждения BEST LC.",
    learnMore: "Подробнее",
    contactCta: "Связаться",
    coursesCta: "Посмотреть курсы",
    noResults: "По выбранным параметрам ничего не найдено.",
    search: "Поиск",
    all: "Все",
    details: "Подробнее",
    back: "Назад",
  },
  home: {
    coursesEyebrow: "Выберите направление",
    coursesTitle: "Учебный путь под вашу цель",
    coursesDescription: "Каждый курс разделён на понятные этапы практического развития.",
    whyEyebrow: "Почему BEST",
    whyTitle: "Среда, которая превращает знания в действие",
    whyItems: [
      {
        title: "Ясная структура",
        description: "На каждом этапе вы понимаете, что изучаете и зачем.",
      },
      {
        title: "Активное участие",
        description: "Практика, вопросы и разбор находятся в центре занятия.",
      },
      {
        title: "Человеческая поддержка",
        description:
          "Учебный путь организован так, чтобы было удобно спрашивать и получать обратную связь.",
      },
    ],
    processEyebrow: "Процесс обучения",
    processTitle: "Четыре понятных шага",
    processItems: [
      {
        title: "Определите цель",
        description: "Уточните, что хотите изучить и где находитесь сейчас.",
      },
      {
        title: "Выберите маршрут",
        description: "Познакомьтесь с программой, подходящей по формату, уровню и цели.",
      },
      {
        title: "Практикуйтесь",
        description: "Закрепляйте знания через задания, проекты и регулярную обратную связь.",
      },
      {
        title: "Увидьте следующий шаг",
        description: "Разберите прогресс и определите новую учебную цель.",
      },
    ],
    resultsEyebrow: "Открытые результаты",
    resultsTitle: "Честное место для реальных историй",
    resultsDescription:
      "Когда будут предоставлены подтверждённые истории и результаты учеников, они появятся здесь вместе с фактами.",
    eventsEyebrow: "События",
    eventsTitle: "Новые встречи для обучения",
    faqEyebrow: "Вопросы",
    faqTitle: "Полезные ответы перед началом",
    finalTitle: "Определим ваш следующий шаг вместе",
    finalDescription: "Познакомьтесь с курсами или подготовьте вопрос для страницы контактов.",
  },
  courses: {
    title: "Курсы",
    description:
      "Выберите понятный учебный маршрут: языки, подготовка к экзаменам и практические навыки в удобном формате.",
    searchPlaceholder: "Поиск по названию или направлению",
    categoryLabel: "Категория курса",
    categories: {
      all: "Все",
      language: "Языки",
      technology: "Технологии",
      academic: "Академические",
    },
    level: "Уровень",
    format: "Формат",
    duration: "Продолжительность",
    overview: "О курсе",
    audience: "Для кого",
    outcomes: "Чему вы научитесь",
    curriculum: "Структура программы",
    prerequisites: "Перед началом",
    detailCtaTitle: "Подходит ли вам это направление?",
  },
  events: {
    title: "События",
    description: "Открытые уроки, разговорные встречи и практические воркшопы для живого обучения.",
    upcoming: "Предстоящие",
    past: "Прошедшие",
    date: "Дата",
    time: "Время",
    format: "Формат",
    location: "Место",
    topics: "Основные темы",
    registrationNote:
      "Регистрация пока не подключена. Подтверждённый способ связи будет добавлен позже.",
    noPast: "Подтверждённых прошедших событий пока нет.",
  },
  results: {
    title: "Результаты",
    description:
      "Поставьте цель, практикуйтесь регулярно и отслеживайте каждый этап развития по понятным критериям.",
    noticeTitle: "Открытые критерии вместо вымышленных цифр",
    noticeBody:
      "Пока реальные показатели, имена, фотографии, цитаты и баллы не предоставлены, мы их не придумываем. Подтверждённые материалы будут добавлены централизованно.",
    journeyTitle: "Как будет показан прогресс",
    journeySteps: [
      {
        title: "Начальная точка",
        description: "Цель и исходный уровень фиксируются только с согласия ученика.",
      },
      {
        title: "Практический процесс",
        description:
          "Выполненные задачи и развитые навыки показываются с конкретными подтверждениями.",
      },
      {
        title: "Подтверждённый результат",
        description: "Итог публикуется только после проверки и с разрешения ученика.",
      },
    ],
    categoriesTitle: "Направления результата",
    categories: [
      {
        title: "Языковые навыки",
        description: "Подтверждённый прогресс в общении, аудировании, письме и понимании.",
      },
      {
        title: "Практические проекты",
        description: "Работы и навыки, применённые во время обучения.",
      },
      {
        title: "Учебные привычки",
        description: "Положительные изменения в планировании, самостоятельности и регулярности.",
      },
    ],
    ctaTitle: "Готовы начать свой учебный путь?",
  },
  exams: {
    title: "Экзамены",
    description: "Разберитесь в форматах IELTS, CEFR и MOCK, составьте план и готовьтесь системно.",
    notice:
      "Сдать экзамен на этой странице нельзя: здесь нет вопросов, таймера, отправки ответов, баллов или сертификатов.",
    directionsTitle: "Направления",
    directions: [
      {
        title: "Определение языкового уровня",
        description: "Формат и даты будут опубликованы после подтверждения BEST LC.",
      },
      {
        title: "Академическая диагностика",
        description: "Информационное направление для понимания потребностей в подготовке.",
      },
      {
        title: "Знакомство с форматом теста",
        description: "Подтверждённые примеры и правила будут добавлены при наличии.",
      },
    ],
    rulesTitle: "Общие правила",
    rules: [
      "Заранее проверьте подтверждённые документы и требования регистрации.",
      "Запланируйте запас времени, чтобы прийти раньше.",
      "Используйте только разрешённые материалы.",
      "Окончательные правила зависят от опубликованной инструкции экзамена.",
    ],
    preparationTitle: "Шаги подготовки",
    preparation: [
      {
        title: "Уточните требования",
        description: "Определите тип экзамена, цель и нужный уровень.",
      },
      {
        title: "Проверьте стартовый уровень",
        description: "Отметьте сильные стороны и темы для развития.",
      },
      {
        title: "Тренируйтесь по плану",
        description: "Готовьтесь через регулярную короткую практику и анализ.",
      },
      {
        title: "Проверьте официальные данные",
        description: "Повторно уточните дату, место и правила в подтверждённом источнике.",
      },
    ],
    scheduleTitle: "Расписание экзаменов",
    scheduleBody: "Подтверждённые даты и место пока не предоставлены.",
  },
  about: {
    title: "О нас",
    description:
      "Современная учебная среда, объединяющая ясные цели, практику и человеческую поддержку.",
    missionEyebrow: "Миссия",
    missionTitle: "Превращать обучение в ясный маршрут",
    missionBody:
      "Наше направление — создавать среду, где ученик понимает цель, получает практические знания и уверенно видит следующий шаг.",
    approachTitle: "Подход к обучению",
    values: [
      {
        title: "Ясность",
        description: "Цель, процесс и ожидаемый результат объясняются простым языком.",
      },
      {
        title: "Практичность",
        description: "Знание закрепляется через применение, а не только запоминание.",
      },
      { title: "Уважение", description: "Ценятся темп, вопросы и индивидуальный путь ученика." },
      {
        title: "Честность",
        description: "Неподтверждённые цифры, партнёрства или достижения не выдаются за факты.",
      },
    ],
    storyTitle: "История BEST",
    storyBody:
      "Подтверждённые сведения о годе основания, филиалах, команде и партнёрствах пока не предоставлены. Раздел будет обновлён после получения реальной истории бренда.",
    environmentTitle: "Учебная среда",
    environmentBody:
      "Концепция светлой, организованной и совместной учебной среды. Изображение представляет направление бренда, а не реальный адрес BEST LC.",
  },
  faq: {
    title: "Частые вопросы",
    description: "Короткие ответы о курсах, формате, экзаменах, событиях и связи.",
    categories: {
      all: "Все",
      courses: "Курсы",
      format: "Формат",
      exams: "Экзамены",
      events: "События",
      registration: "Связь",
    },
    ctaTitle: "Не нашли ответ?",
  },
  contact: {
    title: "Контакты",
    description:
      "Подготовьте вопрос о выборе курса, экзаменационном направлении или учебном плане.",
    formTitle: "У вас есть вопросы?",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Ваш email",
    subject: "Тема",
    message: "Сообщение",
    send: "Отправить",
    required: "Заполните это поле.",
    invalidEmail: "Введите корректный email.",
    serviceNotice: "Отправка будет подключена на следующем этапе.",
    responseNotice:
      "Свяжитесь с нами, если у вас есть вопрос — наша команда ответит вам в ближайшее время.",
  },
  footer: {
    summary:
      "Современная образовательная среда для изучения языков, подготовки к экзаменам и уверенного результата.",
    pages: "Страницы",
    courses: "Курсы",
    exams: "Экзамены",
    contact: "Контакты",
    address: "ул. Образования, 12, Ташкент 100000",
    phone: "+998 71 000 00 00",
    email: "hello@bestlc.example",
    hours: "Пн–Пт: 09:00–18:00",
    social: "Социальные сети",
    legalPlaceholder: "Политика конфиденциальности и условия будут подтверждены позже.",
    copyright: "BEST LC. Все права защищены.",
  },
};

const en: PageCopy = {
  ...uz,
  common: {
    draftBadge: "Awaiting confirmation",
    draftNote:
      "Programme, schedule, and business details will be updated after BEST LC confirmation.",
    learnMore: "Learn more",
    contactCta: "Contact us",
    coursesCta: "Explore courses",
    noResults: "No results match the selected filters.",
    search: "Search",
    all: "All",
    details: "Details",
    back: "Back",
  },
  home: {
    coursesEyebrow: "Choose a direction",
    coursesTitle: "A learning path built around your goal",
    coursesDescription: "Each course is organised into clear stages for practical development.",
    whyEyebrow: "Why BEST",
    whyTitle: "An environment that turns knowledge into action",
    whyItems: [
      {
        title: "Clear structure",
        description: "At every stage, you understand what you are learning and why.",
      },
      {
        title: "Active participation",
        description: "Practice, questions, and reflection sit at the centre of each lesson.",
      },
      {
        title: "Human support",
        description:
          "The learning path makes it comfortable to ask questions and receive feedback.",
      },
    ],
    processEyebrow: "Learning process",
    processTitle: "Four clear steps",
    processItems: [
      {
        title: "Define your goal",
        description: "Clarify what you want to learn and where you are now.",
      },
      {
        title: "Choose the right path",
        description: "Explore a programme that fits your format, level, and goal.",
      },
      {
        title: "Practise actively",
        description: "Strengthen knowledge through exercises, projects, and regular feedback.",
      },
      {
        title: "See the next step",
        description: "Review your progress and set the next learning goal.",
      },
    ],
    resultsEyebrow: "Open outcomes",
    resultsTitle: "An honest place for real stories",
    resultsDescription:
      "When verified learner stories and outcomes are supplied, they will be published here with supporting facts.",
    eventsEyebrow: "Events",
    eventsTitle: "New sessions that support learning",
    faqEyebrow: "Questions",
    faqTitle: "Useful answers before you begin",
    finalTitle: "Let’s clarify your next step together",
    finalDescription: "Explore the courses or prepare your question for the contact page.",
  },
  courses: {
    title: "Courses",
    description:
      "Choose a clear learning path for languages, exam preparation, and practical skills in a format that suits you.",
    searchPlaceholder: "Search by course name or direction",
    categoryLabel: "Course category",
    categories: {
      all: "All",
      language: "Languages",
      technology: "Technology",
      academic: "Academic",
    },
    level: "Level",
    format: "Format",
    duration: "Duration",
    overview: "Course overview",
    audience: "Who it is for",
    outcomes: "What you will learn",
    curriculum: "Programme preview",
    prerequisites: "Before you start",
    detailCtaTitle: "Is this direction right for you?",
  },
  events: {
    title: "Events",
    description:
      "Explore open lessons, conversation sessions, and practical workshops designed for active learning.",
    upcoming: "Upcoming",
    past: "Past",
    date: "Date",
    time: "Time",
    format: "Format",
    location: "Location",
    topics: "Key topics",
    registrationNote:
      "Registration is not connected. A confirmed contact route will be added later.",
    noPast: "No confirmed past events have been added yet.",
  },
  results: {
    title: "Results",
    description:
      "Set a goal, practise consistently, and follow each stage of development through clear criteria.",
    noticeTitle: "Open criteria instead of invented numbers",
    noticeBody:
      "Because real metrics, names, photos, quotes, and scores have not been provided, we do not fabricate them. Confirmed materials will be added through centralised content.",
    journeyTitle: "How progress will be presented",
    journeySteps: [
      {
        title: "Starting point",
        description: "A learner’s goal and initial position are recorded only with consent.",
      },
      {
        title: "Practical process",
        description: "Completed work and developed skills are shown with clear evidence.",
      },
      {
        title: "Verified outcome",
        description:
          "The final outcome is published only after verification and learner permission.",
      },
    ],
    categoriesTitle: "Outcome directions",
    categories: [
      {
        title: "Language skills",
        description: "Verified progress in communication, listening, writing, and understanding.",
      },
      {
        title: "Practical projects",
        description: "Work created and skills applied during the learning process.",
      },
      {
        title: "Learning habits",
        description: "Positive change in planning, independent study, and consistency.",
      },
    ],
    ctaTitle: "Ready to start your learning path?",
  },
  exams: {
    title: "Exams",
    description:
      "Understand IELTS, CEFR, and MOCK formats, build a plan, and prepare with a clear structure.",
    notice:
      "You cannot take an exam on this page: there are no questions, timer, answer submission, scoring, or certificates.",
    directionsTitle: "Directions",
    directions: [
      {
        title: "Language level diagnostics",
        description: "Format and dates will be published after BEST LC confirmation.",
      },
      {
        title: "Academic diagnostics",
        description: "An information direction for understanding preparation needs.",
      },
      {
        title: "Test-format orientation",
        description: "Verified samples and rules will be added when available.",
      },
    ],
    rulesTitle: "General rules",
    rules: [
      "Check confirmed document and registration requirements in advance.",
      "Plan enough time to arrive before the stated start.",
      "Use only permitted materials.",
      "Final rules depend on the published exam instructions.",
    ],
    preparationTitle: "Preparation steps",
    preparation: [
      {
        title: "Clarify the requirement",
        description: "Understand the exam type, goal, and required level.",
      },
      {
        title: "Check your starting point",
        description: "Identify strengths and topics that need development.",
      },
      {
        title: "Practise with a plan",
        description: "Prepare through regular short practice and review.",
      },
      {
        title: "Verify official details",
        description: "Recheck the date, location, and rules in a confirmed source.",
      },
    ],
    scheduleTitle: "Exam schedule",
    scheduleBody: "Confirmed dates and location details have not been provided yet.",
  },
  about: {
    title: "About us",
    description:
      "A modern learning environment built around clear goals, practical work, and human support.",
    missionEyebrow: "Mission",
    missionTitle: "Turn learning into a clear path",
    missionBody:
      "Our direction is to create an environment where learners understand their goal, gain practical knowledge, and see the next step with confidence.",
    approachTitle: "Learning approach",
    values: [
      {
        title: "Clarity",
        description: "Goals, process, and expected outcomes are explained in plain language.",
      },
      {
        title: "Practicality",
        description: "Knowledge grows through application, not memorisation alone.",
      },
      {
        title: "Respect",
        description: "Each learner’s pace, questions, and development path are valued.",
      },
      {
        title: "Honesty",
        description:
          "Unverified numbers, partnerships, or achievements are never presented as facts.",
      },
    ],
    storyTitle: "The BEST story",
    storyBody:
      "Verified information about the founding year, branches, team, and partnerships has not been supplied. This section will be updated when the real brand story is available.",
    environmentTitle: "Learning environment",
    environmentBody:
      "A concept for a bright, organised, collaborative learning environment. The image represents the brand direction, not a real BEST LC location.",
  },
  faq: {
    title: "Frequently asked questions",
    description: "Short answers about courses, formats, exams, events, and getting in touch.",
    categories: {
      all: "All",
      courses: "Courses",
      format: "Format",
      exams: "Exams",
      events: "Events",
      registration: "Contact",
    },
    ctaTitle: "Still have a question?",
  },
  contact: {
    title: "Contact",
    description:
      "Prepare your question about choosing a course, an exam direction, or a personal learning plan.",
    formTitle: "Do you have questions?",
    firstName: "First name",
    lastName: "Last name",
    email: "Your email",
    subject: "Title",
    message: "Message",
    send: "Send",
    required: "Complete this field.",
    invalidEmail: "Enter a valid email address.",
    serviceNotice: "Submission will be connected in the next phase.",
    responseNotice: "Have a question? Get in touch — our team will get back to you shortly.",
  },
  footer: {
    summary:
      "A modern learning environment for language growth, exam preparation, and confident progress.",
    pages: "Pages",
    courses: "Courses",
    exams: "Exams",
    contact: "Contact",
    address: "12 Education Street, Tashkent 100000",
    phone: "+998 71 000 00 00",
    email: "hello@bestlc.example",
    hours: "Mon–Fri: 09:00–18:00",
    social: "Social media",
    legalPlaceholder: "Privacy and terms will be confirmed in a later phase.",
    copyright: "BEST LC. All rights reserved.",
  },
};

const pageCopy: Record<Locale, PageCopy> = { uz, ru, en };

export function getPageCopy(locale: Locale): PageCopy {
  return pageCopy[locale];
}
