"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import InboxOutlined from "@mui/icons-material/InboxOutlined";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import type { Locale } from "@/config/Locales";
import type { AdminOverviewQuery } from "@/gql/graphql";
import { getAdminOverviewCopy } from "@/dictionaries/admin/AdminOverview";
import { adminScheduleDate, adminScheduleShift } from "@/lib/admin/AdminSchedule";
import { useAdminSchedule } from "@/hooks/admin/useAdminSchedule";
import { AdminOverviewLessons } from "./AdminOverviewLessons";
import { AdminOverviewInbox } from "./AdminOverviewInbox";
import { AdminOverviewFinance } from "./AdminOverviewFinance";

export function AdminOverviewDashboard({
  locale,
  initialNow,
  data,
  loading,
  error,
  retry,
}: {
  locale: Locale;
  initialNow: number;
  data?: AdminOverviewQuery["adminOverview"];
  loading: boolean;
  error: boolean;
  retry: () => void;
}) {
  const copy = getAdminOverviewCopy(locale);
  const [now, setNow] = useState(initialNow);
  const [pageSize, setPageSize] = useState(3);
  const [active, setActive] = useState("lessons");
  const today = adminScheduleDate(new Date(now));
  const schedule = useAdminSchedule(adminScheduleShift(today, -1), adminScheduleShift(today, 7));
  useEffect(() => {
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    const compact = window.matchMedia("(max-width: 1100px), (max-height: 800px)");
    const short = window.matchMedia("(max-height: 650px)");
    const update = () => setPageSize(short.matches ? 1 : compact.matches ? 2 : 3);
    const initial = window.setTimeout(update, 0);
    compact.addEventListener("change", update);
    short.addEventListener("change", update);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(initial);
      compact.removeEventListener("change", update);
      short.removeEventListener("change", update);
    };
  }, []);
  const metricCards = [
    { key: "students", label: copy.students, href: "students", Icon: SchoolOutlined },
    { key: "teachers", label: copy.teachers, href: "teachers", Icon: PersonOutlineRounded },
    { key: "groups", label: copy.groups, href: "groups", Icon: GroupsOutlined },
    { key: "NEW", label: copy.requests, href: "requests", Icon: InboxOutlined },
  ];
  return (
    <article className="adminOverview">
      <header className="adminOverview__heading">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </div>
        <time dateTime={today}>
          <CalendarTodayOutlined />
          <span>
            {new Intl.DateTimeFormat(locale, {
              weekday: "short",
              month: "short",
              day: "numeric",
              timeZone: "Asia/Tashkent",
            }).format(new Date(now))}
          </span>
        </time>
      </header>
      <section className="adminOverview__metrics" aria-label={copy.title} aria-busy={loading}>
        {metricCards.map(({ key, label, href, Icon }, index) => (
          <Link key={key} data-tone={index} href={`/${locale}/admin/${href}`}>
            <span className="adminOverview__metricIcon">
              <Icon />
            </span>
            <span className="adminOverview__metricCopy">
              <small>{label}</small>
              <strong>
                {!loading && !error && data
                  ? (data.metrics.find((metric) => metric.key === key)?.value ?? "—")
                  : "—"}
              </strong>
            </span>
            <ArrowOutwardRounded className="adminOverview__metricArrow" />
          </Link>
        ))}
      </section>
      <nav className="adminOverview__tabs" aria-label={copy.navigation}>
        {(["lessons", "attention", "finance"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            aria-pressed={active === tab}
            onClick={() => setActive(tab)}
          >
            {copy[tab]}
          </button>
        ))}
      </nav>
      <div className="adminOverview__panels">
        <AdminOverviewLessons
          key={today}
          locale={locale}
          lessons={schedule.lessons}
          today={today}
          now={now}
          loading={schedule.loading}
          error={schedule.error}
          retry={schedule.retry}
          pageSize={pageSize}
          active={active === "lessons"}
        />
        <AdminOverviewInbox
          locale={locale}
          data={data}
          loading={loading}
          error={error}
          retry={retry}
          pageSize={pageSize}
          active={active === "attention"}
        />
        <AdminOverviewFinance locale={locale} active={active === "finance"} />
      </div>
    </article>
  );
}
