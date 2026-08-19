"use client";

import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type FormValues = {
  name: string;
  contact: string;
  course: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", contact: "", course: "", message: "" };

type ContactFormProps = {
  locale: Locale;
  copy: PageCopy;
  courses: Course[];
};

export function ContactForm({ locale, copy, courses }: ContactFormProps) {
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
      if (!looksLikeEmail && !looksLikePhone) nextErrors.contact = copy.contact.invalidContact;
    }
    if (!values.message.trim()) nextErrors.message = copy.contact.required;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (validate()) setShowServiceNotice(true);
      }}
      className="grid gap-5"
    >
      <TextField
        required
        label={copy.contact.name}
        value={values.name}
        onChange={(event) => updateField("name", event.target.value)}
        error={Boolean(errors.name)}
        helperText={errors.name}
        autoComplete="name"
      />
      <TextField
        required
        label={copy.contact.contact}
        value={values.contact}
        onChange={(event) => updateField("contact", event.target.value)}
        error={Boolean(errors.contact)}
        helperText={errors.contact}
        autoComplete="email"
      />
      <TextField
        select
        label={copy.contact.interestedCourse}
        value={values.course}
        onChange={(event) => updateField("course", event.target.value)}
      >
        <MenuItem value="">{copy.contact.selectCourse}</MenuItem>
        {courses.map((course) => (
          <MenuItem key={course.slug} value={course.slug}>
            {course.title[locale]}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        multiline
        minRows={5}
        label={copy.contact.message}
        value={values.message}
        onChange={(event) => updateField("message", event.target.value)}
        error={Boolean(errors.message)}
        helperText={errors.message}
      />
      <p className="text-xs leading-5 text-muted">{copy.contact.privacyNotice}</p>
      <button
        type="submit"
        className="min-h-12 rounded-2xl bg-(image:--gradient-cta) px-6 font-bold text-white shadow-[0_12px_30px_rgb(37_99_235/20%)] transition-transform hover:-translate-y-0.5"
      >
        {copy.contact.submit}
      </button>
      {showServiceNotice ? <Alert severity="info">{copy.contact.serviceNotice}</Alert> : null}
    </form>
  );
}
