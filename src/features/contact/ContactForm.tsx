"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/contact.module.css";
import sharedStyles from "@/css/public/shared.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useContactForm } from "@/hooks/public/contact/useContactForm";

type ContactFormProps = {
  copy: PageCopy;
  locale: Locale;
};

export function ContactForm({ copy, locale }: ContactFormProps) {
  /* HOOKS */
  const contactForm = useContactForm(copy, locale);
  const { values, errors, isSubmitting } = contactForm;

  /* HANDLERS */
  const {
    handleSubmit,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handleSubjectChange,
    handleMessageChange,
    handleConsentChange,
  } = contactForm;

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.contact__form}>
      <div className={styles.contact__formNameRow}>
        <TextField
          autoComplete="given-name"
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          label={copy.contact.firstName}
          onChange={handleFirstNameChange}
          slotProps={{
            htmlInput: { "aria-required": true },
            inputLabel: { className: styles.contact__formSingleLineLabel },
          }}
          value={values.firstName}
        />
        <TextField
          autoComplete="family-name"
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          label={copy.contact.lastName}
          onChange={handleLastNameChange}
          slotProps={{
            htmlInput: { "aria-required": true },
            inputLabel: { className: styles.contact__formSingleLineLabel },
          }}
          value={values.lastName}
        />
      </div>
      <TextField
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email}
        label={copy.contact.email}
        onChange={handleEmailChange}
        slotProps={{
          htmlInput: { "aria-required": true },
          inputLabel: { className: styles.contact__formSingleLineLabel },
        }}
        type="email"
        value={values.email}
      />
      <TextField
        autoComplete="off"
        error={Boolean(errors.subject)}
        helperText={errors.subject}
        label={copy.contact.subject}
        onChange={handleSubjectChange}
        slotProps={{
          htmlInput: { "aria-required": true },
          inputLabel: { className: styles.contact__formSingleLineLabel },
        }}
        value={values.subject}
      />
      <TextField
        multiline
        error={Boolean(errors.message)}
        helperText={errors.message}
        label={copy.contact.message}
        minRows={5}
        onChange={handleMessageChange}
        slotProps={{ htmlInput: { "aria-required": true } }}
        value={values.message}
      />
      <div>
        <FormControlLabel
          control={<Checkbox checked={values.consent} onChange={handleConsentChange} />}
          label={copy.contact.consent}
        />
        {errors.consent ? <small>{errors.consent}</small> : null}
      </div>
      <Button
        className={`${sharedStyles.publicShared__formAction} ${styles.contact__formAction}`}
        hoverEffect="jump"
        disabled={isSubmitting}
        shape="soft"
        type="submit"
      >
        {copy.contact.send}
      </Button>
    </form>
  );
}
