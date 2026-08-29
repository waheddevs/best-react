"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import EventBusyRounded from "@mui/icons-material/EventBusyRounded";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import PhoneInTalkRounded from "@mui/icons-material/PhoneInTalkRounded";
import TaskAltRounded from "@mui/icons-material/TaskAltRounded";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import styles from "@/css/teacher/tasks.module.css";
import sharedStyles from "@/css/teacher/shared.module.css";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useTeacherTasks } from "@/hooks/teacher/tasks/useTeacherTasks";
import type { TeacherCopy, TeacherTask } from "@/types/teacher/Teacher";

type TeacherTaskListProps = { copy: TeacherCopy; locale: Locale; tasks: TeacherTask[] };

export function TeacherTaskList({ copy, locale, tasks }: TeacherTaskListProps) {
  /* HOOKS */
  const notifications = useNotifications();
  const taskState = useTeacherTasks(tasks);

  /* HANDLERS */
  const handleTaskComplete = (taskId: string) => {
    taskState.handleTaskComplete(taskId);
    notifications.success({
      title: copy.tasks.completedTitle,
      message: copy.tasks.completedMessage,
    });
  };

  return (
    <main>
      <TeacherPageHeader
        actions={
          <ButtonLink
            endIcon={null}
            href={`/${locale}/teacher`}
            shape="soft"
            size="medium"
            startIcon={<ArrowBackRounded />}
            variant="surface"
          >
            {copy.common.back}
          </ButtonLink>
        }
        description={copy.tasks.description}
        eyebrow={copy.tasks.eyebrow}
        title={copy.tasks.pageTitle}
      />

      <div
        aria-label={copy.tasks.filterLabel}
        className={styles.teacherTasks__filters}
        role="group"
      >
        {(["pending", "completed", "all"] as const).map((filter) => (
          <button
            aria-pressed={taskState.filter === filter}
            data-active={taskState.filter === filter}
            key={filter}
            onClick={() => taskState.handleFilterChange(filter)}
            type="button"
          >
            {filter === "pending"
              ? copy.common.pending
              : filter === "completed"
                ? copy.common.completed
                : copy.common.all}
          </button>
        ))}
      </div>

      {taskState.visibleTasks.length ? (
        <section className={styles.teacherTasks__list}>
          {taskState.visibleTasks.map((task) => {
            const isAttendance = task.kind === "attendance";
            return (
              <article
                className={styles.teacherTasks__card}
                data-completed={task.status === "completed"}
                key={task.id}
              >
                <span
                  className={styles.teacherTasks__icon}
                  data-tone={isAttendance ? "danger" : "warning"}
                >
                  {isAttendance ? <EventBusyRounded /> : <PhoneInTalkRounded />}
                </span>
                <div className={styles.teacherTasks__content}>
                  <div className={styles.teacherTasks__heading}>
                    <div>
                      <h2>{isAttendance ? copy.tasks.attendanceTitle : copy.tasks.pauseTitle}</h2>
                      <p>
                        {isAttendance
                          ? copy.tasks.attendanceDescription
                          : copy.tasks.pauseDescription}
                      </p>
                    </div>
                    <span className={sharedStyles.teacherShared__badge}>{task.groupName}</span>
                  </div>
                  <dl className={styles.teacherTasks__details}>
                    <div>
                      <dt>{copy.groups.learnerName}</dt>
                      <dd>{task.learnerName}</dd>
                    </div>
                    <div>
                      <dt>{copy.groups.phone}</dt>
                      <dd>{task.phone}</dd>
                    </div>
                    <div>
                      <dt>{copy.common.createdAt}</dt>
                      <dd>
                        <time dateTime={task.createdAt}>
                          {new Intl.DateTimeFormat(locale, {
                            dateStyle: "medium",
                            timeZone: "Asia/Tashkent",
                            timeStyle: "short",
                          }).format(new Date(task.createdAt))}
                        </time>
                      </dd>
                    </div>
                  </dl>
                </div>
                {task.status === "pending" ? (
                  <div className={styles.teacherTasks__actions}>
                    <details>
                      <summary aria-label={copy.common.menu}>
                        <MoreVertRounded />
                      </summary>
                      <button onClick={() => handleTaskComplete(task.id)} type="button">
                        {copy.common.done}
                      </button>
                    </details>
                    <Button
                      onClick={() => handleTaskComplete(task.id)}
                      shape="soft"
                      size="medium"
                      startIcon={<TaskAltRounded />}
                      variant="primary"
                    >
                      {copy.common.done}
                    </Button>
                  </div>
                ) : (
                  <span className={styles.teacherTasks__completeState}>
                    <CheckCircleRounded /> {copy.common.completed}
                  </span>
                )}
              </article>
            );
          })}
        </section>
      ) : (
        <section className={sharedStyles.teacherShared__emptyState}>
          <div>
            <span className={sharedStyles.teacherShared__emptyIcon}>
              <TaskAltRounded />
            </span>
            <h2 className={sharedStyles.teacherShared__emptyTitle}>{copy.tasks.empty}</h2>
          </div>
        </section>
      )}
    </main>
  );
}
