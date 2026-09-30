import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRounded from "@mui/icons-material/PendingActionsRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { getStudentTestResultsCopy } from "@/dictionaries/student/StudentTestResults";
import type { StudentResultsQuery } from "@/gql/graphql";

type ResultNode = StudentResultsQuery["studentResults"]["edges"][number]["node"];

type StudentResultsListProps = {
  locale: Locale;
  results: readonly ResultNode[];
};

export function StudentResultsList({ locale, results }: StudentResultsListProps) {
  const copy = getStudentTestResultsCopy(locale);

  return (
    <article className="studentResultsList">
      <header className="studentResultsList__header">
        <span>{copy.result}</span>
        <h1>{copy.resultsTitle}</h1>
        <p>{copy.resultsDescription}</p>
      </header>

      {results.length > 0 ? (
        <div className="studentResultsList__grid">
          {results.map((result) => {
            const hasDetail =
              result.skill === "SPEAKING" ||
              result.skill === "LISTENING" || result.skill === "READING";
            const content = (
              <>
                <div className="studentResultsList__cardTop">
                  <span>{result.skill ?? copy.result}</span>
                  {hasDetail ? (
                    <CheckCircleRounded aria-hidden="true" />
                  ) : (
                    <PendingActionsRounded aria-hidden="true" />
                  )}
                </div>
                <h2>{result.title}</h2>
                <strong>
                  {result.skill === "SPEAKING" && result.practiceBand !== null
                    ? `Band ${result.practiceBand.toFixed(1)}`
                    : `${formatPercentage(result.percentage)}%`}
                </strong>
                {result.skill !== "SPEAKING" ? (
                  <p>
                    {result.correctAnswerCount}/{result.totalQuestionCount} {copy.score}
                  </p>
                ) : null}
                {hasDetail ? (
                  <span className="studentResultsList__open">
                    {copy.answerList}
                    <ArrowForwardRounded aria-hidden="true" />
                  </span>
                ) : null}
              </>
            );

            return hasDetail ? (
              <Link
                className="studentResultsList__card"
                href={`/${locale}/student/results/${result.attemptId}`}
                key={result.attemptId}
              >
                {content}
              </Link>
            ) : (
              <section
                className="studentResultsList__card studentResultsList__card_static"
                key={result.attemptId}
              >
                {content}
              </section>
            );
          })}
        </div>
      ) : (
        <p className="studentResultsList__empty">{copy.empty}</p>
      )}
    </article>
  );
}

function formatPercentage(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
