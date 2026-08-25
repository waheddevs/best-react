import type { Locale } from "@/config/Locales";
import type { EventRegistrationCopy } from "@/types/EventRegistration";

const eventRegistrationCopy = {
  uz: {
    eyebrow: "EVENT REGISTRATION",
    title: "Joyingizni band qiling",
    description:
      "G‘oyalar, faoliyatlar va yangi tanishuvlarga boy qiziqarli tadbirda boshqa o‘quvchilar bilan birga qatnashing.",
    selectedEvent: "Tanlangan tadbir",
    fullName: "Ism va familiya",
    fullNamePlaceholder: "Alex Morgan",
    phone: "Telefon raqam",
    phonePlaceholder: "+998 00 000 00 00",
    email: "Email",
    emailPlaceholder: "student@example.com",
    participants: "Ishtirokchilar soni",
    consent: "Tadbir yangiliklari va tashkiliy ma’lumotlarni olishga roziman.",
    cancel: "Bekor qilish",
    register: "Register",
    close: "Tushunarli",
    successTitle: "Ishtirokingiz tasdiqlandi",
    successMessage: "{event} uchun joyingiz band qilindi. Sizni tadbirda kutamiz.",
    pastEventTitle: "Ro‘yxatdan o‘tish yopilgan",
    pastEventMessage: "{event} tadbiri {date} kuni yakunlangan. Keyingi tadbirda sizni kutamiz.",
  },
  ru: {
    eyebrow: "РЕГИСТРАЦИЯ НА СОБЫТИЕ",
    title: "Забронируйте своё место",
    description:
      "Присоединяйтесь к другим учащимся на увлекательном событии, наполненном идеями, активностями и новыми знакомствами.",
    selectedEvent: "Выбранное событие",
    fullName: "Имя и фамилия",
    fullNamePlaceholder: "Alex Morgan",
    phone: "Номер телефона",
    phonePlaceholder: "+998 00 000 00 00",
    email: "Email",
    emailPlaceholder: "student@example.com",
    participants: "Количество участников",
    consent: "Я согласен получать новости события и организационную информацию.",
    cancel: "Отмена",
    register: "Register",
    close: "Готово",
    successTitle: "Участие подтверждено",
    successMessage: "Ваше место на событии «{event}» забронировано. Будем рады видеть вас там.",
    pastEventTitle: "Регистрация закрыта",
    pastEventMessage:
      "Событие «{event}» завершилось {date}. Будем рады видеть вас на следующем событии.",
  },
  en: {
    eyebrow: "EVENT REGISTRATION",
    title: "Reserve your place",
    description:
      "Join fellow learners for an engaging event filled with ideas, activities, and new connections.",
    selectedEvent: "Selected event",
    fullName: "Full name",
    fullNamePlaceholder: "Alex Morgan",
    phone: "Phone number",
    phonePlaceholder: "+998 00 000 00 00",
    email: "Email",
    emailPlaceholder: "student@example.com",
    participants: "Number of participants",
    consent: "I agree to receive event updates and organisational information.",
    cancel: "Cancel",
    register: "Register",
    close: "Done",
    successTitle: "Attendance confirmed",
    successMessage: "Your place for {event} is reserved. We’re happy to have you with us.",
    pastEventTitle: "Registration closed",
    pastEventMessage: "{event} ended on {date}. We’d love to see you at the next event.",
  },
} satisfies Record<Locale, EventRegistrationCopy>;

export function getEventRegistrationCopy(locale: Locale): EventRegistrationCopy {
  return eventRegistrationCopy[locale];
}
