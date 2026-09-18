"use client";

import LockRounded from "@mui/icons-material/LockRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { useId } from "react";

import { Button } from "@/components/ui/Button";
import { useExamResultsPreview } from "@/hooks/public/exams/useExamResultsPreview";
import type { ExamPreviewCopy } from "@/types/ExamPreview";

import { BrandDatePicker } from "./BrandDatePicker";

type ExamResultsPreviewProps = {
  copy: ExamPreviewCopy;
};

export function ExamResultsPreview({ copy }: ExamResultsPreviewProps) {
  /* HOOKS */
  const formId = useId();
  const results = useExamResultsPreview(copy);
  const { errors, values } = results;

  /* HANDLERS */
  const { handleBirthDateChange, handleFieldChange, handleSubmit } = results;

  return (
    <div className="exams__resultsPanel">
      <div className="exams__resultsVisual" aria-hidden="true">
        <span className="exams__resultsVisualIcon">
          <SearchRounded />
        </span>
        <span className="exams__resultsVisualCard">
          <i />
          <i />
          <i />
          <strong>A</strong>
        </span>
      </div>
      <form className="exams__resultsForm" noValidate onSubmit={handleSubmit}>
        <span className="exams__resultsLock">
          <LockRounded aria-hidden="true" />
        </span>
        <label className="exams__field">
          <span>{copy.candidateId}</span>
          <input
            aria-errormessage={errors.candidateId ? `${formId}-candidate-error` : undefined}
            aria-invalid={Boolean(errors.candidateId)}
            autoComplete="off"
            name="candidateId"
            onChange={handleFieldChange}
            placeholder={copy.candidateIdPlaceholder}
            type="text"
            value={values.candidateId}
          />
          {errors.candidateId ? (
            <small id={`${formId}-candidate-error`}>{errors.candidateId}</small>
          ) : null}
        </label>
        <div className="exams__field">
          <span id={`${formId}-birth-date-label`}>{copy.birthDate}</span>
          <BrandDatePicker
            copy={copy.calendar}
            describedBy={errors.birthDate ? `${formId}-birth-date-error` : undefined}
            invalid={Boolean(errors.birthDate)}
            labelId={`${formId}-birth-date-label`}
            onChange={handleBirthDateChange}
            value={values.birthDate}
          />
          {errors.birthDate ? (
            <small id={`${formId}-birth-date-error`}>{errors.birthDate}</small>
          ) : null}
        </div>
        <Button
          className="publicShared__formAction"
          hoverEffect="jump"
          startIcon={<SearchRounded />}
          type="submit"
        >
          {copy.viewResults}
        </Button>
      </form>
    </div>
  );
}
