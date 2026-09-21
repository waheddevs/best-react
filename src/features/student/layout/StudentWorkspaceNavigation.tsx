import Link from "next/link";

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
            ? "studentShell__dockLinkActive"
            : "studentShell__dockLink"
          : item.active
            ? "studentShell__navLinkActive"
            : "studentShell__navLink"
      }
      href={item.localizedHref}
      key={item.key}
      onClick={onNavigate}
    >
      {mode === "rail" ? (
        <span className="studentShell__navIcon">
          <StudentNavigationIcon navigationKey={item.key} />
        </span>
      ) : (
        <StudentNavigationIcon navigationKey={item.key} />
      )}
      <span>{copy[item.key]}</span>
    </Link>
  ));
}
