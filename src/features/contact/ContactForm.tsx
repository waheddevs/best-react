"use client";

import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";
import styles from "@/css/public/contact.module.css";
import sharedStyles from "@/css/public/shared.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useContactForm } from "@/hooks/public/contact/useContactForm";

type ContactFormProps = {
  copy: PageCopy;
};

export function ContactForm({ copy }: ContactFormProps) {
  /* HOOKS */
  const contactForm = useContactForm(copy);
  const { values, errors } = contactForm;

  /* HANDLERS */
  const {
    handleSubmit,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handleSubjectChange,
    handleMessageChange,
  } = contactForm;

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.contact__form}>
      <div className={styles.contact__formNameRow}>
        <TextField
          autoComplete="given-name"
          error={Boolean(errors.firstName)}
          helperText={errors.firstName ?? " "}
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
          helperText={errors.lastName ?? " "}
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
        helperText={errors.email ?? " "}
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
        helperText={errors.subject ?? " "}
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
        helperText={errors.message ?? " "}
        label={copy.contact.message}
        minRows={5}
        onChange={handleMessageChange}
        slotProps={{ htmlInput: { "aria-required": true } }}
        value={values.message}
      />
      <Button
        className={`${sharedStyles.publicShared__formAction} ${styles.contact__formAction}`}
        hoverEffect="jump"
        shape="soft"
        type="submit"
      >
        {copy.contact.send}
      </Button>
    </form>
  );
}
