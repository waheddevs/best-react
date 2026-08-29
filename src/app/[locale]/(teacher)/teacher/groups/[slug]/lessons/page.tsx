import type { Metadata } from "next";

import {
  getTeacherGroupAssignments,
  getTeacherGroupLessons,
  getTeacherGroupMaterials,
  getTeacherGroupTests,
} from "@/data/teacher/TeacherPreviewData";

import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "../GroupWorkspaceRoute";
import { GroupLessons } from "./GroupLessons";

type GroupLessonsPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupLessonsPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "lessons");
}

export default async function GroupLessonsPage({ params }: GroupLessonsPageProps) {
  const { copy, locale, slug } = await getGroupWorkspaceContext(params);
  return (
    <GroupLessons
      assignments={getTeacherGroupAssignments(slug)}
      copy={copy}
      lessons={getTeacherGroupLessons(slug)}
      locale={locale}
      materials={getTeacherGroupMaterials(slug)}
      slug={slug}
      tests={getTeacherGroupTests(slug)}
    />
  );
}
