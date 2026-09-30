import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type { StudentSpeakingResultQuery } from "@/gql/graphql";

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
      <Link href={`/${locale}/student/results`}>
        <ArrowBackRounded aria-hidden="true" />
        {labels.back}
      </Link>
      <header>
        <span>{labels.title}</span>
        <h1>{result.title}</h1>
        <strong>{result.practiceBand.toFixed(1)}</strong>
      </header>
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
