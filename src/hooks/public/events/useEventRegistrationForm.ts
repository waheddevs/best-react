import { useState, type ChangeEvent, type FormEvent } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";

import { formatPhoneNumber, validatePhoneNumber } from "@/lib/PhoneNumber";
import type { EventRegistrationCopy, EventRegistrationValues } from "@/types/EventRegistration";

type FormErrors = Partial<Record<keyof EventRegistrationValues, string>>;

const initialValues: EventRegistrationValues = {
  consent: false,
  email: "",
  fullName: "",
  participantCount: 1,
  phone: "",
};

export function useEventRegistrationForm(
  copy: EventRegistrationCopy,
  onRegister: (values: EventRegistrationValues) => Promise<boolean>,
) {
  /* HOOKS */
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialValues);

  const validate = () => {
    const nextErrors: FormErrors = {};
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
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as "email" | "fullName" | "phone";
    const value = field === "phone" ? formatPhoneNumber(event.target.value) : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleParticipantChange = (event: SelectChangeEvent<number>) => {
    setValues((current) => ({ ...current, participantCount: Number(event.target.value) }));
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
      await onRegister(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    handleFieldChange,
    handleConsentChange,
    handleParticipantChange,
    handleSubmit,
    isSubmitting,
    values,
  };
}
