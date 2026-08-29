"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MeetingRoomRounded from "@mui/icons-material/MeetingRoomRounded";
import PlayCircleRounded from "@mui/icons-material/PlayCircleRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/dashboard.module.css";
import sharedStyles from "@/css/teacher/shared.module.css";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { TeacherCopy, TeacherPreviewData } from "@/types/teacher/Teacher";

type DashboardOverviewProps = {
  copy: TeacherCopy;
  data: TeacherPreviewData;
  locale: Locale;
};

function formatScheduleDate(date: string, locale: Locale, months: string[]) {
  const [, monthValue, dayValue] = date.split("-");
  const monthIndex = Number.parseInt(monthValue ?? "", 10) - 1;
  const day = Number.parseInt(dayValue ?? "", 10);
  const month = months[monthIndex];

  if (!month || !Number.isInteger(day)) return date;
  if (locale === "uz") return `${day}-${month}`;
  if (locale === "ru") return `${day} ${month}`;
  return `${month} ${day}`;
}

export function DashboardOverview({ copy, data, locale }: DashboardOverviewProps) {
  /* HOOKS */
  const notifications = useNotifications();
  const scheduleDateLabel = formatScheduleDate(
    data.scheduleDate,
    locale,
    copy.dashboard.scheduleMonths,
  );

  /* HANDLERS */
  const handleResourceOpen = () => {
    notifications.info({
      title: copy.dashboard.resourceUnavailableTitle,
      message: copy.dashboard.resourceUnavailableMessage,
    });
  };

  return (
    <main className={styles.teacherDashboard}>
      <TeacherPageHeader
        description={copy.dashboard.description}
        eyebrow={copy.dashboard.eyebrow}
        title={copy.dashboard.pageTitle}
      />

      <section aria-labelledby="today-classes-title" className={styles.teacherDashboard__today}>
        <div className={styles.teacherDashboard__todayHeader}>
          <div>
            <h2 id="today-classes-title">{copy.dashboard.scheduleTitle}</h2>
            <time dateTime={data.scheduleDate}>{scheduleDateLabel}</time>
          </div>
          <ScrollToTopLink
            className={sharedStyles.teacherShared__sectionLink}
            href={`/${locale}/teacher/reception`}
          >
            {copy.dashboard.scheduleViewAll}
          </ScrollToTopLink>
        </div>
        <div className={styles.teacherDashboard__scheduleScroller}>
          {data.schedule.slice(0, 4).map((entry) => (
            <ScrollToTopLink
              className={styles.teacherDashboard__scheduleCard}
              data-status={entry.status}
              href={`/${locale}/teacher/groups/${entry.groupSlug}`}
              key={entry.id}
            >
              <span className={styles.teacherDashboard__scheduleTopline}>
                <span className={styles.teacherDashboard__scheduleTime}>
                  <AccessTimeRounded aria-hidden="true" />
                  <time>
                    {entry.startsAt}–{entry.endsAt}
                  </time>
                </span>
                <span className={styles.teacherDashboard__scheduleStatus}>
                  {copy.dashboard.scheduleStatuses[entry.status]}
                </span>
              </span>
              <span className={styles.teacherDashboard__scheduleIdentity}>
                <span>
                  <SchoolRounded aria-hidden="true" />
                </span>
                <strong>{entry.groupName}</strong>
              </span>
              <span className={styles.teacherDashboard__scheduleMeta}>
                <span>
                  <MeetingRoomRounded aria-hidden="true" />
                  {copy.reception.room} {entry.room}
                </span>
                <span>
                  <GroupsRounded aria-hidden="true" />
                  {entry.learnerCount} {copy.reception.learnerCount}
                </span>
              </span>
            </ScrollToTopLink>
          ))}
        </div>
      </section>

      <div className={styles.teacherDashboard__mainGrid}>
        <section className={styles.teacherDashboard__groupSection}>
          <div className={sharedStyles.teacherShared__sectionHeader}>
            <h2 className={sharedStyles.teacherShared__sectionTitle}>
              {copy.dashboard.groupsTitle}
            </h2>
            <ScrollToTopLink
              className={sharedStyles.teacherShared__sectionLink}
              href={`/${locale}/teacher/groups`}
            >
              {copy.dashboard.viewAll}
            </ScrollToTopLink>
          </div>
          <div className={styles.teacherDashboard__groupGrid}>
            {data.groups.slice(0, 4).map((group) => (
              <ScrollToTopLink
                className={styles.teacherDashboard__groupCard}
                href={`/${locale}/teacher/groups/${group.slug}`}
                key={group.id}
              >
                <span className={styles.teacherDashboard__groupTopline}>
                  <strong>{group.name}</strong>
                  <span>{group.learnerCount}</span>
                </span>
                <span className={styles.teacherDashboard__groupMeta}>
                  {group.room} · {group.lessonDays[locale]} · {group.time}
                </span>
                <span className={styles.teacherDashboard__progressRow}>
                  <span className={styles.teacherDashboard__progressTrack}>
                    <span style={{ width: `${group.attendance}%` }} />
                  </span>
                  <span className={styles.teacherDashboard__attendance}>{group.attendance}%</span>
                </span>
              </ScrollToTopLink>
            ))}
          </div>
        </section>

        <section
          aria-label={copy.dashboard.pageTitle}
          className={styles.teacherDashboard__metricRail}
        >
          {data.dashboardMetrics.map((metric) => (
            <article
              className={styles.teacherDashboard__metricCard}
              data-featured={metric.featured}
              data-tone={metric.tone}
              key={metric.id}
            >
              <div className={styles.teacherDashboard__metricCopy}>
                <p>{metric.label[locale]}</p>
                <strong>{new Intl.NumberFormat(locale).format(metric.value)}</strong>
              </div>
              <span className={styles.teacherDashboard__metricIcon}>
                <GroupsRounded aria-hidden="true" />
              </span>
            </article>
          ))}
        </section>
      </div>

      <section className={styles.teacherDashboard__section}>
        <div className={sharedStyles.teacherShared__sectionHeader}>
          <h2 className={sharedStyles.teacherShared__sectionTitle}>
            {copy.dashboard.libraryTitle}
          </h2>
        </div>
        <div className={styles.teacherDashboard__resourceGrid}>
          {data.resources.map((resource) => (
            <article className={styles.teacherDashboard__resourceCard} key={resource.id}>
              <span className={styles.teacherDashboard__resourceIcon}>
                {resource.type === "podcast" ? <HeadphonesRounded /> : <PlayCircleRounded />}
              </span>
              <div>
                <h3>{resource.title[locale]}</h3>
                <p>{resource.description[locale]}</p>
              </div>
              <Button
                aria-label={resource.title[locale]}
                onClick={handleResourceOpen}
                shape="soft"
                size="small"
                variant="ghost"
              >
                <ArrowForwardRounded />
              </Button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
