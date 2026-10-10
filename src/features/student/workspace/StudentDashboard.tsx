import type { Locale } from "@/config/Locales";
import { studentSettingsPreview } from "@/data/student/StudentSettingsPreview";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadStudentSettingsIdentity } from "@/lib/student/StudentSettingsData";
import { getStudentTestPapers } from "@/lib/student/StudentTestData";
import {
  loadStudentDashboardGroup,
  loadStudentDashboardProgress,
} from "@/lib/student/StudentDashboardData";

import { StudentSectionHero } from "./StudentSectionHero";
import { StudentDashboardGroup } from "./StudentDashboardGroup";
import { StudentDashboardTests } from "./StudentDashboardTests";
import { StudentDashboardProgress } from "./StudentDashboardProgress";
import { StudentProgressLiveRefresh } from "./StudentProgressLiveRefresh";

type StudentDashboardProps = { locale: Locale };

export async function StudentDashboard({ locale }: StudentDashboardProps) {
  const copy = getStudentWorkspaceCopy(locale);
  const identity = isDashboardPreviewEnabled()
    ? studentSettingsPreview
    : await loadStudentSettingsIdentity().catch(() => null);
  const firstName = identity?.displayName.trim().split(/\s+/)[0];
  const [papers, groupState] = await Promise.all([
    getStudentTestPapers(locale),
    loadStudentDashboardGroup()
      .then((group) => ({ group, failed: false }))
      .catch(() => ({ group: null, failed: true })),
  ]);
  const progress = await loadStudentDashboardProgress(locale, papers)
    .then((rows) => ({ rows, failed: false }))
    .catch(() => ({ rows: [], failed: true }));
  const writingCount = papers.reduce(
    (count, paper) => count + paper.skills.filter((skill) => skill.skill === "WRITING").length,
    0,
  );
  const section = copy.sections.dashboard;

  return (
    <article className="studentDashboard">
      <StudentProgressLiveRefresh />
      <StudentSectionHero
        description={section.description}
        eyebrow={section.eyebrow}
        kind="dashboard"
        locale={locale}
        title={firstName ? `${section.title}, ${firstName}` : section.title}
        value={writingCount}
      />
      <div className="studentDashboard__cards">
        <StudentDashboardGroup
          locale={locale}
          group={groupState.group}
          failed={groupState.failed}
        />
        <StudentDashboardProgress
          locale={locale}
          rows={progress.rows.slice(0, 1)}
          failed={progress.failed}
        />
        <StudentDashboardTests locale={locale} papers={papers} />
      </div>
    </article>
  );
}
