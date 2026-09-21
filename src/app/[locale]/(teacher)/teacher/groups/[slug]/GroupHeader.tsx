import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import type { TeacherCopy, TeacherGroup } from "@/types/teacher/Teacher";

import { GroupEditAction } from "./GroupEditAction";

type GroupHeaderProps = {
  connected: boolean;
  copy: TeacherCopy;
  group: TeacherGroup;
  locale: Locale;
};

export function GroupHeader({ connected, copy, group, locale }: GroupHeaderProps) {
  return (
    <header className="teacherGroups__detailHeader">
      <ScrollToTopLink
        aria-label={copy.common.back}
        className="teacherGroups__backLink"
        href={`/${locale}/teacher/groups`}
      >
        <ArrowBackRounded />
      </ScrollToTopLink>
      <span className="teacherGroups__detailIcon">
        <GroupsRounded aria-hidden="true" />
      </span>
      <div className="teacherGroups__detailCopy">
        <p>{copy.groups.detailEyebrow}</p>
        <h1>{group.name}</h1>
        <span>
          {group.room} · {group.lessonDays[locale]} · {group.time}
        </span>
      </div>
      <div className="teacherGroups__detailActions">
        <GroupEditAction connected={connected} copy={copy} group={group} />
      </div>
    </header>
  );
}
