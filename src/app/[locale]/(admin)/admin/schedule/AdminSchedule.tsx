"use client";

import { useEffect, useState } from "react";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import type { Locale } from "@/config/Locales";
import type { AdminDirectoryInput } from "@/gql/graphql";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminScheduleCopy } from "@/dictionaries/admin/AdminSchedule";
import { AdminCatalogFilters } from "@/features/admin/operations/AdminCatalogFilters";
import { AdminDateFilter } from "@/features/admin/operations/AdminDateFilter";
import { useAdminSchedule } from "@/hooks/admin/useAdminSchedule";
import {
  adminScheduleDate,
  adminScheduleDays,
  adminScheduleInRange,
  adminScheduleShift,
} from "@/lib/admin/AdminSchedule";
import type { AdminScheduleLesson, AdminScheduleView } from "@/types/admin/AdminSchedule";
import { AdminScheduleWeek } from "./AdminScheduleWeek";
import { AdminScheduleDay } from "./AdminScheduleDay";
import { AdminScheduleDetails } from "./AdminScheduleDetails";

export function AdminSchedule({ locale, initialDate }: { locale: Locale; initialDate: string }) {
  const copy = getAdminScheduleCopy(locale);
  const t = getAdminRegistryText(locale);
  const [date, setDate] = useState(initialDate);
  const [view, setView] = useState<AdminScheduleView>("week");
  const [now, setNow] = useState<number | null>(null);
  const [filters, setFilters] = useState<AdminDirectoryInput>({ page: 1, pageSize: 100 });
  const [detail, setDetail] = useState<AdminScheduleLesson | null>(null);
  const days = adminScheduleDays(date, view);
  const week = adminScheduleDays(date, "week");
  // Include the previous day so lessons crossing midnight remain visible.
  const query = useAdminSchedule(adminScheduleShift(week[0], -1), week[6]);
  const today = now ? adminScheduleDate(new Date(now)) : initialDate;
  const formatDate = (value: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(
      new Date(`${value}T12:00:00Z`),
    );
  const rangeLabel =
    view === "day"
      ? formatDate(date, { day: "numeric", month: "long", year: "numeric" })
      : `${formatDate(days[0], { day: "numeric", month: "short" })} – ${formatDate(days[6], { day: "numeric", month: "short", year: "numeric" })}`;
  const rooms = [
    ...new Set(
      query.lessons.map((lesson) => lesson.room).filter((room): room is string => Boolean(room)),
    ),
  ].sort();
  const period = query.lessons.filter((lesson) =>
    adminScheduleInRange(lesson, days[0], days.at(-1)!),
  );
  const search = filters.search?.trim().toLocaleLowerCase();
  const lessons = period.filter(
    (lesson) =>
      (!filters.teacherId || lesson.teacherId === filters.teacherId) &&
      (!filters.groupId || lesson.groupId === filters.groupId) &&
      (!filters.room || lesson.room === filters.room) &&
      (!search ||
        [
          lesson.groupName,
          lesson.teacherName,
          lesson.room ?? "",
          ...lesson.translations.map((item) => item.title),
        ].some((text) => text.toLocaleLowerCase().includes(search))),
  );

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 15000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <article className="adminWorkspace adminRegistry adminSchedule">
      <header className="adminWorkspace__header">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
      </header>
      <section className="adminSchedule__toolbar" aria-label={copy.view}>
        <div className="adminSchedule__navigation">
          <button type="button" onClick={() => setDate(adminScheduleDate(new Date()))}>
            {copy.today}
          </button>
          <button
            type="button"
            aria-label={copy.previous}
            onClick={() => setDate(adminScheduleShift(date, view === "week" ? -7 : -1))}
          >
            <ChevronLeftRounded />
          </button>
          <button
            type="button"
            aria-label={copy.next}
            onClick={() => setDate(adminScheduleShift(date, view === "week" ? 7 : 1))}
          >
            <ChevronRightRounded />
          </button>
          <span className="adminSchedule__range" aria-live="polite">
            {rangeLabel}
          </span>
        </div>
        <div className="adminSchedule__views" role="group" aria-label={copy.view}>
          {(["day", "week"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={view === option}
              onClick={() => setView(option)}
            >
              {copy[option]}
            </button>
          ))}
        </div>
        <div className="adminSchedule__date">
          <AdminDateFilter
            locale={locale}
            variant="field"
            label={copy.date}
            value={date}
            onChange={(next) => setDate(next || today)}
          />
        </div>
      </section>
      <AdminCatalogFilters
        locale={locale}
        input={filters}
        onChange={(next) => setFilters((current) => ({ ...current, ...next }))}
        filters={[
          {
            key: "teacherId",
            label: t("teacher"),
            options: query.options?.teachers ?? [],
            wide: true,
          },
          { key: "groupId", label: t("group"), options: query.options?.groups ?? [], wide: true },
          {
            key: "room",
            label: t("room"),
            options: rooms.map((room) => ({ id: room, label: room })),
          },
        ]}
      />
      <div className="adminSchedule__caption">
        <span aria-live="polite">
          {query.loading
            ? copy.loading
            : query.error
              ? ""
              : copy.count.replace("{count}", String(lessons.length))}
        </span>
        <span>Asia/Tashkent · UTC+05:00</span>
      </div>
      <section className="adminSchedule__content" aria-busy={query.loading} aria-label={rangeLabel}>
        {query.loading ? (
          <p className="adminSchedule__empty" role="status">
            {copy.loading}
          </p>
        ) : query.error ? (
          <div className="adminSchedule__empty" role="alert">
            <p>{copy.error}</p>
            <button type="button" onClick={query.retry}>
              {copy.retry}
            </button>
          </div>
        ) : lessons.length === 0 ? (
          <p className="adminSchedule__empty">{period.length ? copy.filteredEmpty : copy.empty}</p>
        ) : view === "week" ? (
          <AdminScheduleWeek
            locale={locale}
            days={days}
            lessons={lessons}
            now={now}
            today={today}
            onOpen={setDetail}
          />
        ) : (
          <AdminScheduleDay locale={locale} lessons={lessons} now={now} onOpen={setDetail} />
        )}
      </section>
      <AdminScheduleDetails
        locale={locale}
        lesson={detail}
        now={now}
        onClose={() => setDetail(null)}
      />
    </article>
  );
}
