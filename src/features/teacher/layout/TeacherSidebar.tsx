"use client";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { teacherNavigationItems } from "@/config/TeacherNavigation";
import { TeacherNavigationIcon } from "@/features/teacher/layout/TeacherNavigationIcon";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import type { TeacherCopy } from "@/types/teacher/Teacher";

type TeacherSidebarProps = {
  copy: TeacherCopy;
  locale: Locale;
  onNavigate?: () => void;
};

export function TeacherSidebar({ copy, locale, onNavigate }: TeacherSidebarProps) {
  /* HOOKS */
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const confirm = useConfirmDialog();

  const isActive = (href: string) => {
    const localizedHref = `/${locale}${href}`;
    return href === "/teacher"
      ? pathname === localizedHref
      : pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);
  };

  /* HANDLERS */
  const handleLogout = async () => {
    const accepted = await confirm({
      cancelLabel: copy.profile.logoutCancel,
      confirmLabel: copy.profile.logoutConfirm,
      message: copy.profile.logoutVerificationMessage,
      title: copy.profile.logoutVerificationTitle,
      tone: "danger",
    });
    if (!accepted) return;

    onNavigate?.();
    const redirectTo = `/${locale}/login?role=teacher`;
    if (session.status === "authenticated") {
      await signOut({ redirectTo });
      return;
    }
    router.push(redirectTo);
  };

  return (
    <div className="teacherShell__sidebarContent">
      <div className="teacherShell__brandRow">
        <span className="teacherShell__brandMark">
          <Image alt="" aria-hidden="true" height={40} src="/icons/logo.svg" width={40} />
        </span>
        <strong className="teacherShell__brandName">BEST LC</strong>
      </div>
      <div aria-hidden="true" className="teacherShell__brandDivider" />

      <nav aria-label={copy.navigation.panelLabel} className="teacherShell__navigation">
        {teacherNavigationItems
          .filter((item) => item.sidebarVisible)
          .map((item) => {
            const itemIsActive = isActive(item.href);
            return (
              <span
                className="teacherShell__navigationItem"
                data-active={itemIsActive}
                key={item.key}
              >
                <ScrollToTopLink
                  aria-current={itemIsActive ? "page" : undefined}
                  className="teacherShell__navigationLink"
                  data-active={itemIsActive}
                  href={`/${locale}${item.href}`}
                  onClick={onNavigate}
                >
                  <TeacherNavigationIcon navigationKey={item.key} />
                  <span>{copy.navigation[item.key]}</span>
                </ScrollToTopLink>
              </span>
            );
          })}
      </nav>
      <button className="teacherShell__logout" onClick={handleLogout} type="button">
        <LogoutRoundedIcon aria-hidden="true" />
        <span>{copy.navigation.logout}</span>
      </button>
    </div>
  );
}
