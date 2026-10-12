import type { AdminStudentDirectoryValues, AdminStudentStatus } from "./AdminStudents";
import type { AdminTeacherStatus } from "./AdminTeachers";

export type AdminNavigationKey =
  | "dashboard"
  | "requests"
  | "messages"
  | "students"
  | "teachers"
  | "groups"
  | "courses"
  | "exams"
  | "events"
  | "schedule"
  | "payments"
  | "salary"
  | "notifications"
  | "settings";

export type AdminNavigationGroupKey = "overview" | "people" | "academics" | "operations";

export type AdminThemeMode = "light" | "dark";

export type AdminWorkspaceRecord = {
  avatarUrl?: string | null;
  detail: string;
  fields?: AdminWorkspaceRecordField[];
  group?: AdminGroupRecordDetails;
  href?: string;
  id: string;
  meta: string;
  searchText?: string;
  studentDirectory?: AdminStudentDirectoryValues;
  studentStatus?: AdminStudentStatus;
  teacherStatus?: AdminTeacherStatus;
  status: "success" | "warning" | "danger" | "info" | "neutral";
  title: string;
};

export type AdminWorkspaceRecordField = {
  key: string;
  label: string;
  tone?: "success" | "warning" | "danger" | "neutral";
  value: string;
};

export type AdminGroupRecordDetails = {
  activeStudentCount: number;
  branchName: string | null;
  capacity: number;
  category: "CEFR" | "GENERAL_ENGLISH" | "IELTS" | null;
  endsAtMinutes: number | null;
  monthlyTuitionUzs: string | null;
  room: string | null;
  scheduleDays: number[];
  slug: string;
  startsAtMinutes: number | null;
  teacherName: string;
  timeZone: string;
};

export type AdminWorkspaceMetric = {
  href?: string;
  label: string;
  tone?: "emerald" | "cyan" | "navy" | "amber";
  value: string;
};

export type AdminSectionCopy = {
  description: string;
  eyebrow: string;
  metrics: AdminWorkspaceMetric[];
  records: AdminWorkspaceRecord[];
  title: string;
};

export type AdminWorkspaceCopy = {
  common: {
    all: string;
    contextLabel: string;
    connectedNotice: string;
    detailLabel: string;
    emptyLabel: string;
    errorLabel: string;
    idRecordLabel: string;
    languageLabel: string;
    lightModeLabel: string;
    logoutCancelLabel: string;
    logoutConfirmLabel: string;
    logoutLabel: string;
    logoutMessage: string;
    logoutTitle: string;
    menuClose: string;
    menuOpen: string;
    nextLabel: string;
    openQueueLabel: string;
    pageLabel: string;
    previousLabel: string;
    recordsLabel: string;
    selectedLabel: string;
    clearSelectionLabel: string;
    searchLabel: string;
    searchPlaceholder: string;
    skipToContentLabel: string;
    retryLabel: string;
    sidebarCollapse: string;
    sidebarExpand: string;
    statusLabel: string;
    darkModeLabel: string;
    welcomeLabel: string;
    workspaceLabel: string;
  };
  navigation: Record<AdminNavigationKey, string>;
  navigationGroups: Record<AdminNavigationGroupKey, string>;
  sections: Record<AdminNavigationKey, AdminSectionCopy>;
};
