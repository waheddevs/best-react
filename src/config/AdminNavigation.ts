import type { AdminNavigationGroupKey, AdminNavigationKey } from "@/types/admin/AdminWorkspace";

export const adminNavigationItems: ReadonlyArray<{
  href: string;
  key: AdminNavigationKey;
}> = [
  { href: "/admin", key: "dashboard" },
  { href: "/admin/requests", key: "requests" },
  { href: "/admin/messages", key: "messages" },
  { href: "/admin/notifications", key: "notifications" },
  { href: "/admin/students", key: "students" },
  { href: "/admin/teachers", key: "teachers" },
  { href: "/admin/groups", key: "groups" },
  { href: "/admin/courses", key: "courses" },
  { href: "/admin/exams", key: "exams" },
  { href: "/admin/events", key: "events" },
  { href: "/admin/schedule", key: "schedule" },
  { href: "/admin/payments", key: "payments" },
  { href: "/admin/salary", key: "salary" },
];

export const adminDockNavigationKeys: ReadonlyArray<AdminNavigationKey> = [
  "dashboard",
  "students",
  "groups",
  "payments",
  "notifications",
];

export const adminNavigationGroups: ReadonlyArray<{
  key: AdminNavigationGroupKey;
  items: ReadonlyArray<AdminNavigationKey>;
}> = [
  { key: "overview", items: ["dashboard", "requests", "messages", "notifications"] },
  { key: "people", items: ["students", "teachers", "groups"] },
  { key: "academics", items: ["courses", "exams", "events", "schedule"] },
  { key: "operations", items: ["payments", "salary"] },
];
