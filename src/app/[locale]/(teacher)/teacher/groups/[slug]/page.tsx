import type { Metadata } from "next";

import {
  getTeacherGroupAssignments,
  getTeacherGroupLessons,
  getTeacherGroupMaterials,
  getTeacherGroupTests,
} from "@/data/teacher/TeacherPreviewData";

import { GroupOverview } from "./GroupOverview";
import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "./GroupWorkspaceRoute";

type GroupOverviewPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupOverviewPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "overview");
}

export default async function GroupOverviewPage({ params }: GroupOverviewPageProps) {
  const { copy, group, locale, slug } = await getGroupWorkspaceContext(params);

  return (
    <GroupOverview
      assignments={getTeacherGroupAssignments(slug)}
      copy={copy}
      group={group}
      lessons={getTeacherGroupLessons(slug)}
      locale={locale}
      materials={getTeacherGroupMaterials(slug)}
      tests={getTeacherGroupTests(slug)}
    />
  );
}
