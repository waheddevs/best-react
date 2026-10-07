import type { Locale } from "@/config/Locales";
import type { WorkspaceNotice, WorkspaceRole } from "@/types/WorkspaceNotification";

export function workspaceNotificationTarget(
  locale: Locale,
  role: WorkspaceRole,
  notice: WorkspaceNotice,
): string | null {
  if (role === "STUDENT") {
    if (notice.kind === "STUDENT_RESULT_READY" && notice.attemptId) {
      return `/${locale}/student/results/${encodeURIComponent(notice.attemptId)}`;
    }
    return null;
  }
  if (role === "TEACHER" && notice.kind === "DEBT_FOLLOW_UP" && notice.groupId) {
    return `/${locale}/teacher/groups/${encodeURIComponent(notice.groupId)}/students`;
  }
  if (role === "TEACHER" && notice.kind === "REVIEW_REQUIRED" && notice.attemptId) {
    return `/${locale}/teacher/results/${encodeURIComponent(notice.attemptId)}`;
  }
  return `/${locale}/${role.toLowerCase()}/notifications`;
}
