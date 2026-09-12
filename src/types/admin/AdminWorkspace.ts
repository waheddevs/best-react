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
  | "transferRequests"
  | "notifications"
  | "audit"
  | "reports"
  | "settings";

export type AdminWorkspaceRecord = {
  detail: string;
  href?: string;
  id: string;
  meta: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
  title: string;
};

export type AdminSectionCopy = {
  description: string;
  eyebrow: string;
  metrics: Array<{ label: string; value: string }>;
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
    menuClose: string;
    menuOpen: string;
    openQueueLabel: string;
    unavailableNotice: string;
    searchLabel: string;
    searchPlaceholder: string;
    retryLabel: string;
    stackLabel: string;
    statusLabel: string;
    workspaceLabel: string;
  };
  navigation: Record<AdminNavigationKey, string>;
  sections: Record<AdminNavigationKey, AdminSectionCopy>;
};
