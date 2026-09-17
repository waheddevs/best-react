import type { TeacherGroup, TeacherScheduleEntry } from "@/types/teacher/Teacher";

type ScheduledGroup = Pick<
  TeacherGroup,
  | "endsAtMinutes"
  | "id"
  | "learnerCount"
  | "name"
  | "room"
  | "scheduleDays"
  | "slug"
  | "startsAtMinutes"
>;

function formatMinutes(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function buildTeacherSchedule(
  groups: readonly ScheduledGroup[],
  todayWeekday: number,
  currentMinute: number,
): TeacherScheduleEntry[] {
  const scheduledGroups = groups
    .filter(
      (group) =>
        group.scheduleDays.length > 0 &&
        group.startsAtMinutes !== null &&
        group.endsAtMinutes !== null &&
        group.endsAtMinutes > group.startsAtMinutes,
    )
    .sort(
      (first, second) =>
        (first.startsAtMinutes ?? 0) - (second.startsAtMinutes ?? 0) ||
        (first.endsAtMinutes ?? 0) - (second.endsAtMinutes ?? 0) ||
        first.name.localeCompare(second.name),
    );
  const nextStart = scheduledGroups.find(
    (group) =>
      group.scheduleDays.includes(todayWeekday) && (group.startsAtMinutes ?? 0) > currentMinute,
  )?.startsAtMinutes;

  return scheduledGroups.map((group) => {
    const start = group.startsAtMinutes!;
    const end = group.endsAtMinutes!;
    const meetsToday = group.scheduleDays.includes(todayWeekday);
    return {
      endsAt: formatMinutes(end),
      groupName: group.name,
      groupSlug: group.slug,
      id: group.id,
      learnerCount: group.learnerCount,
      lessonDays: group.scheduleDays,
      room: group.room,
      startsAt: formatMinutes(start),
      status: !meetsToday
        ? "planned"
        : currentMinute >= end
          ? "completed"
          : currentMinute >= start
            ? "active"
            : start === nextStart
              ? "next"
              : "planned",
    };
  });
}
