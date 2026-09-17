"use client";

import Drawer from "@mui/material/Drawer";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

import type { Locale } from "@/config/Locales";
import { teacherNavigationItems } from "@/config/TeacherNavigation";
import styles from "@/css/teacher/shell.module.css";
import { TeacherMobileNavigation } from "@/features/teacher/layout/TeacherMobileNavigation";
import { TeacherSidebar } from "@/features/teacher/layout/TeacherSidebar";
import { TeacherThemeProvider } from "@/features/teacher/layout/TeacherThemeProvider";
import { TeacherTopbar } from "@/features/teacher/layout/TeacherTopbar";
import type { TeacherCopy } from "@/types/teacher/Teacher";
import type {
  TeacherNoticeState,
  TeacherTopbarProfile,
} from "@/types/teacher/TeacherNotifications";

type TeacherWorkspaceShellProps = {
  children: ReactNode;
  connected: boolean;
  copy: TeacherCopy;
  initialNotificationError: boolean;
  locale: Locale;
  notices: TeacherNoticeState;
  profile: TeacherTopbarProfile;
};

const topAlignedPaths = [
  "/teacher",
  "/teacher/groups",
  "/teacher/reception",
  "/teacher/tasks",
  "/teacher/finance",
  "/teacher/transfer-requests",
  "/teacher/profile",
];

export function TeacherWorkspaceShell({
  children,
  connected,
  copy,
  initialNotificationError,
  locale,
  notices,
  profile,
}: TeacherWorkspaceShellProps) {
  /* HOOKS */
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/+$/, "");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDashboard = normalizedPathname === `/${locale}/teacher`;
  const hasTopAlignedHeader =
    topAlignedPaths.some((path) => normalizedPathname === `/${locale}${path}`) ||
    normalizedPathname.startsWith(`/${locale}/teacher/groups/`);
  const pageTitle = useMemo(() => {
    const match = [...teacherNavigationItems]
      .sort((first, second) => second.href.length - first.href.length)
      .find((item) => {
        const href = `/${locale}${item.href}`;
        return normalizedPathname === href || normalizedPathname.startsWith(`${href}/`);
      });
    return copy.navigation[match?.key ?? "dashboard"];
  }, [copy.navigation, locale, normalizedPathname]);

  /* HANDLERS */
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <TeacherThemeProvider>
      <div className={styles.teacherShell}>
        <aside className={styles.teacherShell__desktopSidebar}>
          <TeacherSidebar copy={copy} locale={locale} />
        </aside>

        <Drawer
          ModalProps={{ keepMounted: true }}
          onClose={handleDrawerClose}
          open={isDrawerOpen}
          slotProps={{ paper: { className: styles.teacherShell__drawerPaper } }}
        >
          <TeacherSidebar copy={copy} locale={locale} onNavigate={handleDrawerClose} />
        </Drawer>

        <div
          className={styles.teacherShell__workspace}
          data-dashboard={isDashboard}
          data-top-aligned={hasTopAlignedHeader}
        >
          <TeacherTopbar
            connected={connected}
            copy={copy}
            initialNotificationError={initialNotificationError}
            locale={locale}
            notices={notices}
            onMenuOpen={handleDrawerOpen}
            pageTitle={pageTitle}
            profile={profile}
          />
          <div className={styles.teacherShell__content}>{children}</div>
        </div>

        <TeacherMobileNavigation copy={copy} locale={locale} />
      </div>
    </TeacherThemeProvider>
  );
}
