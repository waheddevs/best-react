import type { Metadata } from "next";

import {
  getTeacherGroupAssignments,
  getTeacherGroupLessons,
} from "@/data/teacher/TeacherPreviewData";

import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "../GroupWorkspaceRoute";
import { GroupAssignments } from "./GroupAssignments";

type GroupAssignmentsPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupAssignmentsPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "assignments");
}

export default async function GroupAssignmentsPage({ params }: GroupAssignmentsPageProps) {
  const { copy, locale, slug } = await getGroupWorkspaceContext(params);
  return (
    <GroupAssignments
      assignments={getTeacherGroupAssignments(slug)}
      copy={copy}
      lessons={getTeacherGroupLessons(slug)}
      locale={locale}
    />
  );
}
