import type { Locale } from "@/config/Locales";
import type { CourseRegistrationCopy } from "@/types/CourseRegistration";

const copy: Record<Locale, CourseRegistrationCopy> = {
  uz: {
    apply: "Kursga yozilish",
    alreadySubmittedMessage: "Bu telefon raqami bilan ushbu kursga ariza allaqachon yuborilgan.",
    alreadySubmittedTitle: "Ariza avval yuborilgan",
    cancel: "Bekor qilish",
    consentLabel: "Ma’lumotlarim ushbu murojaat uchun ishlatilishiga roziman.",
    email: "Email (ixtiyoriy)",
    fullName: "Ism va familiya",
    invalidEmail: "Email manzilini to‘g‘ri kiriting.",
    invalidPhone: "Davlat kodi bilan to‘g‘ri telefon raqamini kiriting.",
    message: "Izoh (ixtiyoriy)",
    phone: "Telefon raqam",
    required: "Bu maydonni to‘ldiring.",
    submit: "Yuborish",
    successMessage: "{course} kursi uchun arizangiz qabul qilindi.",
    successTitle: "Ariza yuborildi",
    title: "Kursga ro‘yxatdan o‘tish",
  },
  ru: {
    apply: "Записаться на курс",
    alreadySubmittedMessage: "С этим номером телефона заявка на этот курс уже отправлена.",
    alreadySubmittedTitle: "Заявка уже отправлена",
    cancel: "Отмена",
    consentLabel: "Я согласен на обработку моих данных для этого обращения.",
    email: "Email (необязательно)",
    fullName: "Имя и фамилия",
    invalidEmail: "Введите корректный email.",
    invalidPhone: "Введите корректный номер телефона с кодом страны.",
    message: "Комментарий (необязательно)",
    phone: "Номер телефона",
    required: "Заполните это поле.",
    submit: "Отправить",
    successMessage: "Ваша заявка на курс {course} принята.",
    successTitle: "Заявка отправлена",
    title: "Регистрация на курс",
  },
  en: {
    apply: "Register for course",
    alreadySubmittedMessage:
      "A registration request for this course has already been submitted with this phone number.",
    alreadySubmittedTitle: "Request already submitted",
    cancel: "Cancel",
    consentLabel: "I consent to my details being used for this request.",
    email: "Email (optional)",
    fullName: "Full name",
    invalidEmail: "Enter a valid email address.",
    invalidPhone: "Enter a valid phone number with its country code.",
    message: "Message (optional)",
    phone: "Phone number",
    required: "Complete this field.",
    submit: "Submit",
    successMessage: "Your application for {course} was received.",
    successTitle: "Application sent",
    title: "Course registration",
  },
};

export function getCourseRegistrationCopy(locale: Locale): CourseRegistrationCopy {
  return copy[locale];
}
