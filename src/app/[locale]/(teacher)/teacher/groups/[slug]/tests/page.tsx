import type { Metadata } from "next";

import { getTeacherGroupLessons, getTeacherGroupTests } from "@/data/teacher/TeacherPreviewData";
import { loadConnectedTeacherGroupTestPapers } from "@/lib/teacher/TeacherGroupData";

import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "../GroupWorkspaceRoute";
import { GroupTests } from "./GroupTests";
import { ConnectedGroupTests } from "./ConnectedGroupTests";

type GroupTestsPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupTestsPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "tests");
}

export default async function GroupTestsPage({ params }: GroupTestsPageProps) {
  const { connected, copy, group, locale, slug } = await getGroupWorkspaceContext(params);
  if (connected) {
    const papers = await loadConnectedTeacherGroupTestPapers(locale, group.id);
    return <ConnectedGroupTests copy={copy} locale={locale} papers={papers} />;
  }
  return (
    <GroupTests
      copy={copy}
      lessons={getTeacherGroupLessons(slug)}
      locale={locale}
      tests={getTeacherGroupTests(slug)}
    />
  );
}
