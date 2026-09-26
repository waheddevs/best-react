"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentTestResultsCopy } from "@/dictionaries/student/StudentTestResults";
import type { StudentReleasedAttemptResultQuery } from "@/gql/graphql";

type Result = StudentReleasedAttemptResultQuery["studentReleasedAttemptResult"];

type ConnectedStudentTestResultProps = {
  locale: Locale;
  result: Result;
};

export function ConnectedStudentTestResult({
  locale,
  result,
}: ConnectedStudentTestResultProps) {
  const copy = getStudentTestResultsCopy(locale);
  const [selectedQuestionId, setSelectedQuestionId] = useState(
    result.answers[0]?.questionId ?? null,
  );
  const selectedAnswer = useMemo(
    () =>
      result.answers.find(({ questionId }) => questionId === selectedQuestionId) ??
      null,
    [result.answers, selectedQuestionId],
  );
  const section = selectedAnswer?.sectionId
    ? result.sections.find(({ id }) => id === selectedAnswer.sectionId) ?? null
    : null;

  return (
    <article className="studentTestResult">
      <header className="studentTestResult__header">
        <Link href={`/${locale}/student/tests`}>
          <ArrowBackRounded aria-hidden="true" />
          {copy.back}
        </Link>
        <div>
          <span>{result.skill}</span>
          <h1>{result.title}</h1>
        </div>
        <div className="studentTestResult__score">
          <strong>{formatPercentage(result.percentage)}%</strong>
          <span>
            {result.correctAnswerCount}/{result.totalQuestionCount} {copy.score}
          </span>
        </div>
      </header>

      <section className="studentTestResult__layout">
        <div className="studentTestResult__answers">
          <div className="studentTestResult__sectionTitle">
            <span>{copy.result}</span>
            <h2>{copy.answerList}</h2>
          </div>
          <ol>
            {result.answers.map((answer) => (
              <li key={answer.questionId}>
                <button
                  aria-current={
                    selectedQuestionId === answer.questionId ? "true" : undefined
                  }
                  onClick={() => setSelectedQuestionId(answer.questionId)}
                  type="button"
                >
                  <span
                    className={
                      answer.isCorrect
                        ? "studentTestResult__status studentTestResult__status_correct"
                        : "studentTestResult__status studentTestResult__status_incorrect"
                    }
                  >
                    {answer.isCorrect ? (
                      <CheckCircleRounded aria-hidden="true" />
                    ) : (
                      <CancelRounded aria-hidden="true" />
                    )}
                    {answer.isCorrect ? copy.correct : copy.incorrect}
                  </span>
                  <strong>
                    {answer.position}. {answer.prompt}
                  </strong>
                  <span className="studentTestResult__answerLine">
                    <small>{copy.yourAnswer}</small>
                    {formatAnswers(answer.studentAnswer, copy.unanswered)}
                  </span>
                  {!answer.isCorrect ? (
                    <span className="studentTestResult__answerLine">
                      <small>{copy.correctAnswer}</small>
                      {formatAnswers(answer.correctAnswer, copy.unanswered)}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <aside className="studentTestResult__evidence">
          <div className="studentTestResult__sectionTitle">
            <span>
              {result.skill === "LISTENING"
                ? copy.listeningSource
                : copy.readingSource}
            </span>
            <h2>{copy.evidence}</h2>
          </div>
          {!selectedAnswer ? <p>{copy.selectAnswer}</p> : null}
          {selectedAnswer && section ? (
            <div className="studentTestResult__source">
              <h3>{section.title}</h3>
              <EvidenceText
                content={section.content}
                endOffset={selectedAnswer.evidenceEndOffset}
                fallback={copy.evidenceEmpty}
                startOffset={selectedAnswer.evidenceStartOffset}
              />
            </div>
          ) : selectedAnswer ? (
            <p>{copy.evidenceEmpty}</p>
          ) : null}
        </aside>
      </section>
    </article>
  );
}

function EvidenceText({
  content,
  endOffset,
  fallback,
  startOffset,
}: {
  content: string;
  endOffset: number | null;
  fallback: string;
  startOffset: number | null;
}) {
  if (
    startOffset === null ||
    endOffset === null ||
    startOffset < 0 ||
    endOffset <= startOffset ||
    endOffset > content.length
  ) {
    return (
      <>
        <p className="studentTestResult__sourceText">{content}</p>
        <p className="studentTestResult__sourceFallback">{fallback}</p>
      </>
    );
  }

  return (
    <p className="studentTestResult__sourceText">
      {content.slice(0, startOffset)}
      <mark>{content.slice(startOffset, endOffset)}</mark>
      {content.slice(endOffset)}
    </p>
  );
}

function formatAnswers(answers: readonly string[], fallback: string): string {
  return answers.length > 0 ? answers.join(", ") : fallback;
}

function formatPercentage(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
