"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
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

export function DashboardOverview({ copy, data, locale }: DashboardOverviewProps) {
  /* HOOKS */
  const notifications = useNotifications();

  /* HANDLERS */
  const handleQuickStatusOpen = (label: string, progress: number) => {
    notifications.info({
      title: `${label} · ${progress}%`,
      message: copy.dashboard.quickStatusMessage,
    });
  };

  const handleResourceOpen = () => {
    notifications.info({
      title: copy.dashboard.resourceUnavailableTitle,
      message: copy.dashboard.resourceUnavailableMessage,
    });
  };

  return (
    <main>
      <TeacherPageHeader
        description={copy.dashboard.description}
        eyebrow={copy.common.previewLabel}
        title={copy.dashboard.pageTitle}
      />

      <section
        aria-labelledby="quick-status-title"
        className={styles.teacherDashboard__quickSection}
      >
        <h2 className={styles.teacherDashboard__srOnly} id="quick-status-title">
          {copy.dashboard.quickStatusTitle}
        </h2>
        <div className={styles.teacherDashboard__quickScroller}>
          {data.quickStatuses.map((status) => (
            <button
              aria-label={`${status.label[locale]}: ${status.progress}%`}
              className={styles.teacherDashboard__quickStatus}
              key={status.id}
              onClick={() => handleQuickStatusOpen(status.label[locale], status.progress)}
              type="button"
            >
              <span
                className={styles.teacherDashboard__progressRing}
                style={{ "--progress": `${status.progress * 3.6}deg` } as React.CSSProperties}
              >
                <SchoolRounded aria-hidden="true" />
              </span>
              <span>{status.label[locale]}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-label={copy.dashboard.pageTitle} className={styles.teacherDashboard__metrics}>
        {data.dashboardMetrics.map((metric, index) => (
          <article
            className={styles.teacherDashboard__metricCard}
            data-featured={index === data.dashboardMetrics.length - 1}
            data-tone={metric.tone}
            key={metric.id}
          >
            <span className={styles.teacherDashboard__metricIcon}>
              <GroupsRounded aria-hidden="true" />
            </span>
            <p>{metric.label[locale]}</p>
            <strong>{metric.value[locale]}</strong>
          </article>
        ))}
      </section>

      <section className={styles.teacherDashboard__section}>
        <div className={sharedStyles.teacherShared__sectionHeader}>
          <h2 className={sharedStyles.teacherShared__sectionTitle}>{copy.dashboard.groupsTitle}</h2>
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
              <span className={styles.teacherDashboard__progressTrack}>
                <span style={{ width: `${group.attendance}%` }} />
              </span>
              <span className={styles.teacherDashboard__attendance}>{group.attendance}%</span>
            </ScrollToTopLink>
          ))}
        </div>
      </section>

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
