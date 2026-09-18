"use client";

import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CoPresentRounded from "@mui/icons-material/CoPresentRounded";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getCourseRegistrationCopy } from "@/dictionaries/public/CourseRegistration";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useCourseRegistration } from "@/hooks/public/courses/useCourseRegistration";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseRegistrationActionProps = {
  course: PublicCourse;
  locale: Locale;
  pageCopy: PageCopy["courses"];
};

export function CourseRegistrationAction({
  course,
  locale,
  pageCopy,
}: CourseRegistrationActionProps) {
  const copy = getCourseRegistrationCopy(locale);

  /* HOOKS */
  const registration = useCourseRegistration(course.slug, course.title[locale], locale, copy);
  const { errors, isOpen, isSubmitting, values } = registration;

  /* HANDLERS */
  const { handleClose, handleConsentChange, handleFieldChange, handleOpen, handleSubmit } =
    registration;

  return (
    <>
      <Button fullWidth hoverEffect="jump" onClick={handleOpen} shape="pill" size="large">
        {copy.apply}
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        open={isOpen}
        slotProps={{
          backdrop: { className: "courses__registrationBackdrop" },
          paper: { className: "courses__registrationDialog" },
        }}
      >
        <div className="courses__registrationLayout">
          <aside className="courses__registrationSummary" data-accent={course.accent}>
            <div aria-hidden="true" className="courses__registrationSummaryGlow" />
            <p className="courses__registrationSummaryEyebrow">{pageCopy.snapshot}</p>
            <span aria-hidden="true" className="courses__registrationSummarySymbol">
              {course.symbol}
            </span>
            <h3 className="courses__registrationSummaryTitle">{course.title[locale]}</h3>
            <p className="courses__registrationSummaryDescription">{course.summary[locale]}</p>
            <dl className="courses__registrationSummaryMeta">
              <div>
                <dt>
                  <CoPresentRounded aria-hidden="true" />
                  {pageCopy.format}
                </dt>
                <dd>{course.formatLabel[locale]}</dd>
              </div>
              <div>
                <dt>
                  <AccessTimeRounded aria-hidden="true" />
                  {pageCopy.duration}
                </dt>
                <dd>{course.duration[locale]}</dd>
              </div>
              <div>
                <dt>
                  <CalendarMonthRounded aria-hidden="true" />
                  {pageCopy.schedule}
                </dt>
                <dd>{course.schedule[locale]}</dd>
              </div>
            </dl>
          </aside>

          <form className="courses__registrationForm" noValidate onSubmit={handleSubmit}>
            <h2>{copy.title}</h2>
            <div className="courses__registrationFields">
              <TextField
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
                label={copy.fullName}
                name="fullName"
                onChange={handleFieldChange}
                slotProps={{
                  inputLabel: { className: "courses__registrationSingleLineLabel" },
                }}
                value={values.fullName}
              />
              <TextField
                autoComplete="tel"
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                label={copy.phone}
                name="phone"
                onChange={handleFieldChange}
                slotProps={{
                  htmlInput: { inputMode: "tel" },
                  inputLabel: { className: "courses__registrationSingleLineLabel" },
                }}
                type="tel"
                value={values.phone}
              />
              <TextField
                error={Boolean(errors.email)}
                helperText={errors.email}
                label={copy.email}
                name="email"
                onChange={handleFieldChange}
                slotProps={{
                  inputLabel: { className: "courses__registrationSingleLineLabel" },
                }}
                type="email"
                value={values.email}
              />
              <TextField
                label={copy.message}
                minRows={4}
                multiline
                name="message"
                onChange={handleFieldChange}
                value={values.message}
              />
            </div>
            <div>
              <label className="courses__registrationConsent">
                <input
                  aria-invalid={Boolean(errors.consent)}
                  checked={values.consent}
                  onChange={handleConsentChange}
                  type="checkbox"
                />
                <span>{copy.consentLabel}</span>
              </label>
              {errors.consent ? (
                <small className="courses__registrationConsentError" role="alert">
                  {errors.consent}
                </small>
              ) : null}
            </div>
            <div className="courses__registrationActions">
              <Button disabled={isSubmitting} onClick={handleClose} size="small" variant="outline">
                {copy.cancel}
              </Button>
              <Button disabled={isSubmitting} hoverEffect="jump" size="small" type="submit">
                {copy.submit}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}
