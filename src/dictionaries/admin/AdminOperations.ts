import type { Locale } from "@/config/Locales";
import type { AdminOperationsCopy } from "@/types/admin/AdminOperations";

const copy: Record<Locale, AdminOperationsCopy> = {
  uz: {
    endTimeLabel: "Tugash vaqti",
    startTimeLabel: "Boshlanish vaqti",
    todayLabel: "Bugungi darslar",
    totalLessonsLabel: "Jami darslar",
  },
  ru: {
    endTimeLabel: "Время окончания",
    startTimeLabel: "Время начала",
    todayLabel: "Уроки сегодня",
    totalLessonsLabel: "Всего уроков",
  },
  en: {
    endTimeLabel: "End time",
    startTimeLabel: "Start time",
    todayLabel: "Lessons today",
    totalLessonsLabel: "Total lessons",
  },
};

export function getAdminOperationsCopy(locale: Locale): AdminOperationsCopy {
  return copy[locale];
}
