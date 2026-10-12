import type { Locale } from "@/config/Locales";

type AdminSettingsCopy = {
  security: string;
  invalidEmail: string;
  invalidPhone: string;
  emailTaken: string;
  currentRequired: string;
  passwordLength: string;
  passwordMismatch: string;
  passwordDifferent: string;
  passwordIncorrect: string;
  passwordConfirm: string;
  passwordSaved: string;
  passwordSaveError: string;

  account: string;
  adminRole: string;
  profilePicture: string;
  uploadImage: string;
  imageHelp: string;
  imageInvalid: string;
  imageError: string;
  imageUploading: string;
  imageSaved: string;
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
    security: "Xavfsizlik",
    invalidEmail: "To‘g‘ri email manzilini kiriting.",
    invalidPhone: "Telefon raqami kamida 7 ta belgidan iborat bo‘lsin.",
    emailTaken: "Bu email boshqa hisobga biriktirilgan.",
    currentRequired: "Joriy parolni kiriting.",
    passwordLength: "12–128 ta belgi kiriting.",
    passwordMismatch: "Parollar mos kelmadi.",
    passwordDifferent: "Yangi parol joriy paroldan farq qilishi kerak.",
    passwordIncorrect: "Joriy parol noto‘g‘ri.",
    passwordConfirm: "Hisobingiz uchun yangi parolni saqlaysizmi?",
    passwordSaved: "Parol o‘zgartirildi.",
    passwordSaveError: "Parolni o‘zgartirib bo‘lmadi. Qayta urinib ko‘ring.",

    account: "Hisob",
    adminRole: "Administrator",
    profilePicture: "Profil rasmi",
    uploadImage: "Rasm yuklash",
    imageHelp: "JPG, PNG yoki WebP · 5 MB gacha. Avtomatik saqlanadi.",
    imageInvalid: "5 MB gacha bo‘lgan JPG, PNG yoki WebP rasmni tanlang.",
    imageError: "Rasmni saqlab bo‘lmadi. Qayta urinib ko‘ring.",
    imageUploading: "Saqlanmoqda…",
    imageSaved: "Profil rasmi yangilandi.",
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
    security: "Безопасность",
    invalidEmail: "Введите корректный адрес почты.",
    invalidPhone: "Номер телефона должен содержать не менее 7 символов.",
    emailTaken: "Эта почта уже используется другим аккаунтом.",
    currentRequired: "Введите текущий пароль.",
    passwordLength: "Введите от 12 до 128 символов.",
    passwordMismatch: "Пароли не совпадают.",
    passwordDifferent: "Новый пароль должен отличаться от текущего.",
    passwordIncorrect: "Текущий пароль неверен.",
    passwordConfirm: "Сохранить новый пароль для вашего аккаунта?",
    passwordSaved: "Пароль изменён.",
    passwordSaveError: "Не удалось изменить пароль. Повторите попытку.",

    account: "Аккаунт",
    adminRole: "Администратор",
    profilePicture: "Фото профиля",
    uploadImage: "Загрузить фото",
    imageHelp: "JPG, PNG или WebP · до 5 МБ. Сохраняется автоматически.",
    imageInvalid: "Выберите изображение JPG, PNG или WebP размером до 5 МБ.",
    imageError: "Не удалось сохранить фото. Повторите попытку.",
    imageUploading: "Сохранение…",
    imageSaved: "Фото профиля обновлено.",
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
    security: "Security",
    invalidEmail: "Enter a valid email address.",
    invalidPhone: "Enter a phone number with at least 7 characters.",
    emailTaken: "This email is already used by another account.",
    currentRequired: "Enter your current password.",
    passwordLength: "Use 12–128 characters.",
    passwordMismatch: "Passwords do not match.",
    passwordDifferent: "Choose a password different from your current one.",
    passwordIncorrect: "Your current password is incorrect.",
    passwordConfirm: "Save the new password for your account?",
    passwordSaved: "Password changed.",
    passwordSaveError: "Could not change your password. Please try again.",

    account: "Account",
    adminRole: "Admin",
    profilePicture: "Profile picture",
    uploadImage: "Upload image",
    imageHelp: "JPG, PNG or WebP · up to 5 MB. Saves automatically.",
    imageInvalid: "Choose a JPG, PNG or WebP image up to 5 MB.",
    imageError: "Could not save the image. Please try again.",
    imageUploading: "Saving…",
    imageSaved: "Profile picture updated.",
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
