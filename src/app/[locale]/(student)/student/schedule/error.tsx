"use client";

import { useParams } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentGroupCopy } from "@/dictionaries/student/StudentGroup";

type StudentGroupErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function StudentGroupError({ reset }: StudentGroupErrorProps) {
  const { locale } = useParams<{ locale: string }>();
  const copy = getStudentGroupCopy(isLocale(locale) ? locale : "en");

  return (
    <section className="studentGroup__loadError" role="alert">
      <p>{copy.loadError}</p>
      <button onClick={reset} type="button">
        {copy.retry}
      </button>
    </section>
  );
}
