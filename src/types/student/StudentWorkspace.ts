export type StudentNavigationKey =
  | "dashboard"
  | "courses"
  | "schedule"
  | "assignments"
  | "library"
  | "tests"
  | "results"
  | "progress"
  | "payments"
  | "notifications"
  | "settings";

export type StudentWorkspaceSectionKey = Exclude<StudentNavigationKey, "library">;

export type StudentMetric = {
  label: string;
  trend: string;
  value: string;
};

export type StudentWorkspaceRecord = {
  detail: string;
  href?: string;
  id: string;
  meta: string;
  progress?: number;
  status: "success" | "warning" | "info" | "neutral";
  title: string;
};

export type StudentSectionCopy = {
  description: string;
  eyebrow: string;
  metrics: StudentMetric[];
  records: StudentWorkspaceRecord[];
  title: string;
};

export type StudentWorkspaceCopy = {
  common: {
    accountLabel: string;
    all: string;
    connectedNotice: string;
    continueLabel: string;
    emptyLabel: string;
    languageLabel: string;
    menuClose: string;
    menuOpen: string;
    previewNotice: string;
    searchLabel: string;
    searchPlaceholder: string;
    studentName: string;
    workspaceLabel: string;
  };
  navigation: Record<StudentNavigationKey, string>;
  sections: Record<StudentWorkspaceSectionKey, StudentSectionCopy>;
};
