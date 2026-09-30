import type { Locale } from "@/config/Locales";

export type TeacherTestAuthoringCopy = {
  addBlock: string;
  addQuestion: string;
  addSection: string;
  answerHelp: string;
  answers: string;
  back: string;
  blockKind: string;
  blockText: string;
  cancel: string;
  contentBlocks: string;
  draft: string;
  emptyBlocks: string;
  emptyQuestions: string;
  emptySections: string;
  editBlock: string;
  editQuestion: string;
  editSection: string;
  error: string;
  instructions: string;
  minimumWords: string;
  options: string;
  optionsHelp: string;
  preparationSeconds: string;
  publish: string;
  publishConfirm: string;
  publishReady: string;
  published: string;
  questionKind: string;
  questionPrompt: string;
  questions: string;
  rationale: string;
  responseSeconds: string;
  save: string;
  section: string;
  sectionTitle: string;
  selectQuestions: string;
  suggestedMinutes: string;
  title: string;
  validation: string;
  validationEmpty: string;
  validationHint: string;
};

const copies: Record<Locale, TeacherTestAuthoringCopy> = {
  uz: {
    addBlock: "Content block qo‘shish",
    addQuestion: "Savol qo‘shish",
    addSection: "Section qo‘shish",
    answerHelp: "Short text javoblarini har qatorga bittadan yozing.",
    answers: "Qabul qilinadigan javoblar",
    back: "Practice sahifasiga qaytish",
    blockKind: "Block turi",
    blockText: "Block matni",
    cancel: "Bekor qilish",
    contentBlocks: "Content blocks",
    draft: "Draft editor",
    emptyBlocks: "Bu sectionda hali content block yo‘q.",
    emptyQuestions: "Bu sectionda hali savol yo‘q.",
    emptySections: "Birinchi sectionni qo‘shib test tuzishni boshlang.",
    editBlock: "Content blockni tahrirlash",
    editQuestion: "Savolni tahrirlash",
    editSection: "Sectionni tahrirlash",
    error: "So‘rov bajarilmadi. Ma’lumotni tekshirib qayta urinib ko‘ring.",
    instructions: "Ko‘rsatma",
    minimumWords: "Minimum so‘z",
    options: "Variantlar",
    optionsHelp: "Har qatorga bitta variant. To‘g‘ri variant boshiga * qo‘ying.",
    preparationSeconds: "Tayyorlanish (sekund)",
    publish: "Publish",
    publishConfirm: "Validatsiyadan o‘tgan draftni immutable test sifatida publish qilasizmi?",
    publishReady: "Draft publish qilishga tayyor.",
    published: "Test publish qilindi.",
    questionKind: "Savol turi",
    questionPrompt: "Savol matni",
    questions: "Savollar",
    rationale: "Teacher rationale",
    responseSeconds: "Javob vaqti (sekund)",
    save: "Saqlash",
    section: "Section",
    sectionTitle: "Section nomi",
    selectQuestions: "Question group uchun savollar",
    suggestedMinutes: "Tavsiya etilgan vaqt (minut)",
    title: "IELTS test builder",
    validation: "Publish tekshiruvi",
    validationEmpty: "Hali tekshiriladigan muammo topilmadi.",
    validationHint: "Publishdan oldin barcha errorlar yopilishi kerak.",
  },
  ru: {
    addBlock: "Добавить блок",
    addQuestion: "Добавить вопрос",
    addSection: "Добавить раздел",
    answerHelp: "Укажите по одному допустимому short-text ответу в строке.",
    answers: "Допустимые ответы",
    back: "Вернуться к practice",
    blockKind: "Тип блока",
    blockText: "Текст блока",
    cancel: "Отмена",
    contentBlocks: "Блоки контента",
    draft: "Редактор черновика",
    emptyBlocks: "В этом разделе пока нет блоков контента.",
    emptyQuestions: "В этом разделе пока нет вопросов.",
    emptySections: "Добавьте первый раздел, чтобы начать собирать тест.",
    editBlock: "Редактировать блок",
    editQuestion: "Редактировать вопрос",
    editSection: "Редактировать раздел",
    error: "Запрос не выполнен. Проверьте данные и повторите попытку.",
    instructions: "Инструкция",
    minimumWords: "Минимум слов",
    options: "Варианты",
    optionsHelp: "Один вариант в строке. Поставьте * перед правильным вариантом.",
    preparationSeconds: "Подготовка (секунды)",
    publish: "Опубликовать",
    publishConfirm: "Опубликовать проверенный черновик как неизменяемый тест?",
    publishReady: "Черновик готов к публикации.",
    published: "Тест опубликован.",
    questionKind: "Тип вопроса",
    questionPrompt: "Текст вопроса",
    questions: "Вопросы",
    rationale: "Обоснование для учителя",
    responseSeconds: "Ответ (секунды)",
    save: "Сохранить",
    section: "Раздел",
    sectionTitle: "Название раздела",
    selectQuestions: "Вопросы для группы",
    suggestedMinutes: "Рекомендуемое время (минуты)",
    title: "IELTS test builder",
    validation: "Проверка публикации",
    validationEmpty: "Проблем для проверки пока нет.",
    validationHint: "Перед публикацией необходимо устранить все ошибки.",
  },
  en: {
    addBlock: "Add content block",
    addQuestion: "Add question",
    addSection: "Add section",
    answerHelp: "Enter one accepted short-text answer per line.",
    answers: "Accepted answers",
    back: "Return to practice",
    blockKind: "Block type",
    blockText: "Block text",
    cancel: "Cancel",
    contentBlocks: "Content blocks",
    draft: "Draft editor",
    emptyBlocks: "This section does not have content blocks yet.",
    emptyQuestions: "This section does not have questions yet.",
    emptySections: "Add the first section to start building the test.",
    editBlock: "Edit content block",
    editQuestion: "Edit question",
    editSection: "Edit section",
    error: "The request failed. Check the content and try again.",
    instructions: "Instructions",
    minimumWords: "Minimum words",
    options: "Options",
    optionsHelp: "Enter one option per line. Prefix the correct option with *.",
    preparationSeconds: "Preparation (seconds)",
    publish: "Publish",
    publishConfirm: "Publish this validated draft as an immutable test version?",
    publishReady: "The draft is ready to publish.",
    published: "The test was published.",
    questionKind: "Question type",
    questionPrompt: "Question prompt",
    questions: "Questions",
    rationale: "Teacher rationale",
    responseSeconds: "Response (seconds)",
    save: "Save",
    section: "Section",
    sectionTitle: "Section title",
    selectQuestions: "Questions in this group",
    suggestedMinutes: "Suggested time (minutes)",
    title: "IELTS test builder",
    validation: "Publish validation",
    validationEmpty: "There are no validation findings yet.",
    validationHint: "Resolve every error before publishing.",
  },
};

export function getTeacherTestAuthoringCopy(locale: Locale): TeacherTestAuthoringCopy {
  return copies[locale];
}
