"use client";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/config/Locales";
import type { TeacherCopy, TeacherGroupWorkspaceTab } from "@/types/teacher/Teacher";

type GroupWorkspaceNavigationProps = {
  copy: TeacherCopy;
  locale: Locale;
  slug: string;
};

const tabItems: Array<{
  key: TeacherGroupWorkspaceTab;
  segment: string;
}> = [
  { key: "overview", segment: "" },
  { key: "students", segment: "students" },
  { key: "materials", segment: "materials" },
  { key: "assignments", segment: "assignments" },
];

export function GroupWorkspaceNavigation({ copy, locale, slug }: GroupWorkspaceNavigationProps) {
  /* HOOKS */
  const pathname = usePathname();
  const baseHref = `/${locale}/teacher/groups/${slug}`;
  const activeTab =
    tabItems.find(({ segment }) => {
      const href = segment ? `${baseHref}/${segment}` : baseHref;

      return segment ? pathname.startsWith(`${href}/`) || pathname === href : pathname === href;
    })?.key ?? false;

  return (
    <div className="teacherGroups__workspaceNavSection">
      <Tabs
        aria-label={copy.groups.detailEyebrow}
        className={`teacherGroups__categoryTabs teacherGroups__workspaceNav`}
        component="nav"
        scrollButtons={false}
        value={activeTab}
        variant="scrollable"
      >
        {tabItems.map(({ key, segment }) => (
          <Tab
            aria-controls="teacher-group-workspace-panel"
            className="teacherGroups__categoryTab"
            component={Link}
            href={segment ? `${baseHref}/${segment}` : baseHref}
            id={`teacher-group-workspace-tab-${key}`}
            key={key}
            label={copy.groupWorkspace.tabs[key]}
            scroll={false}
            value={key}
          />
        ))}
      </Tabs>
    </div>
  );
}
