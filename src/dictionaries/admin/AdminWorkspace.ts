import type { Locale } from "@/config/Locales";
import type {
  AdminNavigationKey,
  AdminSectionCopy,
  AdminWorkspaceCopy,
} from "@/types/admin/AdminWorkspace";

type Text3 = [string, string, string];
type AdminSeed = {
  description: Text3;
  eyebrow: Text3;
  title: Text3;
};

const localeIndex: Record<Locale, 0 | 1 | 2> = { uz: 0, ru: 1, en: 2 };

const seeds: Record<AdminNavigationKey, AdminSeed> = {
  dashboard: {
    eyebrow: ["Operatsion markaz", "Операционный центр", "Operations centre"],
    title: ["Bugungi boshqaruv holati", "Операционная сводка", "Today at a glance"],
    description: [
      "O'quv jarayoni, xizmat ko'rsatish va nazorat navbatlari.",
      "Учебный процесс, обслуживание и очереди контроля.",
      "Learning operations, service levels, and review queues.",
    ],
  },
  requests: {
    eyebrow: ["Qabul va murojaatlar", "Приём и обращения", "Intake and requests"],
    title: ["So'rovlar navbati", "Очередь заявок", "Request queue"],
    description: [
      "Imtihon va tadbir arizalarini bitta tartibda boshqaring.",
      "Управляйте заявками на экзамены и мероприятия.",
      "Manage exam and event registrations in one queue.",
    ],
  },
  messages: {
    eyebrow: ["Murojaatlar", "Сообщения", "Messages"],
    title: ["Yangi xabarlar", "Входящие сообщения", "Inbox messages"],
    description: [
      "Public aloqa formasidan yuborilgan xabarlarni ko'rib chiqing.",
      "Просматривайте сообщения, отправленные через публичную форму связи.",
      "Review messages submitted through the public contact form.",
    ],
  },
  students: {
    eyebrow: ["O'quvchilar", "Ученики", "Learners"],
    title: ["Talabalar", "Ученики", "Students"],
    description: [
      "Guruh, holat va akademik ko'rsatkichlar bo'yicha izlang.",
      "Ищите по группе, статусу и учебным показателям.",
      "Search by group, status, and academic indicators.",
    ],
  },
  teachers: {
    eyebrow: ["Akademik jamoa", "Академическая команда", "Academic team"],
    title: ["O'qituvchilar", "Преподаватели", "Teachers"],
    description: [
      "Yuklama, guruhlar va profil holatini nazorat qiling.",
      "Контролируйте нагрузку, группы и состояние профиля.",
      "Monitor workload, groups, and profile status.",
    ],
  },
  groups: {
    eyebrow: ["Guruh operatsiyasi", "Управление группами", "Group operations"],
    title: ["Guruhlar", "Группы", "Groups"],
    description: [
      "Sig'im, jadval, ustoz va faol a'zoliklarni tekshiring.",
      "Проверяйте вместимость, расписание, преподавателя и состав.",
      "Review capacity, schedule, teacher, and active membership.",
    ],
  },
  courses: {
    eyebrow: ["Akademik katalog", "Академический каталог", "Academic catalogue"],
    title: ["Kurslar boshqaruvi", "Управление курсами", "Course management"],
    description: [
      "Lokalizatsiya, nashr holati va guruh bog'lanishlari.",
      "Локализация, статус публикации и связи с группами.",
      "Localization, publication status, and linked groups.",
    ],
  },
  exams: {
    eyebrow: ["Imtihonlar", "Экзамены", "Exams"],
    title: ["Imtihonlar boshqaruvi", "Управление экзаменами", "Exam management"],
    description: [
      "Imtihon turlari, sessiyalar va arizalarni boshqaring.",
      "Управляйте видами экзаменов, сессиями и заявками.",
      "Manage exam offerings, sessions and registrations.",
    ],
  },
  events: {
    eyebrow: ["Tadbirlar", "Мероприятия", "Events"],
    title: ["Tadbir operatsiyasi", "Управление мероприятиями", "Event operations"],
    description: [
      "Jadval, sig'im, nashr va arizalarni muvofiqlashtiring.",
      "Координируйте расписание, вместимость, публикацию и заявки.",
      "Coordinate schedule, capacity, publication, and registrations.",
    ],
  },
  schedule: {
    eyebrow: ["Markaz taqvimi", "Календарь центра", "Centre calendar"],
    title: ["Umumiy jadval", "Общее расписание", "Master schedule"],
    description: [
      "Guruh, ustoz, xona va vaqt kesimida barcha darslar.",
      "Все занятия по группам, преподавателям, кабинетам и времени.",
      "All classes across groups, teachers, rooms, and time.",
    ],
  },
  payments: {
    eyebrow: ["Moliyaviy reyestr", "Финансовый реестр", "Finance ledger"],
    title: ["To'lov holatlari", "Статусы платежей", "Payment statuses"],
    description: [
      "Hisob va yarashtirish yozuvlari; to'lov provayderi mavjud emas.",
      "Счета и сверка; платёжного провайдера нет.",
      "Invoice and reconciliation records; no payment provider.",
    ],
  },
  salary: {
    eyebrow: ["Moliya", "Финансы", "Finance"],
    title: ["Ish haqi", "Заработная плата", "Salary"],
    description: [
      "Oylik ish haqi hisoblarini tayyorlang va tasdiqlang.",
      "Подготовьте и утвердите ежемесячные расчёты зарплаты.",
      "Prepare and finalize monthly salary statements.",
    ],
  },
  notifications: {
    eyebrow: ["Tizim xabarlari", "Системные сообщения", "System updates"],
    title: ["Bildirishnomalar", "Уведомления", "Notifications"],
    description: [
      "Muhim operatsion ogohlantirish va ish natijalari.",
      "Важные операционные предупреждения и результаты заданий.",
      "Important operational alerts and job outcomes.",
    ],
  },
  settings: {
    eyebrow: ["Tizim afzalliklari", "Системные настройки", "System preferences"],
    title: ["Sozlamalar", "Настройки", "Settings"],
    description: [
      "Profil va hisob xavfsizligi.",
      "Профиль и безопасность аккаунта.",
      "Profile and account security.",
    ],
  },
};

const navigation: Record<Locale, AdminWorkspaceCopy["navigation"]> = {
  uz: {
    dashboard: "Boshqaruv",
    requests: "So'rovlar",
    messages: "Xabarlar",
    students: "Talabalar",
    teachers: "O'qituvchilar",
    groups: "Guruhlar",
    courses: "Kurslar",
    exams: "Imtihonlar",
    events: "Tadbirlar",
    schedule: "Jadval",
    payments: "To'lovlar",
    salary: "Ish haqi",
    notifications: "Bildirishnomalar",
    settings: "Sozlamalar",
  },
  ru: {
    dashboard: "Обзор",
    requests: "Заявки",
    messages: "Сообщения",
    students: "Ученики",
    teachers: "Преподаватели",
    groups: "Группы",
    courses: "Курсы",
    exams: "Экзамены",
    events: "Мероприятия",
    schedule: "Расписание",
    payments: "Платежи",
    salary: "Зарплата",
    notifications: "Уведомления",
    settings: "Настройки",
  },
  en: {
    dashboard: "Overview",
    requests: "Requests",
    messages: "Messages",
    students: "Students",
    teachers: "Teachers",
    groups: "Groups",
    courses: "Courses",
    exams: "Exams",
    events: "Events",
    schedule: "Schedule",
    payments: "Payments",
    salary: "Salary",
    notifications: "Notifications",
    settings: "Settings",
  },
};

const navigationGroups: Record<Locale, AdminWorkspaceCopy["navigationGroups"]> = {
  uz: {
    overview: "Umumiy",
    people: "Jamoa va talabalar",
    academics: "Ta'lim jarayoni",
    operations: "Moliya",
  },
  ru: {
    overview: "Обзор",
    people: "Команда и ученики",
    academics: "Учебный процесс",
    operations: "Финансы",
  },
  en: {
    overview: "Overview",
    people: "People",
    academics: "Academics",
    operations: "Finance",
  },
};

const common: Record<Locale, AdminWorkspaceCopy["common"]> = {
  uz: {
    all: "Barchasi",
    contextLabel: "Kontekst",
    connectedNotice: "Himoyalangan operatsion muhit",
    detailLabel: "Batafsil",
    emptyLabel: "Mos yozuv topilmadi.",
    errorLabel: "Ma'lumotlarni yuklab bo'lmadi.",
    idRecordLabel: "ID / yozuv",
    languageLabel: "Til",
    lightModeLabel: "Yorug' rejimga o'tish",
    logoutCancelLabel: "Qolish",
    logoutConfirmLabel: "Chiqish",
    logoutLabel: "Chiqish",
    logoutMessage: "Admin panelidan chiqishni xohlaysizmi? Davom etish uchun tasdiqlang.",
    logoutTitle: "Tizimdan chiqish",
    menuClose: "Menyuni yopish",
    menuOpen: "Menyuni ochish",
    nextLabel: "Keyingi",
    openQueueLabel: "Ochiq navbat",
    pageLabel: "Sahifa",
    previousLabel: "Oldingi",
    recordsLabel: "yozuv",
    selectedLabel: "tanlandi",
    clearSelectionLabel: "Tanlovni tozalash",
    searchLabel: "Qidirish",
    searchPlaceholder: "Reyestr bo'yicha qidiring",
    skipToContentLabel: "Asosiy kontentga o‘tish",
    retryLabel: "Qayta urinish",
    sidebarCollapse: "Yon panelni yig'ish",
    sidebarExpand: "Yon panelni kengaytirish",
    statusLabel: "Holat",
    darkModeLabel: "Tungi rejimga o'tish",
    welcomeLabel: "Xush kelibsiz,",
    workspaceLabel: "Operations Console",
  },
  ru: {
    all: "Все",
    contextLabel: "Контекст",
    connectedNotice: "Защищённая операционная среда",
    detailLabel: "Подробнее",
    emptyLabel: "Подходящих записей не найдено.",
    errorLabel: "Не удалось загрузить данные.",
    idRecordLabel: "ID / запись",
    languageLabel: "Язык",
    lightModeLabel: "Переключить на светлую тему",
    logoutCancelLabel: "Остаться",
    logoutConfirmLabel: "Выйти",
    logoutLabel: "Выйти",
    logoutMessage: "Выйти из панели администратора? Подтвердите, чтобы продолжить.",
    logoutTitle: "Выход из системы",
    menuClose: "Закрыть меню",
    menuOpen: "Открыть меню",
    nextLabel: "Далее",
    openQueueLabel: "Открытая очередь",
    pageLabel: "Страница",
    previousLabel: "Назад",
    recordsLabel: "записей",
    selectedLabel: "выбрано",
    clearSelectionLabel: "Очистить выбор",
    searchLabel: "Поиск",
    searchPlaceholder: "Поиск по реестру",
    skipToContentLabel: "Перейти к основному содержимому",
    retryLabel: "Повторить",
    sidebarCollapse: "Свернуть боковую панель",
    sidebarExpand: "Развернуть боковую панель",
    statusLabel: "Статус",
    darkModeLabel: "Переключить на тёмную тему",
    welcomeLabel: "Добро пожаловать,",
    workspaceLabel: "Operations Console",
  },
  en: {
    all: "All",
    contextLabel: "Context",
    connectedNotice: "Protected operations environment",
    detailLabel: "Details",
    emptyLabel: "No matching records found.",
    errorLabel: "Could not load the data.",
    idRecordLabel: "ID / record",
    languageLabel: "Language",
    lightModeLabel: "Switch to light mode",
    logoutCancelLabel: "Stay",
    logoutConfirmLabel: "Log out",
    logoutLabel: "Log out",
    logoutMessage: "Log out of the Admin workspace? Confirm to continue.",
    logoutTitle: "Log out",
    menuClose: "Close menu",
    menuOpen: "Open menu",
    nextLabel: "Next",
    openQueueLabel: "Open queue",
    pageLabel: "Page",
    previousLabel: "Previous",
    recordsLabel: "records",
    selectedLabel: "selected",
    clearSelectionLabel: "Clear selection",
    searchLabel: "Search",
    searchPlaceholder: "Search the registry",
    skipToContentLabel: "Skip to main content",
    retryLabel: "Try again",
    sidebarCollapse: "Collapse sidebar",
    sidebarExpand: "Expand sidebar",
    statusLabel: "Status",
    darkModeLabel: "Switch to dark mode",
    welcomeLabel: "Welcome,",
    workspaceLabel: "Operations Console",
  },
};

function localizeSection(locale: Locale, seed: AdminSeed): AdminSectionCopy {
  const index = localeIndex[locale];
  return {
    description: seed.description[index],
    eyebrow: seed.eyebrow[index],
    metrics: [],
    records: [],
    title: seed.title[index],
  };
}

export function getAdminWorkspaceCopy(locale: Locale): AdminWorkspaceCopy {
  const sections = Object.fromEntries(
    Object.entries(seeds).map(([key, seed]) => [key, localizeSection(locale, seed)]),
  ) as Record<AdminNavigationKey, AdminSectionCopy>;

  return {
    common: common[locale],
    navigation: navigation[locale],
    navigationGroups: navigationGroups[locale],
    sections,
  };
}

const statusLabels: Record<string, Text3> = {
  ABSENT: ["Yo'q", "Отсутствует", "Absent"],
  ACTIVE: ["Faol", "Активен", "Active"],
  APPROVED: ["Tasdiqlangan", "Одобрено", "Approved"],
  ARCHIVED: ["Arxivda", "В архиве", "Archived"],
  CANCELLED: ["Bekor qilingan", "Отменено", "Cancelled"],
  CLEAN: ["Xavfsiz", "Безопасно", "Clean"],
  COMPLETED: ["Tugallangan", "Завершено", "Completed"],
  DECLINED: ["Rad etilgan", "Отклонено", "Declined"],
  DELETED: ["O‘chirilgan", "Удалён", "Deleted"],
  DRAFT: ["Qoralama", "Черновик", "Draft"],
  DUE: ["To'lanishi kerak", "К оплате", "Due"],
  EXCUSED: ["Uzrli", "По уважительной причине", "Excused"],
  FAILED: ["Xatolik", "Ошибка", "Failed"],
  IN_REVIEW: ["Ko'rib chiqilmoqda", "На рассмотрении", "In review"],
  INACTIVE: ["Nofaol", "Неактивен", "Inactive"],
  INFECTED: ["Xavfli", "Опасно", "Infected"],
  LATE: ["Kechikkan", "Опоздал", "Late"],
  NEW: ["Yangi", "Новая", "New"],
  OVERDUE: ["Muddati o'tgan", "Просрочено", "Overdue"],
  PAID: ["To'langan", "Оплачено", "Paid"],
  PAST: ["Yakunlangan", "Завершено", "Past"],
  PENDING: ["Kutilmoqda", "Ожидается", "Pending"],
  PENDING_UPLOAD: ["Yuklanmoqda", "Загружается", "Uploading"],
  PRESENT: ["Bor", "Присутствует", "Present"],
  PUBLISHED: ["E'lon qilingan", "Опубликовано", "Published"],
  QUARANTINED: ["Karantinda", "На карантине", "Quarantined"],
  READY: ["Tayyor", "Готово", "Ready"],
  READ: ["O'qilgan", "Прочитано", "Read"],
  REJECTED: ["Rad etilgan", "Отклонено", "Rejected"],
  RESOLVED: ["Yakunlangan", "Решено", "Resolved"],
  SCHEDULED: ["Rejalashtirilgan", "Запланировано", "Scheduled"],
  UPCOMING: ["Kutilayotgan", "Предстоящее", "Upcoming"],
  VERIFYING: ["Tekshirilmoqda", "Проверяется", "Verifying"],
  UNREAD: ["O'qilmagan", "Не прочитано", "Unread"],
};

export function getAdminStatusLabel(locale: Locale, status: string): string {
  return statusLabels[status]?.[localeIndex[locale]] ?? status;
}
