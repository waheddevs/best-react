export type ProvisionableUserRole = "STUDENT" | "TEACHER";

export type AdminProvisionGroupCategory = "CEFR" | "GENERAL_ENGLISH" | "IELTS";

export type AdminProvisionGroupOption = {
  activeStudentCount: number;
  category: AdminProvisionGroupCategory;
  id: string;
  name: string;
};

export type AdminProvisionUserCopy = {
  cancel: string;
  close: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  error: string;
  nameLabel: string;
  namePlaceholder: string;
  passwordHint: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  pending: string;
  studentGroup?: {
    groupLabel: string;
    groupPlaceholder: string;
    groupTypeLabel: string;
    groupTypePlaceholder: string;
    groupTypes: Record<AdminProvisionGroupCategory, string>;
  };
  submit: string;
  success: string;
  title: string;
};

export type AdminProvisionUserValues = {
  displayName: string;
  email: string;
  groupCategory: AdminProvisionGroupCategory | "";
  groupId: string;
  password: string;
};
