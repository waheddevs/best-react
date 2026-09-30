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
                <th scope="col">{copy.reception.group}</th>
                <th scope="col">{copy.reception.time}</th>
                <th scope="col">{copy.reception.days}</th>
                <th scope="col">{copy.reception.room}</th>
                <th scope="col">{copy.reception.type}</th>
                <th scope="col">{copy.reception.students}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry) => (
                <tr key={entry.id}>
                  <th className="teacherReception__groupName" scope="row">
                    {entry.groupName}
                  </th>
                  <td>
                    <time>
                      {entry.startsAt}–{entry.endsAt}
                    </time>
                  </td>
                  <td>
                    {entry.lessonDays.map((day) => copy.groups.weekdays[day - 1]).join(" / ")}
                  </td>
                  <td>{entry.room}</td>
                  <td>
                    <span className="teacherReception__typeBadge">
                      {entry.category ? copy.groups.categories[entry.category] : "—"}
                    </span>
                  </td>
                  <td>{entry.learnerCount}</td>
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
