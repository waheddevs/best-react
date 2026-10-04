import type { Locale } from "@/config/Locales";

export type StudentSettingsCopy = {
  account: string;
  cancel: string;
  email: string;
  emailHelp: string;
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
  password: string;
  passwordHelp: string;
  passwordUnavailable: string;
  picture: string;
  pictureHelp: string;
  removePicture: string;
  previewNotice: string;
  retry: string;
  save: string;
  saveError: string;
  saved: string;
  saving: string;
  unavailable: string;
  uploadPicture: string;
};

const copy: Record<Locale, StudentSettingsCopy> = {
  uz: {
    account: "Hisob",
    cancel: "Bekor qilish",
    email: "Email",
    emailHelp: "Hisobga kirish uchun ishlatiladi. O'zgartirish uchun markazga murojaat qiling.",
    firstName: "Ism",
    firstNameError: "Ism 1–80 ta belgidan iborat bo'lishi kerak.",
    lastName: "Familiya",
    lastNameError: "Familiya 1–80 ta belgidan iborat bo'lishi kerak.",
    password: "Parol",
    passwordHelp: "Hisobingiz parol va email kodi bilan himoyalangan.",
    passwordUnavailable: "Parolni o'zgartirish uchun markazga murojaat qiling.",
    picture: "Profil rasmi",
    pictureHelp: "Student profili uchun rasm yuklash hozircha mavjud emas.",
    removePicture: "Olib tashlash",
    previewNotice: "Bu namuna profil. O'zgarishlar serverda saqlanmaydi.",
    retry: "Qayta urinish",
    save: "Saqlash",
    saveError: "Profil saqlanmadi. Qayta urinib ko'ring.",
    saved: "Profil saqlandi.",
    saving: "Saqlanmoqda...",
    unavailable: "Profil ma'lumotlarini hozir yuklab bo'lmadi.",
    uploadPicture: "Rasm yuklash",
  },
  ru: {
    account: "Аккаунт",
    cancel: "Отмена",
    email: "Электронная почта",
    emailHelp: "Используется для входа. Для изменения обратитесь в центр.",
    firstName: "Имя",
    firstNameError: "Имя должно содержать от 1 до 80 символов.",
    lastName: "Фамилия",
    lastNameError: "Фамилия должна содержать от 1 до 80 символов.",
    password: "Пароль",
    passwordHelp: "Аккаунт защищён паролем и кодом из письма.",
    passwordUnavailable: "Для смены пароля обратитесь в центр.",
    picture: "Фото профиля",
    pictureHelp: "Загрузка фото для студента пока недоступна.",
    removePicture: "Удалить",
    previewNotice: "Это демонстрационный профиль. Изменения не сохраняются на сервере.",
    retry: "Повторить",
    save: "Сохранить",
    saveError: "Не удалось сохранить профиль. Попробуйте снова.",
    saved: "Профиль сохранён.",
    saving: "Сохранение...",
    unavailable: "Не удалось загрузить данные профиля.",
    uploadPicture: "Загрузить фото",
  },
  en: {
    account: "Account",
    cancel: "Cancel",
    email: "Email",
    emailHelp: "Used to log in. Contact the centre to change it.",
    firstName: "First name",
    firstNameError: "First name must be 1–80 characters.",
    lastName: "Last name",
    lastNameError: "Last name must be 1–80 characters.",
    password: "Password",
    passwordHelp: "Your account is protected by a password and email code.",
    passwordUnavailable: "Contact the centre to change your password.",
    picture: "Profile picture",
    pictureHelp: "Student profile image uploads are not available yet.",
    removePicture: "Remove",
    previewNotice: "This is a preview profile. Changes are not saved to the server.",
    retry: "Retry",
    save: "Save",
    saveError: "The profile could not be saved. Please try again.",
    saved: "Profile saved.",
    saving: "Saving...",
    unavailable: "Profile details are unavailable right now.",
    uploadPicture: "Upload image",
  },
};

export function getStudentSettingsCopy(locale: Locale): StudentSettingsCopy {
  return copy[locale];
}
