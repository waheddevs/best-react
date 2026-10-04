"use client";

import Drawer from "@mui/material/Drawer";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

import type { Locale } from "@/config/Locales";
import { teacherNavigationItems } from "@/config/TeacherNavigation";
import { getWorkspaceNotificationsCopy } from "@/dictionaries/WorkspaceNotifications";
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
  "/teacher/library",
  "/teacher/reception",
  "/teacher/finance",
  "/teacher/results",
  "/teacher/profile",
  "/teacher/notifications",
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
  const isPracticeDetail = normalizedPathname.startsWith(`/${locale}/teacher/practices/`);
  const hasTopAlignedHeader =
    topAlignedPaths.some((path) => normalizedPathname === `/${locale}${path}`) ||
    normalizedPathname.startsWith(`/${locale}/teacher/groups/`) ||
    isPracticeDetail;
  const pageTitle = useMemo(() => {
    if (normalizedPathname === `/${locale}/teacher/notifications`) {
      return getWorkspaceNotificationsCopy(locale).title;
    }
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
      <div className="teacherShell">
        <aside className="teacherShell__desktopSidebar">
          <TeacherSidebar copy={copy} locale={locale} />
        </aside>

        <Drawer
          ModalProps={{ keepMounted: true }}
          onClose={handleDrawerClose}
          open={isDrawerOpen}
          slotProps={{ paper: { className: "teacherShell__drawerPaper" } }}
        >
          <TeacherSidebar copy={copy} locale={locale} onNavigate={handleDrawerClose} />
        </Drawer>

        <div
          className="teacherShell__workspace"
          data-dashboard={isDashboard}
          data-practice-detail={isPracticeDetail}
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
          <div className="teacherShell__content">{children}</div>
        </div>

        <TeacherMobileNavigation copy={copy} locale={locale} />
      </div>
    </TeacherThemeProvider>
  );
}
