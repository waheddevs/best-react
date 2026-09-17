import type { Metadata } from "next";

import {
  getTeacherGroupAssignments,
  getTeacherGroupLessons,
  getTeacherGroupMaterials,
  getTeacherGroupTests,
} from "@/data/teacher/TeacherPreviewData";
import { loadConnectedTeacherGroupOverview } from "@/lib/teacher/TeacherGroupData";
import type { TeacherGroupOverviewLesson } from "@/types/teacher/Teacher";

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
  const { connected, copy, group, locale, slug } = await getGroupWorkspaceContext(params);
  const previewAssignments = connected ? [] : getTeacherGroupAssignments(slug);
  const previewMaterials = connected ? [] : getTeacherGroupMaterials(slug);
  const previewTests = connected ? [] : getTeacherGroupTests(slug);
  const previewLessons: TeacherGroupOverviewLesson[] = connected
    ? []
    : getTeacherGroupLessons(slug)
        .filter((lesson) => lesson.status === "planned" || lesson.status === "completed")
        .map((lesson) => ({
          date: lesson.date,
          endsAt: lesson.endsAt,
          id: lesson.id,
          room: lesson.room,
          startsAt: lesson.startsAt,
          status: lesson.status === "completed" ? "completed" : "planned",
          topic: lesson.topic,
        }));
  const workspace = connected
    ? await loadConnectedTeacherGroupOverview(locale, group.id)
    : {
        lessons: previewLessons,
        metrics: {
          activeAssignments: previewAssignments.filter(
            (assignment) => assignment.status === "active",
          ).length,
          materials: previewMaterials.length,
          scheduledTests: previewTests.filter((test) => test.status === "scheduled").length,
          students: group.learnerCount,
        },
      };

  return (
    <GroupOverview
      copy={copy}
      group={group}
      lessons={workspace.lessons}
      locale={locale}
      metrics={workspace.metrics}
    />
  );
}
