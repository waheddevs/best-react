"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import MeetingRoomRounded from "@mui/icons-material/MeetingRoomRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type {
  TeacherCopy,
  TeacherLessonAssignment,
  TeacherLessonFormValue,
  TeacherLessonMaterial,
  TeacherLessonSession,
  TeacherLessonTest,
} from "@/types/teacher/Teacher";

import { formatGroupWorkspaceDate } from "@/lib/teacher/TeacherGroupDate";
import { GroupLessonEditorAction } from "../GroupLessonEditorAction";

type LessonDetailProps = {
  assignments: TeacherLessonAssignment[];
  copy: TeacherCopy;
  lesson: TeacherLessonSession;
  locale: Locale;
  materials: TeacherLessonMaterial[];
  slug: string;
  tests: TeacherLessonTest[];
};

export function LessonDetail({
  assignments,
  copy,
  lesson,
  locale,
  materials,
  slug,
  tests,
}: LessonDetailProps) {
  /* HOOKS */
  const router = useRouter();
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const [previewLesson, setPreviewLesson] = useState(lesson);

  const statusLabels: Record<TeacherLessonSession["status"], string> = {
    cancelled: copy.groupWorkspace.cancelled,
    completed: copy.groupWorkspace.completed,
    planned: copy.groupWorkspace.planned,
  };
  const linkedAssignments = assignments.filter((assignment) =>
    previewLesson.assignmentIds.includes(assignment.id),
  );
  const linkedMaterials = materials.filter((material) =>
    previewLesson.materialIds.includes(material.id),
  );
  const linkedTests = tests.filter((test) => previewLesson.testIds.includes(test.id));

  /* HANDLERS */
  const handlePreviewChange = (value: TeacherLessonFormValue) => {
    setPreviewLesson((currentLesson) => ({
      ...currentLesson,
      ...value,
      objective: { ...currentLesson.objective, [locale]: value.objective },
      topic: { ...currentLesson.topic, [locale]: value.topic },
    }));
  };

  const handleDelete = async () => {
    const accepted = await confirm({
      cancelLabel: copy.common.cancel,
      confirmLabel: copy.groupWorkspace.lessonDeleteConfirm,
      message: copy.groupWorkspace.lessonDeleteMessage,
      title: copy.groupWorkspace.lessonDeleteTitle,
      tone: "danger",
    });

    if (!accepted) return;

    notifications.warning({
      message: copy.groupWorkspace.lessonDeletedMessage,
      title: copy.groupWorkspace.lessonDeletedTitle,
    });
    router.push(`/${locale}/teacher/groups/${slug}/lessons`);
  };

  return (
    <article className="teacherGroups__lessonDetail">
      <div className="teacherGroups__lessonDetailHeader">
        <ScrollToTopLink
          aria-label={copy.common.back}
          className="teacherGroups__backLink"
          href={`/${locale}/teacher/groups/${slug}/lessons`}
        >
          <ArrowBackRounded />
        </ScrollToTopLink>
        <div>
          <p>{copy.groupWorkspace.lessonDetailEyebrow}</p>
          <h2>{previewLesson.topic[locale]}</h2>
        </div>
        <div className="teacherGroups__lessonDetailControls">
          <span className="teacherGroups__statusPill" data-status={previewLesson.status}>
            {statusLabels[previewLesson.status]}
          </span>
          <GroupLessonEditorAction
            assignments={assignments}
            copy={copy}
            lesson={previewLesson}
            locale={locale}
            materials={materials}
            mode="edit"
            onPreviewChange={handlePreviewChange}
            tests={tests}
          />
          <Button
            className="teacherGroups__lessonDeleteButton"
            hoverEffect="jump"
            onClick={handleDelete}
            shape="soft"
            size="small"
            startIcon={<DeleteOutlineRounded />}
            variant="danger"
          >
            {copy.groupWorkspace.deleteLesson}
          </Button>
        </div>
      </div>

      <p className="teacherGroups__lessonObjective">
        <strong>{copy.groupWorkspace.objective}</strong>
        {previewLesson.objective[locale]}
      </p>

      <dl className="teacherGroups__lessonFacts">
        <div>
          <dt>
            <CalendarMonthRounded aria-hidden="true" />
            {copy.groupWorkspace.date}
          </dt>
          <dd>
            {formatGroupWorkspaceDate(previewLesson.date, locale, copy.dashboard.scheduleMonths)}
          </dd>
        </div>
        <div>
          <dt>
            <ScheduleRounded aria-hidden="true" />
            {copy.groupWorkspace.time}
          </dt>
          <dd>
            {previewLesson.startsAt}–{previewLesson.endsAt}
          </dd>
        </div>
        <div>
          <dt>
            <MeetingRoomRounded aria-hidden="true" />
            {copy.groupWorkspace.room}
          </dt>
          <dd>{previewLesson.room}</dd>
        </div>
        <div>
          <dt>
            <GroupsRounded aria-hidden="true" />
            {copy.groupWorkspace.attendance}
          </dt>
          <dd>
            {previewLesson.attendancePresent}/{previewLesson.attendanceTotal}
          </dd>
        </div>
      </dl>

      <div className="teacherGroups__linkedSections">
        <section>
          <h3>
            <DescriptionRounded aria-hidden="true" />
            {copy.groupWorkspace.linkedMaterials}
          </h3>
          <div className="teacherGroups__linkedList">
            {linkedMaterials.map((material) => (
              <article key={material.id}>
                <span>
                  {copy.groupWorkspace.materialTypes[material.type]} · {material.format}
                </span>
                <strong>{material.title[locale]}</strong>
              </article>
            ))}
            {linkedMaterials.length === 0 ? <p>{copy.groupWorkspace.noMaterials}</p> : null}
          </div>
        </section>

        <section>
          <h3>
            <AssignmentRounded aria-hidden="true" />
            {copy.groupWorkspace.linkedAssignments}
          </h3>
          <div className="teacherGroups__linkedList">
            {linkedAssignments.map((assignment) => (
              <article key={assignment.id}>
                <span>
                  {copy.groupWorkspace.submissions}: {assignment.submissionCount}/
                  {assignment.totalLearners}
                </span>
                <strong>{assignment.title[locale]}</strong>
              </article>
            ))}
            {linkedAssignments.length === 0 ? <p>{copy.groupWorkspace.noAssignments}</p> : null}
          </div>
        </section>

        <section>
          <h3>
            <QuizRounded aria-hidden="true" />
            {copy.groupWorkspace.linkedTests}
          </h3>
          <div className="teacherGroups__linkedList">
            {linkedTests.map((test) => (
              <article key={test.id}>
                <span>
                  {test.questionCount} {copy.groupWorkspace.questions} · {test.durationMinutes}{" "}
                  {copy.groupWorkspace.minutes}
                </span>
                <strong>{test.title[locale]}</strong>
              </article>
            ))}
            {linkedTests.length === 0 ? <p>{copy.groupWorkspace.noTests}</p> : null}
          </div>
        </section>
      </div>
    </article>
  );
}
