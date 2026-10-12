import type { Locale } from "@/config/Locales";

const copy = {
  tracksTitle: ["Kurs yo‘nalishlari", "Направления курса", "Course tracks"],
  tracksHelp: [
    "Kurs alohida bosqich yoki yo‘nalishlarga bo‘linsa, shu yerga qo‘shing.",
    "Добавьте отдельные этапы или направления, если они есть в курсе.",
    "Add tracks if the course has separate stages or study paths.",
  ],
  addTrack: ["Yo‘nalish qo‘shish", "Добавить направление", "Add track"],
  removeTrack: ["Yo‘nalishni o‘chirish", "Удалить направление", "Remove track"],
  noTracks: [
    "Hozircha yo‘nalish yo‘q. Bu bo‘limni bo‘sh qoldirish mumkin.",
    "Направлений пока нет. Этот раздел можно оставить пустым.",
    "No tracks added. You can leave this section empty.",
  ],
  track: ["Yo‘nalish", "Направление", "Track"],
  trackName: ["Yo‘nalish nomi", "Название направления", "Track name"],
  trackLevel: ["Daraja", "Уровень", "Level"],
  trackSummary: ["Qisqa tavsif", "Краткое описание", "Short description"],
  trackHighlights: ["Asosiy jihatlar", "Основные особенности", "Key points"],
  trackNameHint: [
    "Masalan, IELTS Foundation",
    "Например, IELTS Foundation",
    "e.g. IELTS Foundation",
  ],
  trackLevelHint: ["Masalan, A2–B1", "Например, A2–B1", "e.g. A2–B1"],
  trackSummaryHint: [
    "Bu yo‘nalish kim uchun va nimalarni o‘rgatadi?",
    "Для кого это направление и чему оно учит?",
    "Who is this track for, and what will they learn?",
  ],
  trackHighlightsHint: [
    "Lug‘at boyligini oshirish\nHaftalik mashqlar",
    "Расширение словарного запаса\nЕженедельная практика",
    "Vocabulary building\nWeekly practice",
  ],
  trackHighlightsHelp: [
    "Har bir jihatni yangi qatordan yozing. Ixtiyoriy.",
    "Каждый пункт — с новой строки. Необязательно.",
    "One point per line. Optional.",
  ],
  basics: ["Asosiy ma’lumotlar", "Основная информация", "Course information"],
  details: ["Kurs tafsilotlari", "Подробнее о курсе", "Course details"],
  display: ["Ko‘rinish sozlamalari", "Настройки отображения", "Display settings"],
  image: ["Kurs rasmi", "Изображение курса", "Course image"],
  upload: ["Rasm yuklash", "Загрузить изображение", "Upload image"],
  replace: ["Rasmni almashtirish", "Заменить изображение", "Replace image"],
  removeImage: ["Rasmni olib tashlash", "Убрать изображение", "Remove image"],
  imageHelp: [
    "JPG, PNG yoki WebP · 10 MB gacha",
    "JPG, PNG или WebP · до 10 МБ",
    "JPG, PNG or WebP · up to 10 MB",
  ],
  uploading: ["Yuklanmoqda va tekshirilmoqda…", "Загрузка и проверка…", "Uploading and checking…"],
  imageError: [
    "Rasm yuklanmadi. Qayta urinib ko‘ring.",
    "Не удалось загрузить изображение. Попробуйте ещё раз.",
    "Image upload failed. Please try again.",
  ],
  imageInvalid: [
    "10 MB gacha JPG, PNG yoki WebP rasm tanlang.",
    "Выберите JPG, PNG или WebP до 10 МБ.",
    "Choose a JPG, PNG or WebP image up to 10 MB.",
  ],
  previewError: [
    "Rasmni ko‘rsatib bo‘lmadi.",
    "Не удалось показать изображение.",
    "Image preview is unavailable.",
  ],
  courseHelp: [
    "Kurs ma’lumotlari va rasmini kiriting.",
    "Добавьте информацию и изображение курса.",
    "Add the course information and image.",
  ],
} satisfies Record<string, [string, string, string]>;

export function getAdminCourseEditorText(locale: Locale) {
  const index = locale === "uz" ? 0 : locale === "ru" ? 1 : 2;
  return (key: keyof typeof copy) => copy[key][index];
}
