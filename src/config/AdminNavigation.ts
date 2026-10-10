import type { AdminNavigationGroupKey, AdminNavigationKey } from "@/types/admin/AdminWorkspace";

export const adminNavigationItems: ReadonlyArray<{
  href: string;
  key: AdminNavigationKey;
}> = [
  { href: "/admin", key: "dashboard" },
  { href: "/admin/requests", key: "requests" },
  { href: "/admin/students", key: "students" },
  { href: "/admin/teachers", key: "teachers" },
  { href: "/admin/groups", key: "groups" },
  { href: "/admin/courses", key: "courses" },
  { href: "/admin/events", key: "events" },
  { href: "/admin/locations", key: "locations" },
  { href: "/admin/schedule", key: "schedule" },
  { href: "/admin/attendance", key: "attendance" },
  { href: "/admin/payments", key: "payments" },
  { href: "/admin/tests", key: "tests" },
  { href: "/admin/results", key: "results" },
  { href: "/admin/library", key: "library" },
  { href: "/admin/imports", key: "imports" },
  { href: "/admin/notifications", key: "notifications" },
  { href: "/admin/audit", key: "audit" },
  { href: "/admin/reports", key: "reports" },
  { href: "/admin/settings", key: "settings" },
];

export const adminDockNavigationKeys: ReadonlyArray<AdminNavigationKey> = [
  "dashboard",
  "students",
  "groups",
  "payments",
  "settings",
];

export const adminNavigationGroups: ReadonlyArray<{
  key: AdminNavigationGroupKey;
  items: ReadonlyArray<AdminNavigationKey>;
}> = [
  { key: "overview", items: ["dashboard", "requests"] },
  { key: "people", items: ["students", "teachers", "groups"] },
  { key: "academics", items: ["courses", "schedule", "attendance", "tests", "results"] },
  { key: "operations", items: ["events", "locations", "payments"] },
  { key: "content", items: ["library", "imports"] },
  { key: "insights", items: ["reports", "audit"] },
  { key: "system", items: ["notifications", "settings"] },
];
