"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import TimerOutlined from "@mui/icons-material/TimerOutlined";

import type { Locale } from "@/config/Locales";
import styles from "@/css/student/testRunner.module.css";
import { useStudentTestRunner } from "@/hooks/student/tests/useStudentTestRunner";
import type {
  StudentPreviewQuestion,
  StudentTestRunnerCopy,
} from "@/types/student/StudentTestRunner";
import type { StudentWorkspaceRecord } from "@/types/student/StudentWorkspace";

import { StudentQuestionInput } from "./StudentQuestionInput";
import { StudentTestDialog } from "./StudentTestDialog";
import { StudentTestNavigator } from "./StudentTestNavigator";

type StudentTestRunnerProps = {
  copy: StudentTestRunnerCopy;
  locale: Locale;
  questions: StudentPreviewQuestion[];
  test: StudentWorkspaceRecord;
};

export function StudentTestRunner({ copy, locale, questions, test }: StudentTestRunnerProps) {
  /* HOOKS */
  const runner = useStudentTestRunner(questions);
  const question = questions[runner.currentIndex];
  if (!question) return null;

  const isReviewed = runner.reviewIds.includes(question.id);

  return (
    <article className={styles.testRunner}>
      <header className={styles.testRunner__header}>
        <button onClick={runner.handleExitRequest} type="button">
          <ArrowBackRounded aria-hidden="true" />
          {copy.exitLabel}
        </button>
        <div>
          <span>{test.detail}</span>
          <h1>{test.title}</h1>
        </div>
        <div className={styles.testRunner__timer}>
          <TimerOutlined aria-hidden="true" />
          <span>{copy.timerLabel}</span>
          <strong>24:18</strong>
        </div>
      </header>

      <p className={styles.testRunner__notice}>{copy.previewNotice}</p>

      <div className={styles.testRunner__layout}>
        <StudentTestNavigator copy={copy} questions={questions} runner={runner} />

        <section className={styles.testRunner__question}>
          <div className={styles.testRunner__questionTop}>
            <span>
              {copy.questionLabel} {runner.currentIndex + 1} / {questions.length}
            </span>
            <button aria-pressed={isReviewed} onClick={runner.handleReviewToggle} type="button">
              <FlagOutlined aria-hidden="true" />
              {copy.reviewLabel}
            </button>
          </div>
          <h2>{question.prompt}</h2>
          <StudentQuestionInput copy={copy} question={question} runner={runner} />
          <footer>
            <button
              disabled={runner.currentIndex === 0}
              onClick={runner.handlePrevious}
              type="button"
            >
              {copy.previousLabel}
            </button>
            {runner.currentIndex === questions.length - 1 ? (
              <button onClick={runner.handleSubmitRequest} type="button">
                {copy.submitLabel}
              </button>
            ) : (
              <button onClick={runner.handleNext} type="button">
                {copy.nextLabel}
              </button>
            )}
          </footer>
        </section>
      </div>

      <StudentTestDialog copy={copy} locale={locale} runner={runner} />
    </article>
  );
}
