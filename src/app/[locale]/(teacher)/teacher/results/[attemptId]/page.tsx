import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { loadConnectedTeacherSpeakingAttemptReview } from "@/lib/teacher/TeacherGroupData";

import { TeacherSpeakingReviewForm } from "./TeacherSpeakingReviewForm";

export default async function TeacherSpeakingReviewPage({
  params,
}: {
  params: Promise<{ attemptId: string; locale: string }>;
}) {
  const { attemptId, locale } = await params;
  if (!isLocale(locale)) notFound();
  const review = await loadConnectedTeacherSpeakingAttemptReview(locale, attemptId);
  return <TeacherSpeakingReviewForm locale={locale} review={review} />;
}
