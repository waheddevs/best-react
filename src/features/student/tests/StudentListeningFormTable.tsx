import type { StudentAttemptFieldsFragment } from "@/gql/graphql";

type StudentListeningFormTableProps = {
  answerLabel: string;
  answers: Record<string, { textValue: string }>;
  block: StudentAttemptFieldsFragment["sections"][number]["blocks"][number];
  onAnswerBlur: (questionId: string) => void;
  onAnswerChange: (questionId: string, value: string) => void;
  onQuestionFocus: (questionId: string) => void;
  questions: StudentAttemptFieldsFragment["questions"];
  readOnly: boolean;
};

const questionToken = /\{\{(\d+)\}\}/;

export function StudentListeningFormTable({
  answerLabel,
  answers,
  block,
  onAnswerBlur,
  onAnswerChange,
  onQuestionFocus,
  questions,
  readOnly,
}: StudentListeningFormTableProps) {
  return (
    <div className="studentListeningForm">
      {block.caption ? <h2>{block.caption}</h2> : null}
      <div className="studentListeningForm__tableWrap">
        <table>
          {block.tableHeaderRows.length > 0 ? (
            <thead>
              {block.tableHeaderRows.map((row, rowIndex) => (
                <tr key={`header-${String(rowIndex)}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <th key={`header-${String(rowIndex)}-${String(cellIndex)}`}>{cell}</th>
                  ))}
                </tr>
              ))}
            </thead>
          ) : null}
          <tbody>
            {block.tableRows.map((row, rowIndex) => {
              const label = row.cells[0] ?? "";
              const value = row.cells[1] ?? "";
              const token = questionToken.exec(value);
              const position = token ? Number(token[1]) : null;
              const question =
                position === null
                  ? null
                  : (questions.find((item) => item.position === position) ?? null);
              const [prefix = "", suffix = ""] = token ? value.split(token[0], 2) : [value, ""];

              return (
                <tr key={`${label}-${String(rowIndex)}`}>
                  <th scope="row">{label}</th>
                  <td>
                    {question ? (
                      <label className="studentListeningForm__answer">
                        {prefix.trim() ? <span>{prefix.trim()}</span> : null}
                        <span aria-hidden="true" className="studentListeningForm__number">
                          {question.position}
                        </span>
                        <input
                          aria-label={`${answerLabel} ${String(question.position)}`}
                          maxLength={160}
                          onBlur={() => onAnswerBlur(question.id)}
                          onChange={(event) => onAnswerChange(question.id, event.target.value)}
                          onFocus={() => onQuestionFocus(question.id)}
                          readOnly={readOnly}
                          type="text"
                          value={answers[question.id]?.textValue ?? ""}
                        />
                        {suffix.trim() ? <span>{suffix.trim()}</span> : null}
                      </label>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
