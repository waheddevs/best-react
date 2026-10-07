import type { WorkspaceRole } from "@/types/WorkspaceNotification";

type NoticeSource = "bell" | "list";
type NoticeChange = { role: WorkspaceRole; source: NoticeSource };

const eventName = "best:workspace-notifications-changed";

export function announceWorkspaceNotificationChange(role: WorkspaceRole, source: NoticeSource) {
  window.dispatchEvent(new CustomEvent<NoticeChange>(eventName, { detail: { role, source } }));
}

export function onWorkspaceNotificationChange(
  role: WorkspaceRole,
  source: NoticeSource,
  refresh: () => void,
): () => void {
  const handleChange = (event: Event) => {
    if (!(event instanceof CustomEvent)) return;
    const change = event.detail as NoticeChange;
    if (change.role === role && change.source !== source) refresh();
  };
  window.addEventListener(eventName, handleChange);
  return () => window.removeEventListener(eventName, handleChange);
}
