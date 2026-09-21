import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";

import type { StudentTestRunnerState } from "@/hooks/student/tests/useStudentTestRunner";
import type {
  StudentPreviewQuestion,
  StudentTestRunnerCopy,
} from "@/types/student/StudentTestRunner";

type StudentQuestionInputProps = {
  copy: StudentTestRunnerCopy;
  question: StudentPreviewQuestion;
  runner: StudentTestRunnerState;
};

export function StudentQuestionInput({ copy, question, runner }: StudentQuestionInputProps) {
  const answer = runner.answers[question.id];

  if (
    question.kind === "shortText" ||
    question.kind === "longText" ||
    question.kind === "mediaPrompt"
  ) {
    return (
      <div className="testRunner__textAnswer">
        {question.kind === "mediaPrompt" ? <p>{copy.mediaUnavailableLabel}</p> : null}
        <textarea
          aria-label={copy.textPlaceholder}
          onChange={(event) => runner.handleAnswer(question.id, event.target.value)}
          placeholder={copy.textPlaceholder}
          rows={question.kind === "shortText" ? 3 : 7}
          value={typeof answer === "string" ? answer : ""}
        />
      </div>
    );
  }

  if (question.kind === "matching") {
    return (
      <div className="testRunner__matching">
        {question.pairs?.map((pair) => (
          <label key={pair.id}>
            <span>{pair.left}</span>
            <select
              onChange={(event) => runner.handleMatch(question.id, pair.id, event.target.value)}
              value={(runner.answers[`${question.id}:${pair.id}`] as string | undefined) ?? ""}
            >
              <option value="">{copy.matchingLabel}</option>
              {question.options?.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    );
  }

  if (question.kind === "ordering") {
    return (
      <ol className="testRunner__ordering">
        {(runner.orders[question.id] ?? []).map((option, index) => (
          <li key={option}>
            <span>{option}</span>
            <div>
              <button
                aria-label={`${copy.moveUpLabel}: ${option}`}
                disabled={index === 0}
                onClick={() => runner.handleMove(question.id, index, -1)}
                type="button"
              >
                <ArrowUpwardRounded />
              </button>
              <button
                aria-label={`${copy.moveDownLabel}: ${option}`}
                disabled={index === (runner.orders[question.id]?.length ?? 0) - 1}
                onClick={() => runner.handleMove(question.id, index, 1)}
                type="button"
              >
                <ArrowDownwardRounded />
              </button>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  const options =
    question.kind === "trueFalse" ? [copy.trueLabel, copy.falseLabel] : (question.options ?? []);
  const multiple = question.kind === "multipleChoice";
  const selected = Array.isArray(answer) ? answer : [answer];

  return (
    <div className="testRunner__choices">
      {options.map((option) => (
        <label key={option}>
          <input
            checked={selected.includes(option)}
            name={multiple ? undefined : question.id}
            onChange={() =>
              multiple
                ? runner.handleMultipleAnswer(question.id, option)
                : runner.handleAnswer(question.id, option)
            }
            type={multiple ? "checkbox" : "radio"}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}
