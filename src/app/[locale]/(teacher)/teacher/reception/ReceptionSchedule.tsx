"use client";

import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { useTeacherLiveClock } from "@/hooks/teacher/dashboard/useTeacherLiveClock";
import { buildTeacherSchedule } from "@/lib/teacher/TeacherSchedule";
import type { TeacherCopy, TeacherGroup } from "@/types/teacher/Teacher";

type ReceptionScheduleProps = {
  copy: TeacherCopy;
  groups: TeacherGroup[];
  initialNow: string;
};

export function ReceptionSchedule({ copy, groups, initialNow }: ReceptionScheduleProps) {
  /* HOOKS */
  const clock = useTeacherLiveClock(initialNow);
  const schedule = buildTeacherSchedule(
    groups,
    clock.todayWeekday,
    Number(clock.hour) * 60 + Number(clock.minute),
  );

  return (
    <main>
      <TeacherPageHeader eyebrow={copy.reception.eyebrow} title={copy.reception.pageTitle} />
      {schedule.length ? (
        <div className="teacherReception__tableWrap" tabIndex={0}>
          <table className="teacherReception__table">
            <thead>
              <tr>
                <th scope="col">{copy.reception.time}</th>
                <th scope="col">{copy.reception.room}</th>
                <th scope="col">{copy.groups.learners}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry) => (
                <tr key={entry.id}>
                  <th scope="row">
                    <time>
                      {entry.startsAt}–{entry.endsAt}
                    </time>
                  </th>
                  <td>
                    <strong>{entry.groupName}</strong>
                    <small>
                      {copy.reception.room} {entry.room} ·{" "}
                      {entry.lessonDays.map((day) => copy.groups.weekdays[day - 1]).join(" / ")}
                    </small>
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
        <section className="teacherShared__emptyState">{copy.reception.empty}</section>
      )}
    </main>
  );
}
