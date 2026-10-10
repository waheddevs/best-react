import FlagOutlined from "@mui/icons-material/FlagOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import type { StudentAttemptFieldsFragment } from "@/gql/graphql";

import { StudentListeningMultipleChoiceList } from "./StudentListeningMultipleChoiceList";

type StudentListeningPartThreeListProps = {
  answers: Record<string, { selectedOptionId: string | null }>;
  copy: { matching: string; multipleChoice: string; select: string; speakers: string };
  currentQuestionId: string;
  onAnswer: (questionId: string, optionId: string) => void;
  onQuestionFocus: (questionId: string) => void;
  onReviewToggle: (questionId: string) => void;
  questions: StudentAttemptFieldsFragment["questions"];
  readOnly: boolean;
  reviewIds: readonly string[];
  reviewLabel: string;
};

export function StudentListeningPartThreeList({
  answers,
  copy,
  currentQuestionId,
  onAnswer,
  onQuestionFocus,
  onReviewToggle,
  questions,
  readOnly,
  reviewIds,
  reviewLabel,
}: StudentListeningPartThreeListProps) {
  const multipleChoiceQuestions = questions.slice(0, 5);
  const matchingQuestions = questions.slice(5);
  const speakerOptions = matchingQuestions[0]?.options ?? [];

  return (
    <div className="studentListeningPartThree">
      <section>
        <h2>{copy.multipleChoice}</h2>
        <StudentListeningMultipleChoiceList
          answers={answers}
          currentQuestionId={currentQuestionId}
          onAnswer={onAnswer}
          onQuestionFocus={onQuestionFocus}
          onReviewToggle={onReviewToggle}
          questions={multipleChoiceQuestions}
          readOnly={readOnly}
          reviewIds={reviewIds}
          reviewLabel={reviewLabel}
        />
      </section>

      <section>
        <h2>{copy.matching}</h2>
        <div className="studentListeningPartThree__speakers" aria-label={copy.speakers}>
          {speakerOptions.map((option, index) => (
            <span key={option.id}>
              <strong>{String.fromCharCode(65 + index)}</strong>
              {option.text}
            </span>
          ))}
        </div>
        <div className="connectedTestRunner__questionList studentListeningPartThree__matching">
          {matchingQuestions.map((question) => (
            <article
              className="connectedTestRunner__questionItem"
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
              <div className="studentListeningPartThree__matchRow">
                <span id={`speaker-question-${question.id}`}>
                  <strong>{question.position}.</strong> {question.prompt}
                </span>
                <Select
                  className="studentListeningPartThree__select"
                  disabled={readOnly}
                  displayEmpty
                  labelId={`speaker-question-${question.id}`}
                  MenuProps={{
                    slotProps: {
                      paper: { className: "studentListeningPartThree__menu" },
                    },
                  }}
                  onChange={(event) => onAnswer(question.id, event.target.value)}
                  size="small"
                  value={answers[question.id]?.selectedOptionId ?? ""}
                >
                  <MenuItem disabled value="">
                    {copy.select}
                  </MenuItem>
                  {question.options.map((option, index) => (
                    <MenuItem key={option.id} value={option.id}>
                      {String.fromCharCode(65 + index)} · {option.text}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
