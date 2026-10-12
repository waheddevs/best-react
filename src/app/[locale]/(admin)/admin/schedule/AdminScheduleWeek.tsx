import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminScheduleCopy } from "@/dictionaries/admin/AdminSchedule";
import {
  adminScheduleSegments,
  adminScheduleState,
  adminScheduleTime,
} from "@/lib/admin/AdminSchedule";
import type { AdminScheduleLesson } from "@/types/admin/AdminSchedule";

export function AdminScheduleWeek({
  locale,
  days,
  lessons,
  now,
  today,
  onOpen,
}: {
  locale: Locale;
  days: string[];
  lessons: AdminScheduleLesson[];
  now: number | null;
  today: string;
  onOpen: (lesson: AdminScheduleLesson) => void;
}) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminScheduleCopy(locale);
  const columns = days.map((day) => adminScheduleSegments(lessons, day));
  const segments = columns.flat();
  const first = Math.min(8, ...segments.map((item) => Math.floor(item.start / 60)));
  const last = Math.min(24, Math.max(20, ...segments.map((item) => Math.ceil(item.end / 60))));
  const hours = Array.from({ length: last - first }, (_, index) => first + index);
  const minuteNow =
    now === null
      ? null
      : Number(adminScheduleTime(new Date(now).toISOString()).slice(0, 2)) * 60 +
        Number(adminScheduleTime(new Date(now).toISOString()).slice(3));
  return (
    <div className="adminScheduleWeek" tabIndex={0} role="region" aria-label={copy.week}>
      <div className="adminScheduleWeek__grid">
        <div className="adminScheduleWeek__corner">{t("time")}</div>
        {days.map((day) => (
          <header
            key={day}
            className="adminScheduleWeek__heading"
            data-today={day === today || undefined}
          >
            <span>
              {new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(
                new Date(`${day}T12:00:00Z`),
              )}
            </span>
            <strong>{Number(day.slice(-2))}</strong>
          </header>
        ))}
        <div className="adminScheduleWeek__hours" style={{ height: hours.length * 100 }}>
          {hours.map((hour) => (
            <span key={hour} style={{ top: (hour - first) * 100 }}>
              {String(hour).padStart(2, "0")}:00
            </span>
          ))}
        </div>
        {days.map((day, index) => (
          <div
            key={day}
            className="adminScheduleWeek__day"
            data-today={day === today || undefined}
            style={{ height: hours.length * 100 }}
          >
            {columns[index].map(({ lesson, start, end, column, columns: lanes }) => {
              const state = adminScheduleState(lesson, now ?? 0);
              const label =
                state === "live" ? copy.live : state === "elapsed" ? copy.elapsed : t(state);
              const time = `${adminScheduleTime(lesson.startsAt)}–${adminScheduleTime(lesson.endsAt)}`;
              return (
                <button
                  type="button"
                  key={lesson.id}
                  className="adminScheduleWeek__lesson"
                  data-state={state}
                  data-conflict={lesson.hasConflict || undefined}
                  style={{
                    top: (start / 60 - first) * 100,
                    height: (Math.min(Math.max(end - start, 30), last * 60 - start) / 60) * 100 - 3,
                    left: `calc(${(column / lanes) * 100}% + 3px)`,
                    width: `calc(${100 / lanes}% - 6px)`,
                  }}
                  title={`${lesson.groupName} · ${time} · ${lesson.teacherName} · ${lesson.room || "—"} · ${label}`}
                  aria-label={`${lesson.groupName}, ${time}, ${lesson.teacherName}, ${t("room")}: ${lesson.room || "—"}, ${label}${lesson.hasConflict ? `, ${copy.conflict}` : ""}`}
                  onClick={() => onOpen(lesson)}
                >
                  <span>{time}</span>
                  <strong>{lesson.groupName}</strong>
                  <small>{lesson.teacherName}</small>
                  <small>
                    {t("room")}: {lesson.room || "—"}
                  </small>
                  <em>
                    {label}
                    {lesson.hasConflict ? ` · ${t("conflicts")}` : ""}
                  </em>
                </button>
              );
            })}
            {day === today &&
              minuteNow !== null &&
              minuteNow >= first * 60 &&
              minuteNow < last * 60 && (
                <div
                  className="adminScheduleWeek__now"
                  style={{ top: (minuteNow / 60 - first) * 100 }}
                  role="img"
                  aria-label={`${copy.currentTime}: ${adminScheduleTime(new Date(now!).toISOString())}`}
                />
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
