import type { Locale } from "@/config/Locales";

export type StudentPaymentsCopy = {
  alertClose: string;
  alertMessage: string;
  alertTitle: string;
  amount: string;
  cardNumber: string;
  cardNumberError: string;
  cardholder: string;
  expiry: string;
  expiryError: string;
  failed: string;
  heroDescription: string;
  heroEyebrow: string;
  heroLabel: string;
  heroTitle: string;
  history: string;
  pay: string;
  paid: string;
  paymentProcess: string;
  securityCode: string;
};

const copy: Record<Locale, StudentPaymentsCopy> = {
  uz: {
    alertClose: "Tushunarli",
    alertMessage: "To‘lov tizimi keyinroq qo‘shiladi. Yangilanishi bilan sizga xabar beramiz!",
    alertTitle: "To‘lov",
    amount: "Miqdor",
    cardNumber: "Karta raqami",
    cardNumberError: "Karta raqami noto‘g‘ri.",
    cardholder: "Karta egasi",
    expiry: "Amal qilish muddati",
    expiryError: "MM/YY formatida amaldagi muddatni kiriting.",
    failed: "Muvaffaqiyatsiz",
    heroDescription: "To‘lov ma’lumotlari va tarixini bir joyda ko‘ring.",
    heroEyebrow: "Hisob",
    heroLabel: "To‘lov holati",
    heroTitle: "To‘lovlar",
    history: "Tarix",
    pay: "To‘lash",
    paid: "To‘langan",
    paymentProcess: "To‘lov jarayoni",
    securityCode: "Xavfsizlik kodi",
  },
  ru: {
    alertClose: "Понятно",
    alertMessage:
      "Платёжная система будет добавлена позже. Мы сообщим вам, как только она появится!",
    alertTitle: "Оплата",
    amount: "Сумма",
    cardNumber: "Номер карты",
    cardNumberError: "Неверный номер карты.",
    cardholder: "Имя держателя карты",
    expiry: "Срок действия",
    expiryError: "Введите действующий срок в формате ММ/ГГ.",
    failed: "Не прошёл",
    heroDescription: "Платёжные данные и история в одном месте.",
    heroEyebrow: "Счёт",
    heroLabel: "Статус оплаты",
    heroTitle: "Платежи",
    history: "История",
    pay: "Оплатить",
    paid: "Оплачен",
    paymentProcess: "Процесс оплаты",
    securityCode: "Код безопасности",
  },
  en: {
    alertClose: "OK",
    alertMessage: "Payment system will be added later and we will inform you as soon as updated!",
    alertTitle: "Payment",
    amount: "Amount",
    cardNumber: "Card number",
    cardNumberError: "Enter a valid card number.",
    cardholder: "Cardholder name",
    expiry: "Expiry date",
    expiryError: "Enter a future expiry date in MM/YY format.",
    failed: "Failed",
    heroDescription: "View payment details and history in one place.",
    heroEyebrow: "Account",
    heroLabel: "Payment status",
    heroTitle: "Payments",
    history: "History",
    pay: "Pay",
    paid: "Paid",
    paymentProcess: "Payment process",
    securityCode: "Security code",
  },
};

export function getStudentPaymentsCopy(locale: Locale): StudentPaymentsCopy {
  return copy[locale];
}
