import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";

import type { Locale } from "@/config/Locales";
import type { TeacherCopy, TeacherLessonSession, TeacherLessonTest } from "@/types/teacher/Teacher";

import { formatGroupWorkspaceDate } from "@/lib/teacher/TeacherGroupDate";
import { GroupWorkspaceCreateAction } from "../GroupWorkspaceCreateAction";
import { GroupWorkspaceSectionHeader } from "../GroupWorkspaceSectionHeader";

type GroupTestsProps = {
  copy: TeacherCopy;
  lessons: TeacherLessonSession[];
  locale: Locale;
  tests: TeacherLessonTest[];
};

export function GroupTests({ copy, lessons, locale, tests }: GroupTestsProps) {
  const statusLabels: Record<TeacherLessonTest["status"], string> = {
    completed: copy.groupWorkspace.completed,
    draft: copy.groupWorkspace.draft,
    scheduled: copy.groupWorkspace.scheduled,
  };

  return (
    <section aria-labelledby="group-tests-title">
      <GroupWorkspaceSectionHeader
        action={<GroupWorkspaceCreateAction copy={copy} kind="test" />}
        description={copy.groupWorkspace.testsDescription}
        id="group-tests-title"
        title={copy.groupWorkspace.testsTitle}
      />

      {tests.length > 0 ? (
        <div className="teacherGroups__testGrid">
          {tests.map((test) => {
            const lesson = lessons.find((item) => item.id === test.lessonId);
            return (
              <article className="teacherGroups__testCard" key={test.id}>
                <div className="teacherGroups__testTopline">
                  <span className="teacherGroups__resourceIcon">
                    <QuizRounded aria-hidden="true" />
                  </span>
                  <span className="teacherGroups__statusPill" data-status={test.status}>
                    {statusLabels[test.status]}
                  </span>
                </div>
                <small>{copy.groupWorkspace.testKinds[test.kind]}</small>
                <h3>{test.title[locale]}</h3>
                <p>{lesson?.topic[locale] ?? "—"}</p>
                <div className="teacherGroups__testMeta">
                  <span>
                    <CalendarMonthRounded aria-hidden="true" />
                    {formatGroupWorkspaceDate(
                      test.scheduledAt,
                      locale,
                      copy.dashboard.scheduleMonths,
                    )}
                  </span>
                  <span>
                    <QuizRounded aria-hidden="true" />
                    {test.questionCount} {copy.groupWorkspace.questions}
                  </span>
                  <span>
                    <ScheduleRounded aria-hidden="true" />
                    {test.durationMinutes} {copy.groupWorkspace.minutes}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="teacherShared__emptyState">
          <h3 className="teacherShared__emptyTitle">{copy.groupWorkspace.noTests}</h3>
        </div>
      )}
    </section>
  );
}
