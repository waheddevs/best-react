import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type CourseBackActionProps = {
  locale: Locale;
  copy: PageCopy;
};

export function CourseBackAction({ locale, copy }: CourseBackActionProps) {
  return (
    <div className={styles.courses__backAction}>
      <ButtonLink
        href={`/${locale}/courses`}
        shape="pill"
        startIcon={<ArrowBackRounded />}
        variant="outline"
      >
        {copy.courses.backToCourses}
      </ButtonLink>
    </div>
  );
}
