import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Image from "next/image";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { getButtonClassName } from "@/components/ui/ButtonStyles";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CoursePosterCardProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CoursePosterCard({ course, locale, copy }: CoursePosterCardProps) {
  if (!course.posterImage || !course.posterAlt || !course.posterTitle) return null;

  return (
    <article className="publicShared__coursePosterCard">
      <ScrollToTopLink
        aria-label={`${copy.courses.viewDetails}: ${course.title[locale]}`}
        className="publicShared__coursePosterLink"
        href={`/${locale}/courses/${course.slug}`}
      >
        <Image
          alt={course.posterAlt[locale]}
          className="publicShared__coursePosterImage"
          data-course={course.slug}
          fill
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 31vw, 24rem"
          src={course.posterImage}
        />
        <span aria-hidden="true" className="publicShared__coursePosterScrim" />
        <div className="publicShared__coursePosterContent">
          <h2 className="publicShared__coursePosterTitle">{course.posterTitle[locale]}</h2>
          <span
            className={getButtonClassName({
              className: "publicShared__coursePosterAction",
              hoverEffect: "jump",
              shape: "pill",
              size: "small",
              variant: "inverseOutline",
            })}
          >
            <span>{copy.courses.viewDetails}</span>
            <span aria-hidden="true" className="publicShared__coursePosterActionIcon">
              <ArrowOutwardRounded />
            </span>
          </span>
        </div>
      </ScrollToTopLink>
    </article>
  );
}
