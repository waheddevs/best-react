import type { Locale } from "@/config/Locales";
import type { TestSkill } from "@/gql/graphql";
import type { StudentTestsCopy } from "@/types/student/StudentTests";

const copy: Record<Locale, StudentTestsCopy> = {
  uz: {
    openErrorTitle: "Test ochilmadi",
    openErrorMessage: "Testni ochib bo‘lmadi. Iltimos, qayta urinib ko‘ring.",
    instructionsTitle: "Boshlashdan oldin",
    instructionsText:
      "Ushbu mashq testi tinglab tushunish, o‘qish, yozish va gapirish ko‘nikmalarini qamrab oladi. Har bir bo‘lim ko‘rsatmalarini diqqat bilan o‘qing va vaqtingizni to‘g‘ri taqsimlang. Audioyozuvlarni diqqat bilan tinglang, o‘qish bo‘limidagi javoblaringizni matnga asoslang, ikkala yozma topshiriqni o‘z so‘zlaringiz bilan bajaring va gapirganda fikrlaringizni aniq, mos misollar bilan ifodalang. So‘zlar soniga qo‘yilgan talablarga rioya qiling va yuborishdan oldin javoblaringizni tekshiring.",
    academicModuleLabel: "Academic",
    allSkillsLabel: "4 ta bo‘lim",
    applyLabel: "Kirish",
    availableLabel: "Mavjud",
    continueLabel: "Davom etish",
    emptyLabel: "Hozircha siz uchun test biriktirilmagan.",
    eyebrow: "IELTS PRACTICE",
    minutesLabel: "daqiqa",
    moduleLabel: "Modul",
    nextPage: "Keyingi sahifa",
    pageLabel: "{page}-sahifa",
    paginationLabel: "Test sahifalari",
    practiceTestLabel: "Mashq testi",
    previousPage: "Oldingi sahifa",
    questionsLabel: "savol",
    reviewLabel: "Testni ko‘rish",
    resultLabel: "Natijani ko‘rish",
    skillSubtitles: {
      LISTENING: ["4 bo‘lim", "40 savol"],
      READING: ["3 matn", "40 savol"],
      WRITING: ["1-topshiriq", "2-topshiriq"],
      SPEAKING: ["3 qism", "9 savol"],
    },
    sourceLabel: "Manba",
    startLabel: "Boshlash",
    startingLabel: "Ochilmoqda...",
    subtitle: "Listening, Reading, Writing va Speaking bir joyda.",
    submittedLabel: "Tekshirilmoqda",
    title: "Mashq testlari",
    yearLabel: "Yil",
  },
  ru: {
    openErrorTitle: "Тест не открылся",
    openErrorMessage: "Не удалось открыть тест. Пожалуйста, попробуйте ещё раз.",
    instructionsTitle: "Перед началом",
    instructionsText:
      "Этот пробный тест охватывает аудирование, чтение, письмо и устную речь. Внимательно читайте инструкции к каждому разделу и распределяйте время. Слушайте записи, отвечайте на вопросы по чтению на основе текстов, выполняйте оба письменных задания своими словами и говорите чётко, подкрепляя мысли подходящими примерами. Соблюдайте требования к количеству слов и проверяйте ответы перед отправкой.",
    academicModuleLabel: "Academic",
    allSkillsLabel: "4 раздела",
    applyLabel: "Открыть",
    availableLabel: "Доступен",
    continueLabel: "Продолжить",
    emptyLabel: "Для вас пока не назначен тест.",
    eyebrow: "IELTS PRACTICE",
    minutesLabel: "минут",
    moduleLabel: "Модуль",
    nextPage: "Следующая страница",
    pageLabel: "Страница {page}",
    paginationLabel: "Страницы тестов",
    practiceTestLabel: "Пробный тест",
    previousPage: "Предыдущая страница",
    questionsLabel: "вопросов",
    reviewLabel: "Просмотреть тест",
    resultLabel: "Посмотреть результат",
    skillSubtitles: {
      LISTENING: ["4 раздела", "40 вопросов"],
      READING: ["3 текста", "40 вопросов"],
      WRITING: ["Задание 1", "Задание 2"],
      SPEAKING: ["3 части", "9 вопросов"],
    },
    sourceLabel: "Источник",
    startLabel: "Начать",
    startingLabel: "Открываем...",
    subtitle: "Listening, Reading, Writing и Speaking в одном тесте.",
    submittedLabel: "На проверке",
    title: "Пробные тесты",
    yearLabel: "Год",
  },
  en: {
    openErrorTitle: "Test could not be opened",
    openErrorMessage: "The test could not be opened. Please try again.",
    instructionsTitle: "Before you begin",
    instructionsText:
      "This practice test covers Listening, Reading, Writing, and Speaking. Read each section’s instructions carefully and manage your time. Listen attentively to the recordings, base your reading answers on the passages, complete both writing tasks in your own words, and speak clearly with relevant examples. Follow the word limits and review your answers before submitting.",
    academicModuleLabel: "Academic",
    allSkillsLabel: "4 sections",
    applyLabel: "Apply",
    availableLabel: "Available",
    continueLabel: "Continue",
    emptyLabel: "No test has been assigned to you yet.",
    eyebrow: "IELTS PRACTICE",
    minutesLabel: "minutes",
    moduleLabel: "Module",
    nextPage: "Next page",
    pageLabel: "Page {page}",
    paginationLabel: "Test pages",
    practiceTestLabel: "Practice test",
    previousPage: "Previous page",
    questionsLabel: "questions",
    reviewLabel: "Review test",
    resultLabel: "View result",
    skillSubtitles: {
      LISTENING: ["4 sections", "40 questions"],
      READING: ["3 passages", "40 questions"],
      WRITING: ["Task 1", "Task 2"],
      SPEAKING: ["3 parts", "9 questions"],
    },
    sourceLabel: "Source",
    startLabel: "Start",
    startingLabel: "Opening...",
    subtitle: "Listening, Reading, Writing and Speaking in one test.",
    submittedLabel: "Awaiting review",
    title: "Practice tests",
    yearLabel: "Year",
  },
};

export function getStudentTestsCopy(locale: Locale): StudentTestsCopy {
  return copy[locale];
}

type StudentSkillCardDetail = { label: string; value: string };

const skillCardDetails: Record<Locale, Record<TestSkill, StudentSkillCardDetail[]>> = {
  uz: {
    LISTENING: [
      { label: "Bo‘limlar", value: "4" },
      { label: "Savollar", value: "40" },
      { label: "Davomiylik", value: "30 daqiqa" },
      { label: "Format", value: "Audio" },
    ],
    READING: [
      { label: "Matnlar", value: "3" },
      { label: "Savollar", value: "40" },
      { label: "Davomiylik", value: "60 daqiqa" },
      { label: "Format", value: "Academic" },
    ],
    WRITING: [
      { label: "Topshiriqlar", value: "2" },
      { label: "Davomiylik", value: "60 daqiqa" },
      { label: "Format", value: "Essay / report" },
      { label: "Javob", value: "Yozma" },
    ],
    SPEAKING: [
      { label: "Qismlar", value: "3" },
      { label: "Davomiylik", value: "11–14 daqiqa" },
      { label: "Format", value: "Intervyu" },
      { label: "Javob", value: "Og‘zaki" },
    ],
  },
  ru: {
    LISTENING: [
      { label: "Разделы", value: "4" },
      { label: "Вопросы", value: "40" },
      { label: "Время", value: "30 минут" },
      { label: "Формат", value: "Аудио" },
    ],
    READING: [
      { label: "Тексты", value: "3" },
      { label: "Вопросы", value: "40" },
      { label: "Время", value: "60 минут" },
      { label: "Формат", value: "Academic" },
    ],
    WRITING: [
      { label: "Задания", value: "2" },
      { label: "Время", value: "60 минут" },
      { label: "Формат", value: "Essay / report" },
      { label: "Ответ", value: "Письменный" },
    ],
    SPEAKING: [
      { label: "Части", value: "3" },
      { label: "Время", value: "11–14 минут" },
      { label: "Формат", value: "Интервью" },
      { label: "Ответ", value: "Устный" },
    ],
  },
  en: {
    LISTENING: [
      { label: "Sections", value: "4" },
      { label: "Questions", value: "40" },
      { label: "Duration", value: "30 minutes" },
      { label: "Format", value: "Audio" },
    ],
    READING: [
      { label: "Passages", value: "3" },
      { label: "Questions", value: "40" },
      { label: "Duration", value: "60 minutes" },
      { label: "Format", value: "Academic" },
    ],
    WRITING: [
      { label: "Tasks", value: "2" },
      { label: "Duration", value: "60 minutes" },
      { label: "Format", value: "Essay / report" },
      { label: "Response", value: "Written" },
    ],
    SPEAKING: [
      { label: "Parts", value: "3" },
      { label: "Duration", value: "11–14 minutes" },
      { label: "Format", value: "Interview" },
      { label: "Response", value: "Spoken" },
    ],
  },
};

export function getStudentSkillCardDetails(locale: Locale) {
  return skillCardDetails[locale];
}
