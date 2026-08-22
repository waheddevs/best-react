import { useState, type ChangeEvent, type FormEvent } from "react";

import type { PageCopy } from "@/dictionaries/public/PageCopy";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm(copy: PageCopy) {
  /* HOOKS */
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showServiceNotice, setShowServiceNotice] = useState(false);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setShowServiceNotice(false);
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

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* HANDLERS */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) setShowServiceNotice(true);
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

  return {
    values,
    errors,
    showServiceNotice,
    handleSubmit,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handleSubjectChange,
    handleMessageChange,
  };
}
