import type { Metadata } from "next";

import { getTeacherGroupLessons, getTeacherGroupTests } from "@/data/teacher/TeacherPreviewData";

import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "../GroupWorkspaceRoute";
import { GroupTests } from "./GroupTests";

type GroupTestsPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupTestsPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "tests");
}

export default async function GroupTestsPage({ params }: GroupTestsPageProps) {
  const { copy, locale, slug } = await getGroupWorkspaceContext(params);
  return (
    <GroupTests
      copy={copy}
      lessons={getTeacherGroupLessons(slug)}
      locale={locale}
      tests={getTeacherGroupTests(slug)}
    />
  );
}
