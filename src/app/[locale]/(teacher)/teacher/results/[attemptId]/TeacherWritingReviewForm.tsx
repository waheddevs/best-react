"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";
import {
  TeacherSaveWritingAttemptReviewDocument,
  type TeacherWritingAttemptReviewQuery,
  type WritingTaskRubricInput,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { toPublicApiError } from "@/lib/apollo/ApolloError";

type Review = TeacherWritingAttemptReviewQuery["teacherWritingAttemptReview"];
type ScoreKey =
  "taskAchievement" | "coherenceCohesion" | "lexicalResource" | "grammaticalRangeAccuracy";

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
          criteria.some((key) => !isValidBand(task[key])) || (task.feedback?.length ?? 0) > 5000,
      ) ||
      feedback.length > 5000
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
    <main className="teacherWritingReview">
      <Link className="teacherWritingReview__back" href={`/${locale}/teacher/results`}>
        <ArrowBackRounded aria-hidden="true" />
        {copy.back}
      </Link>
      <header className="teacherWritingReview__header">
        <span>{review.studentDisplayName}</span>
        <h1>{review.title}</h1>
        <p>{copy.practiceOnly}</p>
      </header>
      <div className="teacherWritingReview__tasks">
        {(["task1", "task2"] as const).map((taskKey, index) => {
          const answer = review.answers.find((item) => item.sectionPosition === index + 1);
          const task = tasks[taskKey];
          return (
            <section className="teacherWritingReview__task" key={taskKey}>
              <h2>Task {index + 1}</h2>
              <h3>{answer?.prompt ?? `Task ${index + 1}`}</h3>
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
              <label className="teacherWritingReview__feedback">
                <span>{copy.taskFeedback}</span>
                <textarea
                  disabled={released || loading}
                  maxLength={5000}
                  rows={4}
                  value={task.feedback ?? ""}
                  onChange={(event) =>
                    setTasks((current) => ({
                      ...current,
                      [taskKey]: { ...current[taskKey], feedback: event.target.value },
                    }))
                  }
                />
              </label>
              <strong>
                {copy.band}: {average(task).toFixed(2)}
              </strong>
            </section>
          );
        })}
      </div>
      <section className="teacherWritingReview__overall">
        <label className="teacherWritingReview__feedback">
          <span>{copy.feedback}</span>
          <textarea
            disabled={released || loading}
            maxLength={5000}
            rows={4}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
        </label>
        <strong>
          {copy.band}: {released ? review.review?.practiceBand.toFixed(1) : practiceBand.toFixed(1)}
        </strong>
        <p>{copy.practiceOnly}</p>
        <span aria-live="polite" role="status">
          {message}
        </span>
        {!released ? (
          <div className="teacherWritingReview__actions">
            <button disabled={loading} onClick={() => void save(false)} type="button">
              {copy.saveDraft}
            </button>
            <button disabled={loading} onClick={() => void save(true)} type="button">
              {copy.release}
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
