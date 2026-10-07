import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import NorthEastRounded from "@mui/icons-material/NorthEastRounded";
import SouthEastRounded from "@mui/icons-material/SouthEastRounded";

import type { Locale } from "@/config/Locales";
import { getStudentProgressCopy } from "@/dictionaries/student/StudentProgress";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";
import type { StudentProgress } from "@/types/student/StudentProgress";

import { StudentProgressChart } from "./StudentProgressChart";
import { StudentProgressLiveRefresh } from "./StudentProgressLiveRefresh";

type StudentProgressOverviewProps = { locale: Locale; progress: StudentProgress };

const skillIcons = {
  listening: <HeadphonesRounded aria-hidden="true" />,
  reading: <MenuBookRounded aria-hidden="true" />,
  writing: <EditNoteRounded aria-hidden="true" />,
  speaking: <MicRounded aria-hidden="true" />,
};

export function StudentProgressOverview({ locale, progress }: StudentProgressOverviewProps) {
  const hero = getStudentWorkspaceCopy(locale).sections.progress;
  const copy = getStudentProgressCopy(locale);

  return (
    <article className="studentWorkspace studentProgress">
      <StudentProgressLiveRefresh />
      <StudentSectionHero
        description={hero.description}
        eyebrow={hero.eyebrow}
        kind="progress"
        label={copy.scoredSkills}
        locale={locale}
        title={hero.title}
        value={progress.scoredSkillCount}
      />

      <div className="studentProgress__layout">
        <div className="studentProgress__skills">
          {progress.skills.map((skill) => (
            <section className="studentProgress__skillCard" data-skill={skill.id} key={skill.id}>
              <div className="studentProgress__skillHeading">
                <h2>{skill.label}</h2>
                <span className="studentProgress__skillIcon">{skillIcons[skill.id]}</span>
              </div>
              <div className="studentProgress__scoreRow">
                <strong className="studentProgress__skillPercentage">
                  {skill.percentage === null ? "—" : `${formatPercentage(skill.percentage)}%`}
                </strong>
                <span
                  className="studentProgress__trend"
                  data-direction={skill.change !== null && skill.change < 0 ? "down" : "up"}
                >
                  {skill.status === "scored" ? (
                    <span className="studentProgress__trendBadge" data-kind={skill.change === null ? "first" : "change"}>
                      {skill.change === null ? copy.firstResultBadge : (
                        <>
                          {skill.change < 0 ? (
                            <SouthEastRounded aria-hidden="true" />
                          ) : (
                            <NorthEastRounded aria-hidden="true" />
                          )}
                          {skill.change > 0 ? "+" : ""}
                          {formatPercentage(skill.change)}%
                        </>
                      )}
                    </span>
                  ) : null}
                  <small>
                    {skill.change !== null
                      ? copy.trend
                      : skill.status === "pending"
                        ? copy.pending
                        : skill.status === "scored"
                          ? copy.firstResult
                          : copy.unavailable}
                  </small>
                </span>
              </div>
              <div
                aria-label={skill.percentage === null ? undefined : `${skill.label}: ${skill.percentage}%`}
                aria-valuemax={skill.percentage === null ? undefined : 100}
                aria-valuemin={skill.percentage === null ? undefined : 0}
                aria-valuenow={skill.percentage ?? undefined}
                className="studentProgress__skillBar"
                role={skill.percentage === null ? undefined : "progressbar"}
              >
                <span style={{ width: `${skill.percentage ?? 0}%` }} />
              </div>
            </section>
          ))}
        </div>
        <StudentProgressChart locale={locale} progress={progress} />
      </div>
    </article>
  );
}

function formatPercentage(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
