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

export function getNextGroupClassDate(
  group: Pick<TeacherGroup, "scheduleDays" | "startsAtMinutes" | "endsAtMinutes">,
  now = new Date(),
): string | null {
  if (
    group.scheduleDays.length === 0 ||
    group.startsAtMinutes === null ||
    group.endsAtMinutes === null ||
    group.endsAtMinutes <= group.startsAtMinutes
  ) {
    return null;
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Tashkent",
    year: "numeric",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  const date = new Date(Date.UTC(value("year"), value("month") - 1, value("day")));
  const currentMinute = value("hour") * 60 + value("minute");

  for (let offset = 0; offset <= 7; offset += 1) {
    const candidate = new Date(date);
    candidate.setUTCDate(date.getUTCDate() + offset);
    const weekday = candidate.getUTCDay() || 7;
    if (
      group.scheduleDays.includes(weekday) &&
      (offset > 0 || currentMinute < group.endsAtMinutes)
    ) {
      return `${candidate.getUTCFullYear()}-${String(candidate.getUTCMonth() + 1).padStart(2, "0")}-${String(candidate.getUTCDate()).padStart(2, "0")}`;
    }
  }

  return null;
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
