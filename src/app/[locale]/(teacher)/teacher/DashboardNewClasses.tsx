import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import MeetingRoomRounded from "@mui/icons-material/MeetingRoomRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import {
  teacherGroupCapacity,
  teacherGroupCapacityPercentage,
} from "@/config/teacher/TeacherGroupCapacity";
import type { Locale } from "@/config/Locales";
import type { TeacherCopy, TeacherGroup } from "@/types/teacher/Teacher";

type DashboardNewClassesProps = {
  copy: TeacherCopy;
  groups: TeacherGroup[];
  locale: Locale;
};

export function DashboardNewClasses({ copy, groups, locale }: DashboardNewClassesProps) {
  const newGroups = groups.slice(0, 4);

  return (
    <section aria-labelledby="new-classes-title" className="teacherDashboard__today">
      <div className="teacherDashboard__todayHeader">
        <h2 id="new-classes-title">{copy.dashboard.newClassesTitle}</h2>
        <ScrollToTopLink
          className="teacherDashboard__sectionAction"
          href={`/${locale}/teacher/groups`}
        >
          {copy.dashboard.viewAll}
        </ScrollToTopLink>
      </div>
      {newGroups.length ? (
        <div className="teacherDashboard__scheduleScroller">
          {newGroups.map((group) => {
            const capacityPercentage = teacherGroupCapacityPercentage(group.learnerCount);
            return (
              <ScrollToTopLink
                className="teacherDashboard__scheduleCard"
                href={`/${locale}/teacher/groups/${group.slug}`}
                key={group.id}
              >
                <span className="teacherDashboard__scheduleTopline">
                  <span className="teacherDashboard__scheduleTime">
                    <AccessTimeRounded aria-hidden="true" />
                    <span>{group.time}</span>
                  </span>
                  <span className="teacherDashboard__scheduleStatus">
                    {copy.dashboard.newClassStatus}
                  </span>
                </span>
                <span className="teacherDashboard__scheduleIdentity">
                  <span>
                    <SchoolRounded aria-hidden="true" />
                  </span>
                  <strong>{group.name}</strong>
                </span>
                <span className="teacherDashboard__scheduleMeta">
                  <span>
                    <MeetingRoomRounded aria-hidden="true" />
                    {copy.reception.room} {group.room}
                  </span>
                  <span>
                    <GroupsRounded aria-hidden="true" />
                    {group.learnerCount}/{teacherGroupCapacity} {copy.reception.learnerCount}
                  </span>
                </span>
                <span className="teacherDashboard__scheduleProgress">
                  <span className="teacherDashboard__progressTrack">
                    <span style={{ width: `${capacityPercentage}%` }} />
                  </span>
                  <strong>{capacityPercentage}%</strong>
                </span>
              </ScrollToTopLink>
            );
          })}
        </div>
      ) : (
        <p className="teacherDashboard__scheduleEmpty">{copy.dashboard.newClassesEmpty}</p>
      )}
    </section>
  );
}
