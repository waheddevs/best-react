import type { TeacherNavigationKey } from "@/types/teacher/Teacher";

export type TeacherNavigationItem = {
  href: string;
  key: TeacherNavigationKey;
  mobilePrimary: boolean;
};

export const teacherNavigationItems: TeacherNavigationItem[] = [
  { href: "/teacher", key: "dashboard", mobilePrimary: true },
  { href: "/teacher/groups", key: "groups", mobilePrimary: true },
  { href: "/teacher/tasks", key: "tasks", mobilePrimary: false },
  { href: "/teacher/finance", key: "finance", mobilePrimary: true },
  { href: "/teacher/reception", key: "reception", mobilePrimary: false },
  { href: "/teacher/transfer-requests", key: "transferRequests", mobilePrimary: false },
  { href: "/teacher/profile", key: "profile", mobilePrimary: true },
];
