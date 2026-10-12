import Link from "next/link";

import { adminNavigationGroups } from "@/config/AdminNavigation";
import type { WorkspaceNavigationItem } from "@/hooks/navigation/useWorkspaceShellNavigation";
import type { AdminNavigationKey, AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

import { AdminNavigationIcon } from "./AdminNavigationIcon";

type AdminWorkspaceNavigationProps = {
  copy: AdminWorkspaceCopy["navigation"];
  groupCopy?: AdminWorkspaceCopy["navigationGroups"];
  items: Array<WorkspaceNavigationItem<AdminNavigationKey>>;
  mode?: "dock" | "rail";
  onNavigate?: () => void;
};

export function AdminWorkspaceNavigation({
  copy,
  groupCopy,
  items,
  mode = "rail",
  onNavigate,
}: AdminWorkspaceNavigationProps) {
  const renderItem = (item: WorkspaceNavigationItem<AdminNavigationKey>) => (
    <Link
      aria-current={item.active ? "page" : undefined}
      className={
        mode === "dock"
          ? item.active
            ? "adminShell__dockLinkActive"
            : "adminShell__dockLink"
          : item.active
            ? "adminShell__navLinkActive"
            : "adminShell__navLink"
      }
      href={item.localizedHref}
      key={item.key}
      onClick={onNavigate}
      title={copy[item.key]}
    >
      <AdminNavigationIcon navigationKey={item.key} />
      <span>{copy[item.key]}</span>
    </Link>
  );

  if (mode === "dock" || !groupCopy) return items.map(renderItem);

  return adminNavigationGroups.map((group) => {
    const groupItems = group.items
      .map((key) => items.find((item) => item.key === key))
      .filter((item): item is WorkspaceNavigationItem<AdminNavigationKey> => item !== undefined);
    if (groupItems.length === 0) return null;
    return (
      <div className="adminShell__navGroup" key={group.key}>
        <span className="adminShell__navGroupLabel">
          <span>{groupCopy[group.key]}</span>
        </span>
        {groupItems.map(renderItem)}
      </div>
    );
  });
}
