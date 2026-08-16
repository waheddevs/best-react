import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CourseCardProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseCard({ course, locale, copy }: CourseCardProps) {
  return (
    <article className="course-card">
      <Image
        src={course.image}
        alt={course.imageAlt[locale]}
        width={1448}
        height={1086}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="course-card__2"
      />
      <div className="course-card__3">
        <div className="course-card__4">
          <span className="course-card__5">{copy.courses.categories[course.category]}</span>
          <span className="course-card__6">
            <AutoStoriesRounded aria-hidden="true" />
          </span>
        </div>
        <h2 className="course-card__7">{course.title[locale]}</h2>
        <p className="course-card__8">{course.summary[locale]}</p>
        <dl className="course-card__9">
          <div className="course-card__10">
            <dt className="course-card__11">{copy.courses.level}</dt>
            <dd className="course-card__12">{course.level[locale]}</dd>
          </div>
          <div className="course-card__13">
            <dt className="course-card__14">
              <ScheduleRounded aria-hidden="true" sx={{ fontSize: 18 }} />
              {copy.courses.format}
            </dt>
            <dd className="course-card__15">{course.formatLabel[locale]}</dd>
          </div>
        </dl>
        <Link href={`/website/courses/${course.slug}`} className="course-card__16">
          {copy.common.learnMore}
          <ArrowOutwardRounded aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
