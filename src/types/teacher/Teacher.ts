import type { Locale } from "@/config/Locales";

export type LocalizedText = Record<Locale, string>;

export type TeacherThemeMode = "light" | "dark";

export type TeacherNavigationKey =
  | "dashboard"
  | "groups"
  | "generalGroup"
  | "tasks"
  | "finance"
  | "reception"
  | "transferRequests"
  | "profile";

export type TeacherProfileData = {
  branch: LocalizedText;
  displayName: string;
  handle: string;
  initials: string;
  phone: string;
  role: "teacher";
  subject: LocalizedText;
};

export type TeacherQuickStatus = {
  id: string;
  label: LocalizedText;
  progress: number;
};

export type TeacherDashboardMetric = {
  id: string;
  label: LocalizedText;
  tone: "blue" | "navy" | "turquoise" | "yellow";
  value: LocalizedText;
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

export type TeacherMessageRole = "teacher" | "learner";

export type TeacherMessage = {
  dateLabel: LocalizedText;
  id: string;
  initials: string;
  isOwn: boolean;
  role: TeacherMessageRole;
  sender: string;
  text: LocalizedText;
  time: string;
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
  groupName: string;
  learnerCount: number;
  room: string;
  status: "active" | "planned";
  time: string;
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
  learners: TeacherLearner[];
  messages: TeacherMessage[];
  notifications: TeacherNotificationPreview[];
  profile: TeacherProfileData;
  quickStatuses: TeacherQuickStatus[];
  resources: TeacherResource[];
  schedule: TeacherScheduleEntry[];
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
    done: string;
    empty: string;
    menu: string;
    notifications: string;
    pending: string;
    previewLabel: string;
    refresh: string;
    reset: string;
    savePreview: string;
    search: string;
    teacherRole: string;
  };
  dashboard: {
    description: string;
    groupsTitle: string;
    libraryTitle: string;
    pageTitle: string;
    quickStatusMessage: string;
    quickStatusTitle: string;
    resourceUnavailableMessage: string;
    resourceUnavailableTitle: string;
    viewAll: string;
  };
  finance: {
    attendanceRate: string;
    description: string;
    expectedAmount: string;
    income: string;
    labels: Record<TeacherFinanceMetric["id"], string>;
    pageTitle: string;
  };
  generalGroup: {
    attachmentLabel: string;
    attachmentMessage: string;
    attachmentTitle: string;
    description: string;
    memberCount: string;
    membersTitle: string;
    messagePlaceholder: string;
    noResults: string;
    pageTitle: string;
    searchPlaceholder: string;
    sendLabel: string;
    sessionMessage: string;
    sessionTitle: string;
    viewMembers: string;
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
    empty: string;
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
    deleteAccount: string;
    deleteAccountCancel: string;
    deleteAccountConfirm: string;
    deleteAccountDescription: string;
    deleteAccountMessage: string;
    deleteAccountTitle: string;
    description: string;
    displayName: string;
    language: string;
    languageDescription: string;
    logout: string;
    logoutDescription: string;
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
    filterLabel: string;
    pageTitle: string;
    pauseDescription: string;
    pauseTitle: string;
  };
  transferRequests: {
    approved: string;
    declined: string;
    description: string;
    emptyDescription: string;
    emptyTitle: string;
    pageTitle: string;
    pending: string;
  };
};
