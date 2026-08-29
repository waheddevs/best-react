import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import MeetingRoomRounded from "@mui/icons-material/MeetingRoomRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/groups.module.css";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import type { TeacherCopy, TeacherGroup } from "@/types/teacher/Teacher";

type GroupsCatalogProps = {
  copy: TeacherCopy;
  groups: TeacherGroup[];
  locale: Locale;
};

export function GroupsCatalog({ copy, groups, locale }: GroupsCatalogProps) {
  return (
    <main>
      <TeacherPageHeader
        description={copy.groups.description}
        eyebrow={copy.groups.eyebrow}
        title={copy.groups.pageTitle}
      />
      <section aria-label={copy.groups.pageTitle} className={styles.teacherGroups__catalog}>
        {groups.map((group) => (
          <article className={styles.teacherGroups__catalogCard} key={group.id}>
            <div className={styles.teacherGroups__catalogCardHeader}>
              <span className={styles.teacherGroups__catalogIcon}>
                <GroupsRounded aria-hidden="true" />
              </span>
              <span className={styles.teacherGroups__learnerCount}>
                {group.learnerCount} {copy.groups.learners}
              </span>
            </div>
            <h2>{group.name}</h2>
            <dl className={styles.teacherGroups__catalogMeta}>
              <div>
                <dt>
                  <MeetingRoomRounded aria-hidden="true" /> {copy.reception.room}
                </dt>
                <dd>{group.room}</dd>
              </div>
              <div>
                <dt>
                  <CalendarMonthRounded aria-hidden="true" /> {copy.groups.lessonDays}
                </dt>
                <dd>{group.lessonDays[locale]}</dd>
              </div>
              <div>
                <dt>
                  <ScheduleRounded aria-hidden="true" /> {copy.reception.time}
                </dt>
                <dd>{group.time}</dd>
              </div>
            </dl>
            <div className={styles.teacherGroups__catalogProgress}>
              <span>
                <span style={{ width: `${group.attendance}%` }} />
              </span>
              <strong>{group.attendance}%</strong>
            </div>
            <ScrollToTopLink
              aria-label={`${copy.groups.detail}: ${group.name}`}
              className={styles.teacherGroups__catalogLink}
              href={`/${locale}/teacher/groups/${group.slug}`}
            >
              <span>{copy.groups.detail}</span>
              <ArrowForwardRounded aria-hidden="true" />
            </ScrollToTopLink>
          </article>
        ))}
      </section>
    </main>
  );
}
