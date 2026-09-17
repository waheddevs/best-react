import type { Locale } from "@/config/Locales";

const messages = {
  uz: {
    loadError: "Profil ma’lumotlarini yuklab bo‘lmadi.",
    retry: "Qayta urinish",
    save: "Saqlash",
    saved: "Profil ma’lumotlari saqlandi.",
    saveError: "Profil ma’lumotlarini saqlab bo‘lmadi.",
  },
  ru: {
    loadError: "Не удалось загрузить данные профиля.",
    retry: "Повторить",
    save: "Сохранить",
    saved: "Данные профиля сохранены.",
    saveError: "Не удалось сохранить данные профиля.",
  },
  en: {
    loadError: "Could not load profile details.",
    retry: "Retry",
    save: "Save",
    saved: "Profile details saved.",
    saveError: "Could not save profile details.",
  },
} as const;

export function getTeacherProfileMessages(locale: Locale) {
  return messages[locale];
}
