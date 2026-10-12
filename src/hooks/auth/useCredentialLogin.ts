"use client";

import { signIn } from "next-auth/react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import type { Locale } from "@/config/Locales";
import type { AuthCopy } from "@/dictionaries/public/Auth";
import {
  CredentialLoginDocument,
  type CredentialLoginMutation,
  type CredentialLoginMutationVariables,
  ResendCredentialLoginCodeDocument,
  type ResendCredentialLoginCodeMutation,
  type ResendCredentialLoginCodeMutationVariables,
  VerifyCredentialLoginDocument,
  type VerifyCredentialLoginMutation,
  type VerifyCredentialLoginMutationVariables,
} from "@/gql/graphql";
import { isValidLoginEmail } from "@/lib/auth/LoginEmail";
import { executePublicApi, PublicApiError } from "@/lib/PublicApi";
import {
  getAuthRoleFromBackend,
  type AuthLoginChallenge,
  type AuthLoginErrors,
  type AuthLoginValues,
  type AuthRole,
  type AuthStep,
  type BackendAuthRole,
} from "@/types/Auth";

const initialValues: AuthLoginValues = {
  code: "",
  email: "",
  lastName: "",
  name: "",
  password: "",
};

const backendRoleByAuthRole: Record<AuthRole, BackendAuthRole> = {
  admin: "ADMIN",
  student: "STUDENT",
  teacher: "TEACHER",
};

const credentialFieldOrder = ["name", "lastName", "email", "password"] as const;

function getRemainingSeconds(timestamp: string | undefined, now: number) {
  if (!timestamp) return 0;
  return Math.max(0, Math.ceil((Date.parse(timestamp) - now) / 1000));
}

function loginRequestMessage(error: unknown, copy: AuthCopy): string {
  return error instanceof PublicApiError && error.code === "SERVICE_UNAVAILABLE"
    ? copy.errors.unavailable
    : copy.errors.generic;
}

function credentialLoginErrors(error: unknown, copy: AuthCopy): AuthLoginErrors {
  if (error instanceof PublicApiError) {
    switch (error.code) {
      case "LOGIN_EMAIL_INVALID":
        return { email: copy.errors.emailMismatch };
      case "LOGIN_FIRST_NAME_INVALID":
        return { name: copy.errors.firstNameMismatch };
      case "LOGIN_LAST_NAME_INVALID":
        return { lastName: copy.errors.lastNameMismatch };
      case "LOGIN_NAME_INVALID":
        return { name: copy.errors.firstNameMismatch };
      case "LOGIN_PASSWORD_INVALID":
        return { password: copy.errors.passwordMismatch };
      case "UNAUTHENTICATED":
        return { form: copy.errors.credentialsRejected };
    }
  }
  return { form: loginRequestMessage(error, copy) };
}

function focusFirstCredentialError(form: HTMLFormElement, nextErrors: AuthLoginErrors): void {
  const field = credentialFieldOrder.find((fieldName) => Boolean(nextErrors[fieldName]));
  if (!field) return;
  window.requestAnimationFrame(() => {
    const input = form.elements.namedItem(field);
    if (input instanceof HTMLElement) input.focus();
  });
}

function openPendingDashboard(copy: AuthCopy, locale: Locale): Window | null {
  let pendingWindow: Window | null = null;
  try {
    pendingWindow = window.open("", "_blank");
    if (!pendingWindow) return null;
    pendingWindow.opener = null;
    pendingWindow.document.documentElement.lang = locale;
    pendingWindow.document.title = copy.pending;
    pendingWindow.document.body.textContent = copy.pending;
    pendingWindow.document.body.style.cssText =
      "display:grid;place-items:center;min-height:100vh;margin:0;background:#eaf3fb;color:#102a43;font:700 1.25rem system-ui,sans-serif";
    return pendingWindow;
  } catch {
    pendingWindow?.close();
    return null;
  }
}

export function useCredentialLogin(copy: AuthCopy, locale: Locale, selectedRole: AuthRole) {
  /* HOOKS */
  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [challenge, setChallenge] = useState<AuthLoginChallenge>();
  const [dashboardHref, setDashboardHref] = useState<string>();
  const [errors, setErrors] = useState<AuthLoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [step, setStep] = useState<AuthStep>("credentials");
  const [values, setValues] = useState<AuthLoginValues>(initialValues);

  useEffect(() => {
    if (step !== "verification") return;
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, [step]);

  const expiresInSeconds = getRemainingSeconds(challenge?.expiresAt, now);
  const resendInSeconds = getRemainingSeconds(challenge?.resendAvailableAt, now);

  const validateCredentials = (): AuthLoginErrors => {
    const nextErrors: AuthLoginErrors = {};
    if (!values.name.trim()) nextErrors.name = copy.errors.nameRequired;
    if (!values.lastName.trim()) nextErrors.lastName = copy.errors.lastNameRequired;
    if (!values.email.trim()) {
      nextErrors.email = copy.errors.emailRequired;
    } else if (!isValidLoginEmail(values.email, process.env.NODE_ENV !== "production")) {
      nextErrors.email = copy.errors.invalidEmail;
    }
    if (!values.password) nextErrors.password = copy.errors.passwordRequired;
    return nextErrors;
  };

  /* HANDLERS */
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof AuthLoginValues;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));
  };

  const handleCodeDigitChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "");
    const slots = values.code.padEnd(6, " ").slice(0, 6).split("");
    const entered = digits.length > 1 && !slots[index].trim() ? digits : digits.slice(-1);
    for (let offset = 0; offset < entered.length && index + offset < 6; offset += 1) {
      slots[index + offset] = entered[offset];
    }
    if (!entered) slots[index] = " ";
    setValues((current) => ({ ...current, code: slots.join("") }));
    setErrors((current) => ({ ...current, code: undefined, form: undefined }));
    if (entered) codeInputRefs.current[Math.min(index + entered.length, 5)]?.focus();
  };

  const handleCodeDigitKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      codeInputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      event.preventDefault();
      codeInputRefs.current[index + 1]?.focus();
    } else if (event.key === "Backspace" && !values.code[index]?.trim() && index > 0) {
      event.preventDefault();
      const slots = values.code.padEnd(6, " ").slice(0, 6).split("");
      slots[index - 1] = " ";
      setValues((current) => ({ ...current, code: slots.join("") }));
      setErrors((current) => ({ ...current, code: undefined, form: undefined }));
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const digits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6 - index);
    if (!digits) return;
    const slots = values.code.padEnd(6, " ").slice(0, 6).split("");
    for (let offset = 0; offset < digits.length; offset += 1) {
      slots[index + offset] = digits[offset];
    }
    setValues((current) => ({ ...current, code: slots.join("") }));
    setErrors((current) => ({ ...current, code: undefined, form: undefined }));
    codeInputRefs.current[Math.min(index + digits.length, 5)]?.focus();
  };

  const completeLogin = async (
    session: VerifyCredentialLoginMutation["verifyCredentialLogin"],
    pendingWindow: Window | null,
  ) => {
    const authenticatedRole = getAuthRoleFromBackend(session.user.role);
    if (!authenticatedRole || authenticatedRole !== selectedRole) {
      pendingWindow?.close();
      setErrors({ form: copy.errors.generic });
      return;
    }
    const result = await signIn("credentials", {
      accessToken: session.accessToken,
      expiresInSeconds: String(session.expiresInSeconds),
      refreshExpiresAt: session.refreshExpiresAt,
      refreshToken: session.refreshToken,
      redirect: false,
    });
    if (result?.error) {
      pendingWindow?.close();
      setErrors({ form: copy.errors.session });
      return;
    }
    const href = `/${locale}/${authenticatedRole}`;
    setValues(initialValues);
    setDashboardHref(href);
    setStep("complete");
    if (pendingWindow && !pendingWindow.closed) {
      try {
        pendingWindow.location.replace(new URL(href, window.location.origin).href);
      } catch {
        pendingWindow.close();
      }
    }
  };

  const handleCredentialSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const validationErrors = validateCredentials();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      focusFirstCredentialError(form, validationErrors);
      return;
    }
    const pendingWindow = openPendingDashboard(copy, locale);
    setIsSubmitting(true);
    setErrors({});
    try {
      const data = await executePublicApi<
        CredentialLoginMutation,
        CredentialLoginMutationVariables
      >(
        CredentialLoginDocument,
        {
          input: {
            email: values.email.trim(),
            expectedRole: backendRoleByAuthRole[selectedRole],
            firstName: values.name.trim(),
            lastName: values.lastName.trim(),
            name: [values.name, values.lastName].join(" ").trim().replace(/\s+/g, " "),
            password: values.password,
          },
        },
        { cache: "no-store" },
      );
      setValues((current) => ({ ...current, code: "", password: "" }));
      if (data.credentialLogin.session) {
        await completeLogin(data.credentialLogin.session, pendingWindow);
      } else if (data.credentialLogin.challenge) {
        pendingWindow?.close();
        setChallenge(data.credentialLogin.challenge);
        setNow(Date.now());
        setStep("verification");
      } else {
        pendingWindow?.close();
        setErrors({ form: copy.errors.generic });
      }
    } catch (error) {
      pendingWindow?.close();
      const nextErrors = credentialLoginErrors(error, copy);
      setErrors(nextErrors);
      focusFirstCredentialError(form, nextErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!challenge || !/^\d{6}$/.test(values.code)) {
      setErrors({ code: copy.errors.codeLength });
      return;
    }
    const pendingWindow = openPendingDashboard(copy, locale);
    setIsSubmitting(true);
    setErrors({});
    try {
      const data = await executePublicApi<
        VerifyCredentialLoginMutation,
        VerifyCredentialLoginMutationVariables
      >(
        VerifyCredentialLoginDocument,
        { input: { challengeId: challenge.challengeId, code: values.code } },
        { cache: "no-store" },
      );
      await completeLogin(data.verifyCredentialLogin, pendingWindow);
    } catch (error) {
      pendingWindow?.close();
      setErrors(
        error instanceof PublicApiError &&
          (error.code === "LOGIN_CODE_INVALID" || error.code === "UNAUTHENTICATED")
          ? { code: copy.errors.codeRejected }
          : { form: loginRequestMessage(error, copy) },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!challenge || resendInSeconds > 0 || isSubmitting) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      const data = await executePublicApi<
        ResendCredentialLoginCodeMutation,
        ResendCredentialLoginCodeMutationVariables
      >(
        ResendCredentialLoginCodeDocument,
        { input: { challengeId: challenge.challengeId } },
        { cache: "no-store" },
      );
      setChallenge(data.resendCredentialLoginCode);
      setValues((current) => ({ ...current, code: "" }));
      setNow(Date.now());
      codeInputRefs.current[0]?.focus();
    } catch (error) {
      setErrors(
        error instanceof PublicApiError && error.code === "LOGIN_CODE_INVALID"
          ? { code: copy.errors.codeRejected }
          : { form: loginRequestMessage(error, copy) },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    setChallenge(undefined);
    setErrors({});
    setValues((current) => ({ ...current, code: "", password: "" }));
    setStep("credentials");
  };

  return {
    challenge,
    codeInputRefs,
    dashboardHref,
    errors,
    expiresInSeconds,
    handleBackToLogin,
    handleCodeDigitChange,
    handleCodeDigitKeyDown,
    handleCodePaste,
    handleCredentialSubmit,
    handleFieldChange,
    handleResend,
    handleVerificationSubmit,
    isSubmitting,
    resendInSeconds,
    step,
    values,
  };
}
