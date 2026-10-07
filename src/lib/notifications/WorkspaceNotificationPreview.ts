import type { WorkspaceNotice } from "@/types/WorkspaceNotification";

export function recentWorkspaceNotices(
  notices: WorkspaceNotice[],
  limit: number,
): WorkspaceNotice[] {
  return [...notices]
    .sort(
      (left, right) =>
        right.createdAt.localeCompare(left.createdAt) || right.id.localeCompare(left.id),
    )
    .slice(0, limit);
}
