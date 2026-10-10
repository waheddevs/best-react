export type AdminNavigationKey =
  | "dashboard"
  | "requests"
  | "students"
  | "teachers"
  | "groups"
  | "courses"
  | "events"
  | "locations"
  | "schedule"
  | "attendance"
  | "payments"
  | "tests"
  | "results"
  | "library"
  | "imports"
  | "notifications"
  | "audit"
  | "reports"
  | "settings";

export type AdminNavigationGroupKey =
  "overview" | "people" | "academics" | "operations" | "content" | "insights" | "system";

export type AdminWorkspaceRecord = {
  avatarUrl?: string | null;
  detail: string;
  fields?: AdminWorkspaceRecordField[];
  group?: AdminGroupRecordDetails;
  href?: string;
  id: string;
  meta: string;
  searchText?: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
  title: string;
};

export type AdminWorkspaceRecordField = {
  key: string;
  label: string;
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
    logoutLabel: string;
    menuClose: string;
    menuOpen: string;
    nextLabel: string;
    openQueueLabel: string;
    pageLabel: string;
    previousLabel: string;
    recordsLabel: string;
    selectedLabel: string;
    clearSelectionLabel: string;
    unavailableNotice: string;
    searchLabel: string;
    searchPlaceholder: string;
    skipToContentLabel: string;
    retryLabel: string;
    sidebarCollapse: string;
    sidebarExpand: string;
    stackLabel: string;
    statusLabel: string;
    workspaceLabel: string;
  };
  navigation: Record<AdminNavigationKey, string>;
  navigationGroups: Record<AdminNavigationGroupKey, string>;
  sections: Record<AdminNavigationKey, AdminSectionCopy>;
};
