"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useId, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/exams.module.css";
import { mockExamDates, publicExamOptions } from "@/data/PublicExams";
import { useExamRegistration } from "@/hooks/public/exams/useExamRegistration";
import type { ExamKind, ExamPreviewCopy } from "@/types/ExamPreview";

type ExamRegistrationCatalogProps = {
  copy: ExamPreviewCopy;
  locale: Locale;
};

const examIcons: Record<ExamKind, ReactNode> = {
  ielts: <SchoolRounded aria-hidden="true" />,
  cefr: <WorkspacePremiumRounded aria-hidden="true" />,
  mock: <FactCheckRounded aria-hidden="true" />,
};

export function ExamRegistrationCatalog({ copy, locale }: ExamRegistrationCatalogProps) {
  /* HOOKS */
  const titleId = useId();
  const descriptionId = useId();
  const registration = useExamRegistration(copy, locale);
  const { errors, isOpen, selectedExam, values } = registration;

  /* HANDLERS */
  const {
    handleDialogExited,
    handleFieldChange,
    handleLevelChange,
    handleRegistrationClose,
    handleRegistrationOpen,
    handleSubmit,
  } = registration;

  return (
    <>
      <div className={styles.exams__catalogGrid}>
        {publicExamOptions.map((exam, index) => (
          <article className={styles.exams__optionCard} data-exam={exam.key} key={exam.key}>
            <div className={styles.exams__optionTopline}>
              <span className={styles.exams__optionIcon}>{examIcons[exam.key]}</span>
              <span className={styles.exams__optionNumber}>0{index + 1}</span>
            </div>
            <h3 className={styles.exams__optionTitle}>{exam.title[locale]}</h3>
            <p className={styles.exams__optionDescription}>{exam.description[locale]}</p>
            <dl className={styles.exams__optionMeta}>
              <div>
                <dt>{copy.formatLabel}</dt>
                <dd>{exam.format[locale]}</dd>
              </div>
              <div>
                <dt>{copy.durationLabel}</dt>
                <dd>{exam.duration[locale]}</dd>
              </div>
              <div>
                <dt>{copy.levelLabel}</dt>
                <dd>{exam.level[locale]}</dd>
              </div>
            </dl>
            <ul className={styles.exams__optionHighlights}>
              {exam.highlights.map((highlight) => (
                <li key={highlight[locale]}>
                  <CheckRounded aria-hidden="true" />
                  {highlight[locale]}
                </li>
              ))}
            </ul>
            <Button
              className={styles.exams__optionAction}
              endIcon={<ArrowForwardRounded />}
              hoverEffect="jump"
              onClick={() => handleRegistrationOpen(exam)}
              variant="primary"
            >
              {copy.register}
            </Button>
          </article>
        ))}
      </div>

      {selectedExam ? (
        <Dialog
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          disableRestoreFocus
          fullWidth
          keepMounted
          maxWidth="md"
          onClose={handleRegistrationClose}
          open={isOpen}
          slotProps={{
            backdrop: { className: styles.exams__dialogBackdrop },
            paper: { className: styles.exams__dialog },
            transition: { onExited: handleDialogExited },
          }}
        >
          <div className={styles.exams__dialogLayout}>
            <aside className={styles.exams__dialogSummary} data-exam={selectedExam.key}>
              <span className={styles.exams__dialogSummaryIcon}>{examIcons[selectedExam.key]}</span>
              <p>{copy.selectedExam}</p>
              <h3>{selectedExam.title[locale]}</h3>
              <span>{selectedExam.format[locale]}</span>
              <ul>
                {selectedExam.highlights.map((highlight) => (
                  <li key={highlight[locale]}>
                    <CheckRounded aria-hidden="true" />
                    {highlight[locale]}
                  </li>
                ))}
              </ul>
            </aside>

            <form className={styles.exams__dialogForm} noValidate onSubmit={handleSubmit}>
              <IconButton
                className={styles.exams__dialogClose}
                label={copy.cancel}
                onClick={handleRegistrationClose}
                variant="soft"
              >
                <CloseRounded aria-hidden="true" />
              </IconButton>
              <p className={styles.exams__dialogEyebrow}>{copy.formEyebrow}</p>
              <h2 className={styles.exams__dialogTitle} id={titleId}>
                {copy.formTitle}
              </h2>
              <p className={styles.exams__dialogDescription} id={descriptionId}>
                {copy.formDescription}
              </p>

              <div className={styles.exams__formGrid}>
                <label className={styles.exams__field}>
                  <span>{copy.fullName}</span>
                  <input
                    aria-errormessage={errors.fullName ? `${titleId}-full-name-error` : undefined}
                    aria-invalid={Boolean(errors.fullName)}
                    autoComplete="name"
                    name="fullName"
                    onChange={handleFieldChange}
                    placeholder={copy.fullNamePlaceholder}
                    type="text"
                    value={values.fullName}
                  />
                  {errors.fullName ? (
                    <small id={`${titleId}-full-name-error`}>{errors.fullName}</small>
                  ) : null}
                </label>
                <label className={styles.exams__field}>
                  <span>{copy.phone}</span>
                  <input
                    aria-errormessage={errors.phone ? `${titleId}-phone-error` : undefined}
                    aria-invalid={Boolean(errors.phone)}
                    autoComplete="tel"
                    inputMode="tel"
                    name="phone"
                    onChange={handleFieldChange}
                    placeholder={copy.phonePlaceholder}
                    type="tel"
                    value={values.phone}
                  />
                  {errors.phone ? (
                    <small id={`${titleId}-phone-error`}>{errors.phone}</small>
                  ) : null}
                </label>
                <label className={styles.exams__field}>
                  <span>{copy.email}</span>
                  <input
                    aria-errormessage={errors.email ? `${titleId}-email-error` : undefined}
                    aria-invalid={Boolean(errors.email)}
                    autoComplete="email"
                    inputMode="email"
                    name="email"
                    onChange={handleFieldChange}
                    placeholder={copy.emailPlaceholder}
                    type="email"
                    value={values.email}
                  />
                  {errors.email ? (
                    <small id={`${titleId}-email-error`}>{errors.email}</small>
                  ) : null}
                </label>
                <div className={styles.exams__field}>
                  <span id={`${titleId}-current-level-label`}>{copy.currentLevel}</span>
                  <Select
                    className={styles.exams__levelSelect}
                    displayEmpty
                    error={Boolean(errors.currentLevel)}
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{
                      "aria-errormessage": errors.currentLevel
                        ? `${titleId}-current-level-error`
                        : undefined,
                      "aria-invalid": Boolean(errors.currentLevel),
                    }}
                    labelId={`${titleId}-current-level-label`}
                    MenuProps={{ className: styles.exams__levelSelectMenu }}
                    name="currentLevel"
                    onChange={handleLevelChange}
                    renderValue={(selected) => selected || "—"}
                    value={values.currentLevel}
                  >
                    <MenuItem className={styles.exams__levelOption} value="">
                      —
                    </MenuItem>
                    {copy.levelOptions.map((level) => (
                      <MenuItem className={styles.exams__levelOption} key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.currentLevel ? (
                    <small id={`${titleId}-current-level-error`}>{errors.currentLevel}</small>
                  ) : null}
                </div>
              </div>

              {selectedExam.key === "mock" ? (
                <fieldset className={styles.exams__dateFieldset}>
                  <legend>{copy.preferredDate}</legend>
                  <p>{copy.preferredDateDescription}</p>
                  <div className={styles.exams__dateOptions}>
                    {mockExamDates.map((slot) => (
                      <label key={slot.value}>
                        <input
                          checked={values.mockDate === slot.value}
                          name="mockDate"
                          onChange={handleFieldChange}
                          type="radio"
                          value={slot.value}
                        />
                        <span>
                          <strong>{slot.dateLabel[locale]}</strong>
                          <small>{slot.timeLabel[locale]}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.mockDate ? (
                    <small className={styles.exams__dateError} role="alert">
                      {errors.mockDate}
                    </small>
                  ) : null}
                </fieldset>
              ) : null}

              <div className={styles.exams__dialogActions}>
                <Button onClick={handleRegistrationClose} variant="outline">
                  {copy.cancel}
                </Button>
                <Button hoverEffect="jump" type="submit">
                  {copy.submit}
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}
