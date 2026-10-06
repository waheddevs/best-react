import type { Locale } from "@/config/Locales";

export type StudentHeroKind =
  | "dashboard"
  | "courses"
  | "schedule"
  | "assignments"
  | "library"
  | "tests"
  | "results"
  | "progress"
  | "payments"
  | "notifications"
  | "settings";

type StudentHeroCopy = {
  labels: Record<StudentHeroKind, string>;
  preview: string;
};

const copy: Record<Locale, StudentHeroCopy> = {
  uz: {
    labels: {
      dashboard: "Writing amaliyoti",
      courses: "Kurslar namunasi",
      schedule: "Keyingi dars",
      assignments: "Vazifalar namunasi",
      library: "O‘quv qo‘llanmalar",
      tests: "Mavjud testlar",
      results: "Baholangan natijalar",
      progress: "Ko‘rib chiqiladigan ko‘nikmalar",
      payments: "Hisob namunasi",
      notifications: "O‘qilmagan xabarlar",
      settings: "Sizning profilingiz",
    },
    preview: "Namuna ma’lumotlari",
  },
  ru: {
    labels: {
      dashboard: "Практика Writing",
      courses: "Примеры курсов",
      schedule: "Следующий урок",
      assignments: "Примеры заданий",
      library: "Учебные материалы",
      tests: "Доступные тесты",
      results: "Оценённые результаты",
      progress: "Навыки для повторения",
      payments: "Пример счёта",
      notifications: "Непрочитанные",
      settings: "Ваш профиль",
    },
    preview: "Демонстрационные данные",
  },
  en: {
    labels: {
      dashboard: "Writing practice",
      courses: "Course previews",
      schedule: "Next class",
      assignments: "Assignment previews",
      library: "Study guides",
      tests: "Available tests",
      results: "Scored results",
      progress: "Skills to review",
      payments: "Ledger preview",
      notifications: "Unread updates",
      settings: "Your profile",
    },
    preview: "Preview data",
  },
};

export function getStudentHeroCopy(locale: Locale): StudentHeroCopy {
  return copy[locale];
}
