"use client";

import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Image from "next/image";
import { useId } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import { useEventRegistrationForm } from "@/hooks/public/events/useEventRegistrationForm";
import type { EventRegistrationCopy, EventRegistrationValues } from "@/types/EventRegistration";
import type { PublicEvent } from "@/types/PublicContent";

type EventRegistrationDialogProps = {
  copy: EventRegistrationCopy;
  event: PublicEvent | null;
  open: boolean;
  locale: Locale;
  onClose: () => void;
  onExited: () => void;
  onRegister: (values: EventRegistrationValues) => Promise<boolean>;
};

export function EventRegistrationDialog({
  copy,
  event,
  open,
  locale,
  onClose,
  onExited,
  onRegister,
}: EventRegistrationDialogProps) {
  /* HOOKS */
  const titleId = useId();
  const descriptionId = useId();
  const registration = useEventRegistrationForm(copy, onRegister);
  const { errors, isSubmitting, values } = registration;

  if (!event) return null;

  /* HANDLERS */
  const handleClose = () => {
    onClose();
  };

  const { handleConsentChange, handleFieldChange, handleParticipantChange, handleSubmit } =
    registration;

  return (
    <Dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      disableRestoreFocus
      fullWidth
      keepMounted
      maxWidth="md"
      onClose={handleClose}
      open={open}
      slotProps={{
        backdrop: { className: styles.events__registrationBackdrop },
        paper: {
          className: `${styles.events__registrationDialog} ${open ? styles.events__registrationDialogOpen : styles.events__registrationDialogClosed}`,
        },
        transition: {
          easing: {
            enter: "cubic-bezier(0.22, 1, 0.36, 1)",
            exit: "cubic-bezier(0.4, 0, 1, 1)",
          },
          onExited,
          timeout: { enter: 360, exit: 260 },
        },
      }}
      transitionDuration={{ enter: 360, exit: 260 }}
    >
      <div className={styles.events__registrationLayout}>
        <aside className={styles.events__registrationPreview}>
          <Image
            alt={event.imageAlt[locale]}
            className={styles.events__registrationImage}
            fill
            sizes="(min-width: 768px) 340px, 100vw"
            src={event.image}
          />
          <span aria-hidden="true" className={styles.events__registrationScrim} />
          <div className={styles.events__registrationEvent}>
            <span className={styles.events__registrationEventLabel}>{copy.selectedEvent}</span>
            <h3>{event.title[locale]}</h3>
            <div className={styles.events__registrationEventMeta}>
              <span>
                <CalendarMonthRounded aria-hidden="true" />
                {event.dateLabel[locale]}
              </span>
              <span>
                <ScheduleRounded aria-hidden="true" />
                {event.timeLabel[locale]}
              </span>
            </div>
          </div>
        </aside>

        <form
          className={styles.events__registrationForm}
          key={event.slug}
          noValidate
          onSubmit={handleSubmit}
        >
          <IconButton
            className={styles.events__registrationClose}
            label={copy.cancel}
            onClick={handleClose}
            variant="soft"
          >
            <CloseRounded aria-hidden="true" />
          </IconButton>

          <p className={styles.events__registrationEyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.events__registrationTitle} id={titleId}>
            {copy.title}
          </h2>
          <p className={styles.events__registrationDescription} id={descriptionId}>
            {copy.description}
          </p>

          <div className={styles.events__registrationFields}>
            <label className={styles.events__registrationField}>
              <span>{copy.fullName}</span>
              <input
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                name="fullName"
                onChange={handleFieldChange}
                placeholder={copy.fullNamePlaceholder}
                type="text"
                value={values.fullName}
              />
              {errors.fullName ? <small>{errors.fullName}</small> : null}
            </label>
            <label className={styles.events__registrationField}>
              <span>{copy.phone}</span>
              <input
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                inputMode="tel"
                name="phone"
                onChange={handleFieldChange}
                placeholder={copy.phonePlaceholder}
                type="tel"
                value={values.phone}
              />
              {errors.phone ? <small>{errors.phone}</small> : null}
            </label>
            <label className={styles.events__registrationField}>
              <span>{copy.email}</span>
              <input
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                inputMode="email"
                name="email"
                onChange={handleFieldChange}
                placeholder={copy.emailPlaceholder}
                type="email"
                value={values.email}
              />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>
            <label className={styles.events__registrationField}>
              <span>{copy.participants}</span>
              <span className={styles.events__registrationSelectWrap}>
                <GroupsRounded aria-hidden="true" />
                <Select
                  className={styles.events__registrationSelect}
                  value={values.participantCount}
                  IconComponent={KeyboardArrowDownRounded}
                  inputProps={{ "aria-label": copy.participants }}
                  MenuProps={{ className: styles.events__registrationSelectMenu }}
                  name="participants"
                  onChange={handleParticipantChange}
                >
                  {[1, 2, 3, 4].map((participantCount) => (
                    <MenuItem
                      className={styles.events__registrationSelectOption}
                      key={participantCount}
                      value={participantCount}
                    >
                      {participantCount}
                    </MenuItem>
                  ))}
                </Select>
              </span>
            </label>
          </div>

          <div>
            <label className={styles.events__registrationConsent}>
              <input
                aria-invalid={Boolean(errors.consent)}
                checked={values.consent}
                onChange={handleConsentChange}
                type="checkbox"
              />
              <span>{copy.consentLabel}</span>
            </label>
            {errors.consent ? (
              <small className={styles.events__registrationConsentError} role="alert">
                {errors.consent}
              </small>
            ) : null}
          </div>

          <div className={styles.events__registrationActions}>
            <Button onClick={handleClose} variant="outline">
              {copy.cancel}
            </Button>
            <Button disabled={isSubmitting} hoverEffect="jump" type="submit">
              {copy.register}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
