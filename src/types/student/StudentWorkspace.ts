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

export type StudentThemeMode = "light" | "dark";

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
  weeklySlot?: { day: number; startsAt: string };
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
    continueLabel: string;
    emptyLabel: string;
    languageLabel: string;
    logoutCancel: string;
    logoutConfirm: string;
    logoutLabel: string;
    logoutVerificationMessage: string;
    logoutVerificationTitle: string;
    menuClose: string;
    menuOpen: string;
    previewNotice: string;
    searchLabel: string;
    searchPlaceholder: string;
    themeDarkLabel: string;
    themeLightLabel: string;
    workspaceLabel: string;
  };
  navigation: Record<StudentNavigationKey, string>;
  sections: Record<StudentWorkspaceSectionKey, StudentSectionCopy>;
};
