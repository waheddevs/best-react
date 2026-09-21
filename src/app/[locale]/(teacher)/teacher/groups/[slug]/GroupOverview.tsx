import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import AssignmentTurnedInRounded from "@mui/icons-material/AssignmentTurnedInRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import QuizRounded from "@mui/icons-material/QuizRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { formatGroupWorkspaceDate } from "@/lib/teacher/TeacherGroupDate";
import { getNextGroupClassDate } from "@/lib/teacher/TeacherSchedule";
import type {
  TeacherCopy,
  TeacherGroup,
  TeacherGroupOverviewMetrics,
  TeacherGroupRosterSummary,
} from "@/types/teacher/Teacher";

type GroupOverviewProps = {
  copy: TeacherCopy;
  group: TeacherGroup;
  locale: Locale;
  metrics: TeacherGroupOverviewMetrics;
  rosterSummary: TeacherGroupRosterSummary | null;
};

export function GroupOverview({ copy, group, locale, metrics, rosterSummary }: GroupOverviewProps) {
  const nextClassDate = getNextGroupClassDate(group);
  const highlights = [
    {
      icon: AssignmentTurnedInRounded,
      label: copy.groupWorkspace.activeAssignments,
      value: metrics.activeAssignments,
    },
    {
      icon: QuizRounded,
      label: copy.groupWorkspace.scheduledTests,
      value: metrics.scheduledTests,
    },
    {
      icon: DescriptionRounded,
      label: copy.groupWorkspace.totalMaterials,
      value: metrics.materials,
    },
    { icon: CalendarMonthRounded, label: copy.groups.learners, value: metrics.students },
  ];
  const pulse = rosterSummary
    ? [
        { key: "active", label: copy.groups.active, value: rosterSummary.active },
        { key: "paused", label: copy.groups.paused, value: rosterSummary.paused },
        { key: "debtor", label: copy.groups.debtors, value: rosterSummary.debtor },
      ]
    : [];
  const pulseTotal = pulse.reduce((sum, item) => sum + item.value, 0);
  const activeStop = pulseTotal > 0 ? ((rosterSummary?.active ?? 0) / pulseTotal) * 100 : 0;
  const pausedStop =
    pulseTotal > 0
      ? (((rosterSummary?.active ?? 0) + (rosterSummary?.paused ?? 0)) / pulseTotal) * 100
      : 0;
  const pulseRingBackground =
    pulseTotal > 0
      ? `conic-gradient(var(--teacher-success) 0% ${activeStop}%, var(--teacher-warning) ${activeStop}% ${pausedStop}%, var(--teacher-danger) ${pausedStop}% 100%)`
      : undefined;

  return (
    <section
      aria-labelledby="group-overview-title"
      className="teacherGroups__overview teacherGroups__workspaceSection"
    >
      <div className="teacherGroups__sectionIntro">
        <div>
          <h2 id="group-overview-title">{copy.groupWorkspace.overviewTitle}</h2>
          <p>{copy.groupWorkspace.overviewDescription}</p>
        </div>
      </div>

      <div className="teacherGroups__overviewMetrics">
        {highlights.map(({ icon: Icon, label, value }) => (
          <article key={label}>
            <span>
              <Icon aria-hidden="true" />
            </span>
            <strong>{value}</strong>
            <small>{label}</small>
          </article>
        ))}
      </div>

      <div className="teacherGroups__overviewHub">
        <article className="teacherGroups__overviewNext">
          <div className="teacherGroups__overviewPanelHeading">
            <h3>{copy.groupWorkspace.nextClass}</h3>
            <small>{copy.groupWorkspace.accordingToSchedule}</small>
          </div>
          {nextClassDate ? (
            <div className="teacherGroups__overviewClassFacts">
              <span>
                <CalendarMonthRounded aria-hidden="true" />
                {formatGroupWorkspaceDate(nextClassDate, locale, copy.dashboard.scheduleMonths)}
              </span>
              <span>
                <AccessTimeRounded aria-hidden="true" />
                {group.time}
              </span>
              <span>
                <PlaceOutlined aria-hidden="true" />
                {copy.groupWorkspace.room} {group.room}
              </span>
            </div>
          ) : (
            <p className="teacherGroups__overviewEmpty">{copy.groupWorkspace.noClassSchedule}</p>
          )}
          <p className="teacherGroups__overviewComingSoon">
            <DescriptionRounded aria-hidden="true" />
            {copy.groupWorkspace.materialsTestsComingSoon}
          </p>
        </article>

        <article className="teacherGroups__overviewPulse">
          <div className="teacherGroups__overviewPanelHeading">
            <h3>{copy.groupWorkspace.studentPulse}</h3>
            <ScrollToTopLink href={`/${locale}/teacher/groups/${group.slug}/students`}>
              {copy.groupWorkspace.viewStudents}
            </ScrollToTopLink>
          </div>
          {rosterSummary ? (
            <div className="teacherGroups__overviewPulseBody">
              <div
                className="teacherGroups__overviewPulseRing"
                style={{ background: pulseRingBackground }}
              >
                <div className="teacherGroups__overviewPulseRingCenter">
                  <strong>{rosterSummary.total}</strong>
                  <span>{copy.groups.total}</span>
                </div>
              </div>
              <div className="teacherGroups__overviewPulseStats">
                {pulse.map((item) => (
                  <div key={item.key} data-status={item.key}>
                    <i aria-hidden="true" />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="teacherGroups__overviewEmpty">
              {copy.groupWorkspace.previewStudentPulse}
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
