"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import { getStudentTestResultsCopy } from "@/dictionaries/student/StudentTestResults";

type StudentTestResultPendingProps = {
  locale: Locale;
  reviewRequired: boolean;
  title: string;
};

export function StudentTestResultPending({
  locale,
  reviewRequired,
  title,
}: StudentTestResultPendingProps) {
  const copy = getStudentTestResultsCopy(locale);
  const router = useRouter();
  const [refreshing, startTransition] = useTransition();

  useEffect(() => {
    if (reviewRequired || refreshing) return;
    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        startTransition(() => router.refresh());
      }
    }, 3000);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startTransition(() => router.refresh());
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [refreshing, reviewRequired, router]);

  return (
    <section className="studentTestResult__pending" aria-labelledby="pending-result-title">
      <h1 id="pending-result-title">{title}</h1>
      <p role="status">{reviewRequired ? copy.reviewPending : copy.processing}</p>
      <div>
        <Button
          disabled={refreshing}
          onClick={() => startTransition(() => router.refresh())}
          variant="secondary"
        >
          {copy.refresh}
        </Button>
        <ButtonLink href={`/${locale}/student/results`} variant="secondary">
          {copy.resultsTitle}
        </ButtonLink>
      </div>
    </section>
  );
}
