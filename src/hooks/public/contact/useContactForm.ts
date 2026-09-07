import { useState, type ChangeEvent, type FormEvent } from "react";

import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import {
  SubmitContactRequestDocument,
  type SubmitContactRequestInput,
  type SubmitContactRequestMutation,
} from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { executePublicApi } from "@/lib/PublicApi";
import { getApiLanguage } from "@/lib/PublicContentApi";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

export function useContactForm(copy: PageCopy, locale: Locale) {
  /* HOOKS */
  const notify = useNotifications();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!values.firstName.trim()) nextErrors.firstName = copy.contact.required;
    if (!values.lastName.trim()) nextErrors.lastName = copy.contact.required;

    if (!values.email.trim()) {
      nextErrors.email = copy.contact.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = copy.contact.invalidEmail;
    }

    if (!values.subject.trim()) nextErrors.subject = copy.contact.required;
    if (!values.message.trim()) nextErrors.message = copy.contact.required;
    if (!values.consent) nextErrors.consent = copy.contact.required;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* HANDLERS */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await notify.promise(
        executePublicApi<SubmitContactRequestMutation, { input: SubmitContactRequestInput }>(
          SubmitContactRequestDocument,
          {
            input: {
              consent: values.consent,
              email: values.email.trim(),
              locale: getApiLanguage(locale),
              message: values.message.trim(),
              name: `${values.firstName.trim()} ${values.lastName.trim()}`,
              subject: values.subject.trim(),
            },
          },
          { cache: "no-store" },
        ),
        {
          success: {
            message: copy.contact.serviceNotice,
            title: copy.contact.serviceNoticeTitle,
          },
        },
      );
      setValues(initialValues);
    } catch {
      // The notification system already exposes the API error to the user.
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("firstName", event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("lastName", event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("email", event.target.value);
  };

  const handleSubjectChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("subject", event.target.value);
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("message", event.target.value);
  };

  const handleConsentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, consent: event.target.checked }));
    setErrors((current) => ({ ...current, consent: undefined }));
  };

  return {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handleSubjectChange,
    handleMessageChange,
    handleConsentChange,
  };
}
