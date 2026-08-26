import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";

import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseSidebarProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseSidebar({ course, locale, copy }: CourseSidebarProps) {
  return (
    <aside className={styles.courses__sidebar}>
      <dl className={styles.courses__sidebarMeta}>
        <div>
          <dt className={styles.courses__sidebarLabel}>{copy.courses.level}</dt>
          <dd className={styles.courses__sidebarValue}>{course.level[locale]}</dd>
        </div>
        <div>
          <dt className={styles.courses__sidebarLabel}>{copy.courses.format}</dt>
          <dd className={styles.courses__sidebarValue}>{course.formatLabel[locale]}</dd>
        </div>
        <div>
          <dt className={styles.courses__sidebarIconLabel}>
            <AccessTimeRounded aria-hidden="true" className={styles.courses__sidebarIcon} />
            {copy.courses.duration}
          </dt>
          <dd className={styles.courses__sidebarValue}>{course.duration[locale]}</dd>
        </div>
        <div>
          <dt className={styles.courses__sidebarIconLabel}>
            <CalendarMonthRounded aria-hidden="true" className={styles.courses__sidebarIcon} />
            {copy.courses.schedule}
          </dt>
          <dd className={styles.courses__sidebarValue}>{course.schedule[locale]}</dd>
        </div>
      </dl>
      <h2 className={styles.courses__sidebarTitle}>{copy.courses.detailCtaTitle}</h2>
      <div className={styles.courses__sidebarAction}>
        <ButtonLink href={`/${locale}/contact`}>{copy.common.contactCta}</ButtonLink>
      </div>
    </aside>
  );
}
