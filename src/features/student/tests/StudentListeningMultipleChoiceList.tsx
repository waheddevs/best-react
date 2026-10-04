import FlagOutlined from "@mui/icons-material/FlagOutlined";

import type { StudentAttemptFieldsFragment } from "@/gql/graphql";

type StudentListeningMultipleChoiceListProps = {
  answers: Record<string, { selectedOptionId: string | null }>;
  currentQuestionId: string;
  onAnswer: (questionId: string, optionId: string) => void;
  onQuestionFocus: (questionId: string) => void;
  onReviewToggle: (questionId: string) => void;
  questions: StudentAttemptFieldsFragment["questions"];
  readOnly: boolean;
  reviewIds: readonly string[];
  reviewLabel: string;
};

export function StudentListeningMultipleChoiceList({
  answers,
  currentQuestionId,
  onAnswer,
  onQuestionFocus,
  onReviewToggle,
  questions,
  readOnly,
  reviewIds,
  reviewLabel,
}: StudentListeningMultipleChoiceListProps) {
  return (
    <div className="connectedTestRunner__questionList studentListeningMultipleChoice">
      {questions.map((question) => (
        <article
          className="connectedTestRunner__questionItem studentListeningMultipleChoice__question"
          data-active={question.id === currentQuestionId || undefined}
          id={`student-question-${question.id}`}
          key={question.id}
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

          <h3>
            <span>{question.position}.</span> {question.prompt}
          </h3>

          <div className="connectedTestRunner__choices">
            {question.options.map((option, optionIndex) => (
              <label key={option.id}>
                <span aria-hidden="true" className="connectedTestRunner__optionMarker">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <input
                  checked={answers[question.id]?.selectedOptionId === option.id}
                  disabled={readOnly}
                  name={question.id}
                  onChange={() => onAnswer(question.id, option.id)}
                  type="radio"
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
