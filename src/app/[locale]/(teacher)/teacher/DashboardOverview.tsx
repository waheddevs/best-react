"use client";

import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import PersonAddAlt1Rounded from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonOffRounded from "@mui/icons-material/PersonOffRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import {
  teacherGroupCapacity,
  teacherGroupCapacityPercentage,
} from "@/config/teacher/TeacherGroupCapacity";
import type { Locale } from "@/config/Locales";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { formatTeacherNumber } from "@/lib/teacher/TeacherNumberFormat";
import type { TeacherCopy, TeacherPreviewData } from "@/types/teacher/Teacher";

import { DashboardFinance } from "./DashboardFinance";
import { DashboardNewClasses } from "./DashboardNewClasses";

const metricIcons = {
  new: PersonAddAlt1Rounded,
  active: GroupsRounded,
  departed: PersonOffRounded,
  together: CalendarMonthRounded,
};

type DashboardOverviewProps = {
  copy: TeacherCopy;
  data: TeacherPreviewData;
  locale: Locale;
};

export function DashboardOverview({ copy, data, locale }: DashboardOverviewProps) {
  return (
    <main className="teacherDashboard">
      <TeacherPageHeader eyebrow={copy.dashboard.eyebrow} title={copy.dashboard.pageTitle} />

      <section aria-label={copy.dashboard.pageTitle} className="teacherDashboard__metricRail">
        {data.dashboardMetrics.map((metric) => {
          const MetricIcon = metricIcons[metric.id];

          return (
            <article
              className="teacherDashboard__metricCard"
              data-tone={metric.tone}
              key={metric.id}
            >
              <span className="teacherDashboard__metricIcon">
                <MetricIcon aria-hidden="true" />
              </span>
              <div className="teacherDashboard__metricCopy">
                <p>{metric.label[locale]}</p>
                <strong>{formatTeacherNumber(metric.value)}</strong>
              </div>
            </article>
          );
        })}
      </section>

      <DashboardNewClasses copy={copy} groups={data.groups} locale={locale} />

      <div className="teacherDashboard__contentGrid">
        <section className="teacherDashboard__groupSection">
          <div className="teacherShared__sectionHeader">
            <h2 className={`teacherShared__sectionTitle teacherDashboard__sectionTitle`}>
              {copy.dashboard.groupsTitle}
            </h2>
            <ScrollToTopLink
              className="teacherDashboard__sectionAction"
              href={`/${locale}/teacher/groups`}
            >
              {copy.dashboard.viewAll}
            </ScrollToTopLink>
          </div>
          <div className="teacherDashboard__groupGrid">
            {data.groups.slice(0, 4).map((group) => (
              <ScrollToTopLink
                aria-label={`${group.name}: ${group.learnerCount}/${teacherGroupCapacity} ${copy.reception.learnerCount}; ${group.lessonDays[locale]}, ${group.time}; ${teacherGroupCapacityPercentage(group.learnerCount)}%`}
                className="teacherDashboard__groupCard"
                href={`/${locale}/teacher/groups/${group.slug}`}
                key={group.id}
              >
                <span className="teacherDashboard__groupTopline">
                  <strong>{group.name}</strong>
                  <span>
                    {group.learnerCount}/{teacherGroupCapacity}
                  </span>
                </span>
                <span className="teacherDashboard__groupMeta">
                  {group.lessonDays[locale]} · {group.time}
                </span>
                <span className="teacherDashboard__progressRow">
                  <span className="teacherDashboard__progressTrack">
                    <span
                      style={{ width: `${teacherGroupCapacityPercentage(group.learnerCount)}%` }}
                    />
                  </span>
                  <span className="teacherDashboard__attendance">
                    {teacherGroupCapacityPercentage(group.learnerCount)}%
                  </span>
                </span>
              </ScrollToTopLink>
            ))}
            {data.groups.length === 0 ? <p>{copy.groups.noGroups}</p> : null}
          </div>
        </section>
        {data.financeSnapshots[0] ? (
          <DashboardFinance
            copy={copy}
            locale={locale}
            previousSnapshot={data.financeSnapshots[1]}
            snapshot={data.financeSnapshots[0]}
          />
        ) : null}
      </div>
    </main>
  );
}
