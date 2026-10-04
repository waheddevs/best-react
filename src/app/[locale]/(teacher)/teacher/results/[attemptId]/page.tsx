import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import {
  loadConnectedTeacherResultAttemptSkill,
  loadConnectedTeacherSpeakingAttemptReview,
  loadConnectedTeacherWritingAttemptReview,
  loadConnectedTeacherObjectiveAttemptResult,
} from "@/lib/teacher/TeacherGroupData";

import { TeacherSpeakingReviewForm } from "./TeacherSpeakingReviewForm";
import { TeacherWritingReviewForm } from "./TeacherWritingReviewForm";
import { TeacherObjectiveResult } from "./TeacherObjectiveResult";

export default async function TeacherResultDetailPage({
  params,
}: {
  params: Promise<{ attemptId: string; locale: string }>;
}) {
  const { attemptId, locale } = await params;
  if (!isLocale(locale)) notFound();
  const skill = await loadConnectedTeacherResultAttemptSkill(locale, attemptId);
  if (skill === "WRITING") {
    const review = await loadConnectedTeacherWritingAttemptReview(locale, attemptId);
    return <TeacherWritingReviewForm locale={locale} review={review} />;
  }
  if (skill === "LISTENING" || skill === "READING") {
    const result = await loadConnectedTeacherObjectiveAttemptResult(locale, attemptId);
    return <TeacherObjectiveResult locale={locale} result={result} />;
  }
  if (skill !== "SPEAKING") notFound();
  const review = await loadConnectedTeacherSpeakingAttemptReview(locale, attemptId);
  return <TeacherSpeakingReviewForm locale={locale} review={review} />;
}
