import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseCardProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseCard({ course, locale, copy }: CourseCardProps) {
  return (
    <article className={styles.courses__card}>
      {course.image && course.imageAlt ? (
        <Image
          src={course.image}
          alt={course.imageAlt[locale]}
          width={1448}
          height={1086}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={styles.courses__cardImage}
        />
      ) : null}
      <div className={styles.courses__cardContent}>
        <div className={styles.courses__cardHeader}>
          <span className={styles.courses__cardCategory}>
            {copy.courses.categories[course.category]}
          </span>
          <span className={styles.courses__cardIcon}>
            <AutoStoriesRounded aria-hidden="true" />
          </span>
        </div>
        <h2 className={styles.courses__cardTitle}>{course.title[locale]}</h2>
        <p className={styles.courses__cardSummary}>{course.summary[locale]}</p>
        <ul className={styles.courses__cardHighlights}>
          {course.highlights[locale].slice(0, 3).map((highlight) => (
            <li className={styles.courses__cardHighlight} key={highlight}>
              <CheckRounded aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <dl className={styles.courses__cardMeta}>
          <div className={styles.courses__cardMetaRow}>
            <dt className={styles.courses__cardMetaLabel}>{copy.courses.level}</dt>
            <dd className={styles.courses__cardMetaValue}>{course.level[locale]}</dd>
          </div>
          <div className={styles.courses__cardMetaRow}>
            <dt className={styles.courses__cardMetaIconLabel}>
              <ScheduleRounded aria-hidden="true" className={styles.courses__cardMetaIcon} />
              {copy.courses.duration}
            </dt>
            <dd className={styles.courses__cardMetaValue}>{course.duration[locale]}</dd>
          </div>
        </dl>
        <ButtonLink
          href={`/${locale}/courses/${course.slug}`}
          className={styles.courses__cardLink}
          endIcon={<ArrowOutwardRounded />}
          size="small"
          variant="outline"
        >
          {copy.common.learnMore}
        </ButtonLink>
      </div>
    </article>
  );
}
