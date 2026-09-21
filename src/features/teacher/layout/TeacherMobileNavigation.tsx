"use client";

import { usePathname } from "next/navigation";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { teacherNavigationItems } from "@/config/TeacherNavigation";
import { TeacherNavigationIcon } from "@/features/teacher/layout/TeacherNavigationIcon";
import type { TeacherCopy } from "@/types/teacher/Teacher";

type TeacherMobileNavigationProps = {
  copy: TeacherCopy;
  locale: Locale;
};

export function TeacherMobileNavigation({ copy, locale }: TeacherMobileNavigationProps) {
  /* HOOKS */
  const pathname = usePathname();

  return (
    <nav aria-label={copy.navigation.panelLabel} className="teacherShell__bottomNavigation">
      {teacherNavigationItems
        .filter((item) => item.mobilePrimary)
        .map((item) => {
          const localizedHref = `/${locale}${item.href}`;
          const isActive =
            item.href === "/teacher"
              ? pathname === localizedHref
              : pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);

          return (
            <ScrollToTopLink
              aria-current={isActive ? "page" : undefined}
              className="teacherShell__bottomNavigationLink"
              data-active={isActive}
              href={localizedHref}
              key={item.key}
            >
              <TeacherNavigationIcon navigationKey={item.key} />
              <span>{copy.navigation[item.key]}</span>
            </ScrollToTopLink>
          );
        })}
    </nav>
  );
}
