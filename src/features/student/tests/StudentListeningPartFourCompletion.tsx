import type { StudentAttemptFieldsFragment } from "@/gql/graphql";

import { StudentListeningFormTable } from "./StudentListeningFormTable";

type AttemptQuestion = StudentAttemptFieldsFragment["questions"][number];
type AttemptBlock = StudentAttemptFieldsFragment["sections"][number]["blocks"][number];

type StudentListeningPartFourCompletionProps = {
  answerLabel: string;
  answers: Record<string, { textValue: string }>;
  copy: { noteCompletion: string; tableCompletion: string };
  currentQuestionId: string;
  noteQuestions: AttemptQuestion[];
  onAnswerBlur: (questionId: string) => void;
  onAnswerChange: (questionId: string, value: string) => void;
  onQuestionFocus: (questionId: string) => void;
  readOnly: boolean;
  tableBlock: AttemptBlock | null;
  tableQuestions: AttemptQuestion[];
};

export function StudentListeningPartFourCompletion({
  answerLabel,
  answers,
  copy,
  currentQuestionId,
  noteQuestions,
  onAnswerBlur,
  onAnswerChange,
  onQuestionFocus,
  readOnly,
  tableBlock,
  tableQuestions,
}: StudentListeningPartFourCompletionProps) {
  return (
    <div className="studentListeningPartFour">
      <section>
        <h2>{copy.noteCompletion}</h2>
        <div className="connectedTestRunner__questionList studentListeningPartFour__notes">
          {noteQuestions.map((question) => (
            <CompletionRow
              answerLabel={answerLabel}
              answers={answers}
              currentQuestionId={currentQuestionId}
              key={question.id}
              onAnswerBlur={onAnswerBlur}
              onAnswerChange={onAnswerChange}
              onQuestionFocus={onQuestionFocus}
              question={question}
              readOnly={readOnly}
            />
          ))}
        </div>
      </section>

      <section className="studentListeningPartFour__table">
        <h2>{copy.tableCompletion}</h2>
        {tableBlock ? (
          <StudentListeningFormTable
            answerLabel={answerLabel}
            answers={answers}
            block={tableBlock}
            onAnswerBlur={onAnswerBlur}
            onAnswerChange={onAnswerChange}
            onQuestionFocus={onQuestionFocus}
            questions={tableQuestions}
            readOnly={readOnly}
            showCaption={false}
          />
        ) : (
          <div className="connectedTestRunner__questionList studentListeningPartFour__tableFallback">
            {tableQuestions.map((question) => (
              <CompletionRow
                answerLabel={answerLabel}
                answers={answers}
                currentQuestionId={currentQuestionId}
                key={question.id}
                onAnswerBlur={onAnswerBlur}
                onAnswerChange={onAnswerChange}
                onQuestionFocus={onQuestionFocus}
                question={question}
                readOnly={readOnly}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

type CompletionRowProps = Pick<
  StudentListeningPartFourCompletionProps,
  | "answerLabel"
  | "answers"
  | "currentQuestionId"
  | "onAnswerBlur"
  | "onAnswerChange"
  | "onQuestionFocus"
  | "readOnly"
> & { question: AttemptQuestion };

function CompletionRow({
  answerLabel,
  answers,
  currentQuestionId,
  onAnswerBlur,
  onAnswerChange,
  onQuestionFocus,
  question,
  readOnly,
}: CompletionRowProps) {
  const [beforeAnswer, afterAnswer = ""] = question.prompt.split(/_{3,}/, 2);

  return (
    <article
      className="connectedTestRunner__questionItem"
      data-active={question.id === currentQuestionId || undefined}
      id={`student-question-${question.id}`}
    >
      <label className="connectedTestRunner__inlineAnswer">
        {beforeAnswer.trim() ? <span>{beforeAnswer.trim()}</span> : null}
        <span aria-hidden="true" className="connectedTestRunner__questionNumber">
          {question.position}
        </span>
        <input
          aria-label={`${answerLabel} ${String(question.position)}`}
          maxLength={question.answerLimit ?? 160}
          onBlur={() => onAnswerBlur(question.id)}
          onChange={(event) => onAnswerChange(question.id, event.target.value)}
          onFocus={() => onQuestionFocus(question.id)}
          readOnly={readOnly}
          type="text"
          value={answers[question.id]?.textValue ?? ""}
        />
        {afterAnswer.trim() ? <span>{afterAnswer.trim()}</span> : null}
      </label>
    </article>
  );
}
