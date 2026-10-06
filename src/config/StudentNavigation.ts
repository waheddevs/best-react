import type { StudentNavigationKey } from "@/types/student/StudentWorkspace";

export const studentNavigationItems: ReadonlyArray<{
  href: string;
  key: StudentNavigationKey;
}> = [
  { href: "/student", key: "dashboard" },
  { href: "/student/schedule", key: "schedule" },
  { href: "/student/library", key: "library" },
  { href: "/student/tests", key: "tests" },
  { href: "/student/results", key: "results" },
  { href: "/student/progress", key: "progress" },
  { href: "/student/payments", key: "payments" },
  { href: "/student/notifications", key: "notifications" },
  { href: "/student/settings", key: "settings" },
];
