import type { Locale } from "@/config/Locales";

export type StudentProgressCopy = {
  olderTests: string;
  newerTests: string;
  chartGrouping: string;
  gradedSkills: string;
  testHistory: string;
  comparison: string;
  empty: string;
  errorMessage: string;
  errorTitle: string;
  firstResult: string;
  firstResultBadge: string;
  latest: string;
  months: readonly string[];
  pending: string;
  retry: string;
  scoredSkills: string;
  subtitle: string;
  title: string;
  trend: string;
  unavailable: string;
};

const progressCopy: Record<Locale, StudentProgressCopy> = {
  uz: {
    olderTests: "Oldingi testlar",
    newerTests: "Keyingi testlar",
    chartGrouping: "Har bir nuqta — bitta test. Oylar bo'yicha guruhlangan.",
    gradedSkills: "baholangan bo'lim",
    testHistory: "Testlar tarixi",
    comparison: "oldingi testga nisbatan",
    empty: "Progressni ko'rish uchun test bajaring.",
    errorMessage: "Test natijalarini yuklab bo'lmadi. Qayta urinib ko'ring.",
    errorTitle: "Progress vaqtincha ochilmadi",
    firstResult: "birinchi natija",
    firstResultBadge: "Yangi",
    latest: "Oxirgi natija",
    months: ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"],
    pending: "O'qituvchi tekshiruvi kutilmoqda",
    retry: "Qayta urinish",
    scoredSkills: "Oxirgi testning baholangan bo'limlari",
    subtitle: "Oxirgi testdagi baholangan bo'limlar o'rtachasi",
    title: "O'sish dinamikasi",
    trend: "oldingi testga nisbatan",
    unavailable: "Hali natija yo'q",
  },
  ru: {
    olderTests: "Предыдущие тесты",
    newerTests: "Следующие тесты",
    chartGrouping: "Каждая точка — один тест. Группировка по месяцам.",
    gradedSkills: "оценённых разделов",
    testHistory: "История тестов",
    comparison: "к предыдущему тесту",
    empty: "Пройдите тест, чтобы увидеть прогресс.",
    errorMessage: "Не удалось загрузить результаты тестов. Попробуйте ещё раз.",
    errorTitle: "Прогресс временно недоступен",
    firstResult: "первый результат",
    firstResultBadge: "Новый",
    latest: "Последний результат",
    months: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    pending: "Ожидает проверки преподавателя",
    retry: "Повторить",
    scoredSkills: "Оценённые разделы последнего теста",
    subtitle: "Средний результат оценённых разделов последнего теста",
    title: "Динамика прогресса",
    trend: "к предыдущему тесту",
    unavailable: "Результата пока нет",
  },
  en: {
    olderTests: "Older tests",
    newerTests: "Newer tests",
    chartGrouping: "Each point is one test, grouped by month.",
    gradedSkills: "skills scored",
    testHistory: "Test history",
    comparison: "vs previous test",
    empty: "Complete a test to see your progress.",
    errorMessage: "Test results could not be loaded. Please try again.",
    errorTitle: "Progress is temporarily unavailable",
    firstResult: "first result",
    firstResultBadge: "New",
    latest: "Latest result",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    pending: "Awaiting teacher review",
    retry: "Try again",
    scoredSkills: "Latest test skills scored",
    subtitle: "Latest test · average of scored skills",
    title: "Learning growth",
    trend: "since previous test",
    unavailable: "No result yet",
  },
};

export function getStudentProgressCopy(locale: Locale): StudentProgressCopy {
  return progressCopy[locale];
}
