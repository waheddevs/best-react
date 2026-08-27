"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import BadgeRounded from "@mui/icons-material/BadgeRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import styles from "@/css/public/auth.module.css";
import type { AuthCopy } from "@/dictionaries/public/Auth";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { AuthMode, AuthRole } from "@/types/Auth";

type AuthCredentialFormProps = {
  copy: AuthCopy;
  mode: AuthMode;
  role: AuthRole;
};

export function AuthCredentialForm({ copy, mode, role }: AuthCredentialFormProps) {
  /* HOOKS */
  const notifications = useNotifications();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const modeCopy = copy.modes[mode];
  const passwordType = isPasswordVisible ? "text" : "password";
  const passwordToggleLabel = isPasswordVisible ? copy.hidePassword : copy.showPassword;

  /* HANDLERS */
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((isVisible) => !isVisible);
  };

  const handleUnavailableAction = () => {
    notifications.info({
      title: copy.credentialNoticeTitle,
      message: copy.credentialNoticeMessage,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setIsPasswordVisible(false);
    handleUnavailableAction();
  };

  return (
    <form className={styles.auth__credentialForm} onSubmit={handleSubmit}>
      {role !== "student" ? (
        <div className={styles.auth__field}>
          <label className={styles.auth__fieldLabel} htmlFor={`${mode}-${role}-id`}>
            {copy.roles[role].idLabel}
          </label>
          <span className={styles.auth__inputShell}>
            <BadgeRounded aria-hidden="true" className={styles.auth__inputIcon} />
            <input
              autoComplete="off"
              id={`${mode}-${role}-id`}
              name={`${role}Id`}
              placeholder={copy.roles[role].idPlaceholder}
              required
              type="text"
            />
          </span>
        </div>
      ) : null}

      {mode === "signup" ? (
        <div className={styles.auth__field}>
          <label className={styles.auth__fieldLabel} htmlFor={`${mode}-${role}-full-name`}>
            {copy.fullNameLabel}
          </label>
          <span className={styles.auth__inputShell}>
            <PersonRounded aria-hidden="true" className={styles.auth__inputIcon} />
            <input
              autoComplete="name"
              id={`${mode}-${role}-full-name`}
              name="name"
              placeholder={copy.fullNamePlaceholder}
              required
              type="text"
            />
          </span>
        </div>
      ) : null}

      <div className={styles.auth__field}>
        <label className={styles.auth__fieldLabel} htmlFor={`${mode}-${role}-email`}>
          {copy.emailLabel}
        </label>
        <span className={styles.auth__inputShell}>
          <EmailRounded aria-hidden="true" className={styles.auth__inputIcon} />
          <input
            autoComplete="email"
            id={`${mode}-${role}-email`}
            name="email"
            placeholder={copy.emailPlaceholder}
            required
            type="email"
          />
        </span>
      </div>

      <div className={styles.auth__field}>
        <label className={styles.auth__fieldLabel} htmlFor={`${mode}-${role}-password`}>
          {copy.passwordLabel}
        </label>
        <span className={styles.auth__inputShell}>
          <LockRounded aria-hidden="true" className={styles.auth__inputIcon} />
          <input
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            id={`${mode}-${role}-password`}
            minLength={8}
            name="password"
            placeholder={copy.passwordPlaceholder}
            required
            type={passwordType}
          />
          <IconButton
            className={styles.auth__passwordToggle}
            controlSize="small"
            label={passwordToggleLabel}
            onClick={handlePasswordVisibility}
            type="button"
          >
            {isPasswordVisible ? <VisibilityOffRounded /> : <VisibilityRounded />}
          </IconButton>
        </span>
      </div>

      {mode === "signup" ? (
        <div className={styles.auth__field}>
          <label className={styles.auth__fieldLabel} htmlFor={`${mode}-${role}-confirm-password`}>
            {copy.confirmPasswordLabel}
          </label>
          <span className={styles.auth__inputShell}>
            <LockRounded aria-hidden="true" className={styles.auth__inputIcon} />
            <input
              autoComplete="new-password"
              id={`${mode}-${role}-confirm-password`}
              minLength={8}
              name="confirmPassword"
              placeholder={copy.confirmPasswordPlaceholder}
              required
              type={passwordType}
            />
          </span>
        </div>
      ) : null}

      {mode === "login" ? (
        <button
          className={styles.auth__forgotPassword}
          onClick={handleUnavailableAction}
          type="button"
        >
          {copy.forgotPassword}
        </button>
      ) : null}

      <Button
        className={styles.auth__credentialSubmit}
        endIcon={<ArrowForwardRounded />}
        fullWidth
        hoverEffect="jump"
        shape="soft"
        size="large"
        type="submit"
      >
        {modeCopy.submitLabel}
      </Button>
    </form>
  );
}
