"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
  sessionExpired?: boolean;
};

export function AuthCredentialForm({
  copy,
  locale,
  role,
  sessionExpired = false,
}: AuthCredentialFormProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();
  const login = useCredentialLogin(copy, locale, role);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    challenge,
    dashboardHref,
    errors,
    expiresInSeconds,
    isSubmitting,
    resendInSeconds,
    step,
    values,
  } = login;

  const passwordType = isPasswordVisible ? "text" : "password";
  const passwordToggleLabel = isPasswordVisible ? copy.hidePassword : copy.showPassword;
  const [verificationDescriptionBeforeEmail, verificationDescriptionAfterEmail] =
    copy.verification.description.split("{email}");
  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };
  const entranceVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.1,
        staggerChildren: reduceMotion ? 0 : 0.035,
      },
    },
  };
  const entranceItemVariants: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.44,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* HANDLERS */
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((isVisible) => !isVisible);
  };

  if (step === "complete" && dashboardHref) {
    return (
      <div className={styles.auth__step} role="status">
        <div className={styles.auth__panelHeader}>
          <span className={styles.auth__eyebrow}>{copy.completed.eyebrow}</span>
          <h2 className={styles.auth__title} id="auth-title">
            {copy.completed.title}
          </h2>
          <p className={`${styles.auth__description} ${styles.auth__completedDescription}`}>
            {copy.completed.description}
          </p>
        </div>
        <ButtonLink
          className={styles.auth__credentialSubmit}
          fullWidth
          href={dashboardHref}
          hoverEffect="jump"
          rel="noopener noreferrer"
          shape="soft"
          size="large"
          target="_blank"
        >
          {copy.completed.openDashboard}
        </ButtonLink>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className={styles.auth__step}
        exit={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
        initial={{
          opacity: step === "credentials" ? 1 : 0,
          x: step === "credentials" || reduceMotion ? 0 : 18,
        }}
        key={step}
        transition={transition}
      >
        <motion.div
          animate="visible"
          initial={step === "credentials" ? "hidden" : false}
          variants={entranceVariants}
        >
          <div className={styles.auth__panelHeader}>
            <motion.span className={styles.auth__eyebrow} variants={entranceItemVariants}>
              {step === "credentials" ? copy.login.eyebrow : copy.verification.eyebrow}
            </motion.span>
            <motion.h2
              className={styles.auth__title}
              id="auth-title"
              variants={entranceItemVariants}
            >
              {step === "credentials" ? copy.login.title : copy.verification.title}
            </motion.h2>
            <motion.p className={styles.auth__description} variants={entranceItemVariants}>
              {step === "credentials" ? (
                copy.login.description
              ) : (
                <>
                  {verificationDescriptionBeforeEmail}
                  <span className={styles.auth__verificationEmail}>
                    {challenge?.maskedEmail ?? values.email}
                    {verificationDescriptionAfterEmail}
                  </span>
                </>
              )}
            </motion.p>
          </div>

          <motion.div className={styles.auth__roleContext} variants={entranceItemVariants}>
            <span>
              {copy.roleSelection.selectedRoleLabel}: <strong>{copy.roles[role].title}</strong>
            </span>
            {step === "credentials" ? (
              <Link href={`/${locale}/login`} scroll={false}>
                {copy.roleSelection.changeRole}
              </Link>
            ) : null}
          </motion.div>

          {errors.form ? (
            <div className={styles.auth__error} role="alert">
              <ErrorOutlineRounded aria-hidden="true" />
              <div>
                <strong>{copy.errors.title}</strong>
                <span>{errors.form}</span>
              </div>
            </div>
          ) : sessionExpired && step === "credentials" ? (
            <div className={styles.auth__error} role="status">
              <ErrorOutlineRounded aria-hidden="true" />
              <div>
                <strong>{copy.sessionExpired.title}</strong>
                <span>{copy.sessionExpired.description}</span>
              </div>
            </div>
          ) : null}

          {step === "credentials" ? (
            <form
              className={styles.auth__credentialForm}
              noValidate
              onSubmit={login.handleCredentialSubmit}
            >
              <div className={styles.auth__nameRow}>
                <motion.div className={styles.auth__field} variants={entranceItemVariants}>
                  <label className={styles.auth__fieldLabel} htmlFor={`${role}-name`}>
                    {copy.firstNameLabel}
                  </label>
                  <span className={`${styles.auth__inputShell} ${styles.auth__plainInputShell}`}>
                    <input
                      aria-describedby={errors.name ? `${role}-name-error` : undefined}
                      aria-invalid={Boolean(errors.name)}
                      autoComplete="given-name"
                      id={`${role}-name`}
                      maxLength={160}
                      name="name"
                      onChange={login.handleFieldChange}
                      placeholder={copy.firstNamePlaceholder}
                      type="text"
                      value={values.name}
                    />
                  </span>
                  {errors.name ? (
                    <small
                      className={styles.auth__fieldError}
                      id={`${role}-name-error`}
                      role="alert"
                    >
                      {errors.name}
                    </small>
                  ) : null}
                </motion.div>
                <motion.div className={styles.auth__field} variants={entranceItemVariants}>
                  <label className={styles.auth__fieldLabel} htmlFor={`${role}-last-name`}>
                    {copy.lastNameLabel}
                  </label>
                  <span className={`${styles.auth__inputShell} ${styles.auth__plainInputShell}`}>
                    <input
                      aria-describedby={errors.lastName ? `${role}-last-name-error` : undefined}
                      aria-invalid={Boolean(errors.lastName)}
                      autoComplete="family-name"
                      id={`${role}-last-name`}
                      maxLength={160}
                      name="lastName"
                      onChange={login.handleFieldChange}
                      placeholder={copy.lastNamePlaceholder}
                      type="text"
                      value={values.lastName}
                    />
                  </span>
                  {errors.lastName ? (
                    <small
                      className={styles.auth__fieldError}
                      id={`${role}-last-name-error`}
                      role="alert"
                    >
                      {errors.lastName}
                    </small>
                  ) : null}
                </motion.div>
              </div>
              <motion.div className={styles.auth__field} variants={entranceItemVariants}>
                <label className={styles.auth__fieldLabel} htmlFor={`${role}-email`}>
                  {copy.emailLabel}
                </label>
                <span className={`${styles.auth__inputShell} ${styles.auth__plainInputShell}`}>
                  <input
                    aria-describedby={errors.email ? `${role}-email-error` : undefined}
                    aria-invalid={Boolean(errors.email)}
                    autoComplete="email"
                    id={`${role}-email`}
                    inputMode="email"
                    maxLength={320}
                    name="email"
                    onChange={login.handleFieldChange}
                    placeholder={copy.emailPlaceholder}
                    type="email"
                    value={values.email}
                  />
                </span>
                {errors.email ? (
                  <small
                    className={styles.auth__fieldError}
                    id={`${role}-email-error`}
                    role="alert"
                  >
                    {errors.email}
                  </small>
                ) : null}
              </motion.div>

              <motion.div className={styles.auth__field} variants={entranceItemVariants}>
                <label className={styles.auth__fieldLabel} htmlFor={`${role}-password`}>
                  {copy.passwordLabel}
                </label>
                <span className={`${styles.auth__inputShell} ${styles.auth__passwordInputShell}`}>
                  <input
                    aria-describedby={errors.password ? `${role}-password-error` : undefined}
                    aria-invalid={Boolean(errors.password)}
                    autoComplete="current-password"
                    id={`${role}-password`}
                    maxLength={128}
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
                  <small
                    className={styles.auth__fieldError}
                    id={`${role}-password-error`}
                    role="alert"
                  >
                    {errors.password}
                  </small>
                ) : null}
              </motion.div>

              <div className={styles.auth__credentialActions}>
                <motion.div variants={entranceItemVariants}>
                  <Link
                    className={styles.auth__credentialBack}
                    href={`/${locale}/login`}
                    scroll={false}
                  >
                    {copy.back}
                  </Link>
                </motion.div>
                <motion.div variants={entranceItemVariants}>
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
                </motion.div>
              </div>
            </form>
          ) : (
            <form
              className={styles.auth__verificationForm}
              onSubmit={login.handleVerificationSubmit}
            >
              <div className={styles.auth__field}>
                <div aria-label={copy.codeLabel} className={styles.auth__codeDigits} role="group">
                  {Array.from({ length: 6 }, (_, index) => (
                    <input
                      aria-describedby={errors.code ? `${role}-code-error` : undefined}
                      aria-invalid={Boolean(errors.code)}
                      aria-label={`${copy.codeLabel} ${index + 1}/6`}
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      autoFocus={index === 0}
                      className={styles.auth__codeDigit}
                      inputMode="numeric"
                      key={index}
                      onChange={(event) => login.handleCodeDigitChange(index, event)}
                      onKeyDown={(event) => login.handleCodeDigitKeyDown(index, event)}
                      onPaste={(event) => login.handleCodePaste(index, event)}
                      ref={(element) => {
                        login.codeInputRefs.current[index] = element;
                      }}
                      type="text"
                      value={values.code[index]?.trim() ?? ""}
                    />
                  ))}
                </div>
                {errors.code ? (
                  <small
                    className={`${styles.auth__fieldError} ${styles.auth__verificationError}`}
                    id={`${role}-code-error`}
                    role="alert"
                  >
                    {errors.code}
                  </small>
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
      </motion.div>
    </AnimatePresence>
  );
}
