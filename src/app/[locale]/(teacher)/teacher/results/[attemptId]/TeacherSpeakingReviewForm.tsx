"use client";

import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";
import {
  TeacherSaveSpeakingAttemptReviewDocument,
  type TeacherSpeakingAttemptReviewQuery,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";

import { TeacherResultDetailHeader } from "./TeacherResultDetailHeader";

type Review = TeacherSpeakingAttemptReviewQuery["teacherSpeakingAttemptReview"];
const feedbackMaxLength = 5000;

const copy = {
  uz: {
    feedback: "Feedback",
    save: "Draftni saqlash",
    saved: "Saqlandi",
    title: "Speaking tekshiruvi",
  },
  ru: {
    feedback: "Комментарий",
    save: "Сохранить черновик",
    saved: "Сохранено",
    title: "Проверка Speaking",
  },
  en: {
    feedback: "Feedback",
    save: "Save draft",
    saved: "Saved",
    title: "Speaking review",
  },
} as const;

const criteria = [
  ["fluencyCoherence", "Fluency & coherence"],
  ["lexicalResource", "Lexical resource"],
  ["grammaticalRangeAccuracy", "Grammar range & accuracy"],
  ["pronunciation", "Pronunciation"],
] as const;

export function TeacherSpeakingReviewForm({ locale, review }: { locale: Locale; review: Review }) {
  const labels = copy[locale];
  const resultsCopy = getTeacherResultsCopy(locale);
  const router = useRouter();
  const confirm = useConfirmDialog();
  const initial = review.review;
  const [scores, setScores] = useState({
    fluencyCoherence: initial?.fluencyCoherence ?? 0,
    grammaticalRangeAccuracy: initial?.grammaticalRangeAccuracy ?? 0,
    lexicalResource: initial?.lexicalResource ?? 0,
    practiceBand: initial?.practiceBand ?? 0,
    pronunciation: initial?.pronunciation ?? 0,
  });
  const [feedback, setFeedback] = useState(initial?.feedback ?? "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(review.status);
  const released = status === "SCORED";
  const [saveReview, { loading }] = useMutation(TeacherSaveSpeakingAttemptReviewDocument, {
    context: { authenticated: true },
  });

  const save = async (release: boolean) => {
    setMessage("");
    if (released) return;
    if (release) {
      const accepted = await confirm({
        cancelLabel: resultsCopy.cancel,
        confirmLabel: resultsCopy.release,
        message: resultsCopy.releaseConfirm,
        title: resultsCopy.release,
      });
      if (!accepted) return;
    }
    try {
      const response = await saveReview({
        variables: {
          input: { attemptId: review.attemptId, feedback, release, ...scores },
          language: "EN",
        },
      });
      if (!response.data?.saveSpeakingAttemptReview) throw new Error("Missing saved review");
      setStatus(response.data.saveSpeakingAttemptReview.status);
      setMessage(release ? resultsCopy.released : labels.saved);
      router.refresh();
    } catch {
      setMessage(resultsCopy.saveError);
    }
  };

  return (
    <main className="teacherResultDetail teacherSpeakingReview">
      <TeacherResultDetailHeader
        isScored={status === "SCORED"}
        locale={locale}
        skill="SPEAKING"
        studentName={review.studentDisplayName}
        summary={resultsCopy.statuses[status]}
        title={review.title}
      />
      <div className="teacherSpeakingReview__answers">
        {review.answers.map((answer) => (
          <article key={answer.questionId}>
            <span>
              {resultsCopy.part} {answer.sectionPosition} · {answer.position}
            </span>
            <h2>{answer.prompt}</h2>
            {answer.audioUrl ? (
              <audio controls preload="none" src={answer.audioUrl} />
            ) : (
              <p>{resultsCopy.noRecording}</p>
            )}
          </article>
        ))}
      </div>
      <div className="teacherSpeakingReview__rubric">
        {criteria.map(([key, label]) => (
          <label key={key}>
            <span>{label}</span>
            <input
              min="0"
              max="9"
              step="0.5"
              type="number"
              disabled={released || loading}
              value={scores[key]}
              onChange={(event) =>
                setScores((current) => ({ ...current, [key]: Number(event.target.value) }))
              }
            />
          </label>
        ))}
        <label>
          <span>{resultsCopy.band}</span>
          <input
            min="0"
            max="9"
            step="0.5"
            type="number"
            disabled={released || loading}
            value={scores.practiceBand}
            onChange={(event) =>
              setScores((current) => ({ ...current, practiceBand: Number(event.target.value) }))
            }
          />
        </label>
        <div className="teacherSpeakingReview__feedback">
          <label htmlFor="speaking-feedback">{labels.feedback}</label>
          <textarea
            aria-describedby="speaking-feedback-count"
            disabled={released || loading}
            id="speaking-feedback"
            maxLength={feedbackMaxLength}
            rows={7}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
          <small className="teacherResultDetail__characterCount" id="speaking-feedback-count">
            {feedback.length} / {feedbackMaxLength}
          </small>
        </div>
      </div>
      <footer className="teacherResultDetail__actions">
        <span aria-live="polite" className="teacherResultDetail__actionMessage" role="status">
          {message}
        </span>
        {!released ? (
          <Button
            disabled={loading}
            onClick={() => void save(false)}
            shape="soft"
            size="small"
            type="button"
            variant="secondary"
          >
            {labels.save}
          </Button>
        ) : null}
        {!released ? (
          <Button
            disabled={loading}
            hoverEffect="jump"
            onClick={() => void save(true)}
            shape="soft"
            size="small"
            type="button"
            variant="primary"
          >
            {resultsCopy.release}
          </Button>
        ) : null}
      </footer>
    </main>
  );
}
