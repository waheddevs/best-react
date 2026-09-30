"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import {
  TeacherSaveSpeakingAttemptReviewDocument,
  type TeacherSpeakingAttemptReviewQuery,
} from "@/gql/graphql";

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
  const router = useRouter();
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
  const [saveReview, { loading }] = useMutation(TeacherSaveSpeakingAttemptReviewDocument, {
    context: { authenticated: true },
  });

  const save = async (release: boolean) => {
    setMessage("");
    await saveReview({
      variables: {
        input: { attemptId: review.attemptId, feedback, release, ...scores },
        language: "EN",
      },
    });
    setMessage(labels.saved);
    router.refresh();
  };

  return (
    <section className="teacherSpeakingReview">
      <Link href={`/${locale}/teacher`}>
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
            value={scores.practiceBand}
            onChange={(event) =>
              setScores((current) => ({ ...current, practiceBand: Number(event.target.value) }))
            }
          />
        </label>
        <label className="teacherSpeakingReview__feedback">
          <span>{labels.feedback}</span>
          <textarea
            maxLength={5000}
            rows={7}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
        </label>
      </div>
      <footer>
        <span aria-live="polite">{message}</span>
        <button disabled={loading} onClick={() => void save(false)} type="button">
          {labels.save}
        </button>
        <button disabled={loading} onClick={() => void save(true)} type="button">
          {labels.release}
        </button>
      </footer>
    </section>
  );
}
