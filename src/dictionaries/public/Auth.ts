import type { Locale } from "@/config/Locales";
import type { AuthRole } from "@/types/Auth";

type AuthRoleCopy = {
  description: string;
  title: string;
};

export type AuthCopy = {
  back: string;
  backToLogin: string;
  codeLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  errors: {
    codeLength: string;
    codeRejected: string;
    credentialsRejected: string;
    emailMismatch: string;
    emailRequired: string;
    firstNameMismatch: string;
    generic: string;
    invalidEmail: string;
    lastNameMismatch: string;
    lastNameRequired: string;
    nameRequired: string;
    passwordMismatch: string;
    passwordRequired: string;
    session: string;
    title: string;
    unavailable: string;
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
  lastNameLabel: string;
  lastNamePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  pending: string;
  resend: string;
  resendCountdown: string;
  serviceUnavailable: {
    description: string;
    retry: string;
    title: string;
  };
  sessionExpired: {
    description: string;
    title: string;
  };
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
  back: "Orqaga",
  backToLogin: "Kirishga qaytish",
  codeLabel: "Tasdiqlash kodi",
  emailLabel: "Email manzil",
  emailPlaceholder: "name@example.com",
  firstNameLabel: "Ism",
  firstNamePlaceholder: "Ismingiz",
  errors: {
    unavailable: "Server bilan bog‘lanib bo‘lmadi. Birozdan keyin qayta urinib ko‘ring.",
    codeLength: "Emailga yuborilgan 6 xonali kodni kiriting.",
    codeRejected: "Kod tasdiqlanmadi. Uni tekshiring yoki yangi kod so‘rang.",
    credentialsRejected: "Ism, email, parol va tanlangan rolni tekshirib, qayta urinib ko‘ring.",
    emailMismatch: "Email manzil noto‘g‘ri yoki hisob topilmadi.",
    emailRequired: "Email manzilni kiriting.",
    firstNameMismatch: "Ism hisobdagi ma’lumotga mos kelmadi.",
    generic: "Ma’lumotlarni tekshirib, qayta urinib ko‘ring.",
    invalidEmail: "To‘g‘ri email manzilini kiriting.",
    lastNameMismatch: "Familiya hisobdagi ma’lumotga mos kelmadi.",
    lastNameRequired: "Familiyani kiriting.",
    nameRequired: "Ismni kiriting.",
    passwordMismatch: "Parol noto‘g‘ri.",
    passwordRequired: "Parolni kiriting.",
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
  lastNameLabel: "Familiya",
  lastNamePlaceholder: "Familiyangiz",
  passwordLabel: "Parol",
  passwordPlaceholder: "Parolingizni kiriting",
  pending: "Tekshirilmoqda…",
  resend: "Kodni qayta yuborish",
  resendCountdown: "Qayta yuborish: {seconds} soniya",
  serviceUnavailable: {
    description: "Server bilan bog‘lanib bo‘lmadi. Sessiyangiz saqlanib qoldi.",
    retry: "Qayta urinish",
    title: "Server vaqtincha mavjud emas",
  },
  sessionExpired: {
    description: "Xavfsizligingiz uchun sessiya yakunlandi. Qayta kiring.",
    title: "Sessiya muddati tugadi",
  },
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
  back: "Назад",
  backToLogin: "Вернуться ко входу",
  codeLabel: "Код подтверждения",
  emailLabel: "Email адрес",
  emailPlaceholder: "name@example.com",
  firstNameLabel: "Имя",
  firstNamePlaceholder: "Ваше имя",
  errors: {
    unavailable: "Не удалось связаться с сервером. Попробуйте позже.",
    codeLength: "Введите шестизначный код, отправленный на email.",
    codeRejected: "Код не подтверждён. Проверьте его или запросите новый.",
    credentialsRejected: "Проверьте имя, email, пароль и выбранную роль и попробуйте снова.",
    emailMismatch: "Email указан неверно или аккаунт не найден.",
    emailRequired: "Введите адрес электронной почты.",
    firstNameMismatch: "Имя не совпадает с данными аккаунта.",
    generic: "Проверьте данные и попробуйте ещё раз.",
    invalidEmail: "Введите корректный email адрес.",
    lastNameMismatch: "Фамилия не совпадает с данными аккаунта.",
    lastNameRequired: "Введите фамилию.",
    nameRequired: "Введите имя.",
    passwordMismatch: "Неверный пароль.",
    passwordRequired: "Введите пароль.",
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
  lastNameLabel: "Фамилия",
  lastNamePlaceholder: "Ваша фамилия",
  passwordLabel: "Пароль",
  passwordPlaceholder: "Введите пароль",
  pending: "Проверяем…",
  resend: "Отправить код ещё раз",
  resendCountdown: "Повторная отправка: {seconds} сек.",
  serviceUnavailable: {
    description: "Не удалось подключиться к серверу. Ваша сессия сохранена.",
    retry: "Повторить",
    title: "Сервер временно недоступен",
  },
  sessionExpired: {
    description: "В целях безопасности сеанс завершён. Войдите снова.",
    title: "Срок действия сеанса истёк",
  },
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
  back: "Back",
  backToLogin: "Back to login",
  codeLabel: "Verification code",
  emailLabel: "Email address",
  emailPlaceholder: "name@example.com",
  firstNameLabel: "First name",
  firstNamePlaceholder: "First name",
  errors: {
    unavailable: "Could not connect to the server. Please try again shortly.",
    codeLength: "Enter the six-digit code sent to your email.",
    codeRejected: "The code could not be verified. Check it or request a new one.",
    credentialsRejected: "Check your name, email, password, and selected role, then try again.",
    emailMismatch: "This email is incorrect or no account was found.",
    emailRequired: "Enter your email address.",
    firstNameMismatch: "First name does not match this account.",
    generic: "Check your details and try again.",
    invalidEmail: "Enter a valid email address.",
    lastNameMismatch: "Last name does not match this account.",
    lastNameRequired: "Enter your last name.",
    nameRequired: "Enter your first name.",
    passwordMismatch: "Incorrect password.",
    passwordRequired: "Enter your password.",
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
  lastNameLabel: "Last name",
  lastNamePlaceholder: "Last name",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",
  pending: "Checking…",
  resend: "Resend code",
  resendCountdown: "Resend in {seconds}s",
  serviceUnavailable: {
    description: "We could not connect to the server. Your session has been preserved.",
    retry: "Try again",
    title: "Server temporarily unavailable",
  },
  sessionExpired: {
    description: "Your session ended for security. Sign in again to continue.",
    title: "Session expired",
  },
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
