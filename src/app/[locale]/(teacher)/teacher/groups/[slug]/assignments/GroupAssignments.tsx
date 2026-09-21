import AssignmentTurnedInRounded from "@mui/icons-material/AssignmentTurnedInRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";

import type { Locale } from "@/config/Locales";
import type {
  TeacherCopy,
  TeacherLessonAssignment,
  TeacherLessonSession,
} from "@/types/teacher/Teacher";

import { formatGroupWorkspaceDate } from "@/lib/teacher/TeacherGroupDate";
import { GroupWorkspaceCreateAction } from "../GroupWorkspaceCreateAction";
import { GroupWorkspaceSectionHeader } from "../GroupWorkspaceSectionHeader";

type GroupAssignmentsProps = {
  assignments: TeacherLessonAssignment[];
  copy: TeacherCopy;
  lessons: TeacherLessonSession[];
  locale: Locale;
};

export function GroupAssignments({ assignments, copy, lessons, locale }: GroupAssignmentsProps) {
  const statusLabels: Record<TeacherLessonAssignment["status"], string> = {
    active: copy.groups.active,
    closed: copy.groupWorkspace.closed,
    draft: copy.groupWorkspace.draft,
  };

  return (
    <section aria-labelledby="group-assignments-title" className="teacherGroups__workspaceSection">
      <GroupWorkspaceSectionHeader
        action={<GroupWorkspaceCreateAction copy={copy} kind="assignment" />}
        description={copy.groupWorkspace.assignmentsDescription}
        id="group-assignments-title"
        title={copy.groupWorkspace.assignmentsTitle}
      />

      {assignments.length > 0 ? (
        <div className="teacherGroups__activityList">
          {assignments.map((assignment) => {
            const lesson = lessons.find((item) => item.id === assignment.lessonId);
            const progress = Math.round(
              (assignment.submissionCount / assignment.totalLearners) * 100,
            );
            return (
              <article className="teacherGroups__activityCard" key={assignment.id}>
                <span className="teacherGroups__activityIcon">
                  <AssignmentTurnedInRounded aria-hidden="true" />
                </span>
                <div className="teacherGroups__activityCopy">
                  <span className="teacherGroups__statusPill" data-status={assignment.status}>
                    {statusLabels[assignment.status]}
                  </span>
                  <h3>{assignment.title[locale]}</h3>
                  <p>{lesson?.topic[locale] ?? "—"}</p>
                </div>
                <div className="teacherGroups__activityMeta">
                  <span>
                    <CalendarMonthRounded aria-hidden="true" />
                    {copy.groupWorkspace.dueDate}:{" "}
                    {formatGroupWorkspaceDate(
                      assignment.dueAt,
                      locale,
                      copy.dashboard.scheduleMonths,
                    )}
                  </span>
                  <strong>
                    {copy.groupWorkspace.submissions}: {assignment.submissionCount}/
                    {assignment.totalLearners}
                  </strong>
                  <span className="teacherGroups__activityProgress">
                    <span style={{ width: `${progress}%` }} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="teacherShared__emptyState">
          <h3 className="teacherShared__emptyTitle">{copy.groupWorkspace.noAssignments}</h3>
        </div>
      )}
    </section>
  );
}
