"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import MarkEmailReadRounded from "@mui/icons-material/MarkEmailReadRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/auth.module.css";
import type { AuthCopy } from "@/dictionaries/public/Auth";
import { useCredentialLogin } from "@/hooks/auth/useCredentialLogin";
import type { AuthRole } from "@/types/Auth";

type AuthCredentialFormProps = {
  copy: AuthCopy;
  locale: Locale;
  role: AuthRole;
};

export function AuthCredentialForm({ copy, locale, role }: AuthCredentialFormProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();
  const login = useCredentialLogin(copy, locale, role);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { challenge, errors, expiresInSeconds, isSubmitting, resendInSeconds, step, values } =
    login;

  const passwordType = isPasswordVisible ? "text" : "password";
  const passwordToggleLabel = isPasswordVisible ? copy.hidePassword : copy.showPassword;
  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  /* HANDLERS */
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((isVisible) => !isVisible);
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className={styles.auth__step}
        exit={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
        initial={{ opacity: 0, x: reduceMotion ? 0 : 18 }}
        key={step}
        transition={transition}
      >
        <div className={styles.auth__panelHeader}>
          <span className={styles.auth__eyebrow}>
            {step === "credentials" ? copy.login.eyebrow : copy.verification.eyebrow}
          </span>
          <h2 className={styles.auth__title} id="auth-title">
            {step === "credentials" ? copy.login.title : copy.verification.title}
          </h2>
          <p className={styles.auth__description}>
            {step === "credentials"
              ? copy.login.description
              : copy.verification.description.replace(
                  "{email}",
                  challenge?.maskedEmail ?? values.email,
                )}
          </p>
        </div>

        <div className={styles.auth__roleContext}>
          <span>
            {copy.roleSelection.selectedRoleLabel}: <strong>{copy.roles[role].title}</strong>
          </span>
          {step === "credentials" ? (
            <Link href={`/${locale}/login`} scroll={false}>
              {copy.roleSelection.changeRole}
            </Link>
          ) : null}
        </div>

        {errors.form ? (
          <div className={styles.auth__error} role="alert">
            <ErrorOutlineRounded aria-hidden="true" />
            <div>
              <strong>{copy.errors.title}</strong>
              <span>{errors.form}</span>
            </div>
          </div>
        ) : null}

        {step === "credentials" ? (
          <form className={styles.auth__credentialForm} onSubmit={login.handleCredentialSubmit}>
            <div className={styles.auth__field}>
              <label className={styles.auth__fieldLabel} htmlFor={`${role}-name`}>
                {copy.nameLabel}
              </label>
              <span className={styles.auth__inputShell}>
                <PersonRounded aria-hidden="true" className={styles.auth__inputIcon} />
                <input
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                  id={`${role}-name`}
                  name="name"
                  onChange={login.handleFieldChange}
                  placeholder={copy.namePlaceholder}
                  type="text"
                  value={values.name}
                />
              </span>
              {errors.name ? (
                <small className={styles.auth__fieldError}>{errors.name}</small>
              ) : null}
            </div>

            <div className={styles.auth__field}>
              <label className={styles.auth__fieldLabel} htmlFor={`${role}-email`}>
                {copy.emailLabel}
              </label>
              <span className={styles.auth__inputShell}>
                <EmailRounded aria-hidden="true" className={styles.auth__inputIcon} />
                <input
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  id={`${role}-email`}
                  inputMode="email"
                  name="email"
                  onChange={login.handleFieldChange}
                  placeholder={copy.emailPlaceholder}
                  type="email"
                  value={values.email}
                />
              </span>
              {errors.email ? (
                <small className={styles.auth__fieldError}>{errors.email}</small>
              ) : null}
            </div>

            <div className={styles.auth__field}>
              <label className={styles.auth__fieldLabel} htmlFor={`${role}-password`}>
                {copy.passwordLabel}
              </label>
              <span className={styles.auth__inputShell}>
                <LockRounded aria-hidden="true" className={styles.auth__inputIcon} />
                <input
                  aria-invalid={Boolean(errors.password)}
                  autoComplete="current-password"
                  id={`${role}-password`}
                  name="password"
                  onChange={login.handleFieldChange}
                  placeholder={copy.passwordPlaceholder}
                  type={passwordType}
                  value={values.password}
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
              {errors.password ? (
                <small className={styles.auth__fieldError}>{errors.password}</small>
              ) : null}
            </div>

            <Button
              className={styles.auth__credentialSubmit}
              disabled={isSubmitting}
              endIcon={<ArrowForwardRounded />}
              fullWidth
              hoverEffect="jump"
              shape="soft"
              size="large"
              type="submit"
            >
              {isSubmitting ? copy.pending : copy.login.submitLabel}
            </Button>
          </form>
        ) : (
          <form className={styles.auth__verificationForm} onSubmit={login.handleVerificationSubmit}>
            <div className={styles.auth__verificationIcon}>
              <MarkEmailReadRounded aria-hidden="true" />
            </div>
            <div className={styles.auth__field}>
              <label className={styles.auth__fieldLabel} htmlFor={`${role}-code`}>
                {copy.codeLabel}
              </label>
              <input
                aria-invalid={Boolean(errors.code)}
                autoComplete="one-time-code"
                autoFocus
                className={styles.auth__codeInput}
                id={`${role}-code`}
                inputMode="numeric"
                maxLength={6}
                name="code"
                onChange={login.handleFieldChange}
                placeholder={copy.codePlaceholder}
                type="text"
                value={values.code}
              />
              {errors.code ? (
                <small className={styles.auth__fieldError}>{errors.code}</small>
              ) : null}
            </div>
            <div className={styles.auth__verificationStatus}>
              <span>
                <ScheduleRounded aria-hidden="true" />
                {copy.verification.expiresIn.replace(
                  "{minutes}",
                  String(Math.max(1, Math.ceil(expiresInSeconds / 60))),
                )}
              </span>
              <small>{copy.verification.codeHint}</small>
            </div>
            <Button
              className={styles.auth__credentialSubmit}
              disabled={isSubmitting || expiresInSeconds === 0}
              endIcon={<ArrowForwardRounded />}
              fullWidth
              hoverEffect="jump"
              shape="soft"
              size="large"
              type="submit"
            >
              {isSubmitting ? copy.pending : copy.verification.submitLabel}
            </Button>
            <div className={styles.auth__verificationActions}>
              <button onClick={login.handleBackToLogin} type="button">
                <ArrowBackRounded aria-hidden="true" />
                {copy.backToLogin}
              </button>
              <button
                disabled={isSubmitting || resendInSeconds > 0}
                onClick={login.handleResend}
                type="button"
              >
                {resendInSeconds > 0
                  ? copy.resendCountdown.replace("{seconds}", String(resendInSeconds))
                  : copy.resend}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
