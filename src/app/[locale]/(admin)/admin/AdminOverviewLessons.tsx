import { useState } from "react";
import Link from "next/link";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import type { Locale } from "@/config/Locales";
import { getAdminOverviewCopy } from "@/dictionaries/admin/AdminOverview";
import { adminOverviewLessons } from "@/lib/admin/AdminOverview";
import {
  adminScheduleDays,
  adminScheduleState,
  adminScheduleTime,
} from "@/lib/admin/AdminSchedule";
import type { AdminScheduleLesson } from "@/types/admin/AdminSchedule";
import { AdminOverviewPager } from "./AdminOverviewPager";
import { AdminOverviewBrandMark } from "./AdminOverviewBrandMark";

export function AdminOverviewLessons({
  locale,
  lessons,
  today,
  now,
  loading,
  error,
  retry,
  pageSize,
  active,
}: {
  locale: Locale;
  lessons: AdminScheduleLesson[];
  today: string;
  now: number;
  loading: boolean;
  error: boolean;
  retry: () => void;
  pageSize: number;
  active: boolean;
}) {
  const copy = getAdminOverviewCopy(locale);
  const [selectedPage, setPage] = useState(0);
  const { todayLessons, nextLesson } = adminOverviewLessons(lessons, today, now);
  const pages = Math.ceil(todayLessons.length / pageSize);
  const page = Math.min(selectedPage, Math.max(0, pages - 1));
  const rows = todayLessons.length
    ? todayLessons.slice(page * pageSize, (page + 1) * pageSize)
    : nextLesson
      ? [nextLesson]
      : [];
  return (
    <section
      className="adminOverview__panel adminOverview__lessons"
      data-active={active}
      data-empty={!loading && !error && !todayLessons.length && !nextLesson}
      aria-labelledby="overview-lessons-title"
      aria-busy={loading}
    >
      {!loading && !error && !todayLessons.length && !nextLesson && <AdminOverviewBrandMark />}
      <header>
        <div>
          <span className="adminOverview__eyebrow">BEST LC</span>
          <h2 id="overview-lessons-title">
            {copy.lessons} {!loading && !error && <small>{todayLessons.length}</small>}
          </h2>
        </div>
        <Link href={`/${locale}/admin/schedule`} aria-label={copy.schedule}>
          <ArrowForwardRounded />
        </Link>
      </header>
      {loading || error ? (
        <div className="adminOverview__empty" role={error ? "alert" : "status"}>
          <p>{error ? copy.error : copy.loading}</p>
          {error && (
            <button type="button" onClick={retry}>
              {copy.retry}
            </button>
          )}
        </div>
      ) : (
        <>
          {!todayLessons.length && (
            <>
              {!nextLesson && (
                <div className="adminOverview__clock">
                  <span>{copy.localTime}</span>
                  <time dateTime={new Date(now).toISOString()}>
                    {new Intl.DateTimeFormat(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                      hourCycle: "h23",
                      timeZone: "Asia/Tashkent",
                    }).format(new Date(now))}
                    <span className="adminOverview__clockSeconds">
                      :{String(new Date(now).getUTCSeconds()).padStart(2, "0")}
                    </span>
                  </time>
                </div>
              )}
              <div className="adminOverview__noLessons">
                <CalendarMonthOutlined />
                <span>
                  <strong>{copy.noLessons}</strong>
                  <small>{nextLesson ? copy.next : copy.nextWeek}</small>
                </span>
              </div>
              {!nextLesson && (
                <div className="adminOverview__week" aria-label={copy.week}>
                  {adminScheduleDays(today, "week").map((day) => (
                    <time
                      key={day}
                      dateTime={day}
                      aria-current={day === today ? "date" : undefined}
                    >
                      <small>
                        {new Intl.DateTimeFormat(locale, {
                          weekday: "short",
                          timeZone: "Asia/Tashkent",
                        }).format(new Date(`${day}T12:00:00+05:00`))}
                      </small>
                      <strong>{Number(day.slice(-2))}</strong>
                    </time>
                  ))}
                </div>
              )}
            </>
          )}
          <div className="adminOverview__lessonList">
            {rows.map((lesson) => {
              const state = adminScheduleState(lesson, now);
              return (
                <Link
                  key={lesson.id}
                  className="adminOverview__lesson"
                  data-live={state === "live"}
                  href={`/${locale}/admin/schedule`}
                >
                  <div className="adminOverview__lessonTime">
                    <strong>{adminScheduleTime(lesson.startsAt)}</strong>
                    <small>{adminScheduleTime(lesson.endsAt)}</small>
                  </div>
                  <div className="adminOverview__lessonInfo">
                    <strong title={lesson.groupName}>{lesson.groupName}</strong>
                    <small title={`${lesson.teacherName} · ${lesson.room ?? "—"}`}>
                      {lesson.teacherName} · {copy.room} {lesson.room ?? "—"}
                    </small>
                  </div>
                  <span className="adminOverview__lessonState">
                    {state === "live" ? (
                      copy.live
                    ) : state === "elapsed" || state === "COMPLETED" ? (
                      copy.finished
                    ) : !todayLessons.length ? (
                      new Intl.DateTimeFormat(locale, {
                        month: "short",
                        day: "numeric",
                        timeZone: "Asia/Tashkent",
                      }).format(new Date(lesson.startsAt))
                    ) : (
                      <ArrowForwardRounded />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
          <AdminOverviewPager locale={locale} page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </section>
  );
}
