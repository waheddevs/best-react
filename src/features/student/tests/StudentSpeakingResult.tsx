import type { Locale } from "@/config/Locales";
import type { StudentSpeakingResultQuery } from "@/gql/graphql";
import { StudentResultHeader } from "./StudentResultHeader";

type SpeakingResult = NonNullable<StudentSpeakingResultQuery["studentSpeakingResult"]>;

const copy = {
  uz: { back: "Natijalarga qaytish", feedback: "O‘qituvchi fikri", title: "Speaking natijasi" },
  ru: { back: "К результатам", feedback: "Комментарий преподавателя", title: "Результат Speaking" },
  en: { back: "Back to results", feedback: "Teacher feedback", title: "Speaking result" },
} as const;

export function StudentSpeakingResult({
  locale,
  result,
}: {
  locale: Locale;
  result: SpeakingResult;
}) {
  const labels = copy[locale];
  const criteria = [
    ["Fluency & coherence", result.fluencyCoherence],
    ["Lexical resource", result.lexicalResource],
    ["Grammar range & accuracy", result.grammaticalRangeAccuracy],
    ["Pronunciation", result.pronunciation],
  ] as const;
  return (
    <article className="studentSpeakingResult">
      <StudentResultHeader
        locale={locale}
        backHref={`/${locale}/student/results`}
        backLabel={labels.back}
        eyebrow="SPEAKING"
        title={result.title}
        score={result.practiceBand.toFixed(1)}
        scoreLabel={labels.title}
      />
      <div className="studentSpeakingResult__criteria">
        {criteria.map(([label, score]) => (
          <section key={label}>
            <span>{label}</span>
            <strong>{score.toFixed(1)}</strong>
          </section>
        ))}
      </div>
      {result.feedback ? (
        <section className="studentSpeakingResult__feedback">
          <h2>{labels.feedback}</h2>
          <p>{result.feedback}</p>
        </section>
      ) : null}
    </article>
  );
}
