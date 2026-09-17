"use client";

import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, type ChangeEvent, type MouseEvent } from "react";

import styles from "@/css/teacher/groups.module.css";
import {
  formatTeacherTimeInput,
  hasTeacherTimeRangeError,
  isTeacherTimeValueValid,
} from "@/lib/teacher/TeacherTimeInput";

type CreateGroupTimeFieldProps = {
  formatMessage: string;
  idPrefix: string;
  label: string;
  name: "start" | "end";
  onChange: (value: string) => void;
  rangeMessage?: string;
  requiredMessage: string;
  submitted: boolean;
  value: string;
};

const suggestedTimes = Array.from({ length: 48 }, (_, index) => {
  const hour = Math.floor(index / 2);
  const minute = index % 2 ? "30" : "00";
  return `${String(hour).padStart(2, "0")}:${minute}`;
});

export function CreateGroupTimeField({
  formatMessage,
  idPrefix,
  label,
  name,
  onChange,
  rangeMessage,
  requiredMessage,
  submitted,
  value,
}: CreateGroupTimeFieldProps) {
  /* HOOKS */
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [touched, setTouched] = useState(false);
  const fieldId = `${idPrefix}-${name}`;
  const errorId = `${fieldId}-error`;
  const error = !value
    ? submitted || touched
      ? requiredMessage
      : ""
    : hasTeacherTimeRangeError(value) || ((touched || submitted) && !isTeacherTimeValueValid(value))
      ? formatMessage
      : rangeMessage && isTeacherTimeValueValid(value)
        ? rangeMessage
        : "";

  /* HANDLERS */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(formatTeacherTimeInput(event.currentTarget.value));
  };

  const handleTextBlur = () => setTouched(true);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => setAnchor(null);

  const handleTimeSelect = (time: string) => {
    onChange(time);
    setTouched(true);
    setAnchor(null);
  };

  return (
    <div className={styles.teacherGroups__createField}>
      <label htmlFor={fieldId}>{label}</label>
      <div className={styles.teacherGroups__createTimeControl}>
        <input
          autoComplete="off"
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          id={fieldId}
          inputMode="numeric"
          maxLength={5}
          name={name}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
          placeholder="HH:MM"
          required
          type="text"
          value={value}
        />
        <button
          aria-controls={anchor ? `${fieldId}-menu` : undefined}
          aria-expanded={Boolean(anchor)}
          aria-haspopup="menu"
          aria-label={label}
          className={styles.teacherGroups__createTimeButton}
          onClick={handleMenuOpen}
          type="button"
        >
          <AccessTimeRounded aria-hidden="true" />
        </button>
      </div>
      <span
        className={`${styles.teacherGroups__createFieldError} ${styles.teacherGroups__createTimeFieldError}`}
        data-visible={Boolean(error)}
        id={errorId}
        role={error ? "alert" : undefined}
      >
        {error}
      </span>
      <Menu
        anchorEl={anchor}
        id={`${fieldId}-menu`}
        onClose={handleMenuClose}
        open={Boolean(anchor)}
        slotProps={{
          paper: {
            className: styles.teacherGroups__createTimeMenu,
            style: { width: anchor?.parentElement?.offsetWidth },
          },
        }}
      >
        {suggestedTimes.map((time) => (
          <MenuItem
            className={styles.teacherGroups__createMenuItem}
            key={time}
            onClick={() => handleTimeSelect(time)}
            selected={value === time}
          >
            {time}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
