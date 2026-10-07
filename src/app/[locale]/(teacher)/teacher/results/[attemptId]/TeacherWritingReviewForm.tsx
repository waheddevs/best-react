"use client";

import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";
import {
  TeacherSaveWritingAttemptReviewDocument,
  type TeacherWritingAttemptReviewQuery,
  type WritingTaskRubricInput,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { toPublicApiError } from "@/lib/apollo/ApolloError";

import { TeacherResultDetailHeader } from "./TeacherResultDetailHeader";

type Review = TeacherWritingAttemptReviewQuery["teacherWritingAttemptReview"];
type ScoreKey =
  "taskAchievement" | "coherenceCohesion" | "lexicalResource" | "grammaticalRangeAccuracy";
const feedbackMaxLength = 5000;

const criteria: ScoreKey[] = [
  "taskAchievement",
  "coherenceCohesion",
  "lexicalResource",
  "grammaticalRangeAccuracy",
];

function initialTask(
  task: NonNullable<Review["review"]>["task1"] | null | undefined,
): WritingTaskRubricInput {
  return {
    taskAchievement: task?.taskAchievement ?? 0,
    coherenceCohesion: task?.coherenceCohesion ?? 0,
    lexicalResource: task?.lexicalResource ?? 0,
    grammaticalRangeAccuracy: task?.grammaticalRangeAccuracy ?? 0,
    feedback: task?.feedback ?? "",
  };
}

function isValidBand(value: number) {
  return Number.isFinite(value) && value >= 0 && value <= 9 && Number.isInteger(value * 2);
}

export function TeacherWritingReviewForm({ locale, review }: { locale: Locale; review: Review }) {
  const copy = getTeacherResultsCopy(locale);
  const router = useRouter();
  const confirm = useConfirmDialog();
  const [tasks, setTasks] = useState({
    task1: initialTask(review.review?.task1),
    task2: initialTask(review.review?.task2),
  });
  const [feedback, setFeedback] = useState(review.review?.feedback ?? "");
  const [updatedAt, setUpdatedAt] = useState(review.review?.updatedAt ?? null);
  const [status, setStatus] = useState(review.status);
  const [message, setMessage] = useState("");
  const [saveReview, { loading }] = useMutation(TeacherSaveWritingAttemptReviewDocument, {
    context: { authenticated: true },
  });
  const released = status === "SCORED";
  const average = (task: WritingTaskRubricInput) =>
    criteria.reduce((sum, key) => sum + task[key], 0) / criteria.length;
  const practiceBand = Math.round(((average(tasks.task1) + 2 * average(tasks.task2)) / 3) * 2) / 2;

  const save = async (release: boolean) => {
    setMessage("");
    if (
      released ||
      Object.values(tasks).some(
        (task) =>
          criteria.some((key) => !isValidBand(task[key])) ||
          (task.feedback?.length ?? 0) > feedbackMaxLength,
      ) ||
      feedback.length > feedbackMaxLength
    ) {
      setMessage(copy.saveError);
      return;
    }
    if (release) {
      const accepted = await confirm({
        cancelLabel: copy.cancel,
        confirmLabel: copy.release,
        message: copy.releaseConfirm,
        title: copy.release,
      });
      if (!accepted) return;
    }
    try {
      const result = await saveReview({
        variables: {
          input: {
            attemptId: review.attemptId,
            task1: tasks.task1,
            task2: tasks.task2,
            feedback,
            release,
            ...(updatedAt ? { expectedUpdatedAt: updatedAt } : {}),
          },
        },
      });
      const saved = result.data?.saveWritingAttemptReview;
      if (!saved?.review) throw new Error("Missing saved review");
      setUpdatedAt(saved.review.updatedAt);
      setStatus(saved.status);
      setMessage(release ? copy.released : copy.saved);
      router.refresh();
    } catch (error) {
      setMessage(toPublicApiError(error).code === "CONFLICT" ? copy.conflict : copy.saveError);
    }
  };

  return (
    <main className="teacherResultDetail teacherWritingReview">
      <TeacherResultDetailHeader
        description={copy.practiceOnly}
        isScored={status === "SCORED"}
        locale={locale}
        skill="WRITING"
        studentName={review.studentDisplayName}
        summary={copy.statuses[status]}
        title={review.title}
      />
      <div className="teacherWritingReview__tasks">
        {(["task1", "task2"] as const).map((taskKey, index) => {
          const answer = review.answers.find((item) => item.sectionPosition === index + 1);
          const task = tasks[taskKey];
          return (
            <section className="teacherWritingReview__task" key={taskKey}>
              <div className="teacherWritingReview__taskIntro">
                <h2>Task {index + 1}</h2>
                <h3>{answer?.prompt ?? `Task ${index + 1}`}</h3>
              </div>
              <div className="teacherWritingReview__answer">
                <strong>{copy.answer}</strong>
                <p>{answer?.textValue || copy.noAnswer}</p>
              </div>
              <div className="teacherWritingReview__criteria">
                {criteria.map((key) => (
                  <label key={key}>
                    <span>{copy.criteria[key]}</span>
                    <input
                      disabled={released || loading}
                      max="9"
                      min="0"
                      step="0.5"
                      type="number"
                      value={task[key]}
                      onChange={(event) =>
                        setTasks((current) => ({
                          ...current,
                          [taskKey]: { ...current[taskKey], [key]: Number(event.target.value) },
                        }))
                      }
                    />
                  </label>
                ))}
              </div>
              <div className="teacherWritingReview__feedback">
                <label htmlFor={`writing-task-${index + 1}-feedback`}>{copy.taskFeedback}</label>
                <textarea
                  aria-describedby={`writing-task-${index + 1}-feedback-count`}
                  disabled={released || loading}
                  id={`writing-task-${index + 1}-feedback`}
                  maxLength={feedbackMaxLength}
                  rows={4}
                  value={task.feedback ?? ""}
                  onChange={(event) =>
                    setTasks((current) => ({
                      ...current,
                      [taskKey]: { ...current[taskKey], feedback: event.target.value },
                    }))
                  }
                />
                <small
                  className="teacherResultDetail__characterCount"
                  id={`writing-task-${index + 1}-feedback-count`}
                >
                  {task.feedback?.length ?? 0} / {feedbackMaxLength}
                </small>
              </div>
              <strong className="teacherWritingReview__band">
                {copy.band}: {average(task).toFixed(2)}
              </strong>
            </section>
          );
        })}
      </div>
      <section className="teacherWritingReview__overall">
        <div className="teacherWritingReview__feedback">
          <label htmlFor="writing-overall-feedback">{copy.feedback}</label>
          <textarea
            aria-describedby="writing-overall-feedback-count"
            disabled={released || loading}
            id="writing-overall-feedback"
            maxLength={feedbackMaxLength}
            rows={4}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
          <small
            className="teacherResultDetail__characterCount"
            id="writing-overall-feedback-count"
          >
            {feedback.length} / {feedbackMaxLength}
          </small>
        </div>
        <div className="teacherWritingReview__overallSummary">
          <strong className="teacherWritingReview__band">
            {copy.band}:{" "}
            {released ? review.review?.practiceBand.toFixed(1) : practiceBand.toFixed(1)}
          </strong>
          <p>{copy.practiceOnly}</p>
        </div>
        {!released || message ? (
          <div className="teacherWritingReview__footer">
            <span aria-live="polite" role="status">
              {message}
            </span>
            {!released ? (
              <div className="teacherResultDetail__actions">
                <Button
                  disabled={loading}
                  onClick={() => void save(false)}
                  shape="soft"
                  size="small"
                  type="button"
                  variant="secondary"
                >
                  {copy.saveDraft}
                </Button>
                <Button
                  disabled={loading}
                  hoverEffect="jump"
                  onClick={() => void save(true)}
                  shape="soft"
                  size="small"
                  type="button"
                  variant="primary"
                >
                  {copy.release}
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
