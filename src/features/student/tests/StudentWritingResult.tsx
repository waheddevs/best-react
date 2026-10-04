import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type { StudentWritingResultQuery } from "@/gql/graphql";

type Result = NonNullable<StudentWritingResultQuery["studentWritingResult"]>;

const copy = {
  uz: {
    criteria: {
      taskAchievement: "Vazifa bajarilishi",
      coherenceCohesion: "Izchillik va bog‘liqlik",
      lexicalResource: "Lug‘at boyligi",
      grammaticalRangeAccuracy: "Grammatika va aniqlik",
    },
    back: "Natijalarga qaytish",
    band: "Practice band",
    feedback: "O‘qituvchi fikri",
    answer: "Sizning javobingiz",
    empty: "Javob yo‘q",
    note: "Bu rasmiy IELTS natijasi emas.",
  },
  ru: {
    criteria: {
      taskAchievement: "Выполнение задания",
      coherenceCohesion: "Связность и логика",
      lexicalResource: "Лексика",
      grammaticalRangeAccuracy: "Грамматика и точность",
    },
    back: "К результатам",
    band: "Практический балл",
    feedback: "Комментарий преподавателя",
    answer: "Ваш ответ",
    empty: "Нет ответа",
    note: "Это не официальный результат IELTS.",
  },
  en: {
    criteria: {
      taskAchievement: "Task achievement / response",
      coherenceCohesion: "Coherence & cohesion",
      lexicalResource: "Lexical resource",
      grammaticalRangeAccuracy: "Grammar range & accuracy",
    },
    back: "Back to results",
    band: "Practice band",
    feedback: "Teacher feedback",
    answer: "Your answer",
    empty: "No answer",
    note: "This is not an official IELTS result.",
  },
} as const;

const criterionKeys = [
  "taskAchievement",
  "coherenceCohesion",
  "lexicalResource",
  "grammaticalRangeAccuracy",
] as const;

export function StudentWritingResult({ locale, result }: { locale: Locale; result: Result }) {
  const labels = copy[locale];
  return (
    <main className="studentWritingResult">
      <Link href={`/${locale}/student/results`}>
        <ArrowBackRounded aria-hidden="true" />
        {labels.back}
      </Link>
      <header>
        <span>WRITING</span>
        <h1>{result.title}</h1>
        <strong>
          {labels.band}: {result.practiceBand.toFixed(1)}
        </strong>
        <p>{labels.note}</p>
      </header>
      <div className="studentWritingResult__tasks">
        {([result.task1, result.task2] as const).map((task, index) => {
          const answer = result.answers.find((item) => item.sectionPosition === index + 1);
          return (
            <section key={index}>
              <h2>
                Task {index + 1} · {task.band.toFixed(2)}
              </h2>
              <h3>{answer?.prompt}</h3>
              <div className="studentWritingResult__criteria">
                {criterionKeys.map((key) => (
                  <p key={key}>
                    <span>{labels.criteria[key]}</span>
                    <strong>{task[key].toFixed(1)}</strong>
                  </p>
                ))}
              </div>
              {task.feedback ? (
                <p>
                  <strong>{labels.feedback}:</strong> {task.feedback}
                </p>
              ) : null}
              <div className="studentWritingResult__answer">
                <strong>{labels.answer}</strong>
                <p>{answer?.textValue || labels.empty}</p>
              </div>
            </section>
          );
        })}
      </div>
      {result.feedback ? (
        <section className="studentWritingResult__overall">
          <h2>{labels.feedback}</h2>
          <p>{result.feedback}</p>
        </section>
      ) : null}
    </main>
  );
}
