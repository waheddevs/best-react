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
      "Kontakt, imtihon va tadbir arizalarini bitta tartibda boshqaring.",
      "Управляйте заявками на контакт, экзамены и мероприятия.",
      "Manage contact, exam, and event requests in one queue.",
    ],
  },
  students: {
    eyebrow: ["O'quvchilar", "Ученики", "Learners"],
    title: ["Talabalar reyestri", "Реестр учеников", "Student registry"],
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
  events: {
    eyebrow: ["Tadbirlar", "Мероприятия", "Events"],
    title: ["Tadbir operatsiyasi", "Управление мероприятиями", "Event operations"],
    description: [
      "Jadval, sig'im, nashr va arizalarni muvofiqlashtiring.",
      "Координируйте расписание, вместимость, публикацию и заявки.",
      "Coordinate schedule, capacity, publication, and registrations.",
    ],
  },
  locations: {
    eyebrow: ["Filial va xonalar", "Филиалы и кабинеты", "Branches and rooms"],
    title: ["Lokatsiyalar", "Локации", "Locations"],
    description: [
      "Xona sig'imi, jihozlar va jadval to'qnashuvlarini ko'ring.",
      "Просматривайте вместимость, оборудование и конфликты расписания.",
      "See room capacity, equipment, and schedule conflicts.",
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
  attendance: {
    eyebrow: ["Kunlik nazorat", "Ежедневный контроль", "Daily control"],
    title: ["Davomat", "Посещаемость", "Attendance"],
    description: [
      "Qayd etilmagan darslar va davomat tendensiyalarini toping.",
      "Находите неотмеченные уроки и тенденции посещаемости.",
      "Find unrecorded lessons and attendance trends.",
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
  tests: {
    eyebrow: ["Baholash tizimi", "Система оценивания", "Assessment system"],
    title: ["Testlar nazorati", "Контроль тестов", "Test oversight"],
    description: [
      "Versiya, nashr, urinish va tekshiruv holatlarini kuzating.",
      "Следите за версиями, публикацией, попытками и проверкой.",
      "Track versions, publication, attempts, and review status.",
    ],
  },
  results: {
    eyebrow: ["Akademik tahlil", "Учебная аналитика", "Academic analytics"],
    title: ["Natijalar", "Результаты", "Results"],
    description: [
      "Guruh, test va talaba bo'yicha ko'rsatkichlarni solishtiring.",
      "Сравнивайте показатели по группам, тестам и ученикам.",
      "Compare performance by group, test, and student.",
    ],
  },
  library: {
    eyebrow: ["Kontent operatsiyasi", "Контент-операции", "Content operations"],
    title: ["Kutubxona nazorati", "Управление библиотекой", "Library control"],
    description: [
      "Huquq, media xavfsizligi, guruh ko'rinishi va nashr navbati.",
      "Права, безопасность медиа, видимость групп и очередь публикации.",
      "Rights, media safety, group visibility, and publication queue.",
    ],
  },
  imports: {
    eyebrow: ["Media va import", "Медиа и импорт", "Media and imports"],
    title: ["Import ishlari", "Задания импорта", "Import jobs"],
    description: [
      "Mahalliy eksport, fayl tekshiruvi va draft natijalarini kuzating.",
      "Следите за локальными экспортами, проверкой файлов и черновиками.",
      "Track local exports, file verification, and draft outcomes.",
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
  audit: {
    eyebrow: ["Nazorat izi", "Контрольный след", "Control trail"],
    title: ["Audit jurnali", "Журнал аудита", "Audit log"],
    description: [
      "Imtiyozli harakatlar, sabab va korrelyatsiya yozuvlari.",
      "Привилегированные действия, причины и корреляция.",
      "Privileged actions, reasons, and correlation records.",
    ],
  },
  reports: {
    eyebrow: ["Hisobotlar", "Отчёты", "Reports"],
    title: ["Operatsion hisobotlar", "Операционные отчёты", "Operational reports"],
    description: [
      "Davomat, akademik o'sish va xizmat navbatlarini shaffof ko'ring.",
      "Прозрачно отслеживайте посещаемость, прогресс и очереди обслуживания.",
      "See attendance, academic growth, and service queues transparently.",
    ],
  },
  settings: {
    eyebrow: ["Tizim afzalliklari", "Системные настройки", "System preferences"],
    title: ["Admin sozlamalari", "Настройки администратора", "Admin settings"],
    description: [
      "Profil, til, operatsion bildirishnoma va standart ko'rinishlar.",
      "Профиль, язык, операционные уведомления и представления по умолчанию.",
      "Profile, language, operational alerts, and default views.",
    ],
  },
};

const navigation: Record<Locale, AdminWorkspaceCopy["navigation"]> = {
  uz: {
    dashboard: "Boshqaruv",
    requests: "So'rovlar",
    students: "Talabalar",
    teachers: "O'qituvchilar",
    groups: "Guruhlar",
    courses: "Kurslar",
    events: "Tadbirlar",
    locations: "Lokatsiyalar",
    schedule: "Jadval",
    attendance: "Davomat",
    payments: "To'lovlar",
    tests: "Testlar",
    results: "Natijalar",
    library: "Kutubxona",
    imports: "Importlar",
    notifications: "Bildirishnomalar",
    audit: "Audit",
    reports: "Hisobotlar",
    settings: "Sozlamalar",
  },
  ru: {
    dashboard: "Обзор",
    requests: "Заявки",
    students: "Ученики",
    teachers: "Преподаватели",
    groups: "Группы",
    courses: "Курсы",
    events: "Мероприятия",
    locations: "Локации",
    schedule: "Расписание",
    attendance: "Посещаемость",
    payments: "Платежи",
    tests: "Тесты",
    results: "Результаты",
    library: "Библиотека",
    imports: "Импорты",
    notifications: "Уведомления",
    audit: "Аудит",
    reports: "Отчёты",
    settings: "Настройки",
  },
  en: {
    dashboard: "Overview",
    requests: "Requests",
    students: "Students",
    teachers: "Teachers",
    groups: "Groups",
    courses: "Courses",
    events: "Events",
    locations: "Locations",
    schedule: "Schedule",
    attendance: "Attendance",
    payments: "Payments",
    tests: "Tests",
    results: "Results",
    library: "Library",
    imports: "Imports",
    notifications: "Notifications",
    audit: "Audit",
    reports: "Reports",
    settings: "Settings",
  },
};

const navigationGroups: Record<Locale, AdminWorkspaceCopy["navigationGroups"]> = {
  uz: {
    overview: "Umumiy",
    people: "Jamoa va talabalar",
    academics: "Ta'lim jarayoni",
    operations: "Operatsiyalar",
    content: "Kontent",
    insights: "Tahlil va nazorat",
    system: "Tizim",
  },
  ru: {
    overview: "Обзор",
    people: "Команда и ученики",
    academics: "Учебный процесс",
    operations: "Операции",
    content: "Контент",
    insights: "Аналитика и контроль",
    system: "Система",
  },
  en: {
    overview: "Overview",
    people: "People",
    academics: "Academics",
    operations: "Operations",
    content: "Content",
    insights: "Insights and control",
    system: "System",
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
    logoutLabel: "Chiqish",
    menuClose: "Menyuni yopish",
    menuOpen: "Menyuni ochish",
    nextLabel: "Keyingi",
    openQueueLabel: "Ochiq navbat",
    pageLabel: "Sahifa",
    previousLabel: "Oldingi",
    recordsLabel: "yozuv",
    selectedLabel: "tanlandi",
    clearSelectionLabel: "Tanlovni tozalash",
    unavailableNotice: "API ma'lumotlari hozir mavjud emas",
    searchLabel: "Qidirish",
    searchPlaceholder: "Reyestr bo'yicha qidiring",
    skipToContentLabel: "Asosiy kontentga o‘tish",
    retryLabel: "Qayta urinish",
    sidebarCollapse: "Yon panelni yig'ish",
    sidebarExpand: "Yon panelni kengaytirish",
    stackLabel: "API · PostgreSQL · Workers",
    statusLabel: "Holat",
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
    logoutLabel: "Выйти",
    menuClose: "Закрыть меню",
    menuOpen: "Открыть меню",
    nextLabel: "Далее",
    openQueueLabel: "Открытая очередь",
    pageLabel: "Страница",
    previousLabel: "Назад",
    recordsLabel: "записей",
    selectedLabel: "выбрано",
    clearSelectionLabel: "Очистить выбор",
    unavailableNotice: "Данные API сейчас недоступны",
    searchLabel: "Поиск",
    searchPlaceholder: "Поиск по реестру",
    skipToContentLabel: "Перейти к основному содержимому",
    retryLabel: "Повторить",
    sidebarCollapse: "Свернуть боковую панель",
    sidebarExpand: "Развернуть боковую панель",
    stackLabel: "API · PostgreSQL · Workers",
    statusLabel: "Статус",
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
    logoutLabel: "Log out",
    menuClose: "Close menu",
    menuOpen: "Open menu",
    nextLabel: "Next",
    openQueueLabel: "Open queue",
    pageLabel: "Page",
    previousLabel: "Previous",
    recordsLabel: "records",
    selectedLabel: "selected",
    clearSelectionLabel: "Clear selection",
    unavailableNotice: "API data is currently unavailable",
    searchLabel: "Search",
    searchPlaceholder: "Search the registry",
    skipToContentLabel: "Skip to main content",
    retryLabel: "Try again",
    sidebarCollapse: "Collapse sidebar",
    sidebarExpand: "Expand sidebar",
    stackLabel: "API · PostgreSQL · Workers",
    statusLabel: "Status",
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
