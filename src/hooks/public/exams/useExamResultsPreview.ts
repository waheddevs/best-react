"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import type { ExamPreviewCopy, ExamResultsValues } from "@/types/ExamPreview";

type ExamResultsErrors = Partial<Record<keyof ExamResultsValues, string>>;

const initialValues: ExamResultsValues = {
  birthDate: "",
  candidateId: "",
};

export function useExamResultsPreview(copy: ExamPreviewCopy) {
  /* HOOKS */
  const confirm = useConfirmDialog();
  const locale = useCurrentLocale();
  const router = useRouter();
  const [values, setValues] = useState<ExamResultsValues>(initialValues);
  const [errors, setErrors] = useState<ExamResultsErrors>({});

  const validate = () => {
    const nextErrors: ExamResultsErrors = {};

    if (!values.candidateId.trim()) nextErrors.candidateId = copy.required;
    if (!values.birthDate) nextErrors.birthDate = copy.required;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* HANDLERS */
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof ExamResultsValues;
    const value = event.target.value;

    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleBirthDateChange = (value: string) => {
    setValues((current) => ({ ...current, birthDate: value }));
    setErrors((current) => ({ ...current, birthDate: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const accepted = await confirm({
      cancelLabel: copy.loginCancel,
      confirmLabel: copy.loginConfirm,
      message: copy.loginMessage,
      title: copy.loginTitle,
    });
    if (accepted) router.push(`/${locale}/login?role=student`);
  };

  return { errors, values, handleBirthDateChange, handleFieldChange, handleSubmit };
}
