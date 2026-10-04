"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import {
  SaveStudentTestAnswerDocument,
  type StudentAttemptFieldsFragment,
  SubmitStudentTestAttemptDocument,
} from "@/gql/graphql";

type StudentWritingSimulatorProps = {
  attempt: StudentAttemptFieldsFragment;
  locale: Locale;
  paperId: string;
};

const copy = {
  uz: {
    answer: "Javobingiz",
    back: "Testga qaytish",
    completeDescription: "Writing javoblaringiz teacher tekshiruvi uchun yuborildi.",
    completeTitle: "Writing practice yakunlandi",
    emptyTasks: "Testni yakunlashdan oldin ikkala task uchun ham javob yozing.",
    finish: "Writing testni yakunlash",
    finishConfirm: "Writing javoblarini yuborasizmi? Keyin ularni o'zgartirib bo'lmaydi.",
    minimum: "Kamida {count} ta so'z",
    next: "Task 2 ga o'tish",
    previous: "Task 1 ga qaytish",
    return: "Qaytish",
    saved: "Saqlandi",
    saveError: "Javob saqlanmadi. Internetni tekshirib qayta urinib ko'ring.",
    saving: "Saqlanmoqda...",
    source: "Task material",
    submitError: "Writing testni yakunlab bo'lmadi. Qayta urinib ko'ring.",
    task: "TASK {number}",
    totalTime: "Umumiy vaqt",
    underMinimum: "Tavsiya etilgan minimumga hali {count} ta so'z qoldi.",
    words: "So'zlar: {count}",
  },
  ru: {
    answer: "Ваш ответ",
    back: "Вернуться к тесту",
    completeDescription: "Ответы Writing отправлены преподавателю на проверку.",
    completeTitle: "Практика Writing завершена",
    emptyTasks: "Перед завершением напишите ответ для обоих заданий.",
    finish: "Завершить Writing",
    finishConfirm: "Отправить ответы Writing? После отправки их нельзя изменить.",
    minimum: "Не менее {count} слов",
    next: "Перейти к заданию 2",
    previous: "Вернуться к заданию 1",
    return: "Вернуться",
    saved: "Сохранено",
    saveError: "Ответ не сохранён. Проверьте интернет и повторите попытку.",
    saving: "Сохранение...",
    source: "Материал задания",
    submitError: "Не удалось завершить Writing. Повторите попытку.",
    task: "ЗАДАНИЕ {number}",
    totalTime: "Общее время",
    underMinimum: "До рекомендуемого минимума осталось {count} слов.",
    words: "Слов: {count}",
  },
  en: {
    answer: "Your answer",
    back: "Back to test",
    completeDescription: "Your Writing responses were submitted for teacher review.",
    completeTitle: "Writing practice complete",
    emptyTasks: "Write a response for both tasks before finishing the test.",
    finish: "Finish Writing test",
    finishConfirm: "Submit your Writing responses? You cannot change them afterwards.",
    minimum: "At least {count} words",
    next: "Continue to Task 2",
    previous: "Return to Task 1",
    return: "Return",
    saved: "Saved",
    saveError: "The response was not saved. Check your connection and try again.",
    saving: "Saving...",
    source: "Task material",
    submitError: "The Writing test could not be completed. Please try again.",
    task: "TASK {number}",
    totalTime: "Total time",
    underMinimum: "{count} more words to reach the recommended minimum.",
    words: "Words: {count}",
  },
} as const;

export function StudentWritingSimulator({
  attempt,
  locale,
  paperId,
}: StudentWritingSimulatorProps) {
  const labels = copy[locale];
  const router = useRouter();
  const tasks = useMemo(
    () =>
      [...attempt.questions]
        .filter((question) => question.kind === "LONG_TEXT")
        .map((question) => ({
          question,
          section: attempt.sections.find((section) => section.id === question.sectionId) ?? null,
        }))
        .filter(
          (
            task,
          ): task is {
            question: (typeof attempt.questions)[number];
            section: (typeof attempt.sections)[number];
          } => task.section !== null,
        )
        .sort(
          (left, right) =>
            left.section.position - right.section.position ||
            left.question.position - right.question.position,
        ),
    [attempt],
  );
  const [currentTask, setCurrentTask] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      attempt.answers.map((answer) => [answer.questionId, answer.textValue ?? ""]),
    ),
  );
  const [saveState, setSaveState] = useState<"error" | "idle" | "saved" | "saving">("idle");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(attempt.status !== "IN_PROGRESS");
  const [finalizing, setFinalizing] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    secondsRemaining(attempt.expiresAt, attempt.serverTime),
  );
  const savedAnswersRef = useRef<Record<string, string>>(
    Object.fromEntries(
      attempt.answers.map((answer) => [answer.questionId, answer.textValue ?? ""]),
    ),
  );
  const answersRef = useRef(answers);
  const saveQueueRef = useRef<Record<string, Promise<void>>>({});
  const autoSubmittedRef = useRef(false);
  const [saveAnswer] = useMutation(SaveStudentTestAnswerDocument, {
    context: { authenticated: true },
  });
  const [submitAttempt, { loading: submitting }] = useMutation(SubmitStudentTestAttemptDocument, {
    context: { authenticated: true },
  });
  const task = tasks[currentTask];
  const returnHref = `/${locale}/student/tests/${paperId}`;

  const persistTask = useCallback(
    async (taskIndex: number) => {
      const target = tasks[taskIndex];
      if (!target) return false;
      const questionId = target.question.id;
      const value = answersRef.current[questionId]?.trim() ?? "";
      if (!value) return false;

      setSaveState("saving");
      const previous = saveQueueRef.current[questionId] ?? Promise.resolve();
      const next = previous
        .catch(() => undefined)
        .then(async () => {
          if (savedAnswersRef.current[questionId] === value) return;
          await saveAnswer({
            variables: { input: { attemptId: attempt.id, questionId, textValue: value } },
          });
          savedAnswersRef.current[questionId] = value;
          if (answersRef.current[questionId]?.trim() === value) setSaveState("saved");
        });
      saveQueueRef.current[questionId] = next;
      try {
        await next;
        return true;
      } catch {
        setSaveState("error");
        return false;
      }
    },
    [attempt.id, saveAnswer, tasks],
  );

  useEffect(() => {
    if (completed) return;
    const timer = window.setInterval(
      () => setRemainingSeconds((current) => (current === null ? null : Math.max(0, current - 1))),
      1_000,
    );
    return () => window.clearInterval(timer);
  }, [completed]);

  useEffect(() => {
    if (completed || remainingSeconds !== 0 || autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;
    setFinalizing(true);
    void (async () => {
      await Promise.allSettled(Object.values(saveQueueRef.current));
      try {
        await submitAttempt({ variables: { input: { attemptId: attempt.id } } });
        router.push(returnHref);
        router.refresh();
      } catch {
        setError(labels.submitError);
        setFinalizing(false);
      }
    })();
  }, [
    attempt.id,
    completed,
    labels.submitError,
    remainingSeconds,
    returnHref,
    router,
    submitAttempt,
  ]);

  useEffect(() => {
    if (!task) return;
    const text = answers[task.question.id]?.trim() ?? "";
    if (!text || savedAnswersRef.current[task.question.id] === text) return;
    const timeout = window.setTimeout(() => {
      void persistTask(currentTask);
    }, 800);
    return () => window.clearTimeout(timeout);
  }, [answers, currentTask, persistTask, task]);

  if (!task || tasks.length === 0) return null;

  const text = answers[task.question.id] ?? "";
  const wordCount = countWords(text);
  const minimumWords = getMinimumWords(task.section.position);
  const wordsRemaining = Math.max(0, minimumWords - wordCount);

  const changeTask = async (nextTask: number) => {
    setError("");
    const saved = await persistTask(currentTask);
    if (!saved && answersRef.current[task.question.id]?.trim()) {
      setError(labels.saveError);
      return;
    }
    setCurrentTask(nextTask);
  };

  const leave = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    const saved = await persistTask(currentTask);
    if (!saved && answersRef.current[task.question.id]?.trim()) {
      setError(labels.saveError);
      return;
    }
    router.push(returnHref);
  };

  const finish = async () => {
    setError("");
    if (tasks.some(({ question }) => !(answersRef.current[question.id] ?? "").trim())) {
      setError(labels.emptyTasks);
      return;
    }
    if (!window.confirm(labels.finishConfirm)) return;
    setFinalizing(true);
    const saved = (await Promise.all(tasks.map((_, index) => persistTask(index)))).every(Boolean);
    if (!saved) {
      setError(labels.saveError);
      setFinalizing(false);
      return;
    }
    autoSubmittedRef.current = true;
    try {
      await submitAttempt({ variables: { input: { attemptId: attempt.id } } });
      setCompleted(true);
    } catch {
      autoSubmittedRef.current = false;
      setError(labels.submitError);
      setFinalizing(false);
    }
  };

  if (completed) {
    return (
      <main className="studentWritingSimulator">
        <section className="studentWritingSimulator__complete">
          <span>
            <CheckCircleRounded aria-hidden="true" />
          </span>
          <h1>{labels.completeTitle}</h1>
          <p>{labels.completeDescription}</p>
          <Link href={returnHref}>
            {labels.return}
            <ArrowForwardRounded aria-hidden="true" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="studentWritingSimulator">
      <header className="studentWritingSimulator__header">
        <Link aria-label={labels.back} href={returnHref} onClick={(event) => void leave(event)}>
          <ArrowBackRounded aria-hidden="true" />
        </Link>
        <div>
          <span>{labels.task.replace("{number}", String(task.section.position))}</span>
          <h1>{attempt.title}</h1>
          <p>{task.section.title}</p>
        </div>
        <div className="studentWritingSimulator__timer">
          <span>{labels.totalTime}</span>
          <strong>{formatTime(remainingSeconds)}</strong>
        </div>
      </header>

      <nav aria-label={attempt.title} className="studentWritingSimulator__tasks">
        {tasks.map(({ section }, index) => (
          <button
            aria-current={index === currentTask ? "step" : undefined}
            disabled={finalizing}
            key={section.id}
            onClick={() => void changeTask(index)}
            type="button"
          >
            <span>{labels.task.replace("{number}", String(section.position))}</span>
            <small>{getSuggestedMinutes(section.position)} min</small>
          </button>
        ))}
      </nav>

      <section className="studentWritingSimulator__workspace">
        <article className="studentWritingSimulator__source">
          <div className="studentWritingSimulator__sourceHeading">
            <span>{labels.source}</span>
            <strong>{labels.minimum.replace("{count}", String(minimumWords))}</strong>
          </div>
          <h2>{task.section.title}</h2>
          <p className="studentWritingSimulator__instructions">{task.section.instructions}</p>
          {task.section.content ? (
            <div className="studentWritingSimulator__content">{task.section.content}</div>
          ) : null}
          <blockquote>{task.question.prompt}</blockquote>
        </article>

        <div className="studentWritingSimulator__editor">
          <label htmlFor={`writing-answer-${task.question.id}`}>{labels.answer}</label>
          <textarea
            autoFocus
            disabled={finalizing}
            id={`writing-answer-${task.question.id}`}
            onChange={(event) => {
              setSaveState("idle");
              const next = { ...answersRef.current, [task.question.id]: event.target.value };
              answersRef.current = next;
              setAnswers(next);
            }}
            spellCheck
            value={text}
          />
          <footer>
            <div>
              <strong>{labels.words.replace("{count}", String(wordCount))}</strong>
              {wordsRemaining > 0 ? (
                <span>{labels.underMinimum.replace("{count}", String(wordsRemaining))}</span>
              ) : null}
            </div>
            <span aria-live="polite" data-state={saveState}>
              {saveState === "saving"
                ? labels.saving
                : saveState === "saved"
                  ? labels.saved
                  : saveState === "error"
                    ? labels.saveError
                    : ""}
            </span>
          </footer>
        </div>
      </section>

      <div className="studentWritingSimulator__actions">
        {currentTask > 0 ? (
          <button
            disabled={finalizing}
            onClick={() => void changeTask(currentTask - 1)}
            type="button"
          >
            <ArrowBackRounded aria-hidden="true" />
            {labels.previous}
          </button>
        ) : (
          <span />
        )}
        {currentTask < tasks.length - 1 ? (
          <button
            disabled={finalizing}
            onClick={() => void changeTask(currentTask + 1)}
            type="button"
          >
            {labels.next}
            <ArrowForwardRounded aria-hidden="true" />
          </button>
        ) : (
          <button disabled={finalizing || submitting} onClick={() => void finish()} type="button">
            <EditNoteRounded aria-hidden="true" />
            {labels.finish}
          </button>
        )}
      </div>

      {error ? (
        <p className="studentWritingSimulator__error" role="alert">
          {error}
        </p>
      ) : null}
    </main>
  );
}

function countWords(value: string) {
  const words = value.trim().match(/\S+/g);
  return words?.length ?? 0;
}

function getMinimumWords(position: number) {
  return position === 1 ? 150 : 250;
}

function getSuggestedMinutes(position: number) {
  return position === 1 ? 20 : 40;
}

function secondsRemaining(expiresAt: string | null, serverTime: string): number | null {
  if (!expiresAt) return null;
  return Math.max(0, Math.floor((Date.parse(expiresAt) - Date.parse(serverTime)) / 1_000));
}

function formatTime(seconds: number | null): string {
  if (seconds === null) return "--:--";
  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  const remainder = seconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}
