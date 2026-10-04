import type { Locale } from "@/config/Locales";

type AdminSettingsCopy = {
  account: string;
  profilePicture: string;
  uploadImage: string;
  removeImage: string;
  imageUnavailable: string;
  firstName: string;
  lastName: string;
  email: string;
  emailHelp: string;
  editEmail: string;
  emailUnavailable: string;
  password: string;
  passwordHelp: string;
  changePassword: string;
  passwordUnavailable: string;
  cancel: string;
  save: string;
  saving: string;
  saved: string;
  saveError: string;
  firstNameRequired: string;
};

const copy: Record<Locale, AdminSettingsCopy> = {
  uz: {
    account: "Hisob",
    profilePicture: "Profil rasmi",
    uploadImage: "Rasm yuklash",
    removeImage: "Olib tashlash",
    imageUnavailable: "Profil rasmini o‘zgartirish hozircha mavjud emas.",
    firstName: "Ism",
    lastName: "Familiya",
    email: "Email",
    emailHelp: "Hisobga kirish uchun ishlatiladi.",
    editEmail: "Emailni o‘zgartirish",
    emailUnavailable: "Emailni o‘zgartirish hozircha mavjud emas.",
    password: "Parol",
    passwordHelp: "Hisobingiz parol va email tasdiqlash kodi bilan himoyalangan.",
    changePassword: "Parolni o‘zgartirish",
    passwordUnavailable: "Parolni o‘zgartirish hozircha mavjud emas.",
    cancel: "Bekor qilish",
    save: "Saqlash",
    saving: "Saqlanmoqda…",
    saved: "Profil saqlandi.",
    saveError: "Profilni saqlab bo‘lmadi. Qayta urinib ko‘ring.",
    firstNameRequired: "Ismni kiriting.",
  },
  ru: {
    account: "Аккаунт",
    profilePicture: "Фото профиля",
    uploadImage: "Загрузить фото",
    removeImage: "Удалить",
    imageUnavailable: "Изменение фото профиля пока недоступно.",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Электронная почта",
    emailHelp: "Используется для входа в аккаунт.",
    editEmail: "Изменить почту",
    emailUnavailable: "Изменение почты пока недоступно.",
    password: "Пароль",
    passwordHelp: "Ваш аккаунт защищён паролем и кодом подтверждения по почте.",
    changePassword: "Изменить пароль",
    passwordUnavailable: "Изменение пароля пока недоступно.",
    cancel: "Отмена",
    save: "Сохранить",
    saving: "Сохранение…",
    saved: "Профиль сохранён.",
    saveError: "Не удалось сохранить профиль. Повторите попытку.",
    firstNameRequired: "Введите имя.",
  },
  en: {
    account: "Account",
    profilePicture: "Profile picture",
    uploadImage: "Upload image",
    removeImage: "Remove",
    imageUnavailable: "Changing your profile picture is not available yet.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    emailHelp: "Used to log in to your account.",
    editEmail: "Edit email",
    emailUnavailable: "Changing your email is not available yet.",
    password: "Password",
    passwordHelp: "Your account is protected by a password and email verification code.",
    changePassword: "Change password",
    passwordUnavailable: "Changing your password is not available yet.",
    cancel: "Cancel",
    save: "Save",
    saving: "Saving…",
    saved: "Profile saved.",
    saveError: "Could not save your profile. Please try again.",
    firstNameRequired: "Enter your first name.",
  },
};

export function getAdminSettingsCopy(locale: Locale): AdminSettingsCopy {
  return copy[locale];
}
