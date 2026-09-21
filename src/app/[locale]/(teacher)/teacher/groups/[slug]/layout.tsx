import type { ReactNode } from "react";

import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";

import { GroupHeader } from "./GroupHeader";
import { GroupWorkspaceNavigation } from "./GroupWorkspaceNavigation";
import {
  generateGroupStaticParams,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "./GroupWorkspaceRoute";

type GroupWorkspaceLayoutProps = {
  children: ReactNode;
  params: GroupWorkspaceParams;
};

export const generateStaticParams = generateGroupStaticParams;

export default async function GroupWorkspaceLayout({
  children,
  params,
}: GroupWorkspaceLayoutProps) {
  const { connected, copy, group, locale, slug } = await getGroupWorkspaceContext(params);

  return (
    <main className="teacherGroups__workspace">
      <TeacherPageHeader
        eyebrow={copy.groups.detailPageEyebrow}
        title={copy.groups.detailPageTitle}
      />
      <GroupHeader connected={connected} copy={copy} group={group} locale={locale} />
      <GroupWorkspaceNavigation copy={copy} locale={locale} slug={slug} />
      <div
        className="teacherGroups__workspaceContent"
        id="teacher-group-workspace-panel"
        role="tabpanel"
      >
        {children}
      </div>
    </main>
  );
}
