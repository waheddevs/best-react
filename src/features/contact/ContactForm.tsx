"use client";

import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
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
    <form noValidate onSubmit={handleSubmit} className="contact__form">
      <div className="contact__formNameRow">
        <TextField
          autoComplete="given-name"
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          label={copy.contact.firstName}
          onChange={handleFirstNameChange}
          slotProps={{
            htmlInput: { "aria-required": true },
            inputLabel: { className: "contact__formSingleLineLabel" },
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
            inputLabel: { className: "contact__formSingleLineLabel" },
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
          inputLabel: { className: "contact__formSingleLineLabel" },
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
          inputLabel: { className: "contact__formSingleLineLabel" },
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
        <label className="contact__consent">
          <input
            aria-invalid={Boolean(errors.consent)}
            checked={values.consent}
            onChange={handleConsentChange}
            type="checkbox"
          />
          <span>{copy.contact.consentLabel}</span>
        </label>
        {errors.consent ? (
          <small className="contact__consentError" role="alert">
            {errors.consent}
          </small>
        ) : null}
      </div>
      <Button
        className="publicShared__formAction contact__formAction"
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
