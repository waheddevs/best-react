"use client";

import CancelRounded from "@mui/icons-material/CancelRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import { useMemo, useState } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentTestResultsCopy } from "@/dictionaries/student/StudentTestResults";
import type { StudentReleasedAttemptResultQuery } from "@/gql/graphql";
import { StudentResultHeader } from "./StudentResultHeader";

type Result = StudentReleasedAttemptResultQuery["studentReleasedAttemptResult"];

type StudentTestResultProps = {
  locale: Locale;
  result: Result;
};

export function StudentTestResult({ locale, result }: StudentTestResultProps) {
  const copy = getStudentTestResultsCopy(locale);
  const [selectedQuestionId, setSelectedQuestionId] = useState(
    result.answers[0]?.questionId ?? null,
  );
  const selectedAnswer = useMemo(
    () => result.answers.find(({ questionId }) => questionId === selectedQuestionId) ?? null,
    [result.answers, selectedQuestionId],
  );
  const section = selectedAnswer?.sectionId
    ? (result.sections.find(({ id }) => id === selectedAnswer.sectionId) ?? null)
    : null;

  return (
    <article className="studentTestResult">
      <StudentResultHeader
        locale={locale}
        backHref={`/${locale}/student/tests`}
        backLabel={copy.back}
        eyebrow={result.skill ?? copy.result}
        title={result.title}
        score={`${formatPercentage(result.percentage)}%`}
        scoreLabel={`${result.correctAnswerCount}/${result.totalQuestionCount} ${copy.score}`}
      />

      <section className="studentTestResult__layout">
        <div className="studentTestResult__answers">
          <div className="studentTestResult__sectionTitle">
            <h2>{copy.answerList}</h2>
          </div>
          <ol>
            {result.answers.map((answer) => (
              <li key={answer.questionId}>
                <button
                  aria-current={selectedQuestionId === answer.questionId ? "true" : undefined}
                  onClick={() => setSelectedQuestionId(answer.questionId)}
                  type="button"
                >
                  <span className="studentTestResult__answerHeader">
                    <span className="studentTestResult__questionNumber">{answer.position}.</span>
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
                  </span>
                  <strong>{answer.prompt}</strong>
                  <span className="studentTestResult__answerComparison">
                    <span className="studentTestResult__answerLine">
                      <small>{copy.yourAnswer}</small>
                      <span>{formatAnswers(answer.studentAnswer, copy.unanswered)}</span>
                    </span>
                    {!answer.isCorrect ? (
                      <span className="studentTestResult__answerLine">
                        <small>{copy.correctAnswer}</small>
                        <span>{formatAnswers(answer.correctAnswer, copy.unanswered)}</span>
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <aside className="studentTestResult__evidence">
          <div className="studentTestResult__sectionTitle">
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
