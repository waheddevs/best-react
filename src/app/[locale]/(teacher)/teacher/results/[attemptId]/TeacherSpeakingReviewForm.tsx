"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";
import {
  TeacherSaveSpeakingAttemptReviewDocument,
  type TeacherSpeakingAttemptReviewQuery,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";

type Review = TeacherSpeakingAttemptReviewQuery["teacherSpeakingAttemptReview"];

const copy = {
  uz: {
    feedback: "Feedback",
    release: "Bahoni Studentga chiqarish",
    save: "Draftni saqlash",
    saved: "Saqlandi",
    title: "Speaking tekshiruvi",
  },
  ru: {
    feedback: "Комментарий",
    release: "Опубликовать оценку",
    save: "Сохранить черновик",
    saved: "Сохранено",
    title: "Проверка Speaking",
  },
  en: {
    feedback: "Feedback",
    release: "Release result to Student",
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
    <section className="teacherSpeakingReview">
      <Link href={`/${locale}/teacher/results`}>
        <ArrowBackRounded />
        {labels.title}
      </Link>
      <header>
        <span>{review.studentDisplayName}</span>
        <h1>{review.title}</h1>
      </header>
      <div className="teacherSpeakingReview__answers">
        {review.answers.map((answer) => (
          <article key={answer.questionId}>
            <span>
              Part {answer.sectionPosition} · {answer.position}
            </span>
            <h2>{answer.prompt}</h2>
            {answer.audioUrl ? (
              <audio controls preload="none" src={answer.audioUrl} />
            ) : (
              <p>No recording</p>
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
          <span>Overall practice band</span>
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
        <label className="teacherSpeakingReview__feedback">
          <span>{labels.feedback}</span>
          <textarea
            disabled={released || loading}
            maxLength={5000}
            rows={7}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
        </label>
      </div>
      <footer>
        <span aria-live="polite">{message}</span>
        {!released ? (
          <button disabled={loading} onClick={() => void save(false)} type="button">
            {labels.save}
          </button>
        ) : null}
        {!released ? (
          <button disabled={loading} onClick={() => void save(true)} type="button">
            {labels.release}
          </button>
        ) : null}
      </footer>
    </section>
  );
}
