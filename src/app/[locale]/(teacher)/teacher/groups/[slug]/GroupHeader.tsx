import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/groups.module.css";
import type { TeacherCopy, TeacherGroup } from "@/types/teacher/Teacher";

type GroupHeaderProps = {
  copy: TeacherCopy;
  group: TeacherGroup;
  locale: Locale;
};

export function GroupHeader({ copy, group, locale }: GroupHeaderProps) {
  return (
    <header className={styles.teacherGroups__detailHeader}>
      <ScrollToTopLink
        aria-label={copy.common.back}
        className={styles.teacherGroups__backLink}
        href={`/${locale}/teacher/groups`}
      >
        <ArrowBackRounded />
      </ScrollToTopLink>
      <span className={styles.teacherGroups__detailIcon}>
        <GroupsRounded aria-hidden="true" />
      </span>
      <div className={styles.teacherGroups__detailCopy}>
        <p>{copy.common.previewLabel}</p>
        <h1>{group.name}</h1>
        <span>
          {group.room} · {group.lessonDays[locale]} · {group.time}
        </span>
      </div>
      <span className={styles.teacherGroups__groupState}>
        <CheckCircleRounded aria-hidden="true" />
        {copy.groups.groupState}
      </span>
    </header>
  );
}
