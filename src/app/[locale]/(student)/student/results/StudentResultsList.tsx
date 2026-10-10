import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { getStudentResultsTableCopy } from "@/dictionaries/student/StudentResultsTable";
import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import { studentResultSkills, type StudentResultRow } from "@/lib/student/StudentResultsTable";

import { StudentResultsRefresh } from "./StudentResultsRefresh";

type StudentResultsListProps = {
  locale: Locale;
  rows: readonly StudentResultRow[];
};

export function StudentResultsList({ locale, rows: sourceRows }: StudentResultsListProps) {
  const copy = getStudentResultsTableCopy(locale);
  const testsCopy = getStudentTestsCopy(locale);
  const rows = sourceRows.map((row) => ({
    ...row,
    title:
      row.practiceNumber === null
        ? row.title
        : `${testsCopy.practiceTestLabel} ${row.practiceNumber}`,
  }));
  const pending = rows.some((row) =>
    Object.values(row.cells).some((cell) => cell.status === "pending"),
  );

  return (
    <article className="studentResultsList" aria-label={copy.title}>
      <StudentResultsRefresh active={pending} />
      <div
        className="studentResultsList__tableScroll"
        tabIndex={0}
        role="region"
        aria-label={copy.title}
      >
        <table className="studentResultsList__table">
          <caption>{copy.title}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.test}</th>
              {studentResultSkills.map((skill) => (
                <th scope="col" key={skill}>
                  {skill.charAt(0) + skill.slice(1).toLowerCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="studentResultsList__empty" colSpan={5}>
                  {copy.empty}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={row.id}>
                  <th scope="row">
                    <div className="studentResultsList__test">
                      <span aria-hidden="true">{index + 1}</span>
                      {row.paperId ? (
                        <Link href={`/${locale}/student/tests/${row.paperId}`}>{row.title}</Link>
                      ) : (
                        <span>{row.title}</span>
                      )}
                    </div>
                  </th>
                  {studentResultSkills.map((skill) => {
                    const cell = row.cells[skill];
                    const result = cell.result;
                    return (
                      <td key={skill}>
                        {result ? (
                          <Link
                            className="studentResultsList__result"
                            href={`/${locale}/student/results/${result.attemptId}`}
                            aria-label={`${row.title} — ${skill.charAt(0) + skill.slice(1).toLowerCase()}: ${copy.open}`}
                          >
                            <span>
                              {skill === "LISTENING" || skill === "READING"
                                ? `${result.correctAnswerCount}/${result.totalQuestionCount}`
                                : result.practiceBand !== null
                                  ? `Band ${result.practiceBand.toFixed(1)}`
                                  : copy.released}
                            </span>
                            <OpenInNewRounded aria-hidden="true" />
                          </Link>
                        ) : cell.status === "inProgress" || cell.status === "pending" ? (
                          <span className="studentResultsList__status" data-status={cell.status}>
                            {copy[cell.status]}
                          </span>
                        ) : (
                          <span className="studentResultsList__status" aria-label={copy.notStarted}>
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
