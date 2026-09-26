"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import {
  SaveStudentTestAnswerDocument,
  type SaveAttemptAnswerInput,
  type StudentAttemptFieldsFragment,
  SubmitStudentTestAttemptDocument,
} from "@/gql/graphql";

type ConnectedStudentTestRunnerProps = {
  attempt: StudentAttemptFieldsFragment;
  locale: Locale;
  paperId: string;
};

type LocalAnswer = {
  selectedOptionId: string | null;
  selectedOptionIds: string[];
  textValue: string;
};

const runnerCopy = {
  uz: {
    answer: "Javobingiz",
    audioPending: "Speaking recording keyingi media bosqichida faollashadi.",
    exit: "Testga qaytish",
    next: "Keyingi",
    previous: "Oldingi",
    question: "Savol",
    saveError: "Javob saqlanmadi. Internetni tekshirib qayta urinib ko'ring.",
    saved: "Saqlandi",
    saving: "Saqlanmoqda...",
    submit: "Bo'limni yakunlash",
    submitConfirm: "Topshirgandan keyin javoblarni o'zgartira olmaysiz. Davom etilsinmi?",
    time: "Qolgan vaqt",
  },
  ru: {
    answer: "Ваш ответ",
    audioPending: "Запись Speaking будет доступна на следующем этапе работы с медиа.",
    exit: "К тесту",
    next: "Далее",
    previous: "Назад",
    question: "Вопрос",
    saveError: "Ответ не сохранён. Проверьте интернет и повторите попытку.",
    saved: "Сохранено",
    saving: "Сохраняем...",
    submit: "Завершить раздел",
    submitConfirm: "После отправки ответы нельзя изменить. Продолжить?",
    time: "Осталось",
  },
  en: {
    answer: "Your answer",
    audioPending: "Speaking recording will be enabled in the next media slice.",
    exit: "Back to test",
    next: "Next",
    previous: "Previous",
    question: "Question",
    saveError: "The answer was not saved. Check your connection and try again.",
    saved: "Saved",
    saving: "Saving...",
    submit: "Finish section",
    submitConfirm: "You cannot change answers after submission. Continue?",
    time: "Time left",
  },
} as const;

export function ConnectedStudentTestRunner({
  attempt,
  locale,
  paperId,
}: ConnectedStudentTestRunnerProps) {
  const copy = runnerCopy[locale];
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LocalAnswer>>(() =>
    Object.fromEntries(
      attempt.answers.map((answer) => [
        answer.questionId,
        {
          selectedOptionId: answer.selectedOptionId,
          selectedOptionIds: [...answer.selectedOptionIds],
          textValue: answer.textValue ?? "",
        },
      ]),
    ),
  );
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [saveState, setSaveState] = useState<"error" | "idle" | "saved" | "saving">("idle");
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    secondsRemaining(attempt.expiresAt, attempt.serverTime),
  );
  const [saveAnswer] = useMutation(SaveStudentTestAnswerDocument, {
    context: { authenticated: true },
  });
  const [submitAttempt, { loading: submitting }] = useMutation(
    SubmitStudentTestAttemptDocument,
    { context: { authenticated: true } },
  );
  const autoSubmittedRef = useRef(false);
  const question = attempt.questions[currentIndex];
  const section = attempt.sections.find((item) => item.id === question?.sectionId) ?? null;
  const answeredIds = useMemo(
    () =>
      new Set(
        Object.entries(answers)
          .filter(([, answer]) =>
            Boolean(
              answer.selectedOptionId ||
                answer.selectedOptionIds.length > 0 ||
                answer.textValue.trim(),
            ),
          )
          .map(([questionId]) => questionId),
      ),
    [answers],
  );

  useEffect(() => {
    const timer = window.setInterval(
      () => setRemainingSeconds((current) => (current === null ? null : Math.max(0, current - 1))),
      1_000,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingSeconds !== 0 || autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;
    void submitAttempt({ variables: { input: { attemptId: attempt.id } } }).finally(() => {
      router.push(`/${locale}/student/tests/${paperId}`);
      router.refresh();
    });
  }, [attempt.id, locale, paperId, remainingSeconds, router, submitAttempt]);

  if (!question) return null;

  const localAnswer = answers[question.id] ?? {
    selectedOptionId: null,
    selectedOptionIds: [],
    textValue: "",
  };

  const persist = async (input: Omit<SaveAttemptAnswerInput, "attemptId" | "questionId">) => {
    setSaveState("saving");
    try {
      await saveAnswer({
        variables: { input: { ...input, attemptId: attempt.id, questionId: question.id } },
      });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  const handleSingle = (selectedOptionId: string) => {
    setAnswers((current) => ({
      ...current,
      [question.id]: { ...localAnswer, selectedOptionId },
    }));
    void persist({ selectedOptionId });
  };

  const handleMultiple = (optionId: string) => {
    if (
      localAnswer.selectedOptionIds.length === 1 &&
      localAnswer.selectedOptionIds.includes(optionId)
    ) {
      return;
    }
    const selectedOptionIds = localAnswer.selectedOptionIds.includes(optionId)
      ? localAnswer.selectedOptionIds.filter((id) => id !== optionId)
      : [...localAnswer.selectedOptionIds, optionId];
    setAnswers((current) => ({
      ...current,
      [question.id]: { ...localAnswer, selectedOptionIds },
    }));
    if (selectedOptionIds.length > 0) void persist({ selectedOptionIds });
  };

  const handleTextChange = (textValue: string) =>
    setAnswers((current) => ({
      ...current,
      [question.id]: { ...localAnswer, textValue },
    }));

  const handleTextSave = () => {
    if (localAnswer.textValue.trim()) void persist({ textValue: localAnswer.textValue });
  };

  const handleSubmit = async () => {
    if (!window.confirm(copy.submitConfirm)) return;
    await submitAttempt({ variables: { input: { attemptId: attempt.id } } });
    router.push(`/${locale}/student/tests/${paperId}`);
    router.refresh();
  };

  const isSingle = ["SINGLE_CHOICE", "TRUE_FALSE_NOT_GIVEN", "YES_NO_NOT_GIVEN"].includes(
    question.kind,
  );
  const isMultiple = ["MULTIPLE_CHOICE", "MATCHING"].includes(question.kind);

  return (
    <article className="connectedTestRunner">
      <header className="connectedTestRunner__header">
        <Link href={`/${locale}/student/tests/${paperId}`}>
          <ArrowBackRounded aria-hidden="true" />
          {copy.exit}
        </Link>
        <div>
          <span>{attempt.skill}</span>
          <h1>{attempt.title}</h1>
        </div>
        <div className="connectedTestRunner__timer">
          <TimerOutlined aria-hidden="true" />
          <span>{copy.time}</span>
          <strong>{formatTime(remainingSeconds)}</strong>
        </div>
      </header>

      <div className="connectedTestRunner__body">
        {section ? (
          <section className="connectedTestRunner__stimulus">
            <span>{section.title}</span>
            <h2>{section.instructions}</h2>
            {section.content ? <div>{section.content}</div> : null}
            {attempt.skill === "LISTENING" && section.mediaObjectId ? (
              <p className="connectedTestRunner__mediaState">Protected audio</p>
            ) : null}
          </section>
        ) : null}

        <section className="connectedTestRunner__question">
          <div className="connectedTestRunner__questionTop">
            <span>
              {copy.question} {currentIndex + 1} / {attempt.questions.length}
            </span>
            <button
              aria-pressed={reviewIds.includes(question.id)}
              onClick={() =>
                setReviewIds((current) =>
                  current.includes(question.id)
                    ? current.filter((id) => id !== question.id)
                    : [...current, question.id],
                )
              }
              type="button"
            >
              <FlagOutlined aria-hidden="true" />
            </button>
          </div>
          <h2>{question.prompt}</h2>

          {isSingle ? (
            <div className="connectedTestRunner__choices">
              {question.options.map((option) => (
                <label key={option.id}>
                  <input
                    checked={localAnswer.selectedOptionId === option.id}
                    name={question.id}
                    onChange={() => handleSingle(option.id)}
                    type="radio"
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
          ) : null}

          {isMultiple ? (
            <div className="connectedTestRunner__choices">
              {question.options.map((option) => (
                <label key={option.id}>
                  <input
                    checked={localAnswer.selectedOptionIds.includes(option.id)}
                    onChange={() => handleMultiple(option.id)}
                    type="checkbox"
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
          ) : null}

          {["SHORT_TEXT", "LONG_TEXT"].includes(question.kind) ? (
            <label className="connectedTestRunner__text">
              <span>{copy.answer}</span>
              <textarea
                onBlur={handleTextSave}
                onChange={(event) => handleTextChange(event.target.value)}
                rows={question.kind === "LONG_TEXT" ? 14 : 3}
                value={localAnswer.textValue}
              />
            </label>
          ) : null}

          {question.kind === "AUDIO_RESPONSE" ? (
            <p className="connectedTestRunner__mediaState">{copy.audioPending}</p>
          ) : null}

          <div aria-live="polite" className={`connectedTestRunner__save connectedTestRunner__save_${saveState}`}>
            {saveState === "saving"
              ? copy.saving
              : saveState === "saved"
                ? copy.saved
                : saveState === "error"
                  ? copy.saveError
                  : ""}
          </div>

          <footer>
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
              type="button"
            >
              {copy.previous}
            </button>
            {currentIndex === attempt.questions.length - 1 ? (
              <button disabled={submitting} onClick={handleSubmit} type="button">
                {copy.submit}
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentIndex((index) => Math.min(attempt.questions.length - 1, index + 1))
                }
                type="button"
              >
                {copy.next}
              </button>
            )}
          </footer>
        </section>
      </div>

      <nav aria-label={copy.question} className="connectedTestRunner__navigator">
        {attempt.questions.map((item, index) => (
          <button
            aria-current={index === currentIndex ? "step" : undefined}
            className={answeredIds.has(item.id) ? "is-answered" : undefined}
            key={item.id}
            onClick={() => setCurrentIndex(index)}
            type="button"
          >
            {index + 1}
          </button>
        ))}
      </nav>
    </article>
  );
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
