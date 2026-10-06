import type { Locale } from "@/config/Locales";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";
import type { TeacherObjectiveAttemptResultQuery } from "@/gql/graphql";

import { TeacherResultDetailHeader } from "./TeacherResultDetailHeader";

type Result = TeacherObjectiveAttemptResultQuery["teacherObjectiveAttemptResult"];

export function TeacherObjectiveResult({ locale, result }: { locale: Locale; result: Result }) {
  const copy = getTeacherResultsCopy(locale);
  return (
    <main className="teacherResultDetail teacherObjectiveResult">
      <TeacherResultDetailHeader
        locale={locale}
        skill={result.skill}
        studentName={result.studentDisplayName}
        summary={`${copy.score}: ${result.correctAnswerCount}/${result.totalQuestionCount} · ${result.percentage.toFixed(1)}%`}
        title={result.title}
      />
      <div className="teacherObjectiveResult__tableWrap">
        <table>
          <colgroup>
            <col className="teacherObjectiveResult__numberColumn" />
            <col className="teacherObjectiveResult__questionColumn" />
            <col className="teacherObjectiveResult__answerColumn" />
            <col className="teacherObjectiveResult__answerColumn" />
            <col className="teacherObjectiveResult__statusColumn" />
          </colgroup>
          <thead>
            <tr>
              <th>{copy.number}</th>
              <th>{copy.question}</th>
              <th>{copy.answer}</th>
              <th>{copy.correctAnswer}</th>
              <th>{copy.status}</th>
            </tr>
          </thead>
          <tbody>
            {result.answers.map((answer) => {
              const unanswered = answer.studentAnswer.length === 0;
              const status = unanswered ? "unanswered" : answer.isCorrect ? "correct" : "incorrect";

              return (
                <tr key={answer.position}>
                  <td>{answer.position}</td>
                  <td>{answer.prompt}</td>
                  <td>{unanswered ? copy.noAnswer : answer.studentAnswer.join(", ")}</td>
                  <td>{answer.correctAnswer.join(", ")}</td>
                  <td>
                    <span className="teacherObjectiveResult__status" data-result={status}>
                      {unanswered
                        ? copy.unanswered
                        : answer.isCorrect
                          ? copy.correct
                          : copy.incorrect}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
