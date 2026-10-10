"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentDashboardCopy } from "@/dictionaries/student/StudentDashboard";
import { getStudentDashboardTestsCopy } from "@/dictionaries/student/StudentDashboardTests";
import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import { buildStudentDashboardTests } from "@/lib/student/StudentDashboardTests";
import type { StudentTestPaper } from "@/types/student/StudentTests";

const skillOrder = ["LISTENING", "READING", "WRITING", "SPEAKING"] as const;

export function StudentDashboardTests({
  papers,
  locale,
}: {
  papers: readonly StudentTestPaper[];
  locale: Locale;
}) {
  const [page, setPage] = useState(0);
  const copy = getStudentDashboardTestsCopy(locale);
  const testsCopy = getStudentTestsCopy(locale);
  const tests = buildStudentDashboardTests(papers);
  const pages = Math.max(1, Math.ceil(tests.length / 2));
  const current = Math.min(page, pages - 1);

  return (
    <section
      className="studentDashboard__card studentDashboard__card_tests"
      aria-labelledby="dashboard-tests-title"
    >
      <div className="studentDashboardGroup__heading">
        <div className="studentDashboardTests__title">
          <h2 id="dashboard-tests-title">{getStudentDashboardCopy(locale).tests}</h2>
          <span title={copy.count} aria-label={`${copy.count}: ${tests.length}`}>
            {tests.length}
          </span>
        </div>
        <Link href={`/${locale}/student/tests`} aria-label={copy.all} title={copy.all}>
          <ArrowForwardRounded aria-hidden="true" />
        </Link>
      </div>
      {tests.length ? (
        <ul className="studentDashboardTests__list">
          {tests.slice(current * 2, current * 2 + 2).map(({ paper, number }) => {
            const orderedSkills = skillOrder.flatMap((key) =>
              paper.skills.filter((skill) => skill.skill === key),
            );
            const active = orderedSkills.find(
              (skill) => skill.attemptStatus === "IN_PROGRESS" && skill.attemptId,
            );
            const href = active
              ? `/${locale}/student/tests/${paper.id}/${active.skill.toLowerCase()}/${active.attemptId}`
              : `/${locale}/student/tests/${paper.id}`;
            const skills = orderedSkills
              .map(({ skill }) => skill[0] + skill.slice(1).toLowerCase())
              .join(" · ");
            return (
              <li key={paper.id}>
                <Link className="studentDashboardTests__test" href={href}>
                  <span className="studentDashboardTests__number" aria-hidden="true">
                    {number}
                  </span>
                  <span className="studentDashboardTests__copy">
                    <strong>
                      {testsCopy.practiceTestLabel} {number}
                    </strong>
                    <span title={skills}>{skills}</span>
                  </span>
                  <span className="studentDashboardTests__action">
                    {active ? testsCopy.continueLabel : copy.open}
                    <ArrowForwardRounded aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="studentDashboardGroup__message">
          {papers.length ? copy.empty : copy.unavailable}
        </p>
      )}
      {pages > 1 ? (
        <nav className="studentDashboardTests__pagination" aria-label={copy.pagination}>
          <button
            type="button"
            disabled={current === 0}
            aria-label={testsCopy.previousPage}
            onClick={() => setPage(current - 1)}
          >
            <ArrowBackRounded aria-hidden="true" />
          </button>
          <span aria-live="polite" aria-atomic="true">
            {current + 1} / {pages}
          </span>
          <button
            type="button"
            disabled={current === pages - 1}
            aria-label={testsCopy.nextPage}
            onClick={() => setPage(current + 1)}
          >
            <ArrowForwardRounded aria-hidden="true" />
          </button>
        </nav>
      ) : null}
    </section>
  );
}
