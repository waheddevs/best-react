import type { Locale } from "@/config/Locales";
import type { StudentListeningTestNavbarCopy } from "@/types/student/StudentListeningTestNavbar";

const studentListeningTestNavbarCopy: Record<Locale, StudentListeningTestNavbarCopy> = {
  uz: {
    completeLabel: "Yakunlash",
    cancelExitLabel: "Qolish",
    confirmExitLabel: "Chiqish",
    exitMessage:
      "Agar chiqsangiz, test boshidan boshlanadi. Chiqishni xohlayotganingizga ishonchingiz komilmi?",
    exitTitle: "Ogohlantirish",
    fullscreenLabel: "To‘liq ekran",
    nextSectionLabel: "Keyingi bo‘lim",
  },
  ru: {
    completeLabel: "Завершить",
    cancelExitLabel: "Остаться",
    confirmExitLabel: "Выйти",
    exitMessage: "Если вы выйдете, тест начнётся сначала. Вы уверены, что хотите выйти?",
    exitTitle: "Предупреждение",
    fullscreenLabel: "Полноэкранный режим",
    nextSectionLabel: "Следующий раздел",
  },
  en: {
    completeLabel: "Complete",
    cancelExitLabel: "Stay",
    confirmExitLabel: "Exit",
    exitMessage: "If you exit, test will be started at beginning. Are you sure to quit?",
    exitTitle: "Warning",
    fullscreenLabel: "Fullscreen",
    nextSectionLabel: "Next section",
  },
};

export function getStudentListeningTestNavbarCopy(locale: Locale): StudentListeningTestNavbarCopy {
  return studentListeningTestNavbarCopy[locale];
}
