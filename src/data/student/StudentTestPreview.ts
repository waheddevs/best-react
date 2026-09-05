import type { Locale } from "@/config/Locales";
import type { StudentPreviewQuestion } from "@/types/student/StudentTestRunner";

type LocalizedText = Record<Locale, string>;
type PreviewQuestionSeed = Omit<StudentPreviewQuestion, "options" | "pairs" | "prompt"> & {
  options?: LocalizedText[];
  pairs?: Array<{ id: string; left: LocalizedText }>;
  prompt: LocalizedText;
};

// Fictional client-preview questions. This module intentionally contains no answer key.
const questionSeeds: PreviewQuestionSeed[] = [
  {
    id: "q-01",
    kind: "singleChoice",
    prompt: {
      uz: "Akademik kirish qismi uchun eng aniq maqsadni tanlang.",
      ru: "Выберите наиболее точную цель академического введения.",
      en: "Choose the clearest purpose for an academic introduction.",
    },
    options: [
      {
        uz: "Mavzu va asosiy fikrni belgilash",
        ru: "Обозначить тему и тезис",
        en: "Frame the topic and thesis",
      },
      {
        uz: "Barcha dalillarni sanash",
        ru: "Перечислить все доказательства",
        en: "List every piece of evidence",
      },
      { uz: "Xulosani takrorlash", ru: "Повторить заключение", en: "Repeat the conclusion" },
    ],
  },
  {
    id: "q-02",
    kind: "multipleChoice",
    prompt: {
      uz: "Ishonchli akademik manba belgilarini tanlang.",
      ru: "Выберите признаки надёжного академического источника.",
      en: "Select the signs of a reliable academic source.",
    },
    options: [
      { uz: "Muallif ko'rsatilgan", ru: "Указан автор", en: "Named author" },
      {
        uz: "Dalillar havolalangan",
        ru: "Есть ссылки на доказательства",
        en: "Evidence is referenced",
      },
      {
        uz: "Faqat noma'lum izohlar bor",
        ru: "Только анонимные комментарии",
        en: "Only anonymous comments",
      },
    ],
  },
  {
    id: "q-03",
    kind: "trueFalse",
    prompt: {
      uz: "Har bir paragraf bitta markaziy fikrni rivojlantirishi kerak.",
      ru: "Каждый абзац должен развивать одну центральную мысль.",
      en: "Each paragraph should develop one central idea.",
    },
  },
  {
    id: "q-04",
    kind: "shortText",
    prompt: {
      uz: "Bir bog'lovchi ibora yozing.",
      ru: "Напишите одну связующую фразу.",
      en: "Write one linking phrase.",
    },
  },
  {
    id: "q-05",
    kind: "longText",
    prompt: {
      uz: "Texnologiya ta'limni qanday yaxshilashi haqida qisqa paragraf yozing.",
      ru: "Напишите короткий абзац о том, как технологии улучшают образование.",
      en: "Write a short paragraph about how technology can improve education.",
    },
  },
  {
    id: "q-06",
    kind: "matching",
    prompt: {
      uz: "Yozuv qismlarini ularning vazifasi bilan moslang.",
      ru: "Сопоставьте части текста с их функцией.",
      en: "Match each writing part to its function.",
    },
    pairs: [
      { id: "introduction", left: { uz: "Kirish", ru: "Введение", en: "Introduction" } },
      { id: "body", left: { uz: "Asosiy qism", ru: "Основная часть", en: "Body" } },
      { id: "conclusion", left: { uz: "Xulosa", ru: "Заключение", en: "Conclusion" } },
    ],
    options: [
      { uz: "Tezisni taqdim etadi", ru: "Представляет тезис", en: "Introduces the thesis" },
      { uz: "Dalillarni rivojlantiradi", ru: "Развивает доказательства", en: "Develops evidence" },
      {
        uz: "Asosiy fikrni yakunlaydi",
        ru: "Завершает основную мысль",
        en: "Closes the main argument",
      },
    ],
  },
  {
    id: "q-07",
    kind: "ordering",
    prompt: {
      uz: "Paragraf jarayonini mantiqiy tartibga keltiring.",
      ru: "Расположите этапы абзаца в логическом порядке.",
      en: "Put the paragraph process into a logical order.",
    },
    options: [
      { uz: "Mavzu gapi", ru: "Тематическое предложение", en: "Topic sentence" },
      { uz: "Dalil", ru: "Доказательство", en: "Evidence" },
      { uz: "Tahlil", ru: "Анализ", en: "Analysis" },
      { uz: "Bog'lovchi yakun", ru: "Связующий вывод", en: "Linking close" },
    ],
  },
  {
    id: "q-08",
    kind: "mediaPrompt",
    prompt: {
      uz: "Audio topshiriq uchun yozma qayd qoldiring.",
      ru: "Оставьте письменную заметку к аудиозаданию.",
      en: "Leave a written note for the audio prompt.",
    },
  },
];

export function getStudentPreviewQuestions(locale: Locale): StudentPreviewQuestion[] {
  return questionSeeds.map((question) => ({
    id: question.id,
    kind: question.kind,
    options: question.options?.map((option) => option[locale]),
    pairs: question.pairs?.map((pair) => ({ id: pair.id, left: pair.left[locale] })),
    prompt: question.prompt[locale],
  }));
}
