import type {
  LocalizedText,
  TeacherFinanceSnapshot,
  TeacherGroup,
  TeacherLearner,
  TeacherMessage,
  TeacherPreviewData,
  TeacherScheduleEntry,
  TeacherTask,
} from "@/types/teacher/Teacher";

function localized(uz: string, ru: string, en: string): LocalizedText {
  return { uz, ru, en };
}

const groups: TeacherGroup[] = [
  {
    attendance: 92,
    id: "group-01",
    learnerCount: 24,
    lessonDays: localized("Du / Chor / Ju", "Пн / Ср / Пт", "Mon / Wed / Fri"),
    name: "Beginner Nova",
    room: "501",
    slug: "beginner-nova",
    time: "08:00–10:00",
  },
  {
    attendance: 88,
    id: "group-02",
    learnerCount: 18,
    lessonDays: localized("Se / Pay / Sha", "Вт / Чт / Сб", "Tue / Thu / Sat"),
    name: "Pre-Intermediate Orbit",
    room: "402",
    slug: "pre-intermediate-orbit",
    time: "10:00–12:00",
  },
  {
    attendance: 95,
    id: "group-03",
    learnerCount: 21,
    lessonDays: localized("Du / Chor / Ju", "Пн / Ср / Пт", "Mon / Wed / Fri"),
    name: "Intermediate Pulse",
    room: "304",
    slug: "intermediate-pulse",
    time: "14:00–16:00",
  },
  {
    attendance: 90,
    id: "group-04",
    learnerCount: 16,
    lessonDays: localized("Se / Pay / Sha", "Вт / Чт / Сб", "Tue / Thu / Sat"),
    name: "IELTS Momentum",
    room: "403",
    slug: "ielts-momentum",
    time: "16:00–18:00",
  },
  {
    attendance: 84,
    id: "group-05",
    learnerCount: 20,
    lessonDays: localized("Du / Chor / Ju", "Пн / Ср / Пт", "Mon / Wed / Fri"),
    name: "Beginner Horizon",
    room: "301",
    slug: "beginner-horizon",
    time: "18:00–20:00",
  },
  {
    attendance: 93,
    id: "group-06",
    learnerCount: 19,
    lessonDays: localized("Se / Pay / Sha", "Вт / Чт / Сб", "Tue / Thu / Sat"),
    name: "Pre-IELTS Summit",
    room: "502",
    slug: "pre-ielts-summit",
    time: "18:00–20:00",
  },
];

const learnerNames = [
  "Samira Navoiy",
  "Kamol Rayhon",
  "Dilnoza Atlas",
  "Jasur Hilol",
  "Malika Ziyo",
  "Temur Sohil",
  "Aziza Nigor",
  "Sardor Kamalak",
  "Laylo Shabnam",
  "Bekzod Zamin",
  "Madina Ravo",
  "Umid Falak",
];

const learners: TeacherLearner[] = groups.flatMap((group, groupIndex) =>
  learnerNames.slice(0, groupIndex === 0 ? 12 : 6).map((name, index) => {
    const statusCycle: TeacherLearner["status"][] = [
      "active",
      "active",
      "active",
      "paused",
      "active",
      "debtor",
    ];
    const names = name.split(" ");
    return {
      balance: index % 6 === 5 ? -420000 : 280000 + index * 35000,
      groupSlug: group.slug,
      id: `${group.id}-learner-${index + 1}`,
      initials: `${names[0]?.[0] ?? "B"}${names[1]?.[0] ?? "L"}`,
      name: groupIndex === 0 ? name : `${names[0]} ${groupIndex + 1}`,
      phone: `+998 00 000 ${String(groupIndex * 20 + index).padStart(2, "0")} 00`,
      status: statusCycle[index % statusCycle.length] ?? "active",
      taskProgress: Math.max(42, 96 - index * 4),
    };
  }),
);

const messages: TeacherMessage[] = [
  {
    dateLabel: localized("Bugun", "Сегодня", "Today"),
    id: "message-01",
    initials: "SN",
    isOwn: false,
    role: "learner",
    sender: "Samira Navoiy",
    text: localized(
      "Assalomu alaykum, bugungi speaking mavzusini yuborasizmi?",
      "Здравствуйте, отправите тему сегодняшнего speaking?",
      "Hello, could you share today’s speaking topic?",
    ),
    time: "09:12",
  },
  {
    dateLabel: localized("Bugun", "Сегодня", "Today"),
    id: "message-02",
    initials: "TN",
    isOwn: true,
    role: "teacher",
    sender: "Nodira Karimova",
    text: localized(
      "Albatta. Mavzu va tayyorlanish savollarini guruhga joyladim.",
      "Конечно. Тема и вопросы для подготовки уже в группе.",
      "Of course. I have added the topic and preparation questions to the group.",
    ),
    time: "09:18",
  },
  {
    dateLabel: localized("Bugun", "Сегодня", "Today"),
    id: "message-03",
    initials: "DK",
    isOwn: false,
    role: "learner",
    sender: "Dilnoza Atlas",
    text: localized(
      "Rahmat ustoz, topshiriqni darsgacha tayyorlaymiz.",
      "Спасибо, подготовим задание до урока.",
      "Thank you, we will prepare the task before class.",
    ),
    time: "09:21",
  },
  {
    dateLabel: localized("Kecha", "Вчера", "Yesterday"),
    id: "message-04",
    initials: "JH",
    isOwn: false,
    role: "learner",
    sender: "Jasur Hilol",
    text: localized(
      "Mock natijalari qachon chiqadi?",
      "Когда будут результаты пробного теста?",
      "When will the mock results be available?",
    ),
    time: "18:44",
  },
];

const tasks: TeacherTask[] = [
  {
    createdAt: "2026-08-28T09:20:00+09:00",
    groupName: "IELTS Momentum",
    id: "task-01",
    kind: "attendance",
    learnerName: "Aziza Nigor",
    phone: "+998 00 000 10 00",
    status: "pending",
  },
  {
    createdAt: "2026-08-28T08:45:00+09:00",
    groupName: "Beginner Nova",
    id: "task-02",
    kind: "attendance",
    learnerName: "Temur Sohil",
    phone: "+998 00 000 11 00",
    status: "pending",
  },
  {
    createdAt: "2026-08-27T17:10:00+09:00",
    groupName: "Pre-Intermediate Orbit",
    id: "task-03",
    kind: "pauseCall",
    learnerName: "Laylo Shabnam",
    phone: "+998 00 000 12 00",
    status: "pending",
  },
  {
    createdAt: "2026-08-27T13:30:00+09:00",
    groupName: "Intermediate Pulse",
    id: "task-04",
    kind: "pauseCall",
    learnerName: "Bekzod Zamin",
    phone: "+998 00 000 13 00",
    status: "pending",
  },
  {
    createdAt: "2026-08-26T12:15:00+09:00",
    groupName: "Beginner Horizon",
    id: "task-05",
    kind: "attendance",
    learnerName: "Malika Ziyo",
    phone: "+998 00 000 14 00",
    status: "completed",
  },
];

const financeSnapshots: TeacherFinanceSnapshot[] = [
  {
    attendanceRate: 89.4,
    expectedAmount: 28400000,
    income: 21850000,
    label: localized("Avgust 2026", "Август 2026", "August 2026"),
    metrics: [
      { id: "paid", tone: "success", value: 21850000, valueType: "currency" },
      { id: "rate", tone: "success", value: 76.9, valueType: "percentage" },
      { id: "expected", tone: "warning", value: 28400000, valueType: "currency" },
      { id: "debt", tone: "danger", value: 6550000, valueType: "currency" },
      { id: "learners", tone: "info", value: 118, valueType: "count" },
      { id: "groups", tone: "neutral", value: 6, valueType: "count" },
      { id: "salary", tone: "warning", value: 14200000, valueType: "currency" },
      { id: "penalty", tone: "danger", value: 0, valueType: "currency" },
    ],
    month: "2026-08",
    paymentRate: 76.9,
  },
  {
    attendanceRate: 91.2,
    expectedAmount: 27600000,
    income: 25400000,
    label: localized("Iyul 2026", "Июль 2026", "July 2026"),
    metrics: [
      { id: "paid", tone: "success", value: 25400000, valueType: "currency" },
      { id: "rate", tone: "success", value: 92, valueType: "percentage" },
      { id: "expected", tone: "warning", value: 27600000, valueType: "currency" },
      { id: "debt", tone: "danger", value: 2200000, valueType: "currency" },
      { id: "learners", tone: "info", value: 116, valueType: "count" },
      { id: "groups", tone: "neutral", value: 6, valueType: "count" },
      { id: "salary", tone: "warning", value: 13900000, valueType: "currency" },
      { id: "penalty", tone: "danger", value: 0, valueType: "currency" },
    ],
    month: "2026-07",
    paymentRate: 92,
  },
  {
    attendanceRate: 88.7,
    expectedAmount: 26800000,
    income: 23650000,
    label: localized("Iyun 2026", "Июнь 2026", "June 2026"),
    metrics: [
      { id: "paid", tone: "success", value: 23650000, valueType: "currency" },
      { id: "rate", tone: "success", value: 88.2, valueType: "percentage" },
      { id: "expected", tone: "warning", value: 26800000, valueType: "currency" },
      { id: "debt", tone: "danger", value: 3150000, valueType: "currency" },
      { id: "learners", tone: "info", value: 112, valueType: "count" },
      { id: "groups", tone: "neutral", value: 6, valueType: "count" },
      { id: "salary", tone: "warning", value: 13200000, valueType: "currency" },
      { id: "penalty", tone: "danger", value: 140000, valueType: "currency" },
    ],
    month: "2026-06",
    paymentRate: 88.2,
  },
];

const schedule: TeacherScheduleEntry[] = [
  { groupName: "Beginner Nova", learnerCount: 24, room: "501", status: "active", time: "08:00" },
  {
    groupName: "Pre-Intermediate Orbit",
    learnerCount: 18,
    room: "402",
    status: "planned",
    time: "10:00",
  },
  {
    groupName: "Intermediate Pulse",
    learnerCount: 21,
    room: "304",
    status: "planned",
    time: "14:00",
  },
  { groupName: "IELTS Momentum", learnerCount: 16, room: "403", status: "planned", time: "16:00" },
  {
    groupName: "Beginner Horizon",
    learnerCount: 20,
    room: "301",
    status: "planned",
    time: "18:00",
  },
  {
    groupName: "Pre-IELTS Summit",
    learnerCount: 19,
    room: "502",
    status: "planned",
    time: "18:00",
  },
];

// Client-preview-only fictional business data. Replace before production.
export const teacherPreviewData: TeacherPreviewData = {
  dashboardMetrics: [
    {
      id: "together",
      label: localized("BEST bilan birga", "Вместе с BEST", "Together with BEST"),
      tone: "navy",
      value: localized("2 yil 4 oy", "2 года 4 месяца", "2 years 4 months"),
    },
    {
      id: "departed",
      label: localized("Bu oy ketganlar", "Ушли в этом месяце", "Departed this month"),
      tone: "yellow",
      value: localized("4 o‘quvchi", "4 ученика", "4 learners"),
    },
    {
      id: "new",
      label: localized(
        "Bu oy qo‘shilgan yangi o‘quvchilar",
        "Новые ученики в этом месяце",
        "New learners this month",
      ),
      tone: "blue",
      value: localized("19 ta", "19", "19"),
    },
  ],
  financeSnapshots,
  groups,
  learners,
  messages,
  notifications: [
    {
      id: "notification-01",
      message: localized(
        "Bugungi darslar jadvali tayyor.",
        "Расписание на сегодня готово.",
        "Today’s lesson schedule is ready.",
      ),
      time: localized("5 daqiqa oldin", "5 минут назад", "5 minutes ago"),
      title: localized("Kun rejasi", "План дня", "Day plan"),
      tone: "info",
    },
    {
      id: "notification-02",
      message: localized(
        "Ikki davomat vazifasi e’tibor kutmoqda.",
        "Две задачи по посещаемости ждут внимания.",
        "Two attendance tasks need attention.",
      ),
      time: localized("20 daqiqa oldin", "20 минут назад", "20 minutes ago"),
      title: localized("Vazifalar", "Задачи", "Tasks"),
      tone: "warning",
    },
  ],
  profile: {
    branch: localized("Markaziy filial", "Центральный филиал", "Central branch"),
    displayName: "Nodira Karimova",
    handle: "@teacher-preview",
    initials: "NK",
    phone: "+998 00 000 00 00",
    role: "teacher",
    subject: localized("Ingliz tili", "Английский язык", "English"),
  },
  quickStatuses: [
    { id: "ielts", label: localized("IELTS maqsad", "Цель IELTS", "IELTS target"), progress: 72 },
    { id: "attendance", label: localized("Davomat", "Посещаемость", "Attendance"), progress: 89 },
    { id: "new", label: localized("Yangi guruh", "Новая группа", "New group"), progress: 64 },
    {
      id: "monthly",
      label: localized("Oylik natija", "Итог месяца", "Monthly result"),
      progress: 81,
    },
  ],
  resources: [
    {
      description: localized(
        "Metodika va speaking tavsiyalari",
        "Методика и советы по speaking",
        "Methodology and speaking tips",
      ),
      id: "resource-podcast",
      title: localized("Podkastlar", "Подкасты", "Podcasts"),
      type: "podcast",
    },
    {
      description: localized(
        "Qisqa dars va seminar yozuvlari",
        "Короткие уроки и записи семинаров",
        "Short lessons and seminar recordings",
      ),
      id: "resource-video",
      title: localized("Videolar", "Видео", "Videos"),
      type: "video",
    },
  ],
  schedule,
  tasks,
  transferRequests: [],
};

export function getTeacherGroup(slug: string) {
  return groups.find((group) => group.slug === slug);
}

export function getTeacherGroupLearners(slug: string) {
  return learners.filter((learner) => learner.groupSlug === slug);
}
