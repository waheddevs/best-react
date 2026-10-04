import type {
  LocalizedText,
  TeacherLessonAssignment,
  TeacherLessonMaterial,
  TeacherLessonSession,
  TeacherLessonTest,
  TeacherFinanceSnapshot,
  TeacherGroup,
  TeacherPreviewData,
  TeacherTask,
} from "@/types/teacher/Teacher";

function localized(uz: string, ru: string, en: string): LocalizedText {
  return { uz, ru, en };
}

const groups: TeacherGroup[] = [
  {
    attendance: 92,
    category: "generalEnglish",
    id: "group-01",
    learnerCount: 12,
    scheduleDays: [1, 3, 5],
    startsAtMinutes: 480,
    endsAtMinutes: 600,
    lessonDays: localized("Du / Chor / Ju", "Пн / Ср / Пт", "Mon / Wed / Fri"),
    name: "Beginner Nova",
    recordSlug: "beginner-nova",
    room: "501",
    slug: "beginner-nova",
    time: "08:00–10:00",
  },
  {
    attendance: 88,
    category: "cefr",
    id: "group-02",
    learnerCount: 9,
    scheduleDays: [2, 4, 6],
    startsAtMinutes: 600,
    endsAtMinutes: 720,
    lessonDays: localized("Se / Pay / Sha", "Вт / Чт / Сб", "Tue / Thu / Sat"),
    name: "Pre-Intermediate Orbit",
    recordSlug: "pre-intermediate-orbit",
    room: "402",
    slug: "pre-intermediate-orbit",
    time: "10:00–12:00",
  },
  {
    attendance: 95,
    category: "cefr",
    id: "group-03",
    learnerCount: 11,
    scheduleDays: [1, 3, 5],
    startsAtMinutes: 840,
    endsAtMinutes: 960,
    lessonDays: localized("Du / Chor / Ju", "Пн / Ср / Пт", "Mon / Wed / Fri"),
    name: "Intermediate Pulse",
    recordSlug: "intermediate-pulse",
    room: "304",
    slug: "intermediate-pulse",
    time: "14:00–16:00",
  },
  {
    attendance: 90,
    category: "ielts",
    id: "group-04",
    learnerCount: 10,
    scheduleDays: [2, 4, 6],
    startsAtMinutes: 960,
    endsAtMinutes: 1080,
    lessonDays: localized("Se / Pay / Sha", "Вт / Чт / Сб", "Tue / Thu / Sat"),
    name: "IELTS Momentum",
    recordSlug: "ielts-momentum",
    room: "403",
    slug: "ielts-momentum",
    time: "16:00–18:00",
  },
  {
    attendance: 84,
    category: "generalEnglish",
    id: "group-05",
    learnerCount: 8,
    scheduleDays: [1, 3, 5],
    startsAtMinutes: 1080,
    endsAtMinutes: 1200,
    lessonDays: localized("Du / Chor / Ju", "Пн / Ср / Пт", "Mon / Wed / Fri"),
    name: "Beginner Horizon",
    recordSlug: "beginner-horizon",
    room: "301",
    slug: "beginner-horizon",
    time: "18:00–20:00",
  },
  {
    attendance: 93,
    category: "ielts",
    id: "group-06",
    learnerCount: 9,
    scheduleDays: [2, 4, 6],
    startsAtMinutes: 1080,
    endsAtMinutes: 1200,
    lessonDays: localized("Se / Pay / Sha", "Вт / Чт / Сб", "Tue / Thu / Sat"),
    name: "Pre-IELTS Summit",
    recordSlug: "pre-ielts-summit",
    room: "502",
    slug: "pre-ielts-summit",
    time: "18:00–20:00",
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

const lessonBlueprints = [
  {
    objective: localized(
      "Mavzuni nutqda to‘g‘ri qo‘llash va asosiy xatolarni aniqlash.",
      "Использовать тему в речи и распознавать основные ошибки.",
      "Use the target language in speech and identify common errors.",
    ),
    topic: localized(
      "Present Perfect amaliyoti",
      "Практика Present Perfect",
      "Present Perfect practice",
    ),
  },
  {
    objective: localized(
      "Fikrni dalil va misollar bilan izchil ifodalash.",
      "Последовательно выражать мнение с аргументами и примерами.",
      "Express an opinion clearly with reasons and examples.",
    ),
    topic: localized(
      "Fikr bildirish va dalillash",
      "Мнение и аргументация",
      "Opinions and supporting reasons",
    ),
  },
  {
    objective: localized(
      "Matndan asosiy g‘oya va muhim detallarni tez topish.",
      "Быстро находить главную мысль и важные детали текста.",
      "Locate the main idea and key details efficiently.",
    ),
    topic: localized("Reading strategiyalari", "Стратегии чтения", "Reading strategies"),
  },
] as const;

const groupLessons: TeacherLessonSession[] = groups.flatMap((group) => {
  const [startsAt = "10:00", endsAt = "12:00"] = group.time.split("–");
  const dates = ["2026-08-25", "2026-08-29", "2026-09-02"] as const;

  return lessonBlueprints.map((blueprint, index) => {
    const sequence = String(index + 1).padStart(2, "0");
    const lessonId = `${group.slug}-lesson-${sequence}`;

    return {
      assignmentIds: index < 2 ? [`${group.slug}-assignment-${sequence}`] : [],
      attendancePresent: index === 0 ? Math.max(group.learnerCount - 2, 0) : 0,
      attendanceTotal: group.learnerCount,
      date: dates[index] ?? "2026-09-02",
      endsAt,
      groupSlug: group.slug,
      id: lessonId,
      materialIds:
        index === 0
          ? [`${group.slug}-material-article`, `${group.slug}-material-worksheet`]
          : index === 1
            ? [`${group.slug}-material-book`]
            : [],
      objective: blueprint.objective,
      room: group.room,
      startsAt,
      status: index === 0 ? "completed" : "planned",
      testIds: index < 2 ? [`${group.slug}-test-${sequence}`] : [],
      topic: blueprint.topic,
    } satisfies TeacherLessonSession;
  });
});

const groupMaterials: TeacherLessonMaterial[] = groups.flatMap((group) => [
  {
    description: localized(
      "Dars mavzusini misollar bilan tushuntiruvchi qisqa metodik maqola.",
      "Краткая методическая статья с примерами по теме урока.",
      "A concise teaching article with examples for the lesson topic.",
    ),
    format: "WEB",
    groupSlug: group.slug,
    id: `${group.slug}-material-article`,
    lessonId: `${group.slug}-lesson-01`,
    title: localized(
      "Present Perfect: asosiy holatlar",
      "Present Perfect: основные случаи",
      "Present Perfect: core uses",
    ),
    type: "article",
  },
  {
    description: localized(
      "Juftlikda ishlash uchun chop etiladigan mashqlar to‘plami.",
      "Печатный комплект упражнений для работы в парах.",
      "A printable exercise set for pair work.",
    ),
    format: "PDF",
    groupSlug: group.slug,
    id: `${group.slug}-material-worksheet`,
    lessonId: `${group.slug}-lesson-01`,
    title: localized(
      "Speaking practice worksheet",
      "Рабочий лист для speaking",
      "Speaking practice worksheet",
    ),
    type: "worksheet",
  },
  {
    description: localized(
      "Fikr bildirish uchun foydali iboralar jamlangan o‘quv qo‘llanma bo‘limi.",
      "Раздел пособия с полезными фразами для выражения мнения.",
      "A course-book section with useful language for expressing opinions.",
    ),
    format: "PDF",
    groupSlug: group.slug,
    id: `${group.slug}-material-book`,
    lessonId: `${group.slug}-lesson-02`,
    title: localized(
      "Opinion language qo‘llanmasi",
      "Пособие по выражению мнения",
      "Opinion language guide",
    ),
    type: "book",
  },
]);

const groupAssignments: TeacherLessonAssignment[] = groups.flatMap((group) => [
  {
    dueAt: "2026-08-31",
    groupSlug: group.slug,
    id: `${group.slug}-assignment-01`,
    lessonId: `${group.slug}-lesson-01`,
    status: "active",
    submissionCount: Math.max(group.learnerCount - 5, 0),
    title: localized(
      "Present Perfect yozma mashqi",
      "Письменное задание Present Perfect",
      "Present Perfect writing task",
    ),
    totalLearners: group.learnerCount,
  },
  {
    dueAt: "2026-09-05",
    groupSlug: group.slug,
    id: `${group.slug}-assignment-02`,
    lessonId: `${group.slug}-lesson-02`,
    status: "draft",
    submissionCount: 0,
    title: localized("Opinion essay rejasi", "План эссе-мнения", "Opinion essay outline"),
    totalLearners: group.learnerCount,
  },
]);

const groupTests: TeacherLessonTest[] = groups.flatMap((group) => [
  {
    durationMinutes: 15,
    groupSlug: group.slug,
    id: `${group.slug}-test-01`,
    kind: "quiz",
    lessonId: `${group.slug}-lesson-01`,
    questionCount: 12,
    scheduledAt: "2026-08-25",
    status: "completed",
    title: localized(
      "Present Perfect qisqa testi",
      "Короткий тест Present Perfect",
      "Present Perfect quick check",
    ),
  },
  {
    durationMinutes: 30,
    groupSlug: group.slug,
    id: `${group.slug}-test-02`,
    kind: "progress",
    lessonId: `${group.slug}-lesson-02`,
    questionCount: 24,
    scheduledAt: "2026-09-02",
    status: "scheduled",
    title: localized("Unit progress testi", "Проверочный тест по разделу", "Unit progress test"),
  },
]);

// Client-preview-only fictional business data. Replace before production.
export const teacherPreviewData: TeacherPreviewData = {
  dashboardMetrics: [
    {
      id: "new",
      label: localized(
        "Bu oy qo‘shilgan yangi o‘quvchilar",
        "Новые ученики в этом месяце",
        "New learners this month",
      ),
      tone: "blue",
      value: 19,
    },
    {
      id: "active",
      label: localized("Jami faol o‘quvchilar", "Всего активных учеников", "Total active learners"),
      tone: "turquoise",
      value: 79,
    },
    {
      id: "departed",
      label: localized("Bu oy ketganlar", "Ушли в этом месяце", "Departed this month"),
      tone: "red",
      value: 4,
    },
    {
      id: "together",
      label: localized("BEST bilan birga — oy", "Месяцев вместе с BEST", "Months with BEST"),
      tone: "navy",
      value: 28,
    },
  ],
  financeSnapshots,
  groupAssignments,
  groupLessons,
  groupMaterials,
  groupTests,
  groups,
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
  tasks,
};

export function getTeacherGroup(slug: string) {
  return groups.find((group) => group.slug === slug);
}

export function getTeacherGroupLessons(slug: string) {
  return groupLessons.filter((lesson) => lesson.groupSlug === slug);
}

export function getTeacherLesson(slug: string, lessonId: string) {
  return groupLessons.find((lesson) => lesson.groupSlug === slug && lesson.id === lessonId);
}

export function getTeacherGroupMaterials(slug: string) {
  return groupMaterials.filter((material) => material.groupSlug === slug);
}

export function getTeacherGroupAssignments(slug: string) {
  return groupAssignments.filter((assignment) => assignment.groupSlug === slug);
}

export function getTeacherGroupTests(slug: string) {
  return groupTests.filter((test) => test.groupSlug === slug);
}
