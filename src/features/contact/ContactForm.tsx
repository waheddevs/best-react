"use client";

import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import type { Locale } from "@/config/Locales";
import styles from "@/css/public/contact.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useContactForm } from "@/hooks/public/contact/useContactForm";
import type { Course } from "@/types/PublicContent";

type ContactFormProps = {
  locale: Locale;
  copy: PageCopy;
  courses: Course[];
};

export function ContactForm({ locale, copy, courses }: ContactFormProps) {
  /* HOOKS */
  const contactForm = useContactForm(copy);
  const { values, errors, showServiceNotice } = contactForm;

  /* HANDLERS */
  const {
    handleSubmit,
    handleNameChange,
    handleContactChange,
    handleCourseChange,
    handleMessageChange,
  } = contactForm;

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.contact__form}>
      <TextField
        required
        label={copy.contact.name}
        value={values.name}
        onChange={handleNameChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
        autoComplete="name"
      />
      <TextField
        required
        label={copy.contact.contact}
        value={values.contact}
        onChange={handleContactChange}
        error={Boolean(errors.contact)}
        helperText={errors.contact}
        autoComplete="email"
      />
      <TextField
        select
        label={copy.contact.interestedCourse}
        value={values.course}
        onChange={handleCourseChange}
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
        onChange={handleMessageChange}
        error={Boolean(errors.message)}
        helperText={errors.message}
      />
      <p className={styles.contact__formPrivacy}>{copy.contact.privacyNotice}</p>
      <button type="submit" className={styles.contact__formSubmit}>
        {copy.contact.submit}
      </button>
      {showServiceNotice ? <Alert severity="info">{copy.contact.serviceNotice}</Alert> : null}
    </form>
  );
}
