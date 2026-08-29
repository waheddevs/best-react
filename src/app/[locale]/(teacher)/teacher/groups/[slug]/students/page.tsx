import type { Metadata } from "next";

import { getTeacherGroupLearners } from "@/data/teacher/TeacherPreviewData";

import { GroupStudentList } from "../GroupStudentList";
import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "../GroupWorkspaceRoute";

type GroupStudentsPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupStudentsPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "students");
}

export default async function GroupStudentsPage({ params }: GroupStudentsPageProps) {
  const { copy, locale, slug } = await getGroupWorkspaceContext(params);

  return (
    <GroupStudentList copy={copy} initialLearners={getTeacherGroupLearners(slug)} locale={locale} />
  );
}
