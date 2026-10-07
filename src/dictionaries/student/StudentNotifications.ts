import type { Locale } from "@/config/Locales";
import { getWorkspaceNotificationText } from "@/dictionaries/WorkspaceNotifications";
import type { WorkspaceNotice } from "@/types/WorkspaceNotification";

const copy = {
  en: {
    today: "Today",
    yesterday: "Yesterday",
    earlier: "Earlier",
    group: {
      title: "Demo: Class time updated",
      body: "The lesson time in a sample group has changed.",
    },
    library: {
      title: "Demo: New study guide",
      body: "A sample study guide is available in the Library.",
    },
    test: {
      title: "Demo: Practice test available",
      body: "A sample practice test is ready in Tests.",
    },
    result: {
      title: "Demo: Test result ready",
      body: "A fictional test result is ready in Results.",
    },
    progress: {
      title: "Demo: Weekly progress summary",
      body: "A fictional learning summary is ready in Progress.",
    },
  },
  ru: {
    today: "Сегодня",
    yesterday: "Вчера",
    earlier: "Ранее",
    group: {
      title: "Демо: Время занятия изменено",
      body: "Время занятия в учебной группе-примере изменилось.",
    },
    library: {
      title: "Демо: Новое учебное пособие",
      body: "В библиотеке доступно учебное пособие-пример.",
    },
    test: {
      title: "Демо: Доступен тренировочный тест",
      body: "В разделе тестов доступен тренировочный тест-пример.",
    },
    result: {
      title: "Демо: Результат теста готов",
      body: "В разделе результатов готов вымышленный результат теста.",
    },
    progress: {
      title: "Демо: Недельный обзор прогресса",
      body: "В разделе прогресса готов вымышленный обзор обучения.",
    },
  },
  uz: {
    today: "Bugun",
    yesterday: "Kecha",
    earlier: "Oldinroq",
    group: {
      title: "Demo: Dars vaqti yangilandi",
      body: "Namunaviy guruhdagi dars vaqti o‘zgardi.",
    },
    library: {
      title: "Demo: Yangi o‘quv qo‘llanma",
      body: "Kutubxonaga namunaviy o‘quv qo‘llanma qo‘shildi.",
    },
    test: {
      title: "Demo: Mashq testi mavjud",
      body: "Testlar bo‘limida namunaviy mashq testi ochildi.",
    },
    result: {
      title: "Demo: Test natijasi tayyor",
      body: "Natijalar bo‘limida uydirma test natijasi tayyor.",
    },
    progress: {
      title: "Demo: Haftalik o‘sish xulosasi",
      body: "O‘sish bo‘limida uydirma haftalik xulosa tayyor.",
    },
  },
} as const;

export function getStudentNotificationText(locale: Locale, notice: WorkspaceNotice) {
  const localized = copy[locale];
  switch (notice.kind) {
    case "DEMO_STUDENT_GROUP":
      return localized.group;
    case "DEMO_STUDENT_LIBRARY":
      return localized.library;
    case "DEMO_STUDENT_TEST":
      return localized.test;
    case "DEMO_STUDENT_RESULT":
      return localized.result;
    case "DEMO_STUDENT_PROGRESS":
      return localized.progress;
    default:
      return getWorkspaceNotificationText(locale, notice);
  }
}

function tashkentDay(value: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Tashkent",
    year: "numeric",
  }).format(value);
}

export function getStudentNotificationDateGroup(locale: Locale, createdAt: string): string {
  const now = new Date();
  const day = tashkentDay(new Date(createdAt));
  if (day === tashkentDay(now)) return copy[locale].today;
  if (day === tashkentDay(new Date(now.getTime() - 86_400_000))) {
    return copy[locale].yesterday;
  }
  return copy[locale].earlier;
}
