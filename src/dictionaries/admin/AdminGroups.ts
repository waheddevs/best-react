import type { Locale } from "@/config/Locales";
import type { AdminGroupsCopy } from "@/types/admin/AdminGroups";

const copy: Record<Locale, AdminGroupsCopy> = {
  uz: {
    backLabel: "Orqaga",
    availableSeatsLabel: "Bo‘sh joylar",
    branchLabel: "Filial",
    capacityLabel: "Sig‘im",
    categoryLabel: "Yo‘nalish",
    groupLabel: "Guruh",
    groupsSummaryLabel: "Guruhlar holati",
    monthlyTuitionLabel: "Oylik to‘lov",
    roomLabel: "Xona",
    scheduleLabel: "Jadval",
    teacherLabel: "O‘qituvchi",
    totalLearnersLabel: "Faol o‘quvchilar",
  },
  ru: {
    backLabel: "Назад",
    availableSeatsLabel: "Свободные места",
    branchLabel: "Филиал",
    capacityLabel: "Вместимость",
    categoryLabel: "Направление",
    groupLabel: "Группа",
    groupsSummaryLabel: "Состояние групп",
    monthlyTuitionLabel: "Оплата в месяц",
    roomLabel: "Кабинет",
    scheduleLabel: "Расписание",
    teacherLabel: "Преподаватель",
    totalLearnersLabel: "Активные ученики",
  },
  en: {
    backLabel: "Back",
    availableSeatsLabel: "Available seats",
    branchLabel: "Branch",
    capacityLabel: "Capacity",
    categoryLabel: "Category",
    groupLabel: "Group",
    groupsSummaryLabel: "Group status",
    monthlyTuitionLabel: "Monthly tuition",
    roomLabel: "Room",
    scheduleLabel: "Schedule",
    teacherLabel: "Teacher",
    totalLearnersLabel: "Active learners",
  },
};

const categoryCopy: Record<Locale, Record<"CEFR" | "GENERAL_ENGLISH" | "IELTS", string>> = {
  uz: { CEFR: "CEFR", GENERAL_ENGLISH: "Umumiy ingliz tili", IELTS: "IELTS" },
  ru: { CEFR: "CEFR", GENERAL_ENGLISH: "Общий английский", IELTS: "IELTS" },
  en: { CEFR: "CEFR", GENERAL_ENGLISH: "General English", IELTS: "IELTS" },
};

export function getAdminGroupsCopy(locale: Locale): AdminGroupsCopy {
  return copy[locale];
}

export function getAdminGroupCategoryLabel(
  locale: Locale,
  category: "CEFR" | "GENERAL_ENGLISH" | "IELTS" | null,
): string {
  return category ? categoryCopy[locale][category] : "—";
}
