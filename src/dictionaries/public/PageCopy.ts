import type { Locale } from "@/config/Locales";

export type PageCopy = {
  common: {
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
    processEyebrow: string;
    processTitle: string;
    processItems: Array<{ title: string; description: string }>;
    resultsEyebrow: string;
    resultsTitle: string;
    resultsDescription: string;
    eventsEyebrow: string;
    eventsTitle: string;
    finalTitle: string;
    finalDescription: string;
  };
  courses: {
    title: string;
    description: string;
    categories: Record<"english" | "exam" | "language", string>;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    languagesEyebrow: string;
    languagesTitle: string;
    languagesDescription: string;
    comparisonEyebrow: string;
    comparisonTitle: string;
    comparisonDescription: string;
    comparisonCourse: string;
    comparisonFocus: string;
    processEyebrow: string;
    processTitle: string;
    processDescription: string;
    processItems: Array<{ title: string; description: string }>;
    ctaTitle: string;
    ctaDescription: string;
    level: string;
    format: string;
    duration: string;
    schedule: string;
    scheduleDays: string[];
    snapshot: string;
    overview: string;
    audience: string;
    outcomes: string;
    curriculum: string;
    tracks: string;
    tracksDescription: string;
    prerequisites: string;
    preparationSteps: Array<{ title: string; description: string }>;
    detailCtaTitle: string;
    viewDetails: string;
    backToCourses: string;
  };
  events: {
    title: string;
    description: string;
    upcoming: string;
    past: string;
    date: string;
    time: string;
    duration: string;
    attend: string;
    format: string;
    location: string;
    overview: string;
    topics: string;
    programme: string;
    programmeDescription: string;
    audienceTitle: string;
    audienceDescription: string;
    takeawaysTitle: string;
    takeawaysDescription: string;
    practicalInfoTitle: string;
    practicalInfoDescription: string;
    faqTitle: string;
    faqDescription: string;
    backToEvents: string;
    eventDetails: string;
    eventCompleted: string;
    otherEventsTitle: string;
    otherEventsDescription: string;
    registrationNote: string;
    noPast: string;
  };
  results: {
    title: string;
    description: string;
    storiesEyebrow: string;
    storiesTitle: string;
    storiesDescription: string;
    previewLabel: string;
    playLabel: string;
    closeLabel: string;
    journeyEyebrow: string;
    journeyTitle: string;
    journeyDescription: string;
    journeySteps: Array<{ title: string; description: string; meta: string }>;
    categoriesEyebrow: string;
    categoriesTitle: string;
    categoriesDescription: string;
    categories: Array<{ title: string; description: string; highlights: string[] }>;
    ctaTitle: string;
    ctaDescription: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    whyEyebrow: string;
    whyTitle: string;
    whyItems: Array<{ title: string; description: string }>;
    missionEyebrow: string;
    missionTitle: string;
    missionBody: string;
    missionCta: string;
    missionImageAlt: string;
    approachTitle: string;
    values: Array<{ title: string; description: string }>;
    testimonials: {
      eyebrow: string;
      title: string;
      items: Array<{
        name: string;
        initials: string;
        course: string;
        quote: string;
      }>;
    };
    faq: {
      title: string;
      description: string;
    };
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
    serviceNoticeTitle: string;
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
    socialNoticeTitle: string;
    socialNoticeMessage: string;
    socialNoticeClose: string;
    legalPlaceholder: string;
    copyright: string;
  };
};

const uz: PageCopy = {
  common: {
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
    finalTitle: "Keyingi qadamingizni birga aniqlaymiz",
    finalDescription:
      "Kurslar bilan tanishing yoki savolingizni aloqa sahifasida qoldirishga tayyorlang.",
  },
  courses: {
    title: "Kurslar",
    description:
      "Ingliz tili, imtihon tayyorgarligi va xalqaro tillar uchun maqsadingizga mos aniq o‘quv yo‘lini tanlang.",
    categories: {
      english: "Ingliz tili",
      exam: "Imtihon",
      language: "Xalqaro tillar",
    },
    featuredEyebrow: "ASOSIY YO‘NALISHLAR",
    featuredTitle: "Maqsadga mos uchta kuchli yo‘l",
    featuredDescription:
      "General English’dan IELTS va CEFR tayyorgarligigacha har bir dastur tushunarli bosqichlar, amaliy darslar va muntazam feedback bilan tuzilgan.",
    languagesEyebrow: "YANGI TILNI BOSHLANG",
    languagesTitle: "Yana to‘rtta til, yana to‘rtta imkoniyat",
    languagesDescription:
      "Rus, fransuz, nemis va xitoy tillari uchun boshlang‘ichdan izchil rivojlanadigan amaliy dasturlar.",
    comparisonEyebrow: "TEZKOR TAQQOSLASH",
    comparisonTitle: "Qaysi kurs sizning maqsadingizga yaqin?",
    comparisonDescription:
      "Yo‘nalishlarning asosiy farqlarini bir joyda ko‘rib, detail sahifada to‘liq dastur bilan tanishing.",
    comparisonCourse: "Kurs",
    comparisonFocus: "Asosiy maqsad",
    processEyebrow: "O‘QISH JARAYONI",
    processTitle: "Boshlashdan progressgacha aniq yo‘l",
    processDescription: "Har bir dastur bir xil tushunarli learning journey asosida ko‘rsatiladi.",
    processItems: [
      { title: "Level check", description: "Boshlang‘ich nuqta va o‘quv maqsadi aniqlanadi." },
      {
        title: "Mos guruh",
        description: "Daraja, jadval va yo‘nalishga mos guruh tavsiya qilinadi.",
      },
      {
        title: "Amaliy darslar",
        description: "Har bir mavzu speaking, task yoki real vaziyat bilan mustahkamlanadi.",
      },
      {
        title: "Progress review",
        description: "Feedback orqali kuchli tomonlar va keyingi qadam belgilanadi.",
      },
    ],
    ctaTitle: "Qaysi yo‘nalishni tanlashga ikkilanyapsizmi?",
    ctaDescription:
      "Maqsadingiz va hozirgi darajangizni ayting — jamoa sizga mos kurs haqida yo‘l-yo‘riq beradi.",
    level: "Daraja",
    format: "Format",
    duration: "Davomiylik",
    schedule: "Jadval",
    scheduleDays: ["DUSH", "CHOR", "JUM"],
    snapshot: "Kurs haqida qisqacha",
    overview: "Kurs haqida",
    audience: "Bu kurs kim uchun?",
    outcomes: "Nimalarni o‘rganasiz?",
    curriculum: "Dastur ko‘rinishi",
    tracks: "O‘quv treklari",
    tracksDescription: "Maqsad va boshlang‘ich darajaga mos trek diagnostika asosida tanlanadi.",
    prerequisites: "Boshlash uchun",
    preparationSteps: [
      {
        title: "Maqsadingizni belgilang",
        description:
          "Kursdan kutayotgan natijangiz va uni qachongacha olishni istashingizni aniqlang.",
      },
      {
        title: "Level check’dan o‘ting",
        description:
          "Qisqa diagnostika hozirgi darajangiz va rivojlantirish kerak bo‘lgan skilllarni ko‘rsatadi.",
      },
      {
        title: "O‘quv yo‘lini tasdiqlang",
        description:
          "Tavsiya qilingan guruh, jadval va trek maqsadingizga mosligini ko‘rib chiqing.",
      },
      {
        title: "Birinchi darsga tayyorlaning",
        description:
          "Kerakli materiallarni tayyorlab, dars jadvali va boshlanish vaqtini qayta tekshiring.",
      },
    ],
    detailCtaTitle: "Bu yo‘nalish sizga mosmi?",
    viewDetails: "Batafsil ko‘rish",
    backToCourses: "Kurslarga qaytish",
  },
  events: {
    title: "Tadbirlar",
    description:
      "Ochiq darslar, suhbat uchrashuvlari va amaliy workshoplar orqali bilimni jonli muhitda sinab ko‘ring.",
    upcoming: "Kutilayotgan",
    past: "O‘tgan",
    date: "Sana",
    time: "Vaqt",
    duration: "Davomiyligi",
    attend: "Qatnashish",
    format: "Format",
    location: "Manzil",
    overview: "Tadbir haqida",
    topics: "Asosiy mavzular",
    programme: "Tadbir dasturi",
    programmeDescription: "Boshlanishidan yakunigacha rejalashtirilgan asosiy bosqichlar.",
    audienceTitle: "Kimlar uchun?",
    audienceDescription: "Ushbu tajribadan eng ko‘p foyda olishi mumkin bo‘lgan ishtirokchilar.",
    takeawaysTitle: "Nimalar bilan qaytasiz?",
    takeawaysDescription: "Tadbirdan keyin siz bilan qoladigan tajriba va amaliy xulosalar.",
    practicalInfoTitle: "Eslatmalar",
    practicalInfoDescription: "Tadbirga qulay tayyorlanish uchun muhim eslatmalar.",
    faqTitle: "Tadbir bo‘yicha savollar",
    faqDescription: "Ishtirok etishdan oldin ko‘p so‘raladigan savollarga qisqa javoblar.",
    backToEvents: "Tadbirlarga qaytish",
    eventDetails: "Tadbir tafsilotlari",
    eventCompleted: "Tadbir yakunlangan",
    otherEventsTitle: "Boshqa tadbirlarni ko‘ring",
    otherEventsDescription:
      "BEST LC’dagi boshqa ochiq uchrashuvlar va amaliy tadbirlar bilan tanishing.",
    registrationNote:
      "Ro‘yxatdan o‘tish xizmati ulanmagan. Tasdiqlangan aloqa yo‘li keyin qo‘shiladi.",
    noPast: "Tasdiqlangan o‘tgan tadbirlar hozircha kiritilmagan.",
  },
  results: {
    title: "Natijalar",
    description:
      "Maqsadni belgilang, muntazam mashq qiling va har bir bosqichdagi o‘sishni aniq mezonlar bilan kuzating.",
    storiesEyebrow: "O‘QUVCHILAR NATIJALARI",
    storiesTitle: "Katta natijalar ortidagi hikoyalar",
    storiesDescription:
      "BEST LC dasturlarida sezilarli o‘sishga erishgan o‘quvchilar haqidagi sakkizta badiiy preview video. Kelajakda bu yerda ularning roziligi bilan tasdiqlangan real natijalar va shaxsiy hikoyalar joylanadi.",
    previewLabel: "BADIIY PREVIEW",
    playLabel: "{title} videosini ko‘rish",
    closeLabel: "Videoni yopish",
    journeyEyebrow: "O‘QUV JARAYONI",
    journeyTitle: "Natija aniq bosqichlarda quriladi",
    journeyDescription:
      "Har bir preview yo‘li boshlang‘ich holatni tushunishdan boshlanadi, amaliy mashq bilan davom etadi va keyingi maqsadni belgilaydigan tahlil bilan yakunlanadi.",
    journeySteps: [
      {
        title: "Maqsad va boshlang‘ich holat",
        description:
          "Asosiy ehtiyoj, kuchli tomonlar va rivojlantiriladigan ko‘nikmalar aniqlanadi.",
        meta: "1-hafta",
      },
      {
        title: "Yo‘naltirilgan mashq",
        description:
          "Darsdagi vazifalar real muloqot, imtihon formati yoki akademik maqsadga ulanadi.",
        meta: "2–8 hafta",
      },
      {
        title: "Fikr va tuzatish",
        description:
          "Qisqa tahlil o‘quvchiga nima ishlayotganini va keyingi ustuvor vazifani ko‘rsatadi.",
        meta: "Har 2 haftada",
      },
      {
        title: "Yakuniy tahlil",
        description: "Rivojlanish dalillari jamlanadi va yangi, o‘lchanadigan maqsad belgilanadi.",
        meta: "Yakun",
      },
    ],
    categoriesEyebrow: "NATIJA YO‘NALISHLARI",
    categoriesTitle: "Har bir maqsad uchun alohida yo‘l",
    categoriesDescription:
      "Preview hikoyalar turli dasturlarda natija qanday ko‘rinishini mazmunli misollar bilan ko‘rsatadi.",
    categories: [
      {
        title: "IELTS",
        description:
          "Vaqt boshqaruvi, topshiriq strategiyasi va baholash mezonlariga yo‘naltirilgan tayyorgarlik.",
        highlights: ["Speaking", "Writing", "MOCK"],
      },
      {
        title: "CEFR",
        description:
          "Til darajasini bosqichma-bosqich mustahkamlash va faol lug‘atni kengaytirish.",
        highlights: ["Grammar", "Vocabulary", "Communication"],
      },
      {
        title: "General English",
        description:
          "Kundalik vaziyatlarda erkinroq tinglash, tushunish va fikr bildirish amaliyoti.",
        highlights: ["Conversation", "Listening", "Reading"],
      },
      {
        title: "Academic skills",
        description:
          "O‘qish, yozish va taqdimotda fikrni aniq tuzish hamda dalillar bilan ishlash.",
        highlights: ["Writing", "Presentation", "Study habits"],
      },
    ],
    ctaTitle: "O‘z o‘quv yo‘lingizni boshlashga tayyormisiz?",
    ctaDescription: "Maqsadingizga mos kursni tanlang yoki jamoamizga savol qoldiring.",
    ctaSecondary: "Savol berish",
  },
  about: {
    title: "Biz haqimizda",
    description:
      "Aniq maqsad, amaliy mashq va insoniy qo‘llab-quvvatlashni birlashtiradigan zamonaviy ta’lim muhiti.",
    whyEyebrow: "Nima uchun BEST",
    whyTitle: "Bilimni harakatga aylantiradigan muhit",
    whyItems: [
      {
        title: "Aniq tuzilma",
        description:
          "Har bir bosqichda nimani, nima uchun va qaysi tartibda o‘rganayotganingizni aniq ko‘rasiz. Vazifalar maqsadga bog‘lanib, keyingi qadam tushunarli ko‘rsatiladi.",
      },
      {
        title: "Faol ishtirok",
        description:
          "Mashq, savol, muhokama va qisqa tahlil har bir darsning markazida turadi. O‘quvchi yangi bilimni darhol amalda sinab ko‘rishga undaladi.",
      },
      {
        title: "Insoniy qo‘llab-quvvatlash",
        description:
          "O‘quv yo‘li savol berish, fikr olish va o‘z tempida rivojlanishga qulay tashkil etiladi. Har bir bosqichda yo‘nalish va dalda beriladi.",
      },
    ],
    missionEyebrow: "Biz haqimizda",
    missionTitle: "BEST LC",
    missionBody:
      "BEST LC — tillarni o‘rganish, imtihonlarga tayyorgarlik va amaliy ko‘nikmalarni rivojlantirishga yo‘naltirilgan zamonaviy ta’lim markazi. Darslar aniq maqsad, izchil reja va o‘quvchiga tushunarli rivojlanish yo‘li asosida tashkil etiladi.",
    missionCta: "Kurslarni kashf eting",
    missionImageAlt:
      "BEST LC logotipi o‘rnatilgan zamonaviy shisha fasadli ta’lim markazi konsepsiyasi",
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
      {
        title: "Shaxsiy sur’at",
        description:
          "Mashqlar o‘quvchining hozirgi darajasi va maqsadiga mos tempda bosqichma-bosqich tashkil etiladi.",
      },
      {
        title: "Muntazam fikr-mulohaza",
        description:
          "Qisqa izohlar va amaliy tavsiyalar kuchli tomonlarni ko‘rish hamda keyingi vazifani aniqlashga yordam beradi.",
      },
      {
        title: "Amaliy ishonch",
        description:
          "Yangi bilim suhbat, topshiriq va hayotiy vaziyatlarga yaqin mashqlar orqali mustahkamlanadi.",
      },
      {
        title: "Ko‘rinadigan rivojlanish",
        description:
          "Har bir bosqichdagi kichik yutuqlar qayd etilib, o‘quvchi keyingi maqsad sari qanday siljiyotganini ko‘radi.",
      },
    ],
    testimonials: {
      eyebrow: "O‘quvchilar fikri",
      title: "O‘rganish tajribasi ular nigohida",
      items: [
        {
          name: "Madina A.",
          initials: "MA",
          course: "General English",
          quote:
            "Darslardagi qisqa vazifalar yangi mavzuni tushunib, uni darhol suhbatda sinab ko‘rishga yordam beradi.",
        },
        {
          name: "Azizbek R.",
          initials: "AR",
          course: "IELTS tayyorgarligi",
          quote:
            "Har bir mashqning maqsadi tushunarli. Fikr-mulohazadan keyin qaysi ko‘nikma ustida ishlash kerakligini aniq bilaman.",
        },
        {
          name: "Nilufar S.",
          initials: "NS",
          course: "CEFR tayyorgarligi",
          quote:
            "Bosqichma-bosqich reja o‘qishni tartibli qildi. Kichik yutuqlarni ko‘rish davom etishga motivatsiya beradi.",
        },
        {
          name: "Kamron T.",
          initials: "KT",
          course: "Rus tili",
          quote:
            "Ko‘proq gapirishga undaydigan mashqlar sababli yangi so‘zlarni oddiy hayotiy vaziyatlarda ishlatish osonlashdi.",
        },
        {
          name: "Shahnoza M.",
          initials: "SM",
          course: "Academic English",
          quote:
            "Murakkab mavzular kichik va tushunarli qismlarga ajratiladi. Savol berish va xatoni tahlil qilish juda qulay.",
        },
        {
          name: "Behruz K.",
          initials: "BK",
          course: "Mock imtihon tayyorgarligi",
          quote:
            "Vaqt bilan ishlash va topshiriqlarni ketma-ket bajarish bo‘yicha amaliy mashqlar o‘zimni xotirjamroq his qilishimga yordam berdi.",
        },
        {
          name: "Dilnoza E.",
          initials: "DE",
          course: "Nemis tili",
          quote:
            "Yangi grammatikani misollar va qisqa suhbatlar bilan mashq qilish mavzuni tabiiyroq tushunishga yordam beradi.",
        },
        {
          name: "Sardor N.",
          initials: "SN",
          course: "Fransuz tili",
          quote:
            "Darsdagi aniq yo‘nalish va muntazam takrorlash talaffuz hamda kundalik iboralarga ishonchimni oshirdi.",
        },
        {
          name: "Mohira L.",
          initials: "ML",
          course: "Xitoy tili",
          quote:
            "Belgilar, talaffuz va oddiy dialoglar alohida bosqichlarda o‘rganilgani sababli jarayon tushunarli ko‘rinadi.",
        },
      ],
    },
    faq: {
      title: "Ko‘p so‘raladigan savollar",
      description:
        "Kurslar, dars formati, imtihonlar, tadbirlar va bog‘lanish jarayoni haqida qisqa javoblar.",
    },
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
    serviceNoticeTitle: "Yuborish ulanmagan",
    serviceNotice: "Xizmat keyingi bosqichda ulanadi. Murojaatingiz uchun rahmat.",
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
    socialNoticeTitle: "Tez orada",
    socialNoticeMessage: "Yangiliklar tayyorlanmoqda. Biz bilan qoling.",
    socialNoticeClose: "Tushunarli",
    legalPlaceholder: "Maxfiylik va foydalanish shartlari keyingi bosqichda tasdiqlanadi.",
    copyright: "BEST LC. Barcha huquqlar himoyalangan.",
  },
};

const ru: PageCopy = {
  ...uz,
  common: {
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
    finalTitle: "Определим ваш следующий шаг вместе",
    finalDescription: "Познакомьтесь с курсами или подготовьте вопрос для страницы контактов.",
  },
  courses: {
    title: "Курсы",
    description:
      "Выберите понятный учебный маршрут для английского языка, подготовки к экзаменам или нового международного языка.",
    categories: {
      english: "Английский язык",
      exam: "Экзамен",
      language: "Международные языки",
    },
    featuredEyebrow: "ОСНОВНЫЕ НАПРАВЛЕНИЯ",
    featuredTitle: "Три сильных маршрута под разные цели",
    featuredDescription:
      "От General English до IELTS и CEFR: каждая программа построена на понятных этапах, практических занятиях и регулярной обратной связи.",
    languagesEyebrow: "НАЧНИТЕ НОВЫЙ ЯЗЫК",
    languagesTitle: "Ещё четыре языка — ещё четыре возможности",
    languagesDescription:
      "Практические программы русского, французского, немецкого и китайского с последовательным развитием от начального уровня.",
    comparisonEyebrow: "БЫСТРОЕ СРАВНЕНИЕ",
    comparisonTitle: "Какой курс ближе к вашей цели?",
    comparisonDescription:
      "Сравните основные различия и откройте страницу курса, чтобы изучить полную программу.",
    comparisonCourse: "Курс",
    comparisonFocus: "Основная цель",
    processEyebrow: "ПРОЦЕСС ОБУЧЕНИЯ",
    processTitle: "Понятный путь от старта до прогресса",
    processDescription: "Каждая программа показана через единый и понятный learning journey.",
    processItems: [
      { title: "Level check", description: "Определяются стартовый уровень и учебная цель." },
      {
        title: "Подходящая группа",
        description: "Рекомендуется группа по уровню, расписанию и направлению.",
      },
      {
        title: "Практические занятия",
        description: "Каждая тема закрепляется через речь, задания или реальные ситуации.",
      },
      {
        title: "Progress review",
        description: "Обратная связь показывает сильные стороны и следующий шаг.",
      },
    ],
    ctaTitle: "Не уверены, какое направление выбрать?",
    ctaDescription:
      "Расскажите о цели и текущем уровне — команда подскажет, какой курс стоит рассмотреть.",
    level: "Уровень",
    format: "Формат",
    duration: "Продолжительность",
    schedule: "Расписание",
    scheduleDays: ["ПН", "СР", "ПТ"],
    snapshot: "Кратко о курсе",
    overview: "О курсе",
    audience: "Для кого этот курс?",
    outcomes: "Чему вы научитесь?",
    curriculum: "Структура программы",
    tracks: "Учебные треки",
    tracksDescription: "Трек подбирается после диагностики с учётом цели и стартового уровня.",
    prerequisites: "Перед началом",
    preparationSteps: [
      {
        title: "Определите цель",
        description:
          "Сформулируйте ожидаемый результат курса и срок, к которому хотите его получить.",
      },
      {
        title: "Пройдите level check",
        description:
          "Короткая диагностика покажет текущий уровень и навыки, которым нужно уделить внимание.",
      },
      {
        title: "Подтвердите учебный маршрут",
        description: "Проверьте, подходят ли рекомендованная группа, расписание и трек вашей цели.",
      },
      {
        title: "Подготовьтесь к первому занятию",
        description: "Соберите нужные материалы и ещё раз проверьте расписание и время начала.",
      },
    ],
    detailCtaTitle: "Подходит ли вам это направление?",
    viewDetails: "Подробнее",
    backToCourses: "Назад к курсам",
  },
  events: {
    title: "События",
    description: "Открытые уроки, разговорные встречи и практические воркшопы для живого обучения.",
    upcoming: "Предстоящие",
    past: "Прошедшие",
    date: "Дата",
    time: "Время",
    duration: "Длительность",
    attend: "Участвовать",
    format: "Формат",
    location: "Место",
    overview: "О событии",
    topics: "Основные темы",
    programme: "Программа события",
    programmeDescription: "Основные этапы от начала встречи до её завершения.",
    audienceTitle: "Для кого?",
    audienceDescription: "Участники, которым этот формат может принести наибольшую пользу.",
    takeawaysTitle: "Что вы получите?",
    takeawaysDescription: "Опыт и практические выводы, которые останутся после события.",
    practicalInfoTitle: "Памятка",
    practicalInfoDescription: "Важные ориентиры для комфортной подготовки к событию.",
    faqTitle: "Вопросы о событии",
    faqDescription: "Короткие ответы на частые вопросы перед участием.",
    backToEvents: "Назад к событиям",
    eventDetails: "Детали события",
    eventCompleted: "Событие завершено",
    otherEventsTitle: "Посмотрите другие события",
    otherEventsDescription:
      "Познакомьтесь с другими открытыми встречами и практическими событиями BEST LC.",
    registrationNote:
      "Регистрация пока не подключена. Подтверждённый способ связи будет добавлен позже.",
    noPast: "Подтверждённых прошедших событий пока нет.",
  },
  results: {
    title: "Результаты",
    description:
      "Поставьте цель, практикуйтесь регулярно и отслеживайте каждый этап развития по понятным критериям.",
    storiesEyebrow: "РЕЗУЛЬТАТЫ УЧЕНИКОВ",
    storiesTitle: "Истории, стоящие за большими результатами",
    storiesDescription:
      "Восемь художественных preview-видео об учениках, добившихся заметного прогресса в программах BEST LC. В будущем здесь появятся подтверждённые результаты и личные истории, опубликованные с их согласия.",
    previewLabel: "ХУДОЖЕСТВЕННЫЙ PREVIEW",
    playLabel: "Смотреть видео «{title}»",
    closeLabel: "Закрыть видео",
    journeyEyebrow: "ПРОЦЕСС ОБУЧЕНИЯ",
    journeyTitle: "Результат складывается по понятным этапам",
    journeyDescription:
      "Каждый preview-путь начинается с понимания исходной точки, продолжается практикой и завершается разбором, который помогает определить следующую цель.",
    journeySteps: [
      {
        title: "Цель и исходная точка",
        description: "Определяются основная потребность, сильные стороны и навыки для развития.",
        meta: "1-я неделя",
      },
      {
        title: "Направленная практика",
        description:
          "Задания связываются с реальным общением, форматом экзамена или академической целью.",
        meta: "2–8-я недели",
      },
      {
        title: "Обратная связь",
        description:
          "Короткий разбор показывает, что уже работает и какой навык станет следующим приоритетом.",
        meta: "Каждые 2 недели",
      },
      {
        title: "Итоговый обзор",
        description:
          "Наблюдения о прогрессе собираются вместе и превращаются в новую измеримую цель.",
        meta: "Финал",
      },
    ],
    categoriesEyebrow: "НАПРАВЛЕНИЯ РЕЗУЛЬТАТА",
    categoriesTitle: "Отдельный путь для каждой цели",
    categoriesDescription:
      "Preview-истории на содержательных примерах показывают, как может выглядеть результат в разных программах.",
    categories: [
      {
        title: "IELTS",
        description: "Подготовка с акцентом на время, стратегию заданий и критерии оценивания.",
        highlights: ["Speaking", "Writing", "MOCK"],
      },
      {
        title: "CEFR",
        description: "Последовательное укрепление уровня и расширение активного словарного запаса.",
        highlights: ["Grammar", "Vocabulary", "Communication"],
      },
      {
        title: "General English",
        description:
          "Практика свободного аудирования, понимания и общения в повседневных ситуациях.",
        highlights: ["Conversation", "Listening", "Reading"],
      },
      {
        title: "Academic skills",
        description:
          "Чёткая структура мысли и работа с аргументами в чтении, письме и презентациях.",
        highlights: ["Writing", "Presentation", "Study habits"],
      },
    ],
    ctaTitle: "Готовы начать свой учебный путь?",
    ctaDescription: "Выберите курс под свою цель или задайте вопрос нашей команде.",
    ctaSecondary: "Задать вопрос",
  },
  about: {
    title: "О нас",
    description:
      "Современная учебная среда, объединяющая ясные цели, практику и человеческую поддержку.",
    whyEyebrow: "Почему BEST",
    whyTitle: "Среда, которая превращает знания в действие",
    whyItems: [
      {
        title: "Ясная структура",
        description:
          "На каждом этапе вы ясно видите, что, зачем и в какой последовательности изучаете. Задания связаны с целью, а следующий шаг остаётся понятным.",
      },
      {
        title: "Активное участие",
        description:
          "Практика, вопросы, обсуждение и короткий разбор находятся в центре каждого занятия. Новые знания сразу проверяются в понятных практических ситуациях.",
      },
      {
        title: "Человеческая поддержка",
        description:
          "Учебный путь организован так, чтобы было удобно задавать вопросы, получать обратную связь и развиваться в своём темпе. На каждом этапе сохраняются направление и поддержка.",
      },
    ],
    missionEyebrow: "О нас",
    missionTitle: "BEST LC",
    missionBody:
      "BEST LC — современный образовательный центр, ориентированный на изучение языков, подготовку к экзаменам и развитие практических навыков. Обучение строится вокруг ясной цели, последовательного плана и понятной траектории роста.",
    missionCta: "Открыть курсы",
    missionImageAlt:
      "Концепция современного образовательного центра со стеклянным фасадом и логотипом BEST LC",
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
      {
        title: "Индивидуальный темп",
        description:
          "Практика организована поэтапно с учётом текущего уровня ученика и выбранной учебной цели.",
      },
      {
        title: "Регулярная обратная связь",
        description:
          "Короткие комментарии и практические рекомендации помогают увидеть сильные стороны и определить следующую задачу.",
      },
      {
        title: "Уверенность на практике",
        description:
          "Новые знания закрепляются через разговор, задания и упражнения, приближённые к реальным ситуациям.",
      },
      {
        title: "Видимый прогресс",
        description:
          "Небольшие достижения каждого этапа отмечаются, чтобы ученик видел движение к следующей цели.",
      },
    ],
    testimonials: {
      eyebrow: "Отзывы учащихся",
      title: "Учебный опыт глазами учеников",
      items: [
        {
          name: "Мадина А.",
          initials: "МА",
          course: "Общий английский",
          quote:
            "Короткие задания на уроках помогают понять новую тему и сразу попробовать использовать её в разговоре.",
        },
        {
          name: "Азизбек Р.",
          initials: "АР",
          course: "Подготовка к IELTS",
          quote:
            "Цель каждого упражнения понятна. После обратной связи я точно знаю, над каким навыком стоит работать дальше.",
        },
        {
          name: "Нилуфар С.",
          initials: "НС",
          course: "Подготовка к CEFR",
          quote:
            "Пошаговый план сделал обучение более организованным. Видимый небольшой прогресс мотивирует продолжать.",
        },
        {
          name: "Камрон Т.",
          initials: "КТ",
          course: "Русский язык",
          quote:
            "Упражнения побуждают больше говорить, поэтому новые слова стало легче использовать в обычных жизненных ситуациях.",
        },
        {
          name: "Шахноза М.",
          initials: "ШМ",
          course: "Академический английский",
          quote:
            "Сложные темы разделяются на небольшие понятные части. Здесь удобно задавать вопросы и спокойно разбирать ошибки.",
        },
        {
          name: "Бехруз К.",
          initials: "БК",
          course: "Подготовка к пробному экзамену",
          quote:
            "Практика работы со временем и последовательностью заданий помогла мне чувствовать себя спокойнее во время подготовки.",
        },
        {
          name: "Дилноза Э.",
          initials: "ДЭ",
          course: "Немецкий язык",
          quote:
            "Практика новой грамматики через примеры и короткие диалоги помогает понимать тему более естественно.",
        },
        {
          name: "Сардор Н.",
          initials: "СН",
          course: "Французский язык",
          quote:
            "Ясное направление урока и регулярное повторение укрепили мою уверенность в произношении и повседневных фразах.",
        },
        {
          name: "Мохира Л.",
          initials: "МЛ",
          course: "Китайский язык",
          quote:
            "Иероглифы, произношение и простые диалоги изучаются поэтапно, поэтому весь процесс остаётся понятным.",
        },
      ],
    },
    faq: {
      title: "Частые вопросы",
      description: "Короткие ответы о курсах, формате, экзаменах, событиях и связи.",
    },
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
    serviceNoticeTitle: "Отправка не подключена",
    serviceNotice: "Сервис подключат на следующем этапе. Спасибо за обращение.",
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
    socialNoticeTitle: "Скоро",
    socialNoticeMessage: "Новости уже готовятся. Оставайтесь с нами.",
    socialNoticeClose: "Понятно",
    legalPlaceholder: "Политика конфиденциальности и условия будут подтверждены позже.",
    copyright: "BEST LC. Все права защищены.",
  },
};

const en: PageCopy = {
  ...uz,
  common: {
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
    finalTitle: "Let’s clarify your next step together",
    finalDescription: "Explore the courses or prepare your question for the contact page.",
  },
  courses: {
    title: "Courses",
    description:
      "Choose a clear learning path for English, exam preparation, or a new international language.",
    categories: {
      english: "English",
      exam: "Exam",
      language: "International languages",
    },
    featuredEyebrow: "CORE PROGRAMMES",
    featuredTitle: "Three strong paths for three different goals",
    featuredDescription:
      "From General English to IELTS and CEFR, each programme combines clear stages, practical lessons, and regular feedback.",
    languagesEyebrow: "START A NEW LANGUAGE",
    languagesTitle: "Four more languages, four more possibilities",
    languagesDescription:
      "Practical Russian, French, German, and Chinese programmes with steady development from the beginner stage.",
    comparisonEyebrow: "QUICK COMPARISON",
    comparisonTitle: "Which course is closest to your goal?",
    comparisonDescription:
      "Compare the main differences, then open a course page to explore its complete programme.",
    comparisonCourse: "Course",
    comparisonFocus: "Primary focus",
    processEyebrow: "LEARNING PROCESS",
    processTitle: "A clear route from starting point to progress",
    processDescription: "Every programme follows the same easy-to-understand learning journey.",
    processItems: [
      {
        title: "Level check",
        description: "Your starting point and learning goal are identified.",
      },
      {
        title: "Suitable group",
        description: "A group is recommended around your level, schedule, and direction.",
      },
      {
        title: "Practical lessons",
        description: "Every topic is reinforced through speaking, tasks, or realistic situations.",
      },
      {
        title: "Progress review",
        description: "Feedback identifies strengths and defines the next step.",
      },
    ],
    ctaTitle: "Not sure which direction to choose?",
    ctaDescription:
      "Share your goal and current level, and the team will guide you towards a suitable course option.",
    level: "Level",
    format: "Format",
    duration: "Duration",
    schedule: "Schedule",
    scheduleDays: ["MON", "WED", "FRI"],
    snapshot: "Course snapshot",
    overview: "Course overview",
    audience: "Who is it for?",
    outcomes: "What will you learn?",
    curriculum: "Programme preview",
    tracks: "Learning tracks",
    tracksDescription:
      "The track is selected after a diagnostic based on your goal and starting level.",
    prerequisites: "Before you start",
    preparationSteps: [
      {
        title: "Define your goal",
        description:
          "Clarify the outcome you want from the course and when you would like to achieve it.",
      },
      {
        title: "Complete the level check",
        description:
          "A short diagnostic reveals your current level and the skills that need attention.",
      },
      {
        title: "Confirm your learning route",
        description: "Review whether the recommended group, schedule, and track match your goal.",
      },
      {
        title: "Prepare for lesson one",
        description:
          "Gather the required materials and check the timetable and starting time once more.",
      },
    ],
    detailCtaTitle: "Is this direction right for you?",
    viewDetails: "View details",
    backToCourses: "Back to courses",
  },
  events: {
    title: "Events",
    description:
      "Explore open lessons, conversation sessions, and practical workshops designed for active learning.",
    upcoming: "Upcoming",
    past: "Past",
    date: "Date",
    time: "Time",
    duration: "Duration",
    attend: "Attend",
    format: "Format",
    location: "Location",
    overview: "About the event",
    topics: "Key topics",
    programme: "Event programme",
    programmeDescription: "The main stages planned from arrival through to the close.",
    audienceTitle: "Who it is for?",
    audienceDescription: "The participants most likely to benefit from this experience.",
    takeawaysTitle: "What you will take away?",
    takeawaysDescription: "Experience and practical ideas that remain useful after the event.",
    practicalInfoTitle: "Guidelines",
    practicalInfoDescription: "Important guidance for preparing comfortably for the event.",
    faqTitle: "Event questions",
    faqDescription: "Short answers to common questions before taking part.",
    backToEvents: "Back to events",
    eventDetails: "Event details",
    eventCompleted: "Event completed",
    otherEventsTitle: "Explore other events",
    otherEventsDescription: "Discover more open sessions and practical learning events at BEST LC.",
    registrationNote:
      "Registration is not connected. A confirmed contact route will be added later.",
    noPast: "No confirmed past events have been added yet.",
  },
  results: {
    title: "Results",
    description:
      "Set a goal, practise consistently, and follow each stage of development through clear criteria.",
    storiesEyebrow: "STUDENT RESULTS",
    storiesTitle: "The stories behind remarkable results",
    storiesDescription:
      "Eight fictional preview videos about learners who achieved meaningful progress across BEST LC programmes. In future, this space will feature verified results and personal stories published with their consent.",
    previewLabel: "FICTIONAL PREVIEW",
    playLabel: "Play {title} video",
    closeLabel: "Close video",
    journeyEyebrow: "LEARNING PROCESS",
    journeyTitle: "Progress is built in clear stages",
    journeyDescription:
      "Every preview journey begins by understanding the starting point, continues through practical work, and ends with a review that defines the next goal.",
    journeySteps: [
      {
        title: "Goal and baseline",
        description: "The main need, existing strengths, and skills to develop are mapped clearly.",
        meta: "Week 1",
      },
      {
        title: "Guided practice",
        description:
          "Class tasks connect to real communication, an exam format, or an academic objective.",
        meta: "Weeks 2–8",
      },
      {
        title: "Feedback and adjustment",
        description:
          "Short reviews show what is working and which skill should become the next priority.",
        meta: "Every 2 weeks",
      },
      {
        title: "Final review",
        description:
          "Progress evidence is gathered and translated into a new, measurable objective.",
        meta: "Completion",
      },
    ],
    categoriesEyebrow: "OUTCOME DIRECTIONS",
    categoriesTitle: "A distinct path for every goal",
    categoriesDescription:
      "The preview stories use meaningful examples to show how outcomes can take shape across different programmes.",
    categories: [
      {
        title: "IELTS",
        description:
          "Preparation focused on time management, task strategy, and assessment criteria.",
        highlights: ["Speaking", "Writing", "MOCK"],
      },
      {
        title: "CEFR",
        description:
          "Step-by-step level development and a broader active vocabulary for communication.",
        highlights: ["Grammar", "Vocabulary", "Communication"],
      },
      {
        title: "General English",
        description:
          "Practice for more confident listening, understanding, and everyday expression.",
        highlights: ["Conversation", "Listening", "Reading"],
      },
      {
        title: "Academic skills",
        description:
          "Clear idea structure and evidence use across reading, writing, and presentation work.",
        highlights: ["Writing", "Presentation", "Study habits"],
      },
    ],
    ctaTitle: "Ready to start your learning path?",
    ctaDescription: "Choose a course that fits your goal or ask our team a question.",
    ctaSecondary: "Ask a question",
  },
  about: {
    title: "About us",
    description:
      "A modern learning environment built around clear goals, practical work, and human support.",
    whyEyebrow: "Why BEST",
    whyTitle: "An environment that turns knowledge into action",
    whyItems: [
      {
        title: "Clear structure",
        description:
          "At every stage, you can see what you are learning, why it matters, and what comes next. Each task connects to a clear goal and a practical next step.",
      },
      {
        title: "Active participation",
        description:
          "Practice, questions, discussion, and short reflection sit at the centre of every lesson. Learners are encouraged to test new knowledge in practical situations straight away.",
      },
      {
        title: "Human support",
        description:
          "The learning path makes it comfortable to ask questions, receive feedback, and develop at an individual pace. Each stage offers a clear sense of direction and support.",
      },
    ],
    missionEyebrow: "About",
    missionTitle: "BEST LC",
    missionBody:
      "BEST LC is a modern education centre focused on language learning, exam preparation, and practical skill development. Learning is shaped around a clear goal, a structured plan, and an understandable path for progress.",
    missionCta: "Discover courses",
    missionImageAlt: "Concept of a modern glass-fronted education centre with the BEST LC logo",
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
      {
        title: "Personal pace",
        description:
          "Practice is organised in clear stages that reflect the learner’s current level and chosen learning goal.",
      },
      {
        title: "Regular feedback",
        description:
          "Short comments and practical guidance help learners recognise strengths and identify the next useful task.",
      },
      {
        title: "Practical confidence",
        description:
          "New knowledge is reinforced through conversation, focused tasks, and exercises shaped around realistic situations.",
      },
      {
        title: "Visible progress",
        description:
          "Small achievements are recognised at each stage so learners can see how they are moving towards the next goal.",
      },
    ],
    testimonials: {
      eyebrow: "Students feedback",
      title: "Learning through their eyes",
      items: [
        {
          name: "Madina A.",
          initials: "MA",
          course: "General English",
          quote:
            "Short classroom tasks help me understand a new topic and try it in conversation straight away.",
        },
        {
          name: "Azizbek R.",
          initials: "AR",
          course: "IELTS preparation",
          quote:
            "The purpose of each exercise is clear. After feedback, I know exactly which skill deserves my attention next.",
        },
        {
          name: "Nilufar S.",
          initials: "NS",
          course: "CEFR preparation",
          quote:
            "The step-by-step plan has made learning feel organised. Seeing small signs of progress keeps me motivated.",
        },
        {
          name: "Kamron T.",
          initials: "KT",
          course: "Russian language",
          quote:
            "Exercises encourage me to speak more, making it easier to use new words in ordinary real-life situations.",
        },
        {
          name: "Shahnoza M.",
          initials: "SM",
          course: "Academic English",
          quote:
            "Complex topics are divided into small, understandable parts. Asking questions and reviewing mistakes feels comfortable.",
        },
        {
          name: "Behruz K.",
          initials: "BK",
          course: "Mock exam preparation",
          quote:
            "Practical work on timing and task order has helped me feel calmer and more organised during preparation.",
        },
        {
          name: "Dilnoza E.",
          initials: "DE",
          course: "German language",
          quote:
            "Practising new grammar through examples and short conversations helps each topic feel more natural and understandable.",
        },
        {
          name: "Sardor N.",
          initials: "SN",
          course: "French language",
          quote:
            "Clear lesson direction and regular revision have strengthened my confidence with pronunciation and everyday phrases.",
        },
        {
          name: "Mohira L.",
          initials: "ML",
          course: "Chinese language",
          quote:
            "Characters, pronunciation, and simple dialogues are introduced in separate stages, keeping the process understandable.",
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      description: "Short answers about courses, formats, exams, events, and getting in touch.",
    },
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
    serviceNoticeTitle: "Submission unavailable",
    serviceNotice: "The service will be connected later. Thanks for reaching out.",
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
    socialNoticeTitle: "Coming soon",
    socialNoticeMessage: "Good things are on the way. Stay close.",
    socialNoticeClose: "Done",
    legalPlaceholder: "Privacy and terms will be confirmed in a later phase.",
    copyright: "BEST LC. All rights reserved.",
  },
};

const pageCopy: Record<Locale, PageCopy> = { uz, ru, en };

export function getPageCopy(locale: Locale): PageCopy {
  return pageCopy[locale];
}
