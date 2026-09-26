import type { Metadata } from "next";

import { loadConnectedTeacherGroupRoster } from "@/lib/teacher/TeacherGroupData";

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
  const { connected, copy, group, locale } = await getGroupWorkspaceContext(params);
  const roster = connected
    ? await loadConnectedTeacherGroupRoster(locale, group.id)
    : { learners: [], summary: undefined };

  return (
    <GroupStudentList
      connected={connected}
      copy={copy}
      coursePriceUzs={group.monthlyTuitionUzs ?? null}
      groupId={group.id}
      groupName={group.name}
      initialLearners={roster.learners}
      initialSummary={roster.summary}
      locale={locale}
    />
  );
}
