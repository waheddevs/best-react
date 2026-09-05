"use client";

import { useEffect, useMemo, useState } from "react";

import type { StudentPreviewQuestion } from "@/types/student/StudentTestRunner";

type RunnerAnswer = string | string[];
export type StudentTestDialog = "complete" | "exit" | "submit" | null;

export function useStudentTestRunner(questions: StudentPreviewQuestion[]) {
  /* HOOKS */
  const [answers, setAnswers] = useState<Record<string, RunnerAnswer>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialog, setDialog] = useState<StudentTestDialog>(null);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(
      questions
        .filter((question) => question.kind === "ordering")
        .map((question) => [question.id, question.options ?? []]),
    ),
  );
  const answeredIds = useMemo(
    () =>
      new Set(
        questions
          .filter((question) => {
            if (question.kind === "matching") {
              return question.pairs?.every((pair) => Boolean(answers[`${question.id}:${pair.id}`]));
            }
            if (question.kind === "ordering") return Boolean(answers[question.id]);
            const answer = answers[question.id];
            return Array.isArray(answer) ? answer.length > 0 : Boolean(answer?.trim());
          })
          .map((question) => question.id),
      ),
    [answers, questions],
  );

  useEffect(() => {
    if (answeredIds.size === 0) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answeredIds.size]);

  /* HANDLERS */
  const handleAnswer = (questionId: string, value: string) =>
    setAnswers((current) => ({ ...current, [questionId]: value }));
  const handleMultipleAnswer = (questionId: string, value: string) =>
    setAnswers((current) => {
      const previous = Array.isArray(current[questionId]) ? current[questionId] : [];
      const selected = previous.includes(value)
        ? previous.filter((option) => option !== value)
        : [...previous, value];
      return { ...current, [questionId]: selected };
    });
  const handleMatch = (questionId: string, pairId: string, value: string) =>
    handleAnswer(`${questionId}:${pairId}`, value);
  const handleMove = (questionId: string, optionIndex: number, direction: -1 | 1) => {
    const order = [...(orders[questionId] ?? [])];
    const targetIndex = optionIndex + direction;
    if (targetIndex < 0 || targetIndex >= order.length) return;
    [order[optionIndex], order[targetIndex]] = [order[targetIndex], order[optionIndex]];
    setOrders((current) => ({ ...current, [questionId]: order }));
    setAnswers((current) => ({ ...current, [questionId]: order }));
  };
  const handleNext = () =>
    setCurrentIndex((current) => Math.min(questions.length - 1, current + 1));
  const handlePrevious = () => setCurrentIndex((current) => Math.max(0, current - 1));
  const handleQuestionSelect = (index: number) => setCurrentIndex(index);
  const handleReviewToggle = () => {
    const questionId = questions[currentIndex]?.id;
    if (!questionId) return;
    setReviewIds((current) =>
      current.includes(questionId)
        ? current.filter((id) => id !== questionId)
        : [...current, questionId],
    );
  };
  const handleDialogClose = () => setDialog(null);
  const handleExitRequest = () => setDialog("exit");
  const handleSubmitRequest = () => setDialog("submit");
  const handleSubmitConfirm = () => setDialog("complete");

  return {
    answeredIds,
    answers,
    currentIndex,
    dialog,
    handleAnswer,
    handleDialogClose,
    handleExitRequest,
    handleMatch,
    handleMove,
    handleMultipleAnswer,
    handleNext,
    handlePrevious,
    handleQuestionSelect,
    handleReviewToggle,
    handleSubmitConfirm,
    handleSubmitRequest,
    orders,
    reviewIds,
  };
}

export type StudentTestRunnerState = ReturnType<typeof useStudentTestRunner>;
