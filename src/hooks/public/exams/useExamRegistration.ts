"use client";

import type { SelectChangeEvent } from "@mui/material/Select";
import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import type { Locale } from "@/config/Locales";
import {
  SubmitExamRegistrationDocument,
  type SubmitExamRegistrationInput,
  type SubmitExamRegistrationMutation,
} from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { executePublicApi } from "@/lib/PublicApi";
import { getApiLanguage } from "@/lib/PublicContentApi";
import { formatPhoneNumber, normalizePhoneNumber, validatePhoneNumber } from "@/lib/PhoneNumber";
import type {
  ExamPreviewCopy,
  ExamRegistrationValues,
  PublicExamOption,
} from "@/types/ExamPreview";
import type { CenterAlertInput } from "@/types/Notification";

type ExamRegistrationErrors = Partial<Record<keyof ExamRegistrationValues, string>>;

const initialValues: ExamRegistrationValues = {
  consent: false,
  currentLevel: "",
  email: "",
  fullName: "",
  mockDate: "",
  phone: "",
};

export function useExamRegistration(copy: ExamPreviewCopy, locale: Locale) {
  /* HOOKS */
  const pendingAlertRef = useRef<CenterAlertInput | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<PublicExamOption | null>(null);
  const [values, setValues] = useState<ExamRegistrationValues>(initialValues);
  const [errors, setErrors] = useState<ExamRegistrationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { promise, showCenterAlert } = useNotifications();

  const validate = useCallback(() => {
    const nextErrors: ExamRegistrationErrors = {};

    if (!values.fullName.trim()) nextErrors.fullName = copy.required;
    if (!values.phone.trim()) {
      nextErrors.phone = copy.required;
    } else if (!validatePhoneNumber(values.phone)) {
      nextErrors.phone = copy.invalidPhone;
    }
    if (!values.currentLevel) nextErrors.currentLevel = copy.required;
    if (!values.email.trim()) {
      nextErrors.email = copy.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = copy.invalidEmail;
    }

    if (selectedExam?.key === "mock" && !values.mockDate) {
      nextErrors.mockDate = copy.required;
    }
    if (!values.consent) nextErrors.consent = copy.required;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [copy.invalidEmail, copy.invalidPhone, copy.required, selectedExam?.key, values]);

  /* HANDLERS */
  const handleRegistrationOpen = useCallback((exam: PublicExamOption) => {
    pendingAlertRef.current = null;
    setSelectedExam(exam);
    setValues(initialValues);
    setErrors({});
    setIsOpen(true);
  }, []);

  const handleRegistrationClose = useCallback(() => {
    pendingAlertRef.current = null;
    setIsOpen(false);
  }, []);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as Exclude<keyof ExamRegistrationValues, "consent">;
    const value = field === "phone" ? formatPhoneNumber(event.target.value) : event.target.value;

    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleLevelChange = (event: SelectChangeEvent<string>) => {
    setValues((current) => ({ ...current, currentLevel: event.target.value }));
    setErrors((current) => ({ ...current, currentLevel: undefined }));
  };

  const handleConsentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, consent: event.target.checked }));
    setErrors((current) => ({ ...current, consent: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedExam || !validate()) return;

    setIsSubmitting(true);
    try {
      await promise(
        executePublicApi<SubmitExamRegistrationMutation, { input: SubmitExamRegistrationInput }>(
          SubmitExamRegistrationDocument,
          {
            input: {
              consent: values.consent,
              currentLevel: values.currentLevel,
              email: values.email.trim(),
              locale: getApiLanguage(locale),
              name: values.fullName.trim(),
              offeringKey: selectedExam.key,
              phone: normalizePhoneNumber(values.phone),
              ...(values.mockDate ? { sessionId: values.mockDate } : {}),
            },
          },
          { cache: "no-store" },
        ),
      );
      pendingAlertRef.current = {
        closeLabel: copy.done,
        message: copy.successMessage.replace("{exam}", selectedExam.title[locale]),
        title: copy.successTitle,
        tone: "success",
      };
      setIsOpen(false);
    } catch {
      // The notification system already exposes the API error to the user.
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogExited = () => {
    setSelectedExam(null);

    if (pendingAlertRef.current) {
      showCenterAlert(pendingAlertRef.current);
      pendingAlertRef.current = null;
    }
  };

  return {
    errors,
    isOpen,
    isSubmitting,
    selectedExam,
    values,
    handleDialogExited,
    handleFieldChange,
    handleConsentChange,
    handleLevelChange,
    handleRegistrationClose,
    handleRegistrationOpen,
    handleSubmit,
  };
}
