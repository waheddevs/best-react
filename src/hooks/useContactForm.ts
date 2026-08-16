"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import type { PageCopy } from "@/dictionaries/page-copy";

export type ContactFormValues = {
  name: string;
  contact: string;
  course: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  contact: "",
  course: "",
  message: "",
};

export function useContactForm(copy: PageCopy["contact"]) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [showServiceNotice, setShowServiceNotice] = useState(false);

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setShowServiceNotice(false);
  };

  const validate = () => {
    const nextErrors: ContactFormErrors = {};

    if (!values.name.trim()) nextErrors.name = copy.required;
    if (!values.contact.trim()) {
      nextErrors.contact = copy.required;
    } else {
      const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact);
      const looksLikePhone = /^[+\d][\d\s()-]{6,}$/.test(values.contact);
      if (!looksLikeEmail && !looksLikePhone) nextErrors.contact = copy.invalidContact;
    }
    if (!values.message.trim()) nextErrors.message = copy.required;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) setShowServiceNotice(true);
  };

  return { errors, handleSubmit, showServiceNotice, updateField, values };
}
