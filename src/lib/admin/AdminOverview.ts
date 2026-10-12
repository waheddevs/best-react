import type { AdminScheduleLesson } from "@/types/admin/AdminSchedule";

export function adminOverviewLessons(lessons: AdminScheduleLesson[], today: string, now: number) {
  const start = Date.parse(`${today}T00:00:00+05:00`);
  const end = start + 86400000;
  const available = lessons.filter(
    (lesson) => lesson.status === "SCHEDULED" || lesson.status === "COMPLETED",
  );
  const todayLessons = available.filter(
    (lesson) => Date.parse(lesson.startsAt) < end && Date.parse(lesson.endsAt) > start,
  );
  const priority = (lesson: AdminScheduleLesson) =>
    lesson.status === "COMPLETED" || Date.parse(lesson.endsAt) <= now
      ? 2
      : Date.parse(lesson.startsAt) <= now
        ? 0
        : 1;
  todayLessons.sort(
    (a, b) =>
      priority(a) - priority(b) ||
      Date.parse(a.startsAt) - Date.parse(b.startsAt) ||
      a.id.localeCompare(b.id),
  );
  const nextLesson = available
    .filter((lesson) => lesson.status === "SCHEDULED" && Date.parse(lesson.startsAt) >= end)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))[0];
  return { todayLessons, nextLesson };
}
