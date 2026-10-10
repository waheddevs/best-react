"use client";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { useStudentTestSkillAction } from "@/hooks/student/tests/useStudentTestSkillAction";
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
  /* HOOKS */
  const { attemptHref, awaitingReview, canReview, handleStart, opening } =
    useStudentTestSkillAction(copy, locale, paperId, skill);
  const skillName = skill.skill[0] + skill.skill.slice(1).toLowerCase();

  if (attemptHref) {
    return (
      <ScrollToTopLink
        aria-label={`${skillName}: ${canReview ? copy.reviewLabel : copy.continueLabel}`}
        className="studentTests__skillCardAction"
        href={attemptHref}
      />
    );
  }

  const label = awaitingReview
    ? copy.submittedLabel
    : opening
      ? copy.startingLabel
      : copy.startLabel;

  return (
    <button
      aria-busy={opening}
      aria-label={`${skillName}: ${label}`}
      className="studentTests__skillCardAction"
      disabled={opening || awaitingReview}
      onClick={handleStart}
      title={awaitingReview ? label : undefined}
      type="button"
    />
  );
}
