"use client";

import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import { useFragment as readFragment } from "@/gql/fragment-masking";
import { StartStudentTestAttemptDocument, StudentAttemptFieldsFragmentDoc } from "@/gql/graphql";
import { useScrollToTop } from "@/hooks/navigation/useScrollToTop";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { StudentTestSkill, StudentTestsCopy } from "@/types/student/StudentTests";

export function useStudentTestSkillAction(
  copy: StudentTestsCopy,
  locale: Locale,
  paperId: string,
  skill: StudentTestSkill,
) {
  /* HOOKS */
  const router = useRouter();
  const scroll = useScrollToTop();
  const notifications = useNotifications();
  const openingRef = useRef(false);
  const [opening, setOpening] = useState(false);
  const [startAttempt] = useMutation(StartStudentTestAttemptDocument, {
    context: { authenticated: true },
  });
  const skillPath = skill.skill.toLowerCase();
  const canReview =
    skill.attemptStatus === "SCORED" &&
    (skill.skill === "LISTENING" || skill.skill === "READING");
  const attemptHref =
    skill.attemptId && (skill.attemptStatus === "IN_PROGRESS" || canReview)
      ? `/${locale}/student/tests/${paperId}/${skillPath}/${skill.attemptId}`
      : null;
  const awaitingReview =
    !attemptHref &&
    (skill.attemptStatus === "SUBMITTED" ||
      skill.attemptStatus === "REVIEW_REQUIRED" ||
      skill.attemptStatus === "SCORED");

  /* HANDLERS */
  const handleStart = async () => {
    if (openingRef.current || awaitingReview || attemptHref) return;
    openingRef.current = true;
    setOpening(true);

    try {
      const result = await startAttempt({
        variables: { input: { language: "EN", testId: skill.testId } },
      });
      const attempt = result.data
        ? readFragment(StudentAttemptFieldsFragmentDoc, result.data.startTestAttempt.attempt)
        : null;
      if (!attempt?.id) throw new Error("Attempt was not created");
      scroll.handleScrollToTop();
      router.push(`/${locale}/student/tests/${paperId}/${skillPath}/${attempt.id}`);
    } catch {
      openingRef.current = false;
      setOpening(false);
      notifications.error({ title: copy.openErrorTitle, message: copy.openErrorMessage });
    }
  };

  return { attemptHref, awaitingReview, canReview, handleStart, opening };
}
