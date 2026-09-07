"use client";

import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import { getCourseRegistrationCopy } from "@/dictionaries/public/CourseRegistration";
import { useCourseRegistration } from "@/hooks/public/courses/useCourseRegistration";

type CourseRegistrationActionProps = {
  courseSlug: string;
  courseTitle: string;
  locale: Locale;
};

export function CourseRegistrationAction({
  courseSlug,
  courseTitle,
  locale,
}: CourseRegistrationActionProps) {
  const copy = getCourseRegistrationCopy(locale);

  /* HOOKS */
  const registration = useCourseRegistration(courseSlug, courseTitle, locale, copy);
  const { errors, isOpen, isSubmitting, values } = registration;

  /* HANDLERS */
  const {
    handleClose,
    handleConsentChange,
    handleFieldChange,
    handleOpen,
    handleSubmit,
  } = registration;

  return (
    <>
      <Button fullWidth hoverEffect="jump" onClick={handleOpen} shape="pill" size="large">
        {copy.apply}
      </Button>
      <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={isOpen}>
        <form className={styles.courses__registrationForm} noValidate onSubmit={handleSubmit}>
          <h2>{copy.title}</h2>
          <p>{courseTitle}</p>
          <TextField
            error={Boolean(errors.fullName)}
            helperText={errors.fullName ?? " "}
            label={copy.fullName}
            name="fullName"
            onChange={handleFieldChange}
            value={values.fullName}
          />
          <TextField
            error={Boolean(errors.phone)}
            helperText={errors.phone ?? " "}
            label={copy.phone}
            name="phone"
            onChange={handleFieldChange}
            value={values.phone}
          />
          <TextField
            error={Boolean(errors.email)}
            helperText={errors.email ?? " "}
            label={copy.email}
            name="email"
            onChange={handleFieldChange}
            type="email"
            value={values.email}
          />
          <TextField
            label={copy.currentLevel}
            name="currentLevel"
            onChange={handleFieldChange}
            value={values.currentLevel}
          />
          <TextField
            label={copy.message}
            minRows={3}
            multiline
            name="message"
            onChange={handleFieldChange}
            value={values.message}
          />
          <FormControlLabel
            control={<Checkbox checked={values.consent} onChange={handleConsentChange} />}
            label={copy.consent}
          />
          {errors.consent ? <small>{errors.consent}</small> : null}
          <div className={styles.courses__registrationActions}>
            <Button disabled={isSubmitting} onClick={handleClose} variant="outline">
              {copy.cancel}
            </Button>
            <Button disabled={isSubmitting} hoverEffect="jump" type="submit">
              {copy.submit}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
