import type { Locale } from "@/config/Locales";
import type { AuthRole } from "@/types/Auth";

type AuthRoleCopy = {
  description: string;
  title: string;
};

export type AuthCopy = {
  backToLogin: string;
  codeLabel: string;
  codePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  errors: {
    codeLength: string;
    generic: string;
    invalidEmail: string;
    required: string;
    session: string;
    title: string;
  };
  hidePassword: string;
  login: {
    description: string;
    eyebrow: string;
    metadataDescription: string;
    metadataTitle: string;
    submitLabel: string;
    title: string;
  };
  nameLabel: string;
  namePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  pending: string;
  resend: string;
  resendCountdown: string;
  roleSelection: {
    changeRole: string;
    description: string;
    eyebrow: string;
    selectedRoleLabel: string;
    title: string;
  };
  roles: Record<AuthRole, AuthRoleCopy>;
  showPassword: string;
  verification: {
    codeHint: string;
    description: string;
    eyebrow: string;
    expiresIn: string;
    submitLabel: string;
    title: string;
  };
};

const uz: AuthCopy = {
  backToLogin: "Kirishga qaytish",
  codeLabel: "Tasdiqlash kodi",
  codePlaceholder: "000000",
  emailLabel: "Email manzil",
  emailPlaceholder: "name@example.com",
  errors: {
    codeLength: "Emailga yuborilgan 6 xonali kodni kiriting.",
    generic: "Ma’lumotlarni tekshirib, qayta urinib ko‘ring.",
    invalidEmail: "To‘g‘ri email manzilini kiriting.",
    required: "Bu maydonni to‘ldiring.",
    session: "Xavfsiz sessiyani yaratib bo‘lmadi. Qayta urinib ko‘ring.",
    title: "Kirishni yakunlab bo‘lmadi",
  },
  hidePassword: "Parolni yashirish",
  login: {
    description: "Admin bergan hisob ma’lumotlari bilan tizimga kiring.",
    eyebrow: "XUSH KELIBSIZ",
    metadataDescription: "BEST LC hisobingizga email, parol va tasdiqlash kodi bilan kiring.",
    metadataTitle: "Kirish",
    submitLabel: "Davom etish",
    title: "Kirish",
  },
  nameLabel: "To‘liq ism",
  namePlaceholder: "Ism va familiyangiz",
  passwordLabel: "Parol",
  passwordPlaceholder: "Parolingizni kiriting",
  pending: "Tekshirilmoqda…",
  resend: "Kodni qayta yuborish",
  resendCountdown: "Qayta yuborish: {seconds} soniya",
  roleSelection: {
    changeRole: "Rolni o‘zgartirish",
    description: "Admin yaratgan hisobingiz turini tanlang.",
    eyebrow: "DAVOM ETISH UCHUN",
    selectedRoleLabel: "Tanlangan rol",
    title: "Rolni tanlang",
  },
  roles: {
    admin: {
      description: "O‘quvchilar, o‘qituvchilar va markaz faoliyatini boshqarish uchun.",
      title: "Admin",
    },
    student: {
      description: "Kurslar, topshiriqlar va natijalardan foydalanish uchun.",
      title: "O‘quvchi",
    },
    teacher: {
      description: "Darslar, guruhlar va o‘quv jarayonini boshqarish uchun.",
      title: "O‘qituvchi",
    },
  },
  showPassword: "Parolni ko‘rsatish",
  verification: {
    codeHint: "Kod bir marta ishlatiladi. Uni hech kimga bermang.",
    description: "6 xonali kod {email} manziliga yuborildi.",
    eyebrow: "EMAIL TASDIQLASH",
    expiresIn: "Kod {minutes} daqiqa amal qiladi.",
    submitLabel: "Tasdiqlash",
    title: "Emailni tasdiqlang",
  },
};

const ru: AuthCopy = {
  backToLogin: "Вернуться ко входу",
  codeLabel: "Код подтверждения",
  codePlaceholder: "000000",
  emailLabel: "Email адрес",
  emailPlaceholder: "name@example.com",
  errors: {
    codeLength: "Введите шестизначный код, отправленный на email.",
    generic: "Проверьте данные и попробуйте ещё раз.",
    invalidEmail: "Введите корректный email адрес.",
    required: "Заполните это поле.",
    session: "Не удалось создать безопасную сессию. Попробуйте ещё раз.",
    title: "Не удалось завершить вход",
  },
  hidePassword: "Скрыть пароль",
  login: {
    description: "Войдите с данными аккаунта, выданными администратором.",
    eyebrow: "С ВОЗВРАЩЕНИЕМ",
    metadataDescription: "Войдите в BEST LC с помощью email, пароля и кода подтверждения.",
    metadataTitle: "Вход",
    submitLabel: "Продолжить",
    title: "Войти",
  },
  nameLabel: "Полное имя",
  namePlaceholder: "Ваше имя и фамилия",
  passwordLabel: "Пароль",
  passwordPlaceholder: "Введите пароль",
  pending: "Проверяем…",
  resend: "Отправить код ещё раз",
  resendCountdown: "Повторная отправка: {seconds} сек.",
  roleSelection: {
    changeRole: "Изменить роль",
    description: "Выберите тип аккаунта, созданного администратором.",
    eyebrow: "ПРОДОЛЖИТЬ КАК",
    selectedRoleLabel: "Выбранная роль",
    title: "Выберите роль",
  },
  roles: {
    admin: {
      description: "Для управления учениками, преподавателями и работой центра.",
      title: "Администратор",
    },
    student: {
      description: "Для доступа к курсам, заданиям и результатам.",
      title: "Ученик",
    },
    teacher: {
      description: "Для управления занятиями, группами и учебным процессом.",
      title: "Преподаватель",
    },
  },
  showPassword: "Показать пароль",
  verification: {
    codeHint: "Код одноразовый. Не сообщайте его другим.",
    description: "Шестизначный код отправлен на адрес {email}.",
    eyebrow: "ПОДТВЕРЖДЕНИЕ EMAIL",
    expiresIn: "Код действует {minutes} минут.",
    submitLabel: "Подтвердить",
    title: "Подтвердите email",
  },
};

const en: AuthCopy = {
  backToLogin: "Back to login",
  codeLabel: "Verification code",
  codePlaceholder: "000000",
  emailLabel: "Email address",
  emailPlaceholder: "name@example.com",
  errors: {
    codeLength: "Enter the six-digit code sent to your email.",
    generic: "Check your details and try again.",
    invalidEmail: "Enter a valid email address.",
    required: "Complete this field.",
    session: "We could not create a secure session. Please try again.",
    title: "We could not complete login",
  },
  hidePassword: "Hide password",
  login: {
    description: "Sign in with the account details issued by your administrator.",
    eyebrow: "WELCOME BACK",
    metadataDescription: "Access BEST LC with your email, password, and verification code.",
    metadataTitle: "Login",
    submitLabel: "Continue",
    title: "Log in",
  },
  nameLabel: "Full name",
  namePlaceholder: "Your first and last name",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",
  pending: "Checking…",
  resend: "Resend code",
  resendCountdown: "Resend in {seconds}s",
  roleSelection: {
    changeRole: "Change role",
    description: "Select the account type created by your administrator.",
    eyebrow: "CONTINUE AS",
    selectedRoleLabel: "Selected role",
    title: "Choose your role",
  },
  roles: {
    admin: {
      description: "For managing learners, teachers, and centre operations.",
      title: "Admin",
    },
    student: {
      description: "For accessing courses, assignments, and results.",
      title: "Student",
    },
    teacher: {
      description: "For managing lessons, groups, and the learning process.",
      title: "Teacher",
    },
  },
  showPassword: "Show password",
  verification: {
    codeHint: "This code is single-use. Do not share it with anyone.",
    description: "A six-digit code was sent to {email}.",
    eyebrow: "EMAIL VERIFICATION",
    expiresIn: "The code expires in {minutes} minutes.",
    submitLabel: "Verify",
    title: "Verify your email",
  },
};

const authCopy: Record<Locale, AuthCopy> = { uz, ru, en };

export function getAuthCopy(locale: Locale): AuthCopy {
  return authCopy[locale];
}
