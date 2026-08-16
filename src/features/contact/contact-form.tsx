"use client";

import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import { useContactForm } from "@/hooks/useContactForm";
import type { Course } from "@/types/public-content";

type ContactFormProps = {
  locale: Locale;
  copy: PageCopy;
  courses: Course[];
};

export function ContactForm({ locale, copy, courses }: ContactFormProps) {
  const { errors, handleSubmit, showServiceNotice, updateField, values } = useContactForm(
    copy.contact,
  );

  return (
    <form noValidate onSubmit={handleSubmit} className="contact-form">
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
      <p className="contact-form__2">{copy.contact.privacyNotice}</p>
      <button type="submit" className="contact-form__3">
        {copy.contact.submit}
      </button>
      {showServiceNotice ? <Alert severity="info">{copy.contact.serviceNotice}</Alert> : null}
    </form>
  );
}
