import { useState, type ChangeEvent, type FormEvent } from "react";

import type { PageCopy } from "@/dictionaries/public/PageCopy";

type FormValues = {
  name: string;
  contact: string;
  course: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", contact: "", course: "", message: "" };

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

    if (!values.name.trim()) nextErrors.name = copy.contact.required;

    if (!values.contact.trim()) {
      nextErrors.contact = copy.contact.required;
    } else {
      const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact);
      const looksLikePhone = /^[+\d][\d\s()-]{6,}$/.test(values.contact);

      if (!looksLikeEmail && !looksLikePhone) {
        nextErrors.contact = copy.contact.invalidContact;
      }
    }

    if (!values.message.trim()) nextErrors.message = copy.contact.required;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* HANDLERS */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) setShowServiceNotice(true);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("name", event.target.value);
  };

  const handleContactChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("contact", event.target.value);
  };

  const handleCourseChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("course", event.target.value);
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField("message", event.target.value);
  };

  return {
    values,
    errors,
    showServiceNotice,
    handleSubmit,
    handleNameChange,
    handleContactChange,
    handleCourseChange,
    handleMessageChange,
  };
}
