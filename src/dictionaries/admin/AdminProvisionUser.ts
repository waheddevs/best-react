import type { Locale } from "@/config/Locales";
import type {
  AdminProvisionUserCopy,
  ProvisionableUserRole,
} from "@/types/admin/AdminProvisionUser";

type RoleCopy = Record<ProvisionableUserRole, AdminProvisionUserCopy>;

const copies: Record<Locale, RoleCopy> = {
  uz: {
    STUDENT: {
      cancel: "Bekor qilish",
      close: "Yopish",
      description:
        "Talaba uchun login ma'lumotlarini yarating. Vaqtinchalik parolni xavfsiz kanal orqali bering.",
      emailLabel: "Email",
      emailPlaceholder: "student@example.com",
      error: "Hisob yaratilmadi. Ma'lumotlarni tekshirib, qayta urinib ko'ring.",
      nameLabel: "To'liq ism",
      namePlaceholder: "Talabaning to'liq ismi",
      passwordHint: "Kamida 12 ta belgi kiriting.",
      passwordLabel: "Vaqtinchalik parol",
      passwordPlaceholder: "Kuchli vaqtinchalik parol",
      pending: "Yaratilmoqda...",
      studentGroup: {
        groupLabel: "Guruh",
        groupPlaceholder: "Guruhni tanlang",
        groupTypeLabel: "Guruh turi",
        groupTypePlaceholder: "Turni tanlang",
        groupTypes: {
          CEFR: "CEFR",
          GENERAL_ENGLISH: "General English",
          IELTS: "IELTS",
        },
      },
      submit: "Talaba hisobini yaratish",
      success: "Talaba hisobi yaratildi. Parolni faqat xavfsiz kanal orqali yuboring.",
      title: "Yangi talaba hisobi",
    },
    TEACHER: {
      cancel: "Bekor qilish",
      close: "Yopish",
      description:
        "O'qituvchi uchun login ma'lumotlarini yarating. Vaqtinchalik parolni xavfsiz kanal orqali bering.",
      emailLabel: "Email",
      emailPlaceholder: "teacher@example.com",
      error: "Hisob yaratilmadi. Ma'lumotlarni tekshirib, qayta urinib ko'ring.",
      nameLabel: "To'liq ism",
      namePlaceholder: "O'qituvchining to'liq ismi",
      passwordHint: "Kamida 12 ta belgi kiriting.",
      passwordLabel: "Vaqtinchalik parol",
      passwordPlaceholder: "Kuchli vaqtinchalik parol",
      pending: "Yaratilmoqda...",
      submit: "O'qituvchi hisobini yaratish",
      success: "O'qituvchi hisobi yaratildi. Parolni faqat xavfsiz kanal orqali yuboring.",
      title: "Yangi o'qituvchi hisobi",
    },
  },
  ru: {
    STUDENT: {
      cancel: "Отмена",
      close: "Закрыть",
      description:
        "Создайте данные для входа ученика. Передайте временный пароль по защищённому каналу.",
      emailLabel: "Эл. почта",
      emailPlaceholder: "student@example.com",
      error: "Аккаунт не создан. Проверьте данные и попробуйте снова.",
      nameLabel: "Полное имя",
      namePlaceholder: "Полное имя ученика",
      passwordHint: "Введите не менее 12 символов.",
      passwordLabel: "Временный пароль",
      passwordPlaceholder: "Надёжный временный пароль",
      pending: "Создание...",
      studentGroup: {
        groupLabel: "Группа",
        groupPlaceholder: "Выберите группу",
        groupTypeLabel: "Тип группы",
        groupTypePlaceholder: "Выберите тип",
        groupTypes: {
          CEFR: "CEFR",
          GENERAL_ENGLISH: "General English",
          IELTS: "IELTS",
        },
      },
      submit: "Создать аккаунт ученика",
      success: "Аккаунт ученика создан. Передайте пароль только по защищённому каналу.",
      title: "Новый аккаунт ученика",
    },
    TEACHER: {
      cancel: "Отмена",
      close: "Закрыть",
      description:
        "Создайте данные для входа преподавателя. Передайте временный пароль по защищённому каналу.",
      emailLabel: "Эл. почта",
      emailPlaceholder: "teacher@example.com",
      error: "Аккаунт не создан. Проверьте данные и попробуйте снова.",
      nameLabel: "Полное имя",
      namePlaceholder: "Полное имя преподавателя",
      passwordHint: "Введите не менее 12 символов.",
      passwordLabel: "Временный пароль",
      passwordPlaceholder: "Надёжный временный пароль",
      pending: "Создание...",
      submit: "Создать аккаунт преподавателя",
      success: "Аккаунт преподавателя создан. Передайте пароль только по защищённому каналу.",
      title: "Новый аккаунт преподавателя",
    },
  },
  en: {
    STUDENT: {
      cancel: "Cancel",
      close: "Close",
      description:
        "Create student login details and share the temporary password through a secure channel.",
      emailLabel: "Email",
      emailPlaceholder: "student@example.com",
      error: "The account was not created. Check the details and try again.",
      nameLabel: "Full name",
      namePlaceholder: "Student's full name",
      passwordHint: "Use at least 12 characters.",
      passwordLabel: "Temporary password",
      passwordPlaceholder: "Strong temporary password",
      pending: "Creating...",
      studentGroup: {
        groupLabel: "Group",
        groupPlaceholder: "Select group",
        groupTypeLabel: "Group type",
        groupTypePlaceholder: "Select type",
        groupTypes: {
          CEFR: "CEFR",
          GENERAL_ENGLISH: "General English",
          IELTS: "IELTS",
        },
      },
      submit: "Create student account",
      success: "Student account created. Share the password only through a secure channel.",
      title: "New student account",
    },
    TEACHER: {
      cancel: "Cancel",
      close: "Close",
      description:
        "Create teacher login details and share the temporary password through a secure channel.",
      emailLabel: "Email",
      emailPlaceholder: "teacher@example.com",
      error: "The account was not created. Check the details and try again.",
      nameLabel: "Full name",
      namePlaceholder: "Teacher's full name",
      passwordHint: "Use at least 12 characters.",
      passwordLabel: "Temporary password",
      passwordPlaceholder: "Strong temporary password",
      pending: "Creating...",
      submit: "Create teacher account",
      success: "Teacher account created. Share the password only through a secure channel.",
      title: "New teacher account",
    },
  },
};

export function getAdminProvisionUserCopy(
  locale: Locale,
  role: ProvisionableUserRole,
): AdminProvisionUserCopy {
  return copies[locale][role];
}
