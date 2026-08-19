import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { Course } from "@/types/PublicContent";

type CourseCardProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseCard({ course, locale, copy }: CourseCardProps) {
  return (
    <article className={styles.courses__card}>
      <Image
        src={course.image}
        alt={course.imageAlt[locale]}
        width={1448}
        height={1086}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className={styles.courses__cardImage}
      />
      <div className={styles.courses__cardContent}>
        <div className={styles.courses__cardHeader}>
          <span className={styles.courses__cardCategory}>
            {copy.courses.categories[course.category]}
          </span>
          <span className={styles.courses__cardIcon}>
            <AutoStoriesRounded aria-hidden="true" />
          </span>
        </div>
        <h2 className={styles.courses__cardTitle}>
          {course.title[locale]}
        </h2>
        <p className={styles.courses__cardSummary}>{course.summary[locale]}</p>
        <dl className={styles.courses__cardMeta}>
          <div className={styles.courses__cardMetaRow}>
            <dt className={styles.courses__cardMetaLabel}>{copy.courses.level}</dt>
            <dd className={styles.courses__cardMetaValue}>{course.level[locale]}</dd>
          </div>
          <div className={styles.courses__cardMetaRow}>
            <dt className={styles.courses__cardMetaIconLabel}>
              <ScheduleRounded aria-hidden="true" className={styles.courses__cardMetaIcon} />
              {copy.courses.format}
            </dt>
            <dd className={styles.courses__cardMetaValue}>{course.formatLabel[locale]}</dd>
          </div>
        </dl>
        <Link
          href={`/${locale}/courses/${course.slug}`}
          className={styles.courses__cardLink}
        >
          {copy.common.learnMore}
          <ArrowOutwardRounded aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
