import type { Locale } from "@/config/Locales";

export type StudentSettingsCopy = {
  account: string;
  cancel: string;
  changePassword: string;
  changingPassword: string;
  confirmPassword: string;
  currentPassword: string;
  details: string;
  email: string;
  emailError: string;
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
  newPassword: string;
  password: string;
  passwordChanged: string;
  passwordError: string;
  passwordMismatch: string;
  passwordUnavailable: string;
  phone: string;
  phoneError: string;
  photoInvalid: string;
  photoUploadError: string;
  picture: string;
  pictureHelp: string;
  previewNotice: string;
  removePicture: string;
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
    details: "Tafsilotlar",
    account: "Hisob",
    cancel: "Bekor qilish",
    changePassword: "Parolni o‘zgartirish",
    changingPassword: "O‘zgartirilmoqda...",
    confirmPassword: "Yangi parolni tasdiqlang",
    currentPassword: "Parol",
    email: "Email",
    emailError: "To‘g‘ri email manzilini kiriting.",
    firstName: "Ism",
    firstNameError: "Ism 1–80 ta belgidan iborat bo‘lishi kerak.",
    lastName: "Familiya",
    lastNameError: "Familiya 1–80 ta belgidan iborat bo‘lishi kerak.",
    newPassword: "Yangi parol",
    password: "Parol",
    passwordChanged: "Parol muvaffaqiyatli o‘zgartirildi.",
    passwordError: "Parolni o‘zgartirib bo‘lmadi. Joriy parolni tekshirib, qayta urinib ko‘ring.",
    passwordMismatch: "Yangi parollar bir xil emas.",
    passwordUnavailable: "Parolni o‘zgartirish preview rejimida mavjud emas.",
    phone: "Telefon",
    phoneError: "Telefon 7–32 ta belgidan iborat bo‘lishi kerak.",
    photoInvalid: "PNG, JPEG yoki WebP formatidagi 5 MB gacha rasmni tanlang.",
    photoUploadError: "Rasmni yuklab bo‘lmadi. Qayta urinib ko‘ring.",
    picture: "Profil rasmi",
    pictureHelp: "PNG, JPEG yoki WebP, 5 MB gacha. Rasm Saqlash bosilganda yuklanadi.",
    previewNotice: "Bu namuna profil. O‘zgarishlar serverda saqlanmaydi.",
    removePicture: "Olib tashlash",
    retry: "Qayta urinish",
    save: "Saqlash",
    saveError: "Profil saqlanmadi. Qayta urinib ko‘ring.",
    saved: "Profil saqlandi.",
    saving: "Saqlanmoqda...",
    unavailable: "Profil ma’lumotlarini hozir yuklab bo‘lmadi.",
    uploadPicture: "Rasm tanlash",
  },
  ru: {
    details: "Данные",
    account: "Аккаунт",
    cancel: "Отмена",
    changePassword: "Изменить пароль",
    changingPassword: "Изменение...",
    confirmPassword: "Подтвердите новый пароль",
    currentPassword: "Пароль",
    email: "Электронная почта",
    emailError: "Введите корректный адрес электронной почты.",
    firstName: "Имя",
    firstNameError: "Имя должно содержать от 1 до 80 символов.",
    lastName: "Фамилия",
    lastNameError: "Фамилия должна содержать от 1 до 80 символов.",
    newPassword: "Новый пароль",
    password: "Пароль",
    passwordChanged: "Пароль успешно изменён.",
    passwordError: "Не удалось изменить пароль. Проверьте текущий пароль и попробуйте ещё раз.",
    passwordMismatch: "Новые пароли не совпадают.",
    passwordUnavailable: "Изменение пароля недоступно в режиме предварительного просмотра.",
    phone: "Телефон",
    phoneError: "Телефон должен содержать от 7 до 32 символов.",
    photoInvalid: "Выберите PNG, JPEG или WebP размером до 5 МБ.",
    photoUploadError: "Не удалось загрузить фото. Попробуйте ещё раз.",
    picture: "Фото профиля",
    pictureHelp: "PNG, JPEG или WebP до 5 МБ. Фото загрузится после нажатия «Сохранить».",
    previewNotice: "Это демонстрационный профиль. Изменения не сохраняются на сервере.",
    removePicture: "Удалить",
    retry: "Повторить",
    save: "Сохранить",
    saveError: "Не удалось сохранить профиль. Попробуйте ещё раз.",
    saved: "Профиль сохранён.",
    saving: "Сохранение...",
    unavailable: "Не удалось загрузить данные профиля.",
    uploadPicture: "Выбрать фото",
  },
  en: {
    details: "Details",
    account: "Account",
    cancel: "Cancel",
    changePassword: "Change password",
    changingPassword: "Changing password...",
    confirmPassword: "Confirm password",
    currentPassword: "Password",
    email: "Email",
    emailError: "Enter a valid email address.",
    firstName: "Name",
    firstNameError: "Name must be 1–80 characters.",
    lastName: "Last name",
    lastNameError: "Last name must be 1–80 characters.",
    newPassword: "New password",
    password: "Password",
    passwordChanged: "Password successfully changed.",
    passwordError: "Could not change password. Check your current password and try again.",
    passwordMismatch: "New passwords do not match.",
    passwordUnavailable: "Password changes are unavailable in preview mode.",
    phone: "Phone",
    phoneError: "Phone must be 7–32 characters.",
    photoInvalid: "Choose a PNG, JPEG or WebP image up to 5 MB.",
    photoUploadError: "Could not upload the image. Please try again.",
    picture: "Profile picture",
    pictureHelp: "PNG, JPEG or WebP up to 5 MB. The image uploads when you select Save.",
    previewNotice: "This is a preview profile. Changes are not saved to the server.",
    removePicture: "Remove",
    retry: "Retry",
    save: "Save",
    saveError: "The profile could not be saved. Please try again.",
    saved: "Profile saved.",
    saving: "Saving...",
    unavailable: "Profile details are unavailable right now.",
    uploadPicture: "Choose image",
  },
};

export function getStudentSettingsCopy(locale: Locale): StudentSettingsCopy {
  return copy[locale];
}
