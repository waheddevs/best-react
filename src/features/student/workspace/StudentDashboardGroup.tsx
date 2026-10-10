"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import EventRounded from "@mui/icons-material/EventRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import MeetingRoomRounded from "@mui/icons-material/MeetingRoomRounded";
import WatchLaterRounded from "@mui/icons-material/WatchLaterRounded";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentGroupCopy } from "@/dictionaries/student/StudentGroup";
import { getStudentDashboardCopy } from "@/dictionaries/student/StudentDashboard";
import type { StudentCurrentGroupQuery } from "@/gql/graphql";

type Group = NonNullable<StudentCurrentGroupQuery["studentCurrentGroup"]>["group"];

export function StudentDashboardGroup({
  group,
  failed,
  locale,
}: {
  group: Group | null;
  failed: boolean;
  locale: Locale;
}) {
  const copy = getStudentGroupCopy(locale);
  const dashboardCopy = getStudentDashboardCopy(locale);
  const router = useRouter();
  const [refreshing, startTransition] = useTransition();
  const dayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  const days =
    group?.scheduleDays
      .filter((day) => Number.isInteger(day) && day >= 1 && day <= 7)
      .map((day) => dayFormatter.format(new Date(Date.UTC(2024, 0, day))))
      .join(" · ") || copy.unavailable;
  const time =
    group && group.startsAtMinutes !== null && group.endsAtMinutes !== null
      ? `${clock(group.startsAtMinutes)}–${clock(group.endsAtMinutes)}`
      : copy.unavailable;

  return (
    <section
      className="studentDashboard__card studentDashboard__card_group"
      aria-labelledby="dashboard-group-title"
    >
      <div className="studentDashboardGroup__heading">
        <h2 id="dashboard-group-title">{dashboardCopy.group}</h2>
        <Link
          href={`/${locale}/student/schedule`}
          aria-label={copy.heroTitle}
          title={copy.heroTitle}
        >
          <ArrowForwardRounded aria-hidden="true" />
        </Link>
      </div>
      {failed ? (
        <div className="studentDashboardGroup__message" role="alert">
          <p>{copy.loadError}</p>
          <button
            type="button"
            disabled={refreshing}
            aria-busy={refreshing}
            onClick={() => startTransition(() => router.refresh())}
          >
            {copy.retry}
          </button>
        </div>
      ) : group ? (
        <>
          <div className="studentDashboardGroup__identity">
            <span className="studentDashboardGroup__emblem" aria-hidden="true">
              <GroupsRounded aria-hidden="true" />
            </span>
            <div className="studentDashboardGroup__name">
              {group.category ? (
                <span className="studentDashboardGroup__category">
                  {group.category === "GENERAL_ENGLISH" ? "General English" : group.category}
                </span>
              ) : null}
              <strong title={group.name}>{group.name}</strong>
            </div>
            <div className="studentDashboardGroup__members">
              <span>{copy.members}</span>
              <strong>
                {group.activeStudentCount}
                <small>/15</small>
              </strong>
              <span className="studentDashboardGroup__capacity" aria-hidden="true">
                {Array.from({ length: 15 }, (_, index) => (
                  <i
                    key={index}
                    data-filled={index < group.activeStudentCount ? "true" : undefined}
                  />
                ))}
              </span>
            </div>
          </div>
          <dl className="studentDashboardGroup__details">
            <div>
              <dt>
                <EventRounded aria-hidden="true" />
                {copy.days}
              </dt>
              <dd title={days}>{days}</dd>
            </div>
            <div>
              <dt>
                <WatchLaterRounded aria-hidden="true" />
                {copy.time}
              </dt>
              <dd title={`${time} (${group.timeZone})`}>{time}</dd>
            </div>
            <div>
              <dt>
                <MeetingRoomRounded aria-hidden="true" />
                {copy.room}
              </dt>
              <dd title={group.room ?? undefined}>{group.room || copy.unavailable}</dd>
            </div>
          </dl>
        </>
      ) : (
        <p className="studentDashboardGroup__message">{copy.emptyGroup}</p>
      )}
    </section>
  );
}

function clock(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}
