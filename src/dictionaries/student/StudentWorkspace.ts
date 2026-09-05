import type { Locale } from "@/config/Locales";
import type {
  StudentSectionCopy,
  StudentWorkspaceCopy,
  StudentWorkspaceSectionKey,
} from "@/types/student/StudentWorkspace";

type LocalizedSectionSeed = {
  description: [string, string, string];
  eyebrow: [string, string, string];
  records: Array<{
    detail: [string, string, string];
    href?: string;
    id: string;
    meta: [string, string, string];
    progress?: number;
    status: "success" | "warning" | "info" | "neutral";
    title: [string, string, string];
  }>;
  title: [string, string, string];
};

const localeIndex: Record<Locale, 0 | 1 | 2> = { uz: 0, ru: 1, en: 2 };

const sectionSeeds: Record<StudentWorkspaceSectionKey, LocalizedSectionSeed> = {
  dashboard: {
    eyebrow: ["Bugungi o'qish", "Учёба сегодня", "Learning today"],
    title: ["Xush kelibsiz, Dilnoza", "С возвращением, Дильноза", "Welcome back, Dilnoza"],
    description: [
      "Darslar, vazifalar va o'sishni bitta sokin markazdan kuzating.",
      "Следите за уроками, заданиями и прогрессом в одном спокойном пространстве.",
      "Follow lessons, assignments, and growth from one calm learning space.",
    ],
    records: [
      {
        id: "lesson-1",
        title: ["Speaking laboratoriyasi", "Лаборатория Speaking", "Speaking lab"],
        meta: [
          "Bugun · 16:00 · 204-xona",
          "Сегодня · 16:00 · кабинет 204",
          "Today · 16:00 · Room 204",
        ],
        detail: ["Keyingi dars", "Следующий урок", "Next lesson"],
        status: "info",
        href: "/student/schedule",
      },
      {
        id: "assignment-1",
        title: [
          "Essay: Education and technology",
          "Эссе: Образование и технологии",
          "Essay: Education and technology",
        ],
        meta: ["Ertaga 20:00 gacha", "До завтра, 20:00", "Due tomorrow, 20:00"],
        detail: ["Yakunlash kerak", "Нужно завершить", "Needs completion"],
        status: "warning",
        href: "/student/assignments/assignment-1",
      },
      {
        id: "result-1",
        title: ["Vocabulary checkpoint", "Проверка словарного запаса", "Vocabulary checkpoint"],
        meta: ["18/20 · 90%", "18/20 · 90%", "18/20 · 90%"],
        detail: ["Yangi natija", "Новый результат", "New result"],
        status: "success",
        href: "/student/results/attempt-1",
      },
    ],
  },
  courses: {
    eyebrow: ["Mening kurslarim", "Мои курсы", "My courses"],
    title: ["O'quv yo'nalishlari", "Учебные направления", "Learning pathways"],
    description: [
      "Faol kurslar, modul xaritasi va keyingi bosqichlar.",
      "Активные курсы, карта модулей и следующие шаги.",
      "Active courses, module maps, and the next steps.",
    ],
    records: [
      {
        id: "ielts-bridge",
        title: ["IELTS Bridge", "IELTS Bridge", "IELTS Bridge"],
        meta: ["B2 guruhi · 12-modul", "Группа B2 · модуль 12", "B2 group · Module 12"],
        detail: ["Argument yozish", "Аргументированное письмо", "Argument writing"],
        progress: 72,
        status: "success",
        href: "/student/courses/ielts-bridge",
      },
      {
        id: "academic-speaking",
        title: ["Academic Speaking", "Academic Speaking", "Academic Speaking"],
        meta: ["6 haftalik intensiv", "6-недельный интенсив", "6-week intensive"],
        detail: ["Fluency va feedback", "Беглость и обратная связь", "Fluency and feedback"],
        progress: 46,
        status: "info",
        href: "/student/courses/academic-speaking",
      },
    ],
  },
  schedule: {
    eyebrow: ["Haftalik ritm", "Ритм недели", "Weekly rhythm"],
    title: ["Dars jadvali", "Расписание занятий", "Class schedule"],
    description: [
      "Xona, vaqt va dars mavzulari bilan moslashuvchan ko'rinish.",
      "Гибкий вид со временем, кабинетом и темами занятий.",
      "A flexible view with times, rooms, and lesson topics.",
    ],
    records: [
      {
        id: "schedule-1",
        title: ["Writing workshop", "Практикум Writing", "Writing workshop"],
        meta: ["Dushanba · 16:00–17:30", "Понедельник · 16:00–17:30", "Monday · 16:00–17:30"],
        detail: ["204-xona · Mohira ustoz", "Кабинет 204 · Мохира", "Room 204 · Mohira"],
        status: "info",
      },
      {
        id: "schedule-2",
        title: ["Mock speaking", "Пробный Speaking", "Mock speaking"],
        meta: ["Chorshanba · 17:40–18:40", "Среда · 17:40–18:40", "Wednesday · 17:40–18:40"],
        detail: [
          "Studio B · juftlik amaliyoti",
          "Студия B · работа в парах",
          "Studio B · pair practice",
        ],
        status: "neutral",
      },
      {
        id: "schedule-3",
        title: ["Progress review", "Разбор прогресса", "Progress review"],
        meta: ["Juma · 16:00–16:30", "Пятница · 16:00–16:30", "Friday · 16:00–16:30"],
        detail: ["Onlayn uchrashuv", "Онлайн-встреча", "Online meeting"],
        status: "success",
      },
    ],
  },
  assignments: {
    eyebrow: ["Amaliyot markazi", "Центр практики", "Practice centre"],
    title: ["Vazifalar", "Задания", "Assignments"],
    description: [
      "Muddat, talab va ustoz fikrini aniq kuzating.",
      "Контролируйте сроки, требования и обратную связь преподавателя.",
      "Track deadlines, requirements, and teacher feedback clearly.",
    ],
    records: [
      {
        id: "assignment-1",
        title: [
          "Education and technology essay",
          "Эссе об образовании и технологиях",
          "Education and technology essay",
        ],
        meta: ["Ertaga · 20:00", "Завтра · 20:00", "Tomorrow · 20:00"],
        detail: [
          "350–420 so'z · fayl yoki matn",
          "350–420 слов · файл или текст",
          "350–420 words · file or text",
        ],
        status: "warning",
        href: "/student/assignments/assignment-1",
      },
      {
        id: "assignment-2",
        title: ["Listening reflection", "Рефлексия по Listening", "Listening reflection"],
        meta: ["Topshirildi · tekshiruvda", "Отправлено · на проверке", "Submitted · in review"],
        detail: [
          "Ustoz fikri kutilmoqda",
          "Ожидается комментарий преподавателя",
          "Awaiting teacher feedback",
        ],
        status: "info",
        href: "/student/assignments/assignment-2",
      },
      {
        id: "assignment-3",
        title: ["Vocabulary journal", "Словарный журнал", "Vocabulary journal"],
        meta: ["Baholandi · 18/20", "Оценено · 18/20", "Graded · 18/20"],
        detail: ["Fikr-mulohaza mavjud", "Есть обратная связь", "Feedback available"],
        status: "success",
        href: "/student/assignments/assignment-3",
      },
    ],
  },
  tests: {
    eyebrow: ["Bilimni tekshirish", "Проверка знаний", "Knowledge checks"],
    title: ["Testlar", "Тесты", "Tests"],
    description: [
      "Mavjud testlar, urinishlar va vaqt qoidalarini ko'ring.",
      "Доступные тесты, попытки и правила времени.",
      "See available tests, attempts, and timing rules.",
    ],
    records: [
      {
        id: "test-1",
        title: ["Module 12 checkpoint", "Проверка модуля 12", "Module 12 checkpoint"],
        meta: ["20 savol · 25 daqiqa", "20 вопросов · 25 минут", "20 questions · 25 minutes"],
        detail: [
          "2 urinishdan 1 tasi qoldi",
          "Осталась 1 из 2 попыток",
          "1 of 2 attempts remaining",
        ],
        status: "warning",
        href: "/student/tests/test-1",
      },
      {
        id: "test-2",
        title: ["Grammar diagnostic", "Диагностика грамматики", "Grammar diagnostic"],
        meta: [
          "30 savol · cheklanmagan",
          "30 вопросов · без ограничения",
          "30 questions · untimed",
        ],
        detail: ["Boshlash mumkin", "Можно начать", "Ready to start"],
        status: "success",
        href: "/student/tests/test-2",
      },
    ],
  },
  results: {
    eyebrow: ["Natijalar tarixi", "История результатов", "Results history"],
    title: ["Natijalar va tahlil", "Результаты и аналитика", "Results and insights"],
    description: [
      "Ball, kuchli tomon va keyingi tavsiyalarni solishtiring.",
      "Сравнивайте баллы, сильные стороны и следующие рекомендации.",
      "Compare scores, strengths, and next recommendations.",
    ],
    records: [
      {
        id: "attempt-1",
        title: ["Vocabulary checkpoint", "Проверка словарного запаса", "Vocabulary checkpoint"],
        meta: ["90% · 18/20", "90% · 18/20", "90% · 18/20"],
        detail: ["Eng yaxshi natija", "Лучший результат", "Personal best"],
        status: "success",
        href: "/student/results/attempt-1",
      },
      {
        id: "attempt-2",
        title: ["Reading practice", "Практика Reading", "Reading practice"],
        meta: ["74% · 29/40", "74% · 29/40", "74% · 29/40"],
        detail: [
          "Inference mavzusini takrorlang",
          "Повторите тему inference",
          "Review inference questions",
        ],
        status: "warning",
        href: "/student/results/attempt-2",
      },
    ],
  },
  progress: {
    eyebrow: ["O'sish xaritasi", "Карта роста", "Growth map"],
    title: ["Mening progressim", "Мой прогресс", "My progress"],
    description: [
      "Ko'nikmalar, davomiylik va modul yakunlarini kuzating.",
      "Следите за навыками, серией занятий и завершением модулей.",
      "Track skills, learning streak, and module completion.",
    ],
    records: [
      {
        id: "skill-1",
        title: ["Writing", "Writing", "Writing"],
        meta: ["Band 6.0 → 6.5", "Band 6.0 → 6.5", "Band 6.0 → 6.5"],
        detail: [
          "Dalil va paragraph tuzilishi",
          "Аргументация и структура абзаца",
          "Evidence and paragraph structure",
        ],
        progress: 68,
        status: "success",
      },
      {
        id: "skill-2",
        title: ["Speaking", "Speaking", "Speaking"],
        meta: ["Band 6.5 → 7.0", "Band 6.5 → 7.0", "Band 6.5 → 7.0"],
        detail: ["Ravonlik va misollar", "Беглость и примеры", "Fluency and examples"],
        progress: 76,
        status: "info",
      },
      {
        id: "skill-3",
        title: ["Reading", "Reading", "Reading"],
        meta: ["32/40 o'rtacha", "В среднем 32/40", "32/40 average"],
        detail: ["Murakkab savol turlari", "Сложные типы вопросов", "Complex question types"],
        progress: 80,
        status: "success",
      },
    ],
  },
  payments: {
    eyebrow: ["Hisob holati", "Состояние счёта", "Account ledger"],
    title: ["To'lov yozuvlari", "Платёжные записи", "Payment records"],
    description: [
      "Faqat markaz qayd etgan hisob va holatlarni ko'rish mumkin.",
      "Доступен только просмотр счетов и статусов, записанных центром.",
      "View-only invoices and statuses recorded by the centre.",
    ],
    records: [
      {
        id: "invoice-2026-09",
        title: ["Sentabr o'qish to'lovi", "Оплата обучения за сентябрь", "September tuition"],
        meta: [
          "INV-2026-009 · 1 200 000 UZS",
          "INV-2026-009 · 1 200 000 UZS",
          "INV-2026-009 · UZS 1,200,000",
        ],
        detail: ["To'langan · 02.09.2026", "Оплачено · 02.09.2026", "Paid · 02 Sep 2026"],
        status: "success",
      },
      {
        id: "invoice-2026-10",
        title: ["Oktabr o'qish to'lovi", "Оплата обучения за октябрь", "October tuition"],
        meta: [
          "INV-2026-010 · 1 200 000 UZS",
          "INV-2026-010 · 1 200 000 UZS",
          "INV-2026-010 · UZS 1,200,000",
        ],
        detail: ["15.10.2026 gacha", "До 15.10.2026", "Due 15 Oct 2026"],
        status: "warning",
      },
    ],
  },
  notifications: {
    eyebrow: ["Yangiliklar", "Обновления", "Updates"],
    title: ["Bildirishnomalar", "Уведомления", "Notifications"],
    description: [
      "Dars, vazifa, test va hisob bo'yicha muhim xabarlar.",
      "Важные сообщения об уроках, заданиях, тестах и счетах.",
      "Important lesson, assignment, test, and account updates.",
    ],
    records: [
      {
        id: "notice-1",
        title: ["Writing xonasi o'zgardi", "Изменился кабинет Writing", "Writing room changed"],
        meta: ["5 daqiqa oldin", "5 минут назад", "5 minutes ago"],
        detail: [
          "Dars 204-xonada bo'ladi",
          "Занятие пройдёт в кабинете 204",
          "Class will be in Room 204",
        ],
        status: "info",
        href: "/student/schedule",
      },
      {
        id: "notice-2",
        title: ["Yangi fikr-mulohaza", "Новая обратная связь", "New feedback"],
        meta: ["Kecha", "Вчера", "Yesterday"],
        detail: [
          "Vocabulary journal baholandi",
          "Словарный журнал оценён",
          "Vocabulary journal was graded",
        ],
        status: "success",
        href: "/student/assignments/assignment-3",
      },
    ],
  },
  settings: {
    eyebrow: ["Shaxsiy sozlamalar", "Личные настройки", "Personal settings"],
    title: ["Profil va afzalliklar", "Профиль и предпочтения", "Profile and preferences"],
    description: [
      "Til, aloqa ma'lumoti va bildirishnoma tanlovlarini boshqaring.",
      "Управляйте языком, контактами и предпочтениями уведомлений.",
      "Manage language, contact details, and notification preferences.",
    ],
    records: [
      {
        id: "profile",
        title: ["Profil ma'lumoti", "Данные профиля", "Profile details"],
        meta: [
          "Dilnoza Karimova · Student",
          "Дильноза Каримова · Student",
          "Dilnoza Karimova · Student",
        ],
        detail: [
          "Markaz tasdiqlagan hisob",
          "Учётная запись подтверждена центром",
          "Centre-verified account",
        ],
        status: "success",
      },
      {
        id: "language",
        title: ["Interfeys tili", "Язык интерфейса", "Interface language"],
        meta: ["O'zbekcha", "Русский", "English"],
        detail: ["URL orqali saqlanadi", "Сохраняется в адресе страницы", "Preserved in the route"],
        status: "info",
      },
      {
        id: "alerts",
        title: ["Bildirishnoma tanlovi", "Настройки уведомлений", "Notification preferences"],
        meta: [
          "Dars va vazifa eslatmalari",
          "Напоминания об уроках и заданиях",
          "Lesson and assignment reminders",
        ],
        detail: [
          "Serverda saqlanadigan sozlama",
          "Настройка сохраняется на сервере",
          "Server-persisted preference",
        ],
        status: "neutral",
      },
    ],
  },
};

const navigation: Record<Locale, StudentWorkspaceCopy["navigation"]> = {
  uz: {
    dashboard: "Bosh sahifa",
    courses: "Kurslar",
    schedule: "Jadval",
    assignments: "Vazifalar",
    library: "Kutubxona",
    tests: "Testlar",
    results: "Natijalar",
    progress: "Progress",
    payments: "To'lovlar",
    notifications: "Bildirishnomalar",
    settings: "Sozlamalar",
  },
  ru: {
    dashboard: "Главная",
    courses: "Курсы",
    schedule: "Расписание",
    assignments: "Задания",
    library: "Библиотека",
    tests: "Тесты",
    results: "Результаты",
    progress: "Прогресс",
    payments: "Платежи",
    notifications: "Уведомления",
    settings: "Настройки",
  },
  en: {
    dashboard: "Home",
    courses: "Courses",
    schedule: "Schedule",
    assignments: "Assignments",
    library: "Library",
    tests: "Tests",
    results: "Results",
    progress: "Progress",
    payments: "Payments",
    notifications: "Notifications",
    settings: "Settings",
  },
};

const common: Record<Locale, StudentWorkspaceCopy["common"]> = {
  uz: {
    accountLabel: "Talaba profili",
    all: "Barchasi",
    connectedNotice: "Server bilan himoyalangan o'quv maydoni",
    continueLabel: "Ochish",
    emptyLabel: "Mos ma'lumot topilmadi.",
    languageLabel: "Til",
    menuClose: "Menyuni yopish",
    menuOpen: "Menyuni ochish",
    previewNotice: "Namuna ma'lumotlari",
    searchLabel: "Qidirish",
    searchPlaceholder: "Nomi yoki holati bo'yicha qidiring",
    studentName: "Dilnoza Karimova",
    workspaceLabel: "Student Workspace",
  },
  ru: {
    accountLabel: "Профиль ученика",
    all: "Все",
    connectedNotice: "Защищённое учебное пространство",
    continueLabel: "Открыть",
    emptyLabel: "Подходящих данных не найдено.",
    languageLabel: "Язык",
    menuClose: "Закрыть меню",
    menuOpen: "Открыть меню",
    previewNotice: "Демонстрационные данные",
    searchLabel: "Поиск",
    searchPlaceholder: "Поиск по названию или статусу",
    studentName: "Дильноза Каримова",
    workspaceLabel: "Student Workspace",
  },
  en: {
    accountLabel: "Student profile",
    all: "All",
    connectedNotice: "Server-protected learning space",
    continueLabel: "Open",
    emptyLabel: "No matching records found.",
    languageLabel: "Language",
    menuClose: "Close menu",
    menuOpen: "Open menu",
    previewNotice: "Preview data",
    searchLabel: "Search",
    searchPlaceholder: "Search by title or status",
    studentName: "Dilnoza Karimova",
    workspaceLabel: "Student Workspace",
  },
};

function localizeSection(locale: Locale, seed: LocalizedSectionSeed): StudentSectionCopy {
  const index = localeIndex[locale];
  return {
    description: seed.description[index],
    eyebrow: seed.eyebrow[index],
    metrics: [],
    records: seed.records.map((record) => ({
      detail: record.detail[index],
      href: record.href,
      id: record.id,
      meta: record.meta[index],
      progress: record.progress,
      status: record.status,
      title: record.title[index],
    })),
    title: seed.title[index],
  };
}

export function getStudentWorkspaceCopy(locale: Locale): StudentWorkspaceCopy {
  const sections = Object.fromEntries(
    Object.entries(sectionSeeds).map(([key, seed]) => [key, localizeSection(locale, seed)]),
  ) as Record<StudentWorkspaceSectionKey, StudentSectionCopy>;

  return { common: common[locale], navigation: navigation[locale], sections };
}
