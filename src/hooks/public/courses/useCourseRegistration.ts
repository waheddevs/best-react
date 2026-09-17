import { useMutation } from "@apollo/client/react";
import { useState, type ChangeEvent, type FormEvent } from "react";

import type { Locale } from "@/config/Locales";
import { RegisterForCourseDocument } from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { toPublicApiError } from "@/lib/apollo/ApolloError";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { formatPhoneNumber, normalizePhoneNumber, validatePhoneNumber } from "@/lib/PhoneNumber";
import type { CourseRegistrationCopy, CourseRegistrationValues } from "@/types/CourseRegistration";

type Errors = Partial<Record<keyof CourseRegistrationValues, string>>;
const initialValues: CourseRegistrationValues = {
  consent: false,
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
  const [registerForCourse] = useMutation(RegisterForCourseDocument, {
    fetchPolicy: "no-cache",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialValues);
  const notify = useNotifications();

  const validate = () => {
    const nextErrors: Errors = {};
    if (!values.fullName.trim()) nextErrors.fullName = copy.required;
    if (!values.phone.trim()) {
      nextErrors.phone = copy.required;
    } else if (!validatePhoneNumber(values.phone)) {
      nextErrors.phone = copy.invalidPhone;
    }
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
    const value = field === "phone" ? formatPhoneNumber(event.target.value) : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
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
        registerForCourse({
          variables: {
            input: {
              consent: values.consent,
              courseSlug,
              email: values.email.trim() || undefined,
              locale: getApiLanguage(locale),
              message: values.message.trim() || undefined,
              name: values.fullName.trim(),
              phone: normalizePhoneNumber(values.phone),
            },
          },
        }),
        {
          error: (error) => {
            const apiError = toPublicApiError(error);
            return apiError.code === "CONFLICT" &&
              apiError.message === "Course registration has already been received"
              ? {
                  message: copy.alreadySubmittedMessage,
                  title: copy.alreadySubmittedTitle,
                }
              : {};
          },
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
    handleFieldChange,
    handleConsentChange,
    handleOpen,
    handleSubmit,
    isOpen,
    isSubmitting,
    values,
  };
}
