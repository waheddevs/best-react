"use client";

import Drawer from "@mui/material/Drawer";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

import type { Locale } from "@/config/Locales";
import { teacherNavigationItems } from "@/config/TeacherNavigation";
import styles from "@/css/teacher/shell.module.css";
import { TeacherMobileNavigation } from "@/features/teacher/layout/TeacherMobileNavigation";
import { TeacherSidebar } from "@/features/teacher/layout/TeacherSidebar";
import { TeacherThemeProvider } from "@/features/teacher/layout/TeacherThemeProvider";
import { TeacherTopbar } from "@/features/teacher/layout/TeacherTopbar";
import type {
  TeacherCopy,
  TeacherNotificationPreview,
  TeacherProfileData,
} from "@/types/teacher/Teacher";

type TeacherWorkspaceShellProps = {
  children: ReactNode;
  copy: TeacherCopy;
  locale: Locale;
  notifications: TeacherNotificationPreview[];
  profile: TeacherProfileData;
};

export function TeacherWorkspaceShell({
  children,
  copy,
  locale,
  notifications,
  profile,
}: TeacherWorkspaceShellProps) {
  /* HOOKS */
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pageTitle = useMemo(() => {
    const match = [...teacherNavigationItems]
      .sort((first, second) => second.href.length - first.href.length)
      .find((item) => {
        const href = `/${locale}${item.href}`;
        return pathname === href || pathname.startsWith(`${href}/`);
      });
    return copy.navigation[match?.key ?? "dashboard"];
  }, [copy.navigation, locale, pathname]);

  /* HANDLERS */
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = async () => {
    const redirectTo = `/${locale}/login?role=teacher`;
    if (session.status === "authenticated") {
      await signOut({ redirectTo });
      return;
    }
    router.push(redirectTo);
  };

  return (
    <TeacherThemeProvider>
      <div className={styles.teacherShell}>
        <aside className={styles.teacherShell__desktopSidebar}>
          <TeacherSidebar copy={copy} locale={locale} onLogout={handleLogout} profile={profile} />
        </aside>

        <Drawer
          ModalProps={{ keepMounted: true }}
          onClose={handleDrawerClose}
          open={isDrawerOpen}
          slotProps={{ paper: { className: styles.teacherShell__drawerPaper } }}
        >
          <TeacherSidebar
            copy={copy}
            locale={locale}
            onLogout={handleLogout}
            onNavigate={handleDrawerClose}
            profile={profile}
          />
        </Drawer>

        <div className={styles.teacherShell__workspace}>
          <TeacherTopbar
            copy={copy}
            locale={locale}
            notifications={notifications}
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
