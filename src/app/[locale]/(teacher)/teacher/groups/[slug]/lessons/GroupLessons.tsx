import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/groups.module.css";
import sharedStyles from "@/css/teacher/shared.module.css";
import type {
  TeacherCopy,
  TeacherLessonAssignment,
  TeacherLessonMaterial,
  TeacherLessonSession,
  TeacherLessonTest,
} from "@/types/teacher/Teacher";

import { formatGroupWorkspaceDate } from "@/lib/teacher/TeacherGroupDate";
import { GroupWorkspaceSectionHeader } from "../GroupWorkspaceSectionHeader";
import { GroupLessonEditorAction } from "./GroupLessonEditorAction";

type GroupLessonsProps = {
  assignments: TeacherLessonAssignment[];
  copy: TeacherCopy;
  lessons: TeacherLessonSession[];
  locale: Locale;
  materials: TeacherLessonMaterial[];
  slug: string;
  tests: TeacherLessonTest[];
};

export function GroupLessons({
  assignments,
  copy,
  lessons,
  locale,
  materials,
  slug,
  tests,
}: GroupLessonsProps) {
  const statusLabels: Record<TeacherLessonSession["status"], string> = {
    cancelled: copy.groupWorkspace.cancelled,
    completed: copy.groupWorkspace.completed,
    planned: copy.groupWorkspace.planned,
  };

  return (
    <section aria-labelledby="group-lessons-title">
      <GroupWorkspaceSectionHeader
        action={
          <GroupLessonEditorAction
            assignments={assignments}
            copy={copy}
            locale={locale}
            materials={materials}
            mode="create"
            tests={tests}
          />
        }
        description={copy.groupWorkspace.lessonsDescription}
        id="group-lessons-title"
        title={copy.groupWorkspace.lessonsTitle}
      />

      {lessons.length > 0 ? (
        <div className={styles.teacherGroups__lessonList}>
          {lessons.map((lesson) => (
            <article
              className={styles.teacherGroups__lessonCard}
              data-status={lesson.status}
              key={lesson.id}
            >
              <div className={styles.teacherGroups__lessonCardTopline}>
                <span>
                  <CalendarMonthRounded aria-hidden="true" />
                  {formatGroupWorkspaceDate(lesson.date, locale, copy.dashboard.scheduleMonths)}
                </span>
                <span className={styles.teacherGroups__statusPill} data-status={lesson.status}>
                  {statusLabels[lesson.status]}
                </span>
              </div>
              <h3>{lesson.topic[locale]}</h3>
              <p>{lesson.objective[locale]}</p>
              <div className={styles.teacherGroups__lessonMeta}>
                <span>
                  <ScheduleRounded aria-hidden="true" />
                  {lesson.startsAt}–{lesson.endsAt}
                </span>
                <span>
                  <DescriptionRounded aria-hidden="true" />
                  {lesson.materialIds.length}
                </span>
                <span>
                  <AssignmentRounded aria-hidden="true" />
                  {lesson.assignmentIds.length}
                </span>
                <span>
                  <QuizRounded aria-hidden="true" />
                  {lesson.testIds.length}
                </span>
              </div>
              <ScrollToTopLink
                className={sharedStyles.teacherShared__sectionLink}
                href={`/${locale}/teacher/groups/${slug}/lessons/${lesson.id}`}
              >
                {copy.groupWorkspace.openLesson}
              </ScrollToTopLink>
            </article>
          ))}
        </div>
      ) : (
        <div className={sharedStyles.teacherShared__emptyState}>
          <h3 className={sharedStyles.teacherShared__emptyTitle}>
            {copy.groupWorkspace.noLessons}
          </h3>
        </div>
      )}
    </section>
  );
}
