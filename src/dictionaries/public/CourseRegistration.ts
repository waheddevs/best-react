import type { Locale } from "@/config/Locales";
import type { CourseRegistrationCopy } from "@/types/CourseRegistration";

const copy: Record<Locale, CourseRegistrationCopy> = {
  uz: {
    apply: "Kursga yozilish",
    cancel: "Bekor qilish",
    consent: "Ma’lumotlarim kursga ro‘yxatdan o‘tish uchun qayta ishlanishiga roziman.",
    currentLevel: "Hozirgi daraja (ixtiyoriy)",
    email: "Email (ixtiyoriy)",
    fullName: "Ism va familiya",
    invalidEmail: "Email manzilini to‘g‘ri kiriting.",
    message: "Izoh (ixtiyoriy)",
    phone: "Telefon raqam",
    required: "Bu maydonni to‘ldiring.",
    submit: "Ariza yuborish",
    successMessage: "{course} kursi uchun arizangiz qabul qilindi.",
    successTitle: "Ariza yuborildi",
    title: "Kursga ro‘yxatdan o‘tish",
  },
  ru: {
    apply: "Записаться на курс",
    cancel: "Отмена",
    consent: "Я согласен на обработку моих данных для регистрации на курс.",
    currentLevel: "Текущий уровень (необязательно)",
    email: "Email (необязательно)",
    fullName: "Имя и фамилия",
    invalidEmail: "Введите корректный email.",
    message: "Комментарий (необязательно)",
    phone: "Номер телефона",
    required: "Заполните это поле.",
    submit: "Отправить заявку",
    successMessage: "Ваша заявка на курс {course} принята.",
    successTitle: "Заявка отправлена",
    title: "Регистрация на курс",
  },
  en: {
    apply: "Register for course",
    cancel: "Cancel",
    consent: "I agree that my data may be processed for course registration.",
    currentLevel: "Current level (optional)",
    email: "Email (optional)",
    fullName: "Full name",
    invalidEmail: "Enter a valid email address.",
    message: "Message (optional)",
    phone: "Phone number",
    required: "Complete this field.",
    submit: "Submit application",
    successMessage: "Your application for {course} was received.",
    successTitle: "Application sent",
    title: "Course registration",
  },
};

export function getCourseRegistrationCopy(locale: Locale): CourseRegistrationCopy {
  return copy[locale];
}
