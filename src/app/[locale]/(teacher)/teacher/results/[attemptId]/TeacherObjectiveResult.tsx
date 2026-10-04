import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";
import type { TeacherObjectiveAttemptResultQuery } from "@/gql/graphql";

type Result = TeacherObjectiveAttemptResultQuery["teacherObjectiveAttemptResult"];

export function TeacherObjectiveResult({ locale, result }: { locale: Locale; result: Result }) {
  const copy = getTeacherResultsCopy(locale);
  return (
    <main className="teacherObjectiveResult">
      <Link href={`/${locale}/teacher/results`}>
        <ArrowBackRounded aria-hidden="true" />
        {copy.back}
      </Link>
      <header>
        <span>
          {result.skill} · {result.studentDisplayName}
        </span>
        <h1>{result.title}</h1>
        <strong>
          {result.correctAnswerCount}/{result.totalQuestionCount} · {result.percentage.toFixed(1)}%
        </strong>
      </header>
      <div className="teacherObjectiveResult__tableWrap">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>{copy.question}</th>
              <th>{copy.answer}</th>
              <th>{copy.correctAnswer}</th>
              <th>{copy.status}</th>
            </tr>
          </thead>
          <tbody>
            {result.answers.map((answer) => (
              <tr key={answer.position}>
                <td>{answer.position}</td>
                <td>{answer.prompt}</td>
                <td>{answer.studentAnswer.join(", ") || copy.noAnswer}</td>
                <td>{answer.correctAnswer.join(", ")}</td>
                <td>{answer.isCorrect ? copy.correct : copy.incorrect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
