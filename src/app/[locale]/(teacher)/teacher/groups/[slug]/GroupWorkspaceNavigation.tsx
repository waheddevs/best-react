"use client";

import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import { usePathname } from "next/navigation";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/groups.module.css";
import type { TeacherCopy, TeacherGroupWorkspaceTab } from "@/types/teacher/Teacher";

type GroupWorkspaceNavigationProps = {
  copy: TeacherCopy;
  locale: Locale;
  slug: string;
};

const tabItems: Array<{
  icon: typeof DashboardRounded;
  key: TeacherGroupWorkspaceTab;
  segment: string;
}> = [
  { icon: DashboardRounded, key: "overview", segment: "" },
  { icon: GroupsRounded, key: "students", segment: "students" },
  { icon: CalendarMonthRounded, key: "lessons", segment: "lessons" },
  { icon: DescriptionRounded, key: "materials", segment: "materials" },
  { icon: AssignmentRounded, key: "assignments", segment: "assignments" },
  { icon: QuizRounded, key: "tests", segment: "tests" },
];

export function GroupWorkspaceNavigation({ copy, locale, slug }: GroupWorkspaceNavigationProps) {
  /* HOOKS */
  const pathname = usePathname();
  const baseHref = `/${locale}/teacher/groups/${slug}`;

  return (
    <nav aria-label={copy.groups.detailEyebrow} className={styles.teacherGroups__workspaceNav}>
      {tabItems.map(({ icon: Icon, key, segment }) => {
        const href = segment ? `${baseHref}/${segment}` : baseHref;
        const isActive = segment
          ? pathname.startsWith(`${href}/`) || pathname === href
          : pathname === href;

        return (
          <ScrollToTopLink
            aria-current={isActive ? "page" : undefined}
            className={styles.teacherGroups__workspaceNavLink}
            data-active={isActive}
            href={href}
            key={key}
          >
            <Icon aria-hidden="true" />
            <span>{copy.groupWorkspace.tabs[key]}</span>
          </ScrollToTopLink>
        );
      })}
    </nav>
  );
}
