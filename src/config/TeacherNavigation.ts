import type { TeacherNavigationKey } from "@/types/teacher/Teacher";

export type TeacherNavigationItem = {
  href: string;
  key: TeacherNavigationKey;
  mobilePrimary: boolean;
  sidebarVisible: boolean;
};

export const teacherNavigationItems: TeacherNavigationItem[] = [
  { href: "/teacher", key: "dashboard", mobilePrimary: true, sidebarVisible: true },
  { href: "/teacher/groups", key: "groups", mobilePrimary: true, sidebarVisible: true },
  { href: "/teacher/library", key: "library", mobilePrimary: false, sidebarVisible: true },
  { href: "/teacher/ai-assistant", key: "aiAssistant", mobilePrimary: false, sidebarVisible: true },
  { href: "/teacher/reception", key: "reception", mobilePrimary: false, sidebarVisible: true },
  {
    href: "/teacher/notifications",
    key: "notifications",
    mobilePrimary: false,
    sidebarVisible: true,
  },
  { href: "/teacher/finance", key: "finance", mobilePrimary: true, sidebarVisible: true },
  { href: "/teacher/results", key: "results", mobilePrimary: false, sidebarVisible: true },
  { href: "/teacher/profile", key: "profile", mobilePrimary: true, sidebarVisible: true },
];
