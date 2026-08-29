import type { ReactNode } from "react";

import styles from "@/css/teacher/groups.module.css";

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
  const { copy, group, locale, slug } = await getGroupWorkspaceContext(params);

  return (
    <main className={styles.teacherGroups__workspace}>
      <GroupHeader copy={copy} group={group} locale={locale} />
      <GroupWorkspaceNavigation copy={copy} locale={locale} slug={slug} />
      <div className={styles.teacherGroups__workspaceContent}>{children}</div>
    </main>
  );
}
