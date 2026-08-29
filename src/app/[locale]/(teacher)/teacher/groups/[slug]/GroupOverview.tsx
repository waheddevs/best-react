import AssignmentTurnedInRounded from "@mui/icons-material/AssignmentTurnedInRounded";
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
  TeacherGroup,
  TeacherLessonAssignment,
  TeacherLessonMaterial,
  TeacherLessonSession,
  TeacherLessonTest,
} from "@/types/teacher/Teacher";

import { formatGroupWorkspaceDate } from "./GroupWorkspaceRoute";

type GroupOverviewProps = {
  assignments: TeacherLessonAssignment[];
  copy: TeacherCopy;
  group: TeacherGroup;
  lessons: TeacherLessonSession[];
  locale: Locale;
  materials: TeacherLessonMaterial[];
  tests: TeacherLessonTest[];
};

export function GroupOverview({
  assignments,
  copy,
  group,
  lessons,
  locale,
  materials,
  tests,
}: GroupOverviewProps) {
  const nextLesson = lessons.find((lesson) => lesson.status === "planned");
  const recentLesson = [...lessons].reverse().find((lesson) => lesson.status === "completed");
  const activeAssignments = assignments.filter(
    (assignment) => assignment.status === "active",
  ).length;
  const scheduledTests = tests.filter((test) => test.status === "scheduled").length;

  const highlights = [
    {
      icon: AssignmentTurnedInRounded,
      label: copy.groupWorkspace.activeAssignments,
      value: activeAssignments,
    },
    { icon: QuizRounded, label: copy.groupWorkspace.scheduledTests, value: scheduledTests },
    {
      icon: DescriptionRounded,
      label: copy.groupWorkspace.totalMaterials,
      value: materials.length,
    },
    { icon: CalendarMonthRounded, label: copy.groups.learners, value: group.learnerCount },
  ];

  return (
    <section aria-labelledby="group-overview-title" className={styles.teacherGroups__overview}>
      <div className={styles.teacherGroups__sectionIntro}>
        <div>
          <h2 id="group-overview-title">{copy.groupWorkspace.overviewTitle}</h2>
          <p>{copy.groupWorkspace.overviewDescription}</p>
        </div>
      </div>

      <div className={styles.teacherGroups__overviewMetrics}>
        {highlights.map(({ icon: Icon, label, value }) => (
          <article key={label}>
            <span>
              <Icon aria-hidden="true" />
            </span>
            <strong>{value}</strong>
            <small>{label}</small>
          </article>
        ))}
      </div>

      <div className={styles.teacherGroups__overviewLessons}>
        {[
          { label: copy.groupWorkspace.nextLesson, lesson: nextLesson },
          { label: copy.groupWorkspace.recentLesson, lesson: recentLesson },
        ].map(({ label, lesson }) =>
          lesson ? (
            <article className={styles.teacherGroups__spotlightCard} key={label}>
              <span className={styles.teacherGroups__spotlightIcon}>
                <ScheduleRounded aria-hidden="true" />
              </span>
              <div>
                <small>{label}</small>
                <h3>{lesson.topic[locale]}</h3>
                <p>
                  {formatGroupWorkspaceDate(lesson.date, locale, copy.dashboard.scheduleMonths)} ·{" "}
                  {lesson.startsAt}–{lesson.endsAt} · {copy.groupWorkspace.room} {lesson.room}
                </p>
              </div>
              <ScrollToTopLink
                className={sharedStyles.teacherShared__sectionLink}
                href={`/${locale}/teacher/groups/${group.slug}/lessons/${lesson.id}`}
              >
                {copy.groupWorkspace.openLesson}
              </ScrollToTopLink>
            </article>
          ) : null,
        )}
      </div>
    </section>
  );
}
