"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import TaskAltRounded from "@mui/icons-material/TaskAltRounded";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import { getTeacherNotificationsCopy } from "@/dictionaries/teacher/TeacherNotifications";
import { completeConnectedTeacherTask } from "@/features/teacher/notifications/TeacherNotificationActions";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import type { TeacherCopy } from "@/types/teacher/Teacher";
import type { ConnectedTeacherTask } from "@/types/teacher/TeacherNotifications";

type TeacherConnectedTasksProps = {
  copy: TeacherCopy;
  locale: Locale;
  tasks: ConnectedTeacherTask[] | null;
};

export function TeacherConnectedTasks({ copy, locale, tasks }: TeacherConnectedTasksProps) {
  /* HOOKS */
  const router = useRouter();
  const targetId = useSearchParams().get("task");
  const localized = getTeacherNotificationsCopy(locale);
  const [items, setItems] = useState(tasks ?? []);
  const [filter, setFilter] = useState<"pending" | "completed" | "all">(
    targetId ? "all" : "pending",
  );
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const activeFilter = targetId ? "all" : filter;
  const visible = items.filter((task) =>
    activeFilter === "all"
      ? true
      : activeFilter === "pending"
        ? task.status === "OPEN"
        : task.status === "COMPLETED",
  );

  useEffect(() => {
    if (!targetId || tasks === null) return;
    const frame = requestAnimationFrame(() => {
      const card = document.getElementById(`teacher-task-${targetId}`);
      card?.scrollIntoView({ behavior: "smooth", block: "center" });
      card?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [targetId, tasks]);

  /* HANDLERS */
  const handleFilterChange = (nextFilter: "pending" | "completed" | "all") => {
    setFilter(nextFilter);
    if (targetId) router.replace(`/${locale}/teacher/tasks`, { scroll: false });
  };

  const handleTaskComplete = async (taskId: string) => {
    setPendingId(taskId);
    setError(false);
    try {
      const result = await completeConnectedTeacherTask(taskId);
      setItems((current) =>
        current.map((task) =>
          task.id === taskId
            ? { ...task, status: result.status, completedAt: result.completedAt }
            : task,
        ),
      );
    } catch {
      setError(true);
    } finally {
      setPendingId(null);
    }
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
        eyebrow={copy.tasks.eyebrow}
        title={copy.tasks.pageTitle}
      />
      {tasks === null ? (
        <section className="teacherShared__emptyState">
          <div>
            <h2>{localized.taskLoadError}</h2>
            <button onClick={() => router.refresh()} type="button">
              {localized.retry}
            </button>
          </div>
        </section>
      ) : (
        <>
          <div aria-label={copy.tasks.filterLabel} className="teacherTasks__filters" role="group">
            {(["pending", "completed", "all"] as const).map((option) => (
              <button
                aria-pressed={activeFilter === option}
                data-active={activeFilter === option}
                key={option}
                onClick={() => handleFilterChange(option)}
                type="button"
              >
                {option === "pending"
                  ? copy.common.pending
                  : option === "completed"
                    ? copy.common.completed
                    : copy.common.all}
              </button>
            ))}
          </div>
          {error ? <p role="alert">{localized.tryAgain}</p> : null}
          {visible.length ? (
            <section className="teacherTasks__list">
              {visible.map((task) => (
                <article
                  className="teacherTasks__card"
                  data-completed={task.status === "COMPLETED"}
                  data-target={task.id === targetId}
                  id={`teacher-task-${task.id}`}
                  key={task.id}
                  tabIndex={-1}
                >
                  <span className="teacherTasks__icon" data-tone="warning">
                    <TaskAltRounded />
                  </span>
                  <div className="teacherTasks__content">
                    <div className="teacherTasks__heading">
                      <div>
                        <h2>{task.title}</h2>
                        <p>{localized.taskKind[task.kind]}</p>
                      </div>
                    </div>
                    <dl className="teacherTasks__details">
                      <div>
                        <dt>{localized.createdAt}</dt>
                        <dd>{formatTaskDate(task.createdAt, locale)}</dd>
                      </div>
                      {task.dueAt ? (
                        <div>
                          <dt>{localized.dueAt}</dt>
                          <dd>{formatTaskDate(task.dueAt, locale)}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                  {task.status === "OPEN" ? (
                    <div className="teacherTasks__actions">
                      <Button
                        disabled={pendingId === task.id}
                        onClick={() => void handleTaskComplete(task.id)}
                        shape="soft"
                        size="medium"
                        startIcon={<TaskAltRounded />}
                        variant="primary"
                      >
                        {copy.common.done}
                      </Button>
                    </div>
                  ) : (
                    <span className="teacherTasks__completeState">
                      <CheckCircleRounded /> {copy.common.completed}
                    </span>
                  )}
                </article>
              ))}
            </section>
          ) : (
            <section className="teacherShared__emptyState">
              <h2 className="teacherShared__emptyTitle">{copy.tasks.empty}</h2>
            </section>
          )}
        </>
      )}
    </main>
  );
}

function formatTaskDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Tashkent",
  }).format(new Date(value));
}
