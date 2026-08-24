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
    close: "Yopish",
    previewTitle: "Registration preview",
    previewMessage:
      "{event} uchun forma vizuali tayyor. Ma’lumot yuborish backend ulangandan keyin ishlaydi.",
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
    close: "Закрыть",
    previewTitle: "Предпросмотр регистрации",
    previewMessage:
      "Визуальная форма для события «{event}» готова. Отправка данных заработает после подключения backend.",
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
    close: "Close",
    previewTitle: "Registration preview",
    previewMessage:
      "The visual form for {event} is ready. Data submission will work after the backend is connected.",
  },
} satisfies Record<Locale, EventRegistrationCopy>;

export function getEventRegistrationCopy(locale: Locale): EventRegistrationCopy {
  return eventRegistrationCopy[locale];
}
