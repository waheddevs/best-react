"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentDashboardCopy } from "@/dictionaries/student/StudentDashboard";
import { getStudentDashboardProgressCopy } from "@/dictionaries/student/StudentDashboardProgress";
import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import type { StudentDashboardProgressRow } from "@/lib/student/StudentDashboardProgress";
import { studentResultSkills } from "@/lib/student/StudentResultsTable";

const icons = {
  LISTENING: HeadphonesRounded,
  READING: MenuBookRounded,
  WRITING: EditNoteRounded,
  SPEAKING: MicRounded,
};

export function StudentDashboardProgress({
  rows,
  failed,
  locale,
}: {
  rows: readonly StudentDashboardProgressRow[];
  failed: boolean;
  locale: Locale;
}) {
  const [refreshing, startTransition] = useTransition();
  const router = useRouter();
  const copy = getStudentDashboardProgressCopy(locale);
  const testsCopy = getStudentTestsCopy(locale);
  const selected = rows[0];
  const title = (row: StudentDashboardProgressRow) =>
    row.practiceNumber === null
      ? row.title
      : `${testsCopy.practiceTestLabel} ${row.practiceNumber}`;
  const changedSkills = selected
    ? studentResultSkills.filter((skill) => selected.changes[skill])
    : [];

  return (
    <section
      className="studentDashboard__card studentDashboard__card_progress"
      aria-labelledby="dashboard-progress-title"
    >
      <div className="studentDashboardGroup__heading">
        <h2 id="dashboard-progress-title">{getStudentDashboardCopy(locale).progress}</h2>
        <Link href={`/${locale}/student/progress`} aria-label={copy.open} title={copy.open}>
          <ArrowForwardRounded aria-hidden="true" />
        </Link>
      </div>
      {failed ? (
        <div className="studentDashboardGroup__message" role="alert">
          <p>{copy.error}</p>
          <button
            type="button"
            disabled={refreshing}
            aria-busy={refreshing}
            onClick={() => startTransition(() => router.refresh())}
          >
            {copy.retry}
          </button>
        </div>
      ) : selected ? (
        <>
          <p className="studentDashboardProgress__testTitle">{title(selected)}</p>
          <ul className="studentDashboardProgress__skills">
            {studentResultSkills.map((skill) => {
              const Icon = icons[skill];
              const cell = selected.cells[skill];
              const result = cell.result;
              const objective = skill === "LISTENING" || skill === "READING";
              const label = skill[0] + skill.slice(1).toLowerCase();
              const score = result
                ? objective
                  ? `${result.correctAnswerCount}/${result.totalQuestionCount}`
                  : result.practiceBand !== null
                    ? `Band ${result.practiceBand.toFixed(1)}`
                    : copy.ready
                : cell.status === "empty"
                  ? copy.notStarted
                  : cell.status === "ready"
                    ? copy.ready
                    : copy[cell.status];
              return (
                <li key={skill} data-skill={skill}>
                  <span className="studentDashboardProgress__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div className="studentDashboardProgress__skillBody">
                    <div className="studentDashboardProgress__skillTop">
                      <strong>{label}</strong>
                      {result ? (
                        <Link
                          href={`/${locale}/student/results/${result.attemptId}`}
                          aria-label={`${label}: ${score}`}
                        >
                          {score}
                          <ArrowForwardRounded aria-hidden="true" />
                        </Link>
                      ) : (
                        <span className="studentDashboardProgress__status">{score}</span>
                      )}
                    </div>
                    {objective && result ? (
                      <div
                        className="studentDashboardProgress__track"
                        role="progressbar"
                        aria-label={label}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.max(0, Math.min(100, result.percentage))}
                        aria-valuetext={score}
                      >
                        <span
                          style={{ width: `${Math.max(0, Math.min(100, result.percentage))}%` }}
                        />
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          {changedSkills.length ? (
            <footer className="studentDashboardProgress__comparison">
              <span>{copy.compared}</span>
              <div>
                {changedSkills.map((skill) => {
                  const change = selected.changes[skill]!;
                  return (
                    <span
                      key={skill}
                      data-direction={change.value > 0 ? "up" : change.value < 0 ? "down" : "same"}
                    >
                      {skill[0] + skill.slice(1).toLowerCase()}{" "}
                      <strong>
                        {change.value > 0 ? "+" : ""}
                        {change.value} {copy[change.kind]}
                      </strong>
                    </span>
                  );
                })}
              </div>
            </footer>
          ) : null}
        </>
      ) : (
        <p className="studentDashboardGroup__message">{copy.empty}</p>
      )}
    </section>
  );
}
