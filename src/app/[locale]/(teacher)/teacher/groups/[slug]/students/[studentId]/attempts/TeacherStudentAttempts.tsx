import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type { TeacherStudentAttemptsQuery } from "@/gql/graphql";

type AttemptEdge = TeacherStudentAttemptsQuery["teacherStudentAttempts"]["edges"][number];

const copy = {
  uz: {
    back: "Studentlarga qaytish",
    empty: "Hali test urinishlari yo‘q.",
    review: "Tekshirish",
    title: "Student testlari",
  },
  ru: {
    back: "К студентам",
    empty: "Попыток теста пока нет.",
    review: "Проверить",
    title: "Тесты студента",
  },
  en: {
    back: "Back to students",
    empty: "No test attempts yet.",
    review: "Review",
    title: "Student tests",
  },
} as const;

export function TeacherStudentAttempts({
  attempts,
  groupId,
  locale,
}: {
  attempts: readonly AttemptEdge[];
  groupId: string;
  locale: Locale;
}) {
  const labels = copy[locale];
  return (
    <section className="teacherAttemptList">
      <Link href={`/${locale}/teacher/groups/${groupId}/students`}>
        <ArrowBackRounded aria-hidden="true" />
        {labels.back}
      </Link>
      <h1>{labels.title}</h1>
      {attempts.length ? (
        <div>
          {attempts.map(({ node }) => {
            const reviewable =
              (node.skill === "SPEAKING" || node.skill === "WRITING") &&
              (node.status === "SUBMITTED" || node.status === "REVIEW_REQUIRED");
            return (
              <article key={node.attemptId}>
                <div>
                  <span>{node.skill}</span>
                  <h2>{node.title}</h2>
                  <p>
                    #{node.attemptNumber} · {node.status.replaceAll("_", " ")}
                  </p>
                </div>
                {reviewable ? (
                  <Link href={`/${locale}/teacher/results/${node.attemptId}`}>
                    {labels.review}
                    <ArrowForwardRounded aria-hidden="true" />
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <p>{labels.empty}</p>
      )}
    </section>
  );
}
