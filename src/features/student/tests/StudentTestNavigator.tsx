import styles from "@/css/student/testRunner.module.css";
import type { StudentTestRunnerState } from "@/hooks/student/tests/useStudentTestRunner";
import type {
  StudentPreviewQuestion,
  StudentTestRunnerCopy,
} from "@/types/student/StudentTestRunner";

type StudentTestNavigatorProps = {
  copy: StudentTestRunnerCopy;
  questions: StudentPreviewQuestion[];
  runner: StudentTestRunnerState;
};

export function StudentTestNavigator({ copy, questions, runner }: StudentTestNavigatorProps) {
  return (
    <aside className={styles.testRunner__navigator}>
      <span>
        {runner.answeredIds.size}/{questions.length} {copy.answeredLabel}
      </span>
      <div>
        {questions.map((question, index) => (
          <button
            aria-current={index === runner.currentIndex ? "step" : undefined}
            aria-label={`${copy.questionLabel} ${index + 1}: ${runner.answeredIds.has(question.id) ? copy.answeredLabel : copy.unansweredLabel}`}
            className={
              runner.reviewIds.includes(question.id)
                ? styles.testRunner__questionReview
                : runner.answeredIds.has(question.id)
                  ? styles.testRunner__questionAnswered
                  : undefined
            }
            key={question.id}
            onClick={() => runner.handleQuestionSelect(index)}
            type="button"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </aside>
  );
}
