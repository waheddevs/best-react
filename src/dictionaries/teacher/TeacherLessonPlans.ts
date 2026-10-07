import type { Locale } from "@/config/Locales";

export type TeacherLessonPlanCopy = {
  add: string;
  addMaterial: string;
  addTask: string;
  actions: string;
  cancel: string;
  created: string;
  createFailed: string;
  createdMessage: (name: string) => string;
  createdTitle: string;
  createTitle: string;
  delete: string;
  deleteConfirm: string;
  deleteMessage: (name: string) => string;
  deleteTitle: string;
  deletedMessage: (name: string) => string;
  deletedTitle: string;
  download: string;
  edit: string;
  editTitle: string;
  file: string;
  fileFormatError: string;
  fileSizeError: string;
  lessonList: string;
  material: string;
  materialAdded: string;
  materialList: string;
  materialCount: (count: number) => string;
  materialName: string;
  materialRequired: string;
  name: string;
  nameRequired: string;
  noFile: string;
  number: string;
  preview: string;
  resourceCreateFailed: string;
  save: string;
  savedMessage: string;
  savedTitle: string;
  share: string;
  shareFailed: string;
  sharedMessage: string;
  sharedTitle: string;
  sort: string;
  sortName: string;
  sortNewest: string;
  sortOldest: string;
  sortType: string;
  task: string;
  taskRequired: string;
  uploadFailed: string;
  uploading: string;
};

const copy: Record<Locale, TeacherLessonPlanCopy> = {
  uz: {
    add: "Yaratish",
    addMaterial: "Material tanlash",
    addTask: "Task tanlash",
    actions: "Amallar",
    cancel: "Bekor qilish",
    created: "Qo‘shilgan sana",
    createFailed: "Lesson yaratilmadi. Qayta urinib ko‘ring.",
    createdMessage: (name) => `“${name}” lesson listga qo‘shildi.`,
    createdTitle: "Lesson qo‘shildi",
    createTitle: "Yangi lesson",
    delete: "O‘chirish",
    deleteConfirm: "Ha, o‘chirish",
    deleteMessage: (name) => `“${name}” lessonini o‘chirmoqchimisiz?`,
    deleteTitle: "Lessonni o‘chirish",
    deletedMessage: (name) => `“${name}” ro‘yxatdan olib tashlandi.`,
    deletedTitle: "Lesson o‘chirildi",
    download: "Yuklab olish",
    edit: "Tahrirlash",
    editTitle: "Lessonni tahrirlash",
    file: "Fayl",
    fileFormatError: "Faqat PDF, JPG, JPEG, PNG yoki ZIP fayl tanlang.",
    fileSizeError: "PDF va ZIP 50 MB, rasmlar esa 10 MB dan oshmasligi kerak.",
    lessonList: "Lesson list",
    material: "Material",
    materialAdded: "Material muvaffaqiyatli qo‘shildi.",
    materialList: "Materiallar ro‘yxati",
    materialCount: (count) => `${count} ta material`,
    materialName: "Material nomi",
    materialRequired: "Material faylini tanlang.",
    name: "Nomi",
    nameRequired: "Lesson nomini kiriting.",
    noFile: "Fayl tanlanmagan",
    number: "№",
    preview: "Ko‘rish",
    resourceCreateFailed: "Fayl saqlandi, lekin lesson bilan bog‘lanmadi.",
    save: "Saqlash",
    savedMessage: "O‘zgarishlar barcha joyda yangilandi.",
    savedTitle: "Saqlandi",
    share: "Studentlarga ulashish",
    shareFailed: "Lesson studentlarga ulashilmadi. Qayta urinib ko‘ring.",
    sharedMessage: "Lesson endi guruh studentlariga ko‘rinadi.",
    sharedTitle: "Lesson ulashildi",
    sort: "Saralash",
    sortName: "A-Z",
    sortNewest: "Yangi",
    sortOldest: "Eski",
    sortType: "Turi",
    task: "Task",
    taskRequired: "Task faylini tanlang.",
    uploadFailed: "Fayl yuklanmadi. Format, hajm va server holatini tekshiring.",
    uploading: "Yuklanmoqda…",
  },
  ru: {
    add: "Создать",
    addMaterial: "Выбрать материал",
    addTask: "Выбрать задание",
    actions: "Действия",
    cancel: "Отмена",
    created: "Дата добавления",
    createFailed: "Не удалось создать урок. Повторите попытку.",
    createdMessage: (name) => `Урок «${name}» добавлен в список.`,
    createdTitle: "Урок добавлен",
    createTitle: "Новый урок",
    delete: "Удалить",
    deleteConfirm: "Да, удалить",
    deleteMessage: (name) => `Удалить урок «${name}»?`,
    deleteTitle: "Удалить урок",
    deletedMessage: (name) => `«${name}» удалён из списка.`,
    deletedTitle: "Урок удалён",
    download: "Скачать",
    edit: "Изменить",
    editTitle: "Изменить урок",
    file: "Файл",
    fileFormatError: "Выберите файл PDF, JPG, JPEG, PNG или ZIP.",
    fileSizeError: "PDF и ZIP — до 50 МБ, изображения — до 10 МБ.",
    lessonList: "Список уроков",
    material: "Материал",
    materialAdded: "Материал успешно добавлен.",
    materialList: "Список материалов",
    materialCount: (count) => `${count} материалов`,
    materialName: "Название материала",
    materialRequired: "Выберите файл материала.",
    name: "Название",
    nameRequired: "Введите название урока.",
    noFile: "Файл не выбран",
    number: "№",
    preview: "Просмотр",
    resourceCreateFailed: "Файл сохранён, но не привязан к уроку.",
    save: "Сохранить",
    savedMessage: "Изменения обновлены во всех разделах.",
    savedTitle: "Сохранено",
    share: "Поделиться со студентами",
    shareFailed: "Не удалось открыть урок студентам. Повторите попытку.",
    sharedMessage: "Теперь урок виден студентам группы.",
    sharedTitle: "Урок опубликован",
    sort: "Сортировка",
    sortName: "А-Я",
    sortNewest: "Новые",
    sortOldest: "Старые",
    sortType: "Тип",
    task: "Задание",
    taskRequired: "Выберите файл задания.",
    uploadFailed: "Файл не загружен. Проверьте формат, размер и сервер.",
    uploading: "Загрузка…",
  },
  en: {
    add: "Create",
    addMaterial: "Choose material",
    addTask: "Choose task",
    actions: "Actions",
    cancel: "Cancel",
    created: "Created",
    createFailed: "The lesson could not be created. Please try again.",
    createdMessage: (name) => `“${name}” was added to the lesson list.`,
    createdTitle: "Lesson added",
    createTitle: "New lesson",
    delete: "Delete",
    deleteConfirm: "Yes, delete",
    deleteMessage: (name) => `Do you want to delete “${name}”?`,
    deleteTitle: "Delete lesson",
    deletedMessage: (name) => `“${name}” was removed from the list.`,
    deletedTitle: "Lesson deleted",
    download: "Download",
    edit: "Edit",
    editTitle: "Edit lesson",
    file: "File",
    fileFormatError: "Choose a PDF, JPG, JPEG, PNG, or ZIP file.",
    fileSizeError: "PDF and ZIP files may be 50 MB; images may be 10 MB.",
    lessonList: "Lesson list",
    material: "Material",
    materialAdded: "Material added successfully.",
    materialList: "Materials list",
    materialCount: (count) => `${count} ${count === 1 ? "material" : "materials"}`,
    materialName: "Material name",
    materialRequired: "Choose a material file.",
    name: "Name",
    nameRequired: "Enter a lesson name.",
    noFile: "No file selected",
    number: "No.",
    preview: "Preview",
    resourceCreateFailed: "The file was saved but could not be linked to the lesson.",
    save: "Save",
    savedMessage: "The changes are now reflected everywhere.",
    savedTitle: "Saved",
    share: "Share with students",
    shareFailed: "The lesson could not be shared. Please try again.",
    sharedMessage: "The lesson is now visible to group students.",
    sharedTitle: "Lesson shared",
    sort: "Sort",
    sortName: "A-Z",
    sortNewest: "New",
    sortOldest: "Old",
    sortType: "Type",
    task: "Task",
    taskRequired: "Choose a task file.",
    uploadFailed: "The file was not uploaded. Check its format, size, and the server.",
    uploading: "Uploading…",
  },
};

export function getTeacherLessonPlanCopy(locale: Locale): TeacherLessonPlanCopy {
  return copy[locale];
}
