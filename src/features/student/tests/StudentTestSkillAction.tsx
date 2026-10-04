"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import { StartStudentTestAttemptDocument, StudentAttemptFieldsFragmentDoc } from "@/gql/graphql";
import { useFragment as readFragment } from "@/gql/fragment-masking";
import type { StudentTestSkill, StudentTestsCopy } from "@/types/student/StudentTests";

type StudentTestSkillActionProps = {
  copy: StudentTestsCopy;
  locale: Locale;
  paperId: string;
  skill: StudentTestSkill;
};

export function StudentTestSkillAction({
  copy,
  locale,
  paperId,
  skill,
}: StudentTestSkillActionProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [startAttempt, { loading }] = useMutation(StartStudentTestAttemptDocument, {
    context: { authenticated: true },
  });
  const skillPath = skill.skill.toLowerCase();
  const attemptHref = skill.attemptId
    ? `/${locale}/student/tests/${paperId}/${skillPath}/${skill.attemptId}`
    : null;

  if (attemptHref && skill.attemptStatus === "IN_PROGRESS") {
    return (
      <Link className="studentTests__skillAction" href={attemptHref}>
        {copy.continueLabel}
        <ArrowForwardRounded aria-hidden="true" />
      </Link>
    );
  }

  if (
    skill.attemptId &&
    skill.attemptStatus === "SCORED" &&
    (skill.skill === "LISTENING" || skill.skill === "READING")
  ) {
    return (
      <div className="studentTests__skillCompletedActions">
        <Link
          className="studentTests__skillAction studentTests__skillAction_secondary"
          href={`/${locale}/student/tests/${paperId}/${skillPath}/${skill.attemptId}`}
        >
          {copy.reviewLabel}
        </Link>
        <Link
          className="studentTests__skillAction"
          href={`/${locale}/student/results/${skill.attemptId}`}
        >
          {copy.resultLabel}
          <ArrowForwardRounded aria-hidden="true" />
        </Link>
      </div>
    );
  }

  if (
    skill.attemptStatus === "SUBMITTED" ||
    skill.attemptStatus === "REVIEW_REQUIRED" ||
    skill.attemptStatus === "SCORED"
  ) {
    return <span className="studentTests__skillPending">{copy.submittedLabel}</span>;
  }

  const handleStart = async () => {
    setError(null);
    try {
      const result = await startAttempt({
        variables: { input: { language: "EN", testId: skill.testId } },
      });
      const startedAttempt = result.data
        ? readFragment(StudentAttemptFieldsFragmentDoc, result.data.startTestAttempt.attempt)
        : null;
      const attemptId = startedAttempt?.id;
      if (!attemptId) throw new Error("Attempt was not created");
      router.push(`/${locale}/student/tests/${paperId}/${skillPath}/${attemptId}`);
    } catch {
      setError(
        locale === "uz"
          ? "Testni ochib bo'lmadi."
          : locale === "ru"
            ? "Не удалось открыть тест."
            : "The test could not be opened.",
      );
    }
  };

  return (
    <div className="studentTests__skillActionWrap">
      <button disabled={loading} onClick={handleStart} type="button">
        {loading ? copy.startingLabel : copy.startLabel}
        <ArrowForwardRounded aria-hidden="true" />
      </button>
      {error ? <span role="alert">{error}</span> : null}
    </div>
  );
}
