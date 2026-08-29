"use client";

import RefreshRounded from "@mui/icons-material/RefreshRounded";

import { Button } from "@/components/ui/Button";
import styles from "@/css/teacher/reception.module.css";
import sharedStyles from "@/css/teacher/shared.module.css";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { TeacherCopy, TeacherScheduleEntry } from "@/types/teacher/Teacher";

type ReceptionScheduleProps = { copy: TeacherCopy; schedule: TeacherScheduleEntry[] };

export function ReceptionSchedule({ copy, schedule }: ReceptionScheduleProps) {
  /* HOOKS */
  const notifications = useNotifications();

  /* HANDLERS */
  const handleRefresh = () =>
    notifications.info({
      title: copy.reception.refreshTitle,
      message: copy.reception.refreshMessage,
    });

  return (
    <main>
      <TeacherPageHeader
        actions={
          <Button
            onClick={handleRefresh}
            shape="soft"
            size="medium"
            startIcon={<RefreshRounded />}
            variant="surface"
          >
            {copy.common.refresh}
          </Button>
        }
        description={copy.reception.description}
        eyebrow={copy.common.previewLabel}
        title={copy.reception.pageTitle}
      />
      {schedule.length ? (
        <div className={styles.teacherReception__tableWrap} tabIndex={0}>
          <table className={styles.teacherReception__table}>
            <thead>
              <tr>
                <th scope="col">{copy.reception.time}</th>
                <th scope="col">{copy.reception.room}</th>
                <th scope="col">{copy.groups.groupState}</th>
                <th scope="col">{copy.groups.learners}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry) => (
                <tr data-active={entry.status === "active"} key={`${entry.time}-${entry.room}`}>
                  <th scope="row">
                    <time>{entry.time}</time>
                  </th>
                  <td>
                    <strong>{entry.groupName}</strong>
                    <small>
                      {copy.reception.room} {entry.room}
                    </small>
                  </td>
                  <td>
                    <span className={sharedStyles.teacherShared__badge}>
                      {entry.status === "active" ? copy.groups.active : copy.common.pending}
                    </span>
                  </td>
                  <td>
                    {entry.learnerCount} {copy.reception.learnerCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <section className={sharedStyles.teacherShared__emptyState}>{copy.reception.empty}</section>
      )}
    </main>
  );
}
