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
  records: Array<{
    detail: Text3;
    href?: string;
    id: string;
    meta: Text3;
    status: "success" | "warning" | "danger" | "info" | "neutral";
    title: Text3;
  }>;
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
    records: [
      {
        id: "queue",
        title: ["Ko'rib chiqish navbati", "Очередь проверки", "Review queue"],
        meta: ["12 ta ochiq element", "12 открытых элементов", "12 open items"],
        detail: ["4 tasi bugun muhim", "4 требуют внимания сегодня", "4 need attention today"],
        status: "warning",
        href: "/admin/requests",
      },
      {
        id: "attendance",
        title: ["Bugungi davomat", "Посещаемость сегодня", "Attendance today"],
        meta: ["14 guruh · 182 talaba", "14 групп · 182 ученика", "14 groups · 182 students"],
        detail: ["94.6% qayd etildi", "Отмечено 94,6%", "94.6% recorded"],
        status: "success",
        href: "/admin/attendance",
      },
      {
        id: "media",
        title: ["Media tekshiruvi", "Проверка медиа", "Media review"],
        meta: ["3 ta fayl kutilmoqda", "3 файла ожидают", "3 files pending"],
        detail: ["Virus tekshiruvi faol", "Антивирусная проверка активна", "Malware checks active"],
        status: "info",
        href: "/admin/imports",
      },
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
    records: [
      {
        id: "request-101",
        title: [
          "IELTS kursi bo'yicha maslahat",
          "Консультация по курсу IELTS",
          "IELTS course consultation",
        ],
        meta: ["Kontakt · 8 daqiqa oldin", "Контакт · 8 минут назад", "Contact · 8 minutes ago"],
        detail: ["Yangi", "Новая", "New"],
        status: "warning",
      },
      {
        id: "request-102",
        title: ["Mock imtihon ro'yxati", "Запись на пробный экзамен", "Mock exam registration"],
        meta: ["Imtihon · bugun 09:42", "Экзамен · сегодня 09:42", "Exam · today 09:42"],
        detail: ["Tekshirildi", "Проверено", "Reviewed"],
        status: "success",
      },
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
    records: [
      {
        id: "student-1",
        title: ["Dilnoza Karimova", "Дильноза Каримова", "Dilnoza Karimova"],
        meta: ["IELTS Bridge · B2-04", "IELTS Bridge · B2-04", "IELTS Bridge · B2-04"],
        detail: ["Faol · 82% o'rtacha", "Активна · средний 82%", "Active · 82% average"],
        status: "success",
        href: "/admin/students/student-1",
      },
      {
        id: "student-2",
        title: ["Sardor Aliyev", "Сардор Алиев", "Sardor Aliyev"],
        meta: ["General English · B1-02", "General English · B1-02", "General English · B1-02"],
        detail: ["E'tibor · 2 dars qoldirilgan", "Внимание · 2 пропуска", "Attention · 2 absences"],
        status: "warning",
        href: "/admin/students/student-2",
      },
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
    records: [
      {
        id: "teacher-1",
        title: ["Mohira Rasulova", "Мохира Расулова", "Mohira Rasulova"],
        meta: ["IELTS · 4 guruh", "IELTS · 4 группы", "IELTS · 4 groups"],
        detail: ["Faol · 68 talaba", "Активна · 68 учеников", "Active · 68 students"],
        status: "success",
        href: "/admin/teachers/teacher-1",
      },
      {
        id: "teacher-2",
        title: ["Kamol Ergashev", "Камол Эргашев", "Kamol Ergashev"],
        meta: [
          "General English · 3 guruh",
          "General English · 3 группы",
          "General English · 3 groups",
        ],
        detail: ["Profil to'liq emas", "Профиль не заполнен", "Profile incomplete"],
        status: "warning",
        href: "/admin/teachers/teacher-2",
      },
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
    records: [
      {
        id: "b2-04",
        title: ["IELTS Bridge B2-04", "IELTS Bridge B2-04", "IELTS Bridge B2-04"],
        meta: ["Du/Chor/Ju · 16:00", "Пн/Ср/Пт · 16:00", "Mon/Wed/Fri · 16:00"],
        detail: ["17/18 joy band", "17/18 мест занято", "17/18 seats filled"],
        status: "warning",
        href: "/admin/groups/b2-04",
      },
      {
        id: "b1-02",
        title: ["General English B1-02", "General English B1-02", "General English B1-02"],
        meta: ["Se/Pay · 18:00", "Вт/Чт · 18:00", "Tue/Thu · 18:00"],
        detail: ["14/18 joy band", "14/18 мест занято", "14/18 seats filled"],
        status: "success",
        href: "/admin/groups/b1-02",
      },
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
    records: [
      {
        id: "ielts-bridge",
        title: ["IELTS Bridge", "IELTS Bridge", "IELTS Bridge"],
        meta: [
          "3 til · 5 faol guruh",
          "3 языка · 5 активных групп",
          "3 languages · 5 active groups",
        ],
        detail: ["Nashr qilingan", "Опубликован", "Published"],
        status: "success",
        href: "/admin/courses/ielts-bridge",
      },
      {
        id: "academic-speaking",
        title: ["Academic Speaking", "Academic Speaking", "Academic Speaking"],
        meta: [
          "3 til · 2 faol guruh",
          "3 языка · 2 активные группы",
          "3 languages · 2 active groups",
        ],
        detail: ["Qoralama yangilanishi bor", "Есть черновик обновления", "Draft update available"],
        status: "warning",
        href: "/admin/courses/academic-speaking",
      },
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
    records: [
      {
        id: "open-day",
        title: ["BEST LC Open Day", "День открытых дверей BEST LC", "BEST LC Open Day"],
        meta: [
          "12 sentabr · Main Campus",
          "12 сентября · Main Campus",
          "12 September · Main Campus",
        ],
        detail: ["68/90 ro'yxatdan o'tgan", "68/90 зарегистрировано", "68/90 registered"],
        status: "info",
        href: "/admin/events/open-day",
      },
      {
        id: "mock-day",
        title: ["IELTS Mock Day", "IELTS Mock Day", "IELTS Mock Day"],
        meta: ["19 sentabr · Exam Hall", "19 сентября · Exam Hall", "19 September · Exam Hall"],
        detail: ["Sig'imga yaqin · 38/40", "Почти заполнено · 38/40", "Near capacity · 38/40"],
        status: "warning",
        href: "/admin/events/mock-day",
      },
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
    records: [
      {
        id: "main",
        title: ["Main Campus", "Main Campus", "Main Campus"],
        meta: ["12 xona · 286 joy", "12 кабинетов · 286 мест", "12 rooms · 286 seats"],
        detail: ["Barcha tizimlar ishlayapti", "Все системы работают", "All systems operational"],
        status: "success",
      },
      {
        id: "room-204",
        title: ["204-xona", "Кабинет 204", "Room 204"],
        meta: ["18 joy · proyektor", "18 мест · проектор", "18 seats · projector"],
        detail: ["16:00–17:30 band", "Занят с 16:00 до 17:30", "Occupied 16:00–17:30"],
        status: "info",
      },
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
    records: [
      {
        id: "lesson-1",
        title: ["IELTS Bridge · Writing", "IELTS Bridge · Writing", "IELTS Bridge · Writing"],
        meta: ["16:00 · 204-xona", "16:00 · кабинет 204", "16:00 · Room 204"],
        detail: ["B2-04 · Mohira Rasulova", "B2-04 · Мохира Расулова", "B2-04 · Mohira Rasulova"],
        status: "info",
      },
      {
        id: "lesson-2",
        title: [
          "General English · Speaking",
          "General English · Speaking",
          "General English · Speaking",
        ],
        meta: ["18:00 · Studio B", "18:00 · Studio B", "18:00 · Studio B"],
        detail: ["B1-02 · Kamol Ergashev", "B1-02 · Камол Эргашев", "B1-02 · Kamol Ergashev"],
        status: "neutral",
      },
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
    records: [
      {
        id: "att-1",
        title: ["B2-04 · Writing", "B2-04 · Writing", "B2-04 · Writing"],
        meta: ["17/17 qayd etildi", "Отмечено 17/17", "17/17 recorded"],
        detail: ["94% qatnashdi", "Посетили 94%", "94% present"],
        status: "success",
      },
      {
        id: "att-2",
        title: ["B1-02 · Speaking", "B1-02 · Speaking", "B1-02 · Speaking"],
        meta: ["0/14 qayd etildi", "Отмечено 0/14", "0/14 recorded"],
        detail: [
          "Ustoz qaydi kutilmoqda",
          "Ожидается отметка преподавателя",
          "Awaiting teacher entry",
        ],
        status: "danger",
      },
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
    records: [
      {
        id: "invoice-2026-09",
        title: [
          "INV-2026-009 · Dilnoza Karimova",
          "INV-2026-009 · Дильноза Каримова",
          "INV-2026-009 · Dilnoza Karimova",
        ],
        meta: ["1 200 000 UZS · Sentabr", "1 200 000 UZS · Сентябрь", "UZS 1,200,000 · September"],
        detail: ["Yarashtirilgan", "Сверено", "Reconciled"],
        status: "success",
        href: "/admin/payments/invoice-2026-09",
      },
      {
        id: "invoice-2026-10",
        title: [
          "INV-2026-010 · Sardor Aliyev",
          "INV-2026-010 · Сардор Алиев",
          "INV-2026-010 · Sardor Aliyev",
        ],
        meta: ["1 050 000 UZS · Oktabr", "1 050 000 UZS · Октябрь", "UZS 1,050,000 · October"],
        detail: ["15 oktabrgacha", "До 15 октября", "Due 15 October"],
        status: "warning",
        href: "/admin/payments/invoice-2026-10",
      },
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
    records: [
      {
        id: "test-1",
        title: ["Module 12 checkpoint", "Проверка модуля 12", "Module 12 checkpoint"],
        meta: ["v3 · 20 savol · B2-04", "v3 · 20 вопросов · B2-04", "v3 · 20 questions · B2-04"],
        detail: ["Nashr qilingan", "Опубликован", "Published"],
        status: "success",
        href: "/admin/tests/test-1",
      },
      {
        id: "test-2",
        title: ["Grammar diagnostic", "Диагностика грамматики", "Grammar diagnostic"],
        meta: ["v1 · 30 savol · B1-02", "v1 · 30 вопросов · B1-02", "v1 · 30 questions · B1-02"],
        detail: ["2 ta tekshiruv kutilmoqda", "2 работы ожидают проверки", "2 reviews pending"],
        status: "warning",
        href: "/admin/tests/test-2",
      },
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
    records: [
      {
        id: "res-1",
        title: ["B2-04 · Module 12", "B2-04 · Модуль 12", "B2-04 · Module 12"],
        meta: [
          "17 topshirilgan · 84% o'rtacha",
          "17 работ · средний 84%",
          "17 submissions · 84% average",
        ],
        detail: ["+6% oldingi modulga nisbatan", "+6% к прошлому модулю", "+6% vs previous module"],
        status: "success",
      },
      {
        id: "res-2",
        title: ["B1-02 · Grammar", "B1-02 · Grammar", "B1-02 · Grammar"],
        meta: [
          "12 topshirilgan · 71% o'rtacha",
          "12 работ · средний 71%",
          "12 submissions · 71% average",
        ],
        detail: [
          "3 talaba uchun yordam kerak",
          "3 ученикам нужна поддержка",
          "3 students need support",
        ],
        status: "warning",
      },
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
    records: [
      {
        id: "resource-1",
        title: ["Academic word list", "Academic word list", "Academic word list"],
        meta: ["PDF · 3 guruh · tayyor", "PDF · 3 группы · готово", "PDF · 3 groups · ready"],
        detail: [
          "Ustoz tomonidan nashr qilingan",
          "Опубликовано преподавателем",
          "Published by teacher",
        ],
        status: "success",
        href: "/admin/library/resource-1",
      },
      {
        id: "resource-2",
        title: ["Speaking cue cards", "Карточки Speaking", "Speaking cue cards"],
        meta: [
          "PDF · 1 guruh · tekshiruvda",
          "PDF · 1 группа · на проверке",
          "PDF · 1 group · in review",
        ],
        detail: [
          "Media tasdig'i kutilmoqda",
          "Ожидается проверка медиа",
          "Awaiting media verification",
        ],
        status: "warning",
        href: "/admin/library/resource-2",
      },
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
    records: [
      {
        id: "import-1",
        title: [
          "Vocabulary batch · 04 Sep",
          "Пакет vocabulary · 04 Sep",
          "Vocabulary batch · 04 Sep",
        ],
        meta: ["128 element · 126 tayyor", "128 элементов · 126 готовы", "128 items · 126 ready"],
        detail: [
          "2 ta qo'lda ko'rib chiqiladi",
          "2 требуют ручной проверки",
          "2 need manual review",
        ],
        status: "warning",
        href: "/admin/imports/import-1",
      },
      {
        id: "import-2",
        title: ["Reading pack · 02 Sep", "Пакет Reading · 02 Sep", "Reading pack · 02 Sep"],
        meta: ["42 element · yakunlandi", "42 элемента · завершено", "42 items · completed"],
        detail: ["Takroriy yozuv topilmadi", "Дубликатов не найдено", "No duplicate records"],
        status: "success",
        href: "/admin/imports/import-2",
      },
    ],
  },
  transferRequests: {
    eyebrow: ["Guruh harakati", "Перемещения между группами", "Group movement"],
    title: ["Ko'chirish so'rovlari", "Запросы на перевод", "Transfer requests"],
    description: [
      "Manba, maqsad, sabab va qaror auditini tekshiring.",
      "Проверяйте исходную группу, целевую, причину и аудит решения.",
      "Review source, destination, reason, and decision audit.",
    ],
    records: [
      {
        id: "transfer-1",
        title: ["Sardor Aliyev", "Сардор Алиев", "Sardor Aliyev"],
        meta: ["B1-02 → B1-05", "B1-02 → B1-05", "B1-02 → B1-05"],
        detail: [
          "Jadval to'qnashuvi · kutilmoqda",
          "Конфликт расписания · ожидает",
          "Schedule conflict · pending",
        ],
        status: "warning",
      },
      {
        id: "transfer-2",
        title: ["Malika Usmonova", "Малика Усманова", "Malika Usmonova"],
        meta: ["A2-01 → A2-03", "A2-01 → A2-03", "A2-01 → A2-03"],
        detail: [
          "Tasdiqlangan · audit yozildi",
          "Одобрено · аудит записан",
          "Approved · audit recorded",
        ],
        status: "success",
      },
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
    records: [
      {
        id: "admin-notice-1",
        title: [
          "Davomat qaydi kechikdi",
          "Задержана отметка посещаемости",
          "Attendance entry delayed",
        ],
        meta: ["B1-02 · 12 daqiqa oldin", "B1-02 · 12 минут назад", "B1-02 · 12 minutes ago"],
        detail: [
          "Ustozga eslatma ko'rsatildi",
          "Преподавателю показано напоминание",
          "Teacher reminder displayed",
        ],
        status: "warning",
      },
      {
        id: "admin-notice-2",
        title: ["Import yakunlandi", "Импорт завершён", "Import completed"],
        meta: ["Vocabulary batch · 09:18", "Пакет vocabulary · 09:18", "Vocabulary batch · 09:18"],
        detail: ["126 element tayyor", "126 элементов готовы", "126 items ready"],
        status: "success",
      },
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
    records: [
      {
        id: "audit-1",
        title: ["USER_STATUS_CHANGED", "USER_STATUS_CHANGED", "USER_STATUS_CHANGED"],
        meta: ["admin-preview · 10:24", "admin-preview · 10:24", "admin-preview · 10:24"],
        detail: [
          "Sabab: guruh a'zoligi yakunlandi",
          "Причина: членство в группе завершено",
          "Reason: group membership ended",
        ],
        status: "info",
      },
      {
        id: "audit-2",
        title: ["INTAKE_REVIEWED", "INTAKE_REVIEWED", "INTAKE_REVIEWED"],
        meta: ["admin-preview · 09:47", "admin-preview · 09:47", "admin-preview · 09:47"],
        detail: ["Korrelyatsiya: req_102", "Корреляция: req_102", "Correlation: req_102"],
        status: "success",
      },
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
    records: [
      {
        id: "report-1",
        title: ["Haftalik akademik holat", "Недельная учебная сводка", "Weekly academic health"],
        meta: [
          "02–08 sentabr · 14 guruh",
          "02–08 сентября · 14 групп",
          "02–08 September · 14 groups",
        ],
        detail: [
          "94.6% davomat · 81% test o'rtacha",
          "94,6% посещаемость · 81% средний тест",
          "94.6% attendance · 81% test average",
        ],
        status: "success",
      },
      {
        id: "report-2",
        title: ["Qabul navbati", "Очередь приёма", "Intake queue"],
        meta: ["32 murojaat · 4 ochiq", "32 обращения · 4 открыты", "32 requests · 4 open"],
        detail: [
          "Median javob: 1 soat 18 daqiqa",
          "Медиана ответа: 1 ч 18 мин",
          "Median response: 1h 18m",
        ],
        status: "info",
      },
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
    records: [
      {
        id: "profile",
        title: ["Operatsion profil", "Операционный профиль", "Operations profile"],
        meta: ["Zarina Ahmedova · Admin", "Зарина Ахмедова · Admin", "Zarina Ahmedova · Admin"],
        detail: ["Server tasdiqlagan rol", "Роль подтверждена сервером", "Server-verified role"],
        status: "success",
      },
      {
        id: "defaults",
        title: [
          "Standart jadval ko'rinishi",
          "Вид расписания по умолчанию",
          "Default schedule view",
        ],
        meta: ["Hafta · barcha filiallar", "Неделя · все филиалы", "Week · all branches"],
        detail: ["Serverda saqlanadi", "Сохраняется на сервере", "Persisted on the server"],
        status: "info",
      },
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
    transferRequests: "Ko'chirishlar",
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
    transferRequests: "Переводы",
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
    transferRequests: "Transfers",
    notifications: "Notifications",
    audit: "Audit",
    reports: "Reports",
    settings: "Settings",
  },
};

const common: Record<Locale, AdminWorkspaceCopy["common"]> = {
  uz: {
    adminName: "Zarina Ahmedova",
    all: "Barchasi",
    contextLabel: "Kontekst",
    connectedNotice: "Himoyalangan operatsion muhit",
    detailLabel: "Batafsil",
    emptyLabel: "Mos yozuv topilmadi.",
    idRecordLabel: "ID / yozuv",
    languageLabel: "Til",
    lastSyncLabel: "So'nggi sinxron",
    menuClose: "Menyuni yopish",
    menuOpen: "Menyuni ochish",
    openQueueLabel: "Ochiq navbat",
    previewNotice: "Namuna operatsion ma'lumotlari",
    searchLabel: "Qidirish",
    searchPlaceholder: "Reyestr bo'yicha qidiring",
    serviceLevelLabel: "Xizmat darajasi",
    stackLabel: "API · PostgreSQL · Workers",
    statusLabel: "Holat",
    workspaceLabel: "Operations Console",
  },
  ru: {
    adminName: "Зарина Ахмедова",
    all: "Все",
    contextLabel: "Контекст",
    connectedNotice: "Защищённая операционная среда",
    detailLabel: "Подробнее",
    emptyLabel: "Подходящих записей не найдено.",
    idRecordLabel: "ID / запись",
    languageLabel: "Язык",
    lastSyncLabel: "Последняя синхронизация",
    menuClose: "Закрыть меню",
    menuOpen: "Открыть меню",
    openQueueLabel: "Открытая очередь",
    previewNotice: "Демонстрационные операционные данные",
    searchLabel: "Поиск",
    searchPlaceholder: "Поиск по реестру",
    serviceLevelLabel: "Уровень сервиса",
    stackLabel: "API · PostgreSQL · Workers",
    statusLabel: "Статус",
    workspaceLabel: "Operations Console",
  },
  en: {
    adminName: "Zarina Ahmedova",
    all: "All",
    contextLabel: "Context",
    connectedNotice: "Protected operations environment",
    detailLabel: "Details",
    emptyLabel: "No matching records found.",
    idRecordLabel: "ID / record",
    languageLabel: "Language",
    lastSyncLabel: "Last sync",
    menuClose: "Close menu",
    menuOpen: "Open menu",
    openQueueLabel: "Open queue",
    previewNotice: "Preview operations data",
    searchLabel: "Search",
    searchPlaceholder: "Search the registry",
    serviceLevelLabel: "Service level",
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
    records: seed.records.map((record) => ({
      detail: record.detail[index],
      href: record.href,
      id: record.id,
      meta: record.meta[index],
      status: record.status,
      title: record.title[index],
    })),
    title: seed.title[index],
  };
}

export function getAdminWorkspaceCopy(locale: Locale): AdminWorkspaceCopy {
  const sections = Object.fromEntries(
    Object.entries(seeds).map(([key, seed]) => [key, localizeSection(locale, seed)]),
  ) as Record<AdminNavigationKey, AdminSectionCopy>;

  return { common: common[locale], navigation: navigation[locale], sections };
}
