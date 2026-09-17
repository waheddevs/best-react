"use client";

import { useRouter } from "next/navigation";

import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/profile.module.css";
import { getTeacherProfileMessages } from "@/dictionaries/teacher/TeacherProfileMessages";

type TeacherProfileUnavailableProps = { locale: Locale };

export function TeacherProfileUnavailable({ locale }: TeacherProfileUnavailableProps) {
  /* HOOKS */
  const router = useRouter();
  const copy = getTeacherProfileMessages(locale);

  /* HANDLERS */
  const handleRetry = () => router.refresh();

  return (
    <main className={styles.teacherProfile__unavailable} role="alert">
      <p>{copy.loadError}</p>
      <button onClick={handleRetry} type="button">
        {copy.retry}
      </button>
    </main>
  );
}
