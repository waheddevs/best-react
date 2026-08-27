import type { Locale } from "@/config/Locales";
import type { AuthMode, AuthProviderId, AuthRole } from "@/types/Auth";

type AuthModeCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  switchPrompt: string;
  switchAction: string;
};

type AuthRoleCopy = {
  title: string;
  description: string;
  idLabel?: string;
  idPlaceholder?: string;
};

export type AuthCopy = {
  languageLabel: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  showPassword: string;
  hidePassword: string;
  forgotPassword: string;
  orContinue: string;
  credentialNoticeTitle: string;
  credentialNoticeMessage: string;
  unavailable: string;
  pending: string;
  roleSelection: {
    eyebrow: string;
    title: string;
    description: string;
    selectedRoleLabel: string;
    changeRole: string;
  };
  roles: Record<AuthRole, AuthRoleCopy>;
  providers: Record<AuthProviderId, string>;
  errors: {
    title: string;
    accessDenied: string;
    accountNotLinked: string;
    configuration: string;
    default: string;
  };
  modes: Record<AuthMode, AuthModeCopy>;
};

const uz: AuthCopy = {
  languageLabel: "Tilni tanlash",
  fullNameLabel: "To‘liq ism",
  fullNamePlaceholder: "Ismingizni kiriting",
  emailLabel: "Email manzil",
  emailPlaceholder: "name@example.com",
  passwordLabel: "Parol",
  passwordPlaceholder: "Parolingizni kiriting",
  confirmPasswordLabel: "Parolni tasdiqlang",
  confirmPasswordPlaceholder: "Parolni qayta kiriting",
  showPassword: "Parolni ko‘rsatish",
  hidePassword: "Parolni yashirish",
  forgotPassword: "Parolni unutdingizmi?",
  orContinue: "yoki davom eting",
  credentialNoticeTitle: "Email orqali kirish ulanmagan",
  credentialNoticeMessage:
    "Email va parol orqali kirish hali ulanmagan. Hozircha quyidagi xavfsiz tasdiqlash xizmatlaridan birini tanlang.",
  unavailable: "Bu xizmat credentials sozlangandan keyin faol bo‘ladi.",
  pending: "Yo‘naltirilmoqda…",
  roleSelection: {
    eyebrow: "DAVOM ETISH UCHUN",
    title: "Rolni tanlang",
    description: "Hisobingiz turini tanlang va xavfsiz kirishni davom ettiring.",
    selectedRoleLabel: "Tanlangan rol",
    changeRole: "Rolni o‘zgartirish",
  },
  roles: {
    teacher: {
      title: "O‘qituvchi",
      description: "Darslar va o‘quv jarayonini boshqarish uchun.",
      idLabel: "Teacher ID",
      idPlaceholder: "Teacher ID’ni kiriting",
    },
    student: {
      title: "O‘quvchi",
      description: "Kurslar va o‘quv imkoniyatlaridan foydalanish uchun.",
    },
    admin: {
      title: "Admin",
      description: "O‘quvchilar, davomat va to‘lov holatlarini boshqarish uchun.",
      idLabel: "Admin ID",
      idPlaceholder: "Admin ID’ni kiriting",
    },
  },
  providers: {
    google: "Google orqali davom etish",
    facebook: "Facebook orqali davom etish",
    apple: "Apple orqali davom etish",
  },
  errors: {
    title: "Kirishni yakunlab bo‘lmadi",
    accessDenied: "Tasdiqlash bekor qilindi yoki kirishga ruxsat berilmadi.",
    accountNotLinked: "Bu email boshqa kirish usuliga bog‘langan.",
    configuration: "Provayder sozlamalari hali to‘liq tayyor emas.",
    default: "Kutilmagan xatolik yuz berdi. Qayta urinib ko‘ring.",
  },
  modes: {
    login: {
      metadataTitle: "Kirish",
      metadataDescription: "Google, Facebook yoki Apple orqali BEST LC saytiga xavfsiz kiring.",
      eyebrow: "XUSH KELIBSIZ",
      title: "Kirish",
      description: "Ma’lumotlarni kiriting yoki xavfsiz usulni tanlang.",
      submitLabel: "Kirish",
      switchPrompt: "Hali ro‘yxatdan o‘tmaganmisiz?",
      switchAction: "Ro‘yxatdan o‘tish",
    },
    signup: {
      metadataTitle: "Ro‘yxatdan o‘tish",
      metadataDescription:
        "Google, Facebook yoki Apple orqali BEST LC saytida shaxsingizni xavfsiz tasdiqlang.",
      eyebrow: "BIRINCHI QADAM",
      title: "Ro‘yxatdan o‘tish",
      description: "Ma’lumotlarni kiriting yoki xavfsiz usulni tanlang.",
      submitLabel: "Hisob yaratish",
      switchPrompt: "Hisobingiz bormi?",
      switchAction: "Kirish",
    },
  },
};

const ru: AuthCopy = {
  languageLabel: "Выбрать язык",
  fullNameLabel: "Полное имя",
  fullNamePlaceholder: "Введите ваше имя",
  emailLabel: "Email адрес",
  emailPlaceholder: "name@example.com",
  passwordLabel: "Пароль",
  passwordPlaceholder: "Введите пароль",
  confirmPasswordLabel: "Подтвердите пароль",
  confirmPasswordPlaceholder: "Введите пароль ещё раз",
  showPassword: "Показать пароль",
  hidePassword: "Скрыть пароль",
  forgotPassword: "Забыли пароль?",
  orContinue: "или продолжите",
  credentialNoticeTitle: "Вход по email не подключён",
  credentialNoticeMessage:
    "Вход по email и паролю пока не подключён. Выберите один из безопасных сервисов подтверждения ниже.",
  unavailable: "Сервис станет доступен после настройки credentials.",
  pending: "Перенаправляем…",
  roleSelection: {
    eyebrow: "ПРОДОЛЖИТЬ КАК",
    title: "Выберите роль",
    description: "Выберите тип аккаунта и продолжите безопасный вход.",
    selectedRoleLabel: "Выбранная роль",
    changeRole: "Изменить роль",
  },
  roles: {
    teacher: {
      title: "Преподаватель",
      description: "Для работы с занятиями и учебным процессом.",
      idLabel: "Teacher ID",
      idPlaceholder: "Введите Teacher ID",
    },
    student: {
      title: "Ученик",
      description: "Для доступа к курсам и учебным возможностям.",
    },
    admin: {
      title: "Администратор",
      description: "Для работы с учениками, посещаемостью и оплатами.",
      idLabel: "Admin ID",
      idPlaceholder: "Введите Admin ID",
    },
  },
  providers: {
    google: "Продолжить с Google",
    facebook: "Продолжить с Facebook",
    apple: "Продолжить с Apple",
  },
  errors: {
    title: "Не удалось завершить вход",
    accessDenied: "Проверка была отменена или доступ не был разрешён.",
    accountNotLinked: "Этот email уже связан с другим способом входа.",
    configuration: "Настройки провайдера пока не завершены.",
    default: "Произошла непредвиденная ошибка. Попробуйте ещё раз.",
  },
  modes: {
    login: {
      metadataTitle: "Вход",
      metadataDescription: "Безопасный вход в BEST LC через Google, Facebook или Apple.",
      eyebrow: "С ВОЗВРАЩЕНИЕМ",
      title: "Войти",
      description: "Введите данные или выберите безопасный вход.",
      submitLabel: "Войти",
      switchPrompt: "Ещё нет аккаунта?",
      switchAction: "Зарегистрироваться",
    },
    signup: {
      metadataTitle: "Регистрация",
      metadataDescription:
        "Безопасно подтвердите личность для BEST LC через Google, Facebook или Apple.",
      eyebrow: "ПЕРВЫЙ ШАГ",
      title: "Регистрация",
      description: "Введите данные или выберите безопасный вход.",
      submitLabel: "Создать аккаунт",
      switchPrompt: "Уже есть аккаунт?",
      switchAction: "Войти",
    },
  },
};

const en: AuthCopy = {
  languageLabel: "Choose language",
  fullNameLabel: "Full name",
  fullNamePlaceholder: "Enter your name",
  emailLabel: "Email address",
  emailPlaceholder: "name@example.com",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",
  confirmPasswordLabel: "Confirm password",
  confirmPasswordPlaceholder: "Enter your password again",
  showPassword: "Show password",
  hidePassword: "Hide password",
  forgotPassword: "Forgot password?",
  orContinue: "or continue with",
  credentialNoticeTitle: "Email login is not connected",
  credentialNoticeMessage:
    "Email and password login is not connected yet. Please choose one of the secure verification services below.",
  unavailable: "This service will activate when its credentials are configured.",
  pending: "Redirecting…",
  roleSelection: {
    eyebrow: "CONTINUE AS",
    title: "Choose your role",
    description: "Select your account type and continue to secure access.",
    selectedRoleLabel: "Selected role",
    changeRole: "Change role",
  },
  roles: {
    teacher: {
      title: "Teacher",
      description: "For managing lessons and the learning process.",
      idLabel: "Teacher ID",
      idPlaceholder: "Enter your Teacher ID",
    },
    student: {
      title: "Student",
      description: "For accessing courses and learning opportunities.",
    },
    admin: {
      title: "Admin",
      description: "For managing students, attendance, and payment status.",
      idLabel: "Admin ID",
      idPlaceholder: "Enter your Admin ID",
    },
  },
  providers: {
    google: "Continue with Google",
    facebook: "Continue with Facebook",
    apple: "Continue with Apple",
  },
  errors: {
    title: "We could not complete login",
    accessDenied: "Verification was cancelled or access was not granted.",
    accountNotLinked: "This email is already connected to another login method.",
    configuration: "The provider configuration is not ready yet.",
    default: "Something unexpected happened. Please try again.",
  },
  modes: {
    login: {
      metadataTitle: "Login",
      metadataDescription: "Log in to BEST LC securely with Google, Facebook, or Apple.",
      eyebrow: "WELCOME BACK",
      title: "Log in",
      description: "Enter your details or use secure verification.",
      submitLabel: "Log in",
      switchPrompt: "New to BEST LC?",
      switchAction: "Create an account",
    },
    signup: {
      metadataTitle: "Create an account",
      metadataDescription:
        "Verify your identity for BEST LC securely with Google, Facebook, or Apple.",
      eyebrow: "YOUR FIRST STEP",
      title: "Sign up",
      description: "Enter your details or use secure verification.",
      submitLabel: "Create account",
      switchPrompt: "Already have an account?",
      switchAction: "Log in",
    },
  },
};

const authCopy: Record<Locale, AuthCopy> = { uz, ru, en };

export function getAuthCopy(locale: Locale): AuthCopy {
  return authCopy[locale];
}
