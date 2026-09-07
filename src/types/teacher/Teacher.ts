import type { Locale } from "@/config/Locales";

export type LocalizedText = Record<Locale, string>;

export type TeacherThemeMode = "light" | "dark";

export type TeacherNavigationKey =
  "dashboard" | "groups" | "tasks" | "finance" | "reception" | "transferRequests" | "profile";

export type TeacherProfileData = {
  branch: LocalizedText;
  displayName: string;
  handle: string;
  initials: string;
  phone: string;
  role: "teacher";
  subject: LocalizedText;
};

export type TeacherDashboardMetric = {
  featured: boolean;
  id: string;
  label: LocalizedText;
  tone: "blue" | "navy" | "turquoise" | "yellow";
  value: number;
};

export type TeacherGroup = {
  attendance: number;
  id: string;
  learnerCount: number;
  lessonDays: LocalizedText;
  name: string;
  room: string;
  slug: string;
  time: string;
};

export type TeacherLearnerStatus = "active" | "paused" | "departed" | "debtor";

export type TeacherLearner = {
  balance: number;
  groupSlug: string;
  id: string;
  initials: string;
  name: string;
  phone: string;
  status: TeacherLearnerStatus;
  taskProgress: number;
};

export type TeacherTaskKind = "attendance" | "pauseCall";
export type TeacherTaskStatus = "pending" | "completed";

export type TeacherTask = {
  createdAt: string;
  groupName: string;
  id: string;
  kind: TeacherTaskKind;
  learnerName: string;
  phone: string;
  status: TeacherTaskStatus;
};

export type TeacherFinanceMetric = {
  id: "paid" | "rate" | "expected" | "debt" | "learners" | "groups" | "salary" | "penalty";
  tone: "success" | "warning" | "danger" | "info" | "neutral";
  value: number;
  valueType: "currency" | "percentage" | "count";
};

export type TeacherFinanceSnapshot = {
  attendanceRate: number;
  expectedAmount: number;
  income: number;
  label: LocalizedText;
  metrics: TeacherFinanceMetric[];
  month: string;
  paymentRate: number;
};

export type TeacherScheduleEntry = {
  endsAt: string;
  groupName: string;
  groupSlug: string;
  id: string;
  learnerCount: number;
  room: string;
  startsAt: string;
  status: "active" | "completed" | "next" | "planned";
};

export type TeacherGroupWorkspaceTab =
  "overview" | "students" | "lessons" | "materials" | "assignments" | "tests";

export type TeacherGroupCreateKind = "assignment" | "lesson" | "material" | "test";

export type TeacherLessonStatus = "completed" | "planned" | "cancelled";

export type TeacherLessonSession = {
  assignmentIds: string[];
  attendancePresent: number;
  attendanceTotal: number;
  date: string;
  endsAt: string;
  groupSlug: string;
  id: string;
  materialIds: string[];
  objective: LocalizedText;
  room: string;
  startsAt: string;
  status: TeacherLessonStatus;
  testIds: string[];
  topic: LocalizedText;
};

export type TeacherLessonFormValue = {
  assignmentIds: string[];
  attendancePresent: number;
  attendanceTotal: number;
  date: string;
  endsAt: string;
  materialIds: string[];
  objective: string;
  room: string;
  startsAt: string;
  status: TeacherLessonStatus;
  testIds: string[];
  topic: string;
};

export type TeacherMaterialType = "article" | "book" | "worksheet";

export type TeacherLessonMaterial = {
  description: LocalizedText;
  format: "DOCX" | "PDF" | "WEB";
  groupSlug: string;
  id: string;
  lessonId: string;
  title: LocalizedText;
  type: TeacherMaterialType;
};

export type TeacherAssignmentStatus = "active" | "closed" | "draft";

export type TeacherLessonAssignment = {
  dueAt: string;
  groupSlug: string;
  id: string;
  lessonId: string;
  status: TeacherAssignmentStatus;
  submissionCount: number;
  title: LocalizedText;
  totalLearners: number;
};

export type TeacherTestKind = "mock" | "progress" | "quiz";
export type TeacherTestStatus = "completed" | "draft" | "scheduled";

export type TeacherLessonTest = {
  durationMinutes: number;
  groupSlug: string;
  id: string;
  kind: TeacherTestKind;
  lessonId: string;
  questionCount: number;
  scheduledAt: string;
  status: TeacherTestStatus;
  title: LocalizedText;
};

export type TeacherTransferRequestStatus = "pending" | "approved" | "declined";

export type TeacherTransferRequest = {
  createdAt: string;
  fromGroup: string;
  id: string;
  learnerName: string;
  status: TeacherTransferRequestStatus;
  toGroup: string;
};

export type TeacherResource = {
  description: LocalizedText;
  id: string;
  title: LocalizedText;
  type: "podcast" | "video";
};

export type TeacherNotificationPreview = {
  id: string;
  message: LocalizedText;
  time: LocalizedText;
  title: LocalizedText;
  tone: "info" | "warning";
};

export type TeacherPreviewData = {
  dashboardMetrics: TeacherDashboardMetric[];
  financeSnapshots: TeacherFinanceSnapshot[];
  groups: TeacherGroup[];
  groupAssignments: TeacherLessonAssignment[];
  groupLessons: TeacherLessonSession[];
  groupMaterials: TeacherLessonMaterial[];
  groupTests: TeacherLessonTest[];
  learners: TeacherLearner[];
  notifications: TeacherNotificationPreview[];
  profile: TeacherProfileData;
  resources: TeacherResource[];
  schedule: TeacherScheduleEntry[];
  scheduleDate: string;
  tasks: TeacherTask[];
  transferRequests: TeacherTransferRequest[];
};

export type TeacherCopy = {
  common: {
    add: string;
    all: string;
    back: string;
    cancel: string;
    close: string;
    completed: string;
    countSuffix: string;
    createdAt: string;
    done: string;
    empty: string;
    menu: string;
    notifications: string;
    pending: string;
    refresh: string;
    reset: string;
    savePreview: string;
    search: string;
    teacherRole: string;
  };
  dashboard: {
    description: string;
    eyebrow: string;
    groupsTitle: string;
    libraryTitle: string;
    pageTitle: string;
    resourceUnavailableMessage: string;
    resourceUnavailableTitle: string;
    scheduleMonths: string[];
    scheduleStatuses: Record<TeacherScheduleEntry["status"], string>;
    scheduleTitle: string;
    scheduleViewAll: string;
    viewAll: string;
  };
  finance: {
    attendanceRate: string;
    description: string;
    eyebrow: string;
    expectedAmount: string;
    income: string;
    labels: Record<TeacherFinanceMetric["id"], string>;
    pageTitle: string;
  };
  groupWorkspace: {
    activeAssignments: string;
    assignmentsDescription: string;
    assignmentsTitle: string;
    attendance: string;
    attendancePresent: string;
    attendanceTotal: string;
    cancelled: string;
    closed: string;
    completed: string;
    createActions: Record<TeacherGroupCreateKind, string>;
    createDescriptions: Record<TeacherGroupCreateKind, string>;
    createPreviewMessage: string;
    createPreviewTitle: string;
    date: string;
    deleteLesson: string;
    draft: string;
    dueDate: string;
    duration: string;
    editLesson: string;
    editLessonDescription: string;
    endTime: string;
    format: string;
    lessonDeleteConfirm: string;
    lessonDeleteMessage: string;
    lessonDeleteTitle: string;
    lessonDeletedMessage: string;
    lessonDeletedTitle: string;
    lessonDetailEyebrow: string;
    lessonEditPreviewMessage: string;
    lessonEditPreviewTitle: string;
    lessonsDescription: string;
    lessonsTitle: string;
    linkedAssignments: string;
    linkedMaterials: string;
    linkedTests: string;
    materialTypes: Record<TeacherMaterialType, string>;
    materialsDescription: string;
    materialsTitle: string;
    materialType: string;
    minutes: string;
    nextLesson: string;
    noAssignments: string;
    noLessons: string;
    noMaterials: string;
    noTests: string;
    objective: string;
    openLesson: string;
    overviewDescription: string;
    overviewTitle: string;
    planned: string;
    questions: string;
    recentLesson: string;
    room: string;
    scheduled: string;
    scheduledTests: string;
    startTime: string;
    status: string;
    submissions: string;
    tabs: Record<TeacherGroupWorkspaceTab, string>;
    testKinds: Record<TeacherTestKind, string>;
    testsDescription: string;
    testsTitle: string;
    time: string;
    titleLabel: string;
    topic: string;
    totalMaterials: string;
  };
  groups: {
    active: string;
    addLearner: string;
    addLearnerMessage: string;
    addLearnerTitle: string;
    balance: string;
    contactMessage: string;
    contactTitle: string;
    debtors: string;
    departed: string;
    description: string;
    detail: string;
    detailEyebrow: string;
    empty: string;
    eyebrow: string;
    groupState: string;
    learnerName: string;
    learners: string;
    lessonDays: string;
    other: string;
    pageTitle: string;
    paused: string;
    phone: string;
    rosterTitle: string;
    searchPlaceholder: string;
    taskProgress: string;
    total: string;
    unsavedMessage: string;
    unsavedTitle: string;
  };
  metadata: Record<TeacherNavigationKey, { description: string; title: string }>;
  navigation: Record<TeacherNavigationKey, string> & {
    logout: string;
    panelLabel: string;
  };
  profile: {
    accessSecurity: string;
    accountSettings: string;
    activeSessions: string;
    activeSessionsDescription: string;
    branch: string;
    changePassword: string;
    changePasswordDescription: string;
    changePhoto: string;
    changePhotoDescription: string;
    computerLogin: string;
    computerLoginDescription: string;
    currentPassword: string;
    dangerZone: string;
    deleteAccount: string;
    deleteAccountCancel: string;
    deleteAccountConfirm: string;
    deleteAccountDescription: string;
    deleteAccountMessage: string;
    deleteAccountTitle: string;
    deleteVerificationMessage: string;
    deleteVerificationTitle: string;
    description: string;
    displayName: string;
    eyebrow: string;
    language: string;
    languageDescription: string;
    logout: string;
    logoutCancel: string;
    logoutConfirm: string;
    logoutDescription: string;
    logoutVerificationMessage: string;
    logoutVerificationTitle: string;
    newPassword: string;
    nightMode: string;
    nightModeDescription: string;
    pageTitle: string;
    passwordMessage: string;
    passwordTitle: string;
    phone: string;
    photoMessage: string;
    photoTitle: string;
    profileInformation: string;
    profileInformationDescription: string;
    preferences: string;
    qrMessage: string;
    qrTitle: string;
    sessionDevice: string;
    sessionLocation: string;
    sessionPreview: string;
    subject: string;
    unsavedMessage: string;
    unsavedTitle: string;
  };
  reception: {
    description: string;
    empty: string;
    eyebrow: string;
    learnerCount: string;
    pageTitle: string;
    refreshMessage: string;
    refreshTitle: string;
    room: string;
    time: string;
  };
  tasks: {
    attendanceDescription: string;
    attendanceTitle: string;
    completedMessage: string;
    completedTitle: string;
    description: string;
    empty: string;
    eyebrow: string;
    filterLabel: string;
    pageTitle: string;
    pauseDescription: string;
    pauseTitle: string;
  };
  transferRequests: {
    approved: string;
    declined: string;
    description: string;
    eyebrow: string;
    emptyDescription: string;
    emptyTitle: string;
    pageTitle: string;
    pending: string;
  };
};
