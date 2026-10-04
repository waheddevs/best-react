import FlagOutlined from "@mui/icons-material/FlagOutlined";

import type { StudentAttemptFieldsFragment } from "@/gql/graphql";

type AttemptQuestion = StudentAttemptFieldsFragment["questions"][number];

export type StudentAcademicReadingCopy = {
  choose: string;
  headingMatching: string;
  informationMatching: string;
  multipleChoice: string;
  noteCompletion: string;
  sentenceCompletion: string;
  summaryCompletion: string;
  trueFalseNotGiven: string;
  yesNoNotGiven: string;
};

type StudentAcademicReadingQuestionsProps = {
  answerLabel: string;
  answers: Record<
    string,
    { selectedOptionId: string | null; selectedOptionIds: string[]; textValue: string }
  >;
  copy: StudentAcademicReadingCopy;
  currentQuestionId: string;
  onChoiceAnswer: (questionId: string, optionId: string) => void;
  onMatchingAnswer: (questionId: string, optionId: string) => void;
  onQuestionFocus: (questionId: string) => void;
  onReviewToggle: (questionId: string) => void;
  onTextAnswerBlur: (questionId: string) => void;
  onTextAnswerChange: (questionId: string, value: string) => void;
  questions: StudentAttemptFieldsFragment["questions"];
  readOnly: boolean;
  reviewIds: readonly string[];
  reviewLabel: string;
  sectionPosition: number;
};

type QuestionGroup = {
  end: number;
  label: keyof Omit<StudentAcademicReadingCopy, "choose">;
  start: number;
};

const groupsByPassage: Record<number, QuestionGroup[]> = {
  1: [
    { end: 6, label: "trueFalseNotGiven", start: 1 },
    { end: 13, label: "noteCompletion", start: 7 },
  ],
  2: [
    { end: 18, label: "headingMatching", start: 14 },
    { end: 22, label: "informationMatching", start: 19 },
    { end: 26, label: "sentenceCompletion", start: 23 },
  ],
  3: [
    { end: 31, label: "yesNoNotGiven", start: 27 },
    { end: 36, label: "multipleChoice", start: 32 },
    { end: 40, label: "summaryCompletion", start: 37 },
  ],
};

export function StudentAcademicReadingQuestions({
  answerLabel,
  answers,
  copy,
  currentQuestionId,
  onChoiceAnswer,
  onMatchingAnswer,
  onQuestionFocus,
  onReviewToggle,
  onTextAnswerBlur,
  onTextAnswerChange,
  questions,
  readOnly,
  reviewIds,
  reviewLabel,
  sectionPosition,
}: StudentAcademicReadingQuestionsProps) {
  const orderedQuestions = [...questions].sort((left, right) => left.position - right.position);
  const groups = groupsByPassage[sectionPosition] ?? [];

  return (
    <div className="studentAcademicReading">
      {groups.map((group) => {
        const groupQuestions = orderedQuestions.filter(
          ({ position }) => position >= group.start && position <= group.end,
        );
        if (groupQuestions.length === 0) return null;

        return (
          <section className="studentAcademicReading__group" key={group.label}>
            <h2>{copy[group.label]}</h2>
            <div className="connectedTestRunner__questionList">
              {groupQuestions.map((question) => (
                <ReadingQuestion
                  answer={answers[question.id]}
                  answerLabel={answerLabel}
                  chooseLabel={copy.choose}
                  currentQuestionId={currentQuestionId}
                  key={question.id}
                  onChoiceAnswer={onChoiceAnswer}
                  onMatchingAnswer={onMatchingAnswer}
                  onQuestionFocus={onQuestionFocus}
                  onReviewToggle={onReviewToggle}
                  onTextAnswerBlur={onTextAnswerBlur}
                  onTextAnswerChange={onTextAnswerChange}
                  question={question}
                  readOnly={readOnly}
                  reviewIds={reviewIds}
                  reviewLabel={reviewLabel}
                  useMatchingSelect={
                    group.label === "headingMatching" || group.label === "informationMatching"
                  }
                  showOptionLetters={group.label === "multipleChoice"}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

type ReadingQuestionProps = {
  answer:
    { selectedOptionId: string | null; selectedOptionIds: string[]; textValue: string } | undefined;
  answerLabel: string;
  chooseLabel: string;
  currentQuestionId: string;
  onChoiceAnswer: (questionId: string, optionId: string) => void;
  onMatchingAnswer: (questionId: string, optionId: string) => void;
  onQuestionFocus: (questionId: string) => void;
  onReviewToggle: (questionId: string) => void;
  onTextAnswerBlur: (questionId: string) => void;
  onTextAnswerChange: (questionId: string, value: string) => void;
  question: AttemptQuestion;
  readOnly: boolean;
  reviewIds: readonly string[];
  reviewLabel: string;
  showOptionLetters: boolean;
  useMatchingSelect: boolean;
};

function ReadingQuestion({
  answer,
  answerLabel,
  chooseLabel,
  currentQuestionId,
  onChoiceAnswer,
  onMatchingAnswer,
  onQuestionFocus,
  onReviewToggle,
  onTextAnswerBlur,
  onTextAnswerChange,
  question,
  readOnly,
  reviewIds,
  reviewLabel,
  showOptionLetters,
  useMatchingSelect,
}: ReadingQuestionProps) {
  const isCompletion = question.kind === "SHORT_TEXT";
  const isMatching = question.kind === "MATCHING" || useMatchingSelect;
  const [beforeAnswer, afterAnswer = ""] = question.prompt.split(/_{3,}/, 2);

  return (
    <article
      className="connectedTestRunner__questionItem studentAcademicReading__question"
      data-active={question.id === currentQuestionId || undefined}
      id={`student-question-${question.id}`}
      onFocusCapture={() => onQuestionFocus(question.id)}
    >
      <div className="connectedTestRunner__questionTop">
        <button
          aria-label={reviewLabel}
          aria-pressed={reviewIds.includes(question.id)}
          onClick={() => onReviewToggle(question.id)}
          type="button"
        >
          <FlagOutlined aria-hidden="true" />
        </button>
      </div>

      {isCompletion ? (
        <label className="connectedTestRunner__inlineAnswer studentAcademicReading__completion">
          {beforeAnswer.trim() ? <span>{beforeAnswer.trim()}</span> : null}
          <span aria-hidden="true" className="connectedTestRunner__questionNumber">
            {question.position}
          </span>
          <input
            aria-label={`${answerLabel} ${String(question.position)}`}
            maxLength={question.answerLimit ?? 160}
            onBlur={() => onTextAnswerBlur(question.id)}
            onChange={(event) => onTextAnswerChange(question.id, event.target.value)}
            readOnly={readOnly}
            type="text"
            value={answer?.textValue ?? ""}
          />
          {afterAnswer.trim() ? <span>{afterAnswer.trim()}</span> : null}
        </label>
      ) : (
        <h3>
          <span>{question.position}.</span> {question.prompt}
        </h3>
      )}

      {isMatching ? (
        <label className="studentAcademicReading__matching">
          <span>{answerLabel}</span>
          <select
            aria-label={`${answerLabel} ${String(question.position)}`}
            disabled={readOnly}
            onChange={(event) => onMatchingAnswer(question.id, event.target.value)}
            value={
              question.kind === "MATCHING"
                ? (answer?.selectedOptionIds[0] ?? "")
                : (answer?.selectedOptionId ?? "")
            }
          >
            <option disabled value="">
              {chooseLabel}
            </option>
            {question.options.map((option, optionIndex) => (
              <option key={option.id} value={option.id}>
                {String.fromCharCode(65 + optionIndex)} · {option.text}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      {!isCompletion && !isMatching ? (
        <div className="connectedTestRunner__choices studentAcademicReading__choices">
          {question.options.map((option, optionIndex) => (
            <label key={option.id}>
              {showOptionLetters ? (
                <span aria-hidden="true" className="connectedTestRunner__optionMarker">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
              ) : null}
              <input
                checked={answer?.selectedOptionId === option.id}
                disabled={readOnly}
                name={question.id}
                onChange={() => onChoiceAnswer(question.id, option.id)}
                type="radio"
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      ) : null}
    </article>
  );
}
