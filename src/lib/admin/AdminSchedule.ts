import type {
  AdminScheduleLesson,
  AdminScheduleSegment,
  AdminScheduleView,
} from "@/types/admin/AdminSchedule";

const dayMs = 86_400_000;
const offset = 5 * 3_600_000;

export function adminScheduleDate(value: Date | string): string {
  return new Date(new Date(value).getTime() + offset).toISOString().slice(0, 10);
}

export function adminScheduleShift(date: string, days: number): string {
  return new Date(Date.parse(`${date}T12:00:00Z`) + days * dayMs).toISOString().slice(0, 10);
}

export function adminScheduleDays(date: string, view: AdminScheduleView): string[] {
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  const first = view === "week" ? adminScheduleShift(date, -((weekday + 6) % 7)) : date;
  return Array.from({ length: view === "week" ? 7 : 1 }, (_, index) =>
    adminScheduleShift(first, index),
  );
}

export function adminScheduleTime(value: string): string {
  return new Date(Date.parse(value) + offset).toISOString().slice(11, 16);
}

export function adminScheduleState(lesson: AdminScheduleLesson, now: number): string {
  if (lesson.status !== "SCHEDULED") return lesson.status;
  if (now >= Date.parse(lesson.endsAt)) return "elapsed";
  return now >= Date.parse(lesson.startsAt) ? "live" : "SCHEDULED";
}

export function adminScheduleInRange(
  lesson: AdminScheduleLesson,
  first: string,
  last: string,
): boolean {
  return (
    Date.parse(lesson.startsAt) < Date.parse(`${adminScheduleShift(last, 1)}T00:00:00+05:00`) &&
    Date.parse(lesson.endsAt) > Date.parse(`${first}T00:00:00+05:00`)
  );
}

// Split overnight lessons at midnight and allocate independent lanes for overlaps.
export function adminScheduleSegments(
  lessons: AdminScheduleLesson[],
  day: string,
): AdminScheduleSegment[] {
  const midnight = Date.parse(`${day}T00:00:00+05:00`);
  const segments = lessons
    .filter((lesson) => adminScheduleInRange(lesson, day, day))
    .map((lesson) => ({
      lesson,
      start: Math.max(0, (Date.parse(lesson.startsAt) - midnight) / 60000),
      end: Math.min(1440, (Date.parse(lesson.endsAt) - midnight) / 60000),
      column: 0,
      columns: 1,
    }))
    .sort((a, b) => a.start - b.start || b.end - a.end || a.lesson.id.localeCompare(b.lesson.id));
  let cluster: AdminScheduleSegment[] = [];
  let lanes: number[] = [];
  const finish = () => {
    cluster.forEach((item) => {
      item.columns = lanes.length;
    });
  };
  for (const item of segments) {
    if (lanes.length && lanes.every((end) => end <= item.start)) {
      finish();
      cluster = [];
      lanes = [];
    }
    const free = lanes.findIndex((end) => end <= item.start);
    item.column = free < 0 ? lanes.length : free;
    lanes[item.column] = Math.max(item.end, item.start + 30);
    cluster.push(item);
  }
  finish();
  return segments;
}
