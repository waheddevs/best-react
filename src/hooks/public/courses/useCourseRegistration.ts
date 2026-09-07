import { useState, type ChangeEvent, type FormEvent } from "react";

import type { Locale } from "@/config/Locales";
import {
  RegisterForCourseDocument,
  type RegisterForCourseInput,
  type RegisterForCourseMutation,
} from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { executePublicApi } from "@/lib/PublicApi";
import { getApiLanguage } from "@/lib/PublicContentApi";
import type {
  CourseRegistrationCopy,
  CourseRegistrationValues,
} from "@/types/CourseRegistration";

type Errors = Partial<Record<keyof CourseRegistrationValues, string>>;
const initialValues: CourseRegistrationValues = {
  consent: false,
  currentLevel: "",
  email: "",
  fullName: "",
  message: "",
  phone: "",
};

export function useCourseRegistration(
  courseSlug: string,
  courseTitle: string,
  locale: Locale,
  copy: CourseRegistrationCopy,
) {
  /* HOOKS */
  const [errors, setErrors] = useState<Errors>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialValues);
  const notify = useNotifications();

  const validate = () => {
    const nextErrors: Errors = {};
    if (!values.fullName.trim()) nextErrors.fullName = copy.required;
    if (!values.phone.trim()) nextErrors.phone = copy.required;
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = copy.invalidEmail;
    }
    if (!values.consent) nextErrors.consent = copy.required;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* HANDLERS */
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (!isSubmitting) setIsOpen(false);
  };
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as Exclude<keyof CourseRegistrationValues, "consent">;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const handleConsentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, consent: event.target.checked }));
    setErrors((current) => ({ ...current, consent: undefined }));
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await notify.promise(
        executePublicApi<RegisterForCourseMutation, { input: RegisterForCourseInput }>(
          RegisterForCourseDocument,
          {
            input: {
              consent: values.consent,
              courseSlug,
              currentLevel: values.currentLevel.trim() || undefined,
              email: values.email.trim() || undefined,
              locale: getApiLanguage(locale),
              message: values.message.trim() || undefined,
              name: values.fullName.trim(),
              phone: values.phone.trim(),
            },
          },
          { cache: "no-store" },
        ),
        {
          success: {
            message: copy.successMessage.replace("{course}", courseTitle),
            title: copy.successTitle,
          },
        },
      );
      setValues(initialValues);
      setIsOpen(false);
    } catch {
      // The notification system already exposes the API error to the user.
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    handleClose,
    handleConsentChange,
    handleFieldChange,
    handleOpen,
    handleSubmit,
    isOpen,
    isSubmitting,
    values,
  };
}
