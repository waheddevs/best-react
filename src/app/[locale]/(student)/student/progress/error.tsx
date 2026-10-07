"use client";

import { useParams } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentProgressCopy } from "@/dictionaries/student/StudentProgress";

type StudentProgressErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function StudentProgressError({ retry }: StudentProgressErrorProps) {
  const { locale } = useParams<{ locale: string }>();
  const copy = getStudentProgressCopy(isLocale(locale) ? locale : "en");

  return (
    <section className="studentProgress__error" role="alert">
      <h1>{copy.errorTitle}</h1>
      <p>{copy.errorMessage}</p>
      <button onClick={retry} type="button">{copy.retry}</button>
    </section>
  );
}
