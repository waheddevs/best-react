import Link from "next/link";

import styles from "@/css/student/shell.module.css";
import type { WorkspaceNavigationItem } from "@/hooks/navigation/useWorkspaceShellNavigation";
import type { StudentNavigationKey, StudentWorkspaceCopy } from "@/types/student/StudentWorkspace";

import { StudentNavigationIcon } from "./StudentNavigationIcon";

type StudentWorkspaceNavigationProps = {
  copy: StudentWorkspaceCopy["navigation"];
  items: Array<WorkspaceNavigationItem<StudentNavigationKey>>;
  mode?: "dock" | "rail";
  onNavigate?: () => void;
};

export function StudentWorkspaceNavigation({
  copy,
  items,
  mode = "rail",
  onNavigate,
}: StudentWorkspaceNavigationProps) {
  return items.map((item) => (
    <Link
      aria-current={item.active ? "page" : undefined}
      className={
        mode === "dock"
          ? item.active
            ? styles.studentShell__dockLinkActive
            : styles.studentShell__dockLink
          : item.active
            ? styles.studentShell__navLinkActive
            : styles.studentShell__navLink
      }
      href={item.localizedHref}
      key={item.key}
      onClick={onNavigate}
    >
      {mode === "rail" ? (
        <span className={styles.studentShell__navIcon}>
          <StudentNavigationIcon navigationKey={item.key} />
        </span>
      ) : (
        <StudentNavigationIcon navigationKey={item.key} />
      )}
      <span>{copy[item.key]}</span>
    </Link>
  ));
}
