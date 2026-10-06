import type { Locale } from "@/config/Locales";
import type { StudentWorkspaceRecord } from "@/types/student/StudentWorkspace";

const tashkentTimeZone = "Asia/Tashkent";
const minutesPerDay = 24 * 60;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

export function getStudentNextClass(
  records: readonly StudentWorkspaceRecord[],
  locale: Locale,
  now = new Date(),
): { day: string; time: string } | null {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
    timeZone: tashkentTimeZone,
    weekday: "short",
  }).formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  const currentDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday ?? "");
  if (currentDay < 0 || !Number.isFinite(hour) || !Number.isFinite(minute)) return null;

  const upcoming = records
    .flatMap((record) => (record.weeklySlot ? [record.weeklySlot] : []))
    .map((slot) => {
      const [startHour, startMinute] = slot.startsAt.split(":").map(Number);
      if (
        !Number.isInteger(startHour) ||
        !Number.isInteger(startMinute) ||
        startHour < 0 ||
        startHour > 23 ||
        startMinute < 0 ||
        startMinute > 59
      )
        return null;
      let daysAway = (slot.day - currentDay + 7) % 7;
      const minutesAway =
        daysAway * minutesPerDay + startHour * 60 + startMinute - (hour * 60 + minute);
      if (minutesAway <= 0) daysAway += 7;
      return {
        daysAway,
        minutesAway: minutesAway <= 0 ? minutesAway + 7 * minutesPerDay : minutesAway,
        time: slot.startsAt,
      };
    })
    .filter(
      (slot): slot is { daysAway: number; minutesAway: number; time: string } => slot !== null,
    )
    .sort((a, b) => a.minutesAway - b.minutesAway)[0];

  if (!upcoming) return null;
  const nextDate = new Date(now.getTime() + upcoming.daysAway * millisecondsPerDay);
  return {
    day: new Intl.DateTimeFormat(locale, {
      timeZone: tashkentTimeZone,
      weekday: "short",
    }).format(nextDate),
    time: upcoming.time,
  };
}
