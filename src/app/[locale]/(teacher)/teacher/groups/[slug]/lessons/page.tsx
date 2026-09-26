import type { Metadata } from "next";

import { getTeacherLessonPlanPreview } from "@/data/teacher/TeacherLessonPlanPreview";
import { TeacherLessonPlanManager } from "@/features/teacher/groups/TeacherLessonPlanManager";
import { loadConnectedTeacherLessonWorkspace } from "@/lib/teacher/TeacherLessonPlanData";

import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "../GroupWorkspaceRoute";
import { GroupWorkspaceSectionHeader } from "../GroupWorkspaceSectionHeader";

type GroupLessonsPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupLessonsPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "lessons");
}

export default async function GroupLessonsPage({ params }: GroupLessonsPageProps) {
  const { connected, copy, group, locale } = await getGroupWorkspaceContext(params);
  const data = connected
    ? await loadConnectedTeacherLessonWorkspace(locale, group.id)
    : getTeacherLessonPlanPreview(group.id);

  return (
    <section aria-labelledby="group-lessons-title" className="teacherGroups__workspaceSection">
      <GroupWorkspaceSectionHeader
        description={copy.groupWorkspace.lessonsDescription}
        id="group-lessons-title"
        title={copy.groupWorkspace.lessonsTitle}
      />
      <TeacherLessonPlanManager
        connected={connected}
        emptyMessage={copy.groupWorkspace.noLessons}
        groupId={group.id}
        initialData={data}
        key={data.lessons.map(({ id }) => id).join(":")}
        locale={locale}
        schedule={{
          endsAtMinutes: group.endsAtMinutes,
          room: group.room,
          scheduleDays: group.scheduleDays,
          startsAtMinutes: group.startsAtMinutes,
        }}
      />
    </section>
  );
}
