import Link from "next/link";

import styles from "@/css/admin/shell.module.css";
import type { WorkspaceNavigationItem } from "@/hooks/navigation/useWorkspaceShellNavigation";
import type { AdminNavigationKey, AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

import { AdminNavigationIcon } from "./AdminNavigationIcon";

type AdminWorkspaceNavigationProps = {
  copy: AdminWorkspaceCopy["navigation"];
  items: Array<WorkspaceNavigationItem<AdminNavigationKey>>;
  mode?: "dock" | "rail";
  onNavigate?: () => void;
};

export function AdminWorkspaceNavigation({
  copy,
  items,
  mode = "rail",
  onNavigate,
}: AdminWorkspaceNavigationProps) {
  return items.map((item) => (
    <Link
      aria-current={item.active ? "page" : undefined}
      className={
        mode === "dock"
          ? item.active
            ? styles.adminShell__dockLinkActive
            : styles.adminShell__dockLink
          : item.active
            ? styles.adminShell__navLinkActive
            : styles.adminShell__navLink
      }
      href={item.localizedHref}
      key={item.key}
      onClick={onNavigate}
    >
      <AdminNavigationIcon navigationKey={item.key} />
      <span>{copy[item.key]}</span>
    </Link>
  ));
}
