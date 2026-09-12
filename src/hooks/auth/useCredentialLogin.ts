"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import type { Locale } from "@/config/Locales";
import type { AuthCopy } from "@/dictionaries/public/Auth";
import {
  BeginCredentialLoginDocument,
  type BeginCredentialLoginMutation,
  type BeginCredentialLoginMutationVariables,
  ResendCredentialLoginCodeDocument,
  type ResendCredentialLoginCodeMutation,
  type ResendCredentialLoginCodeMutationVariables,
  VerifyCredentialLoginDocument,
  type VerifyCredentialLoginMutation,
  type VerifyCredentialLoginMutationVariables,
} from "@/gql/graphql";
import { executePublicApi } from "@/lib/PublicApi";
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
  name: "",
  password: "",
};

const backendRoleByAuthRole: Record<AuthRole, BackendAuthRole> = {
  admin: "ADMIN",
  student: "STUDENT",
  teacher: "TEACHER",
};

function getRemainingSeconds(timestamp: string | undefined, now: number) {
  if (!timestamp) return 0;
  return Math.max(0, Math.ceil((Date.parse(timestamp) - now) / 1000));
}

export function useCredentialLogin(copy: AuthCopy, locale: Locale, selectedRole: AuthRole) {
  /* HOOKS */
  const router = useRouter();
  const [challenge, setChallenge] = useState<AuthLoginChallenge>();
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

  const validateCredentials = () => {
    const nextErrors: AuthLoginErrors = {};
    if (!values.name.trim()) nextErrors.name = copy.errors.required;
    if (!values.email.trim()) {
      nextErrors.email = copy.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = copy.errors.invalidEmail;
    }
    if (!values.password) nextErrors.password = copy.errors.required;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* HANDLERS */
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof AuthLoginValues;
    const value =
      field === "code" ? event.target.value.replace(/\D/g, "").slice(0, 6) : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  const handleCredentialSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateCredentials()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      const data = await executePublicApi<
        BeginCredentialLoginMutation,
        BeginCredentialLoginMutationVariables
      >(
        BeginCredentialLoginDocument,
        {
          input: {
            email: values.email.trim(),
            expectedRole: backendRoleByAuthRole[selectedRole],
            name: values.name.trim(),
            password: values.password,
          },
        },
        { cache: "no-store" },
      );
      setChallenge(data.beginCredentialLogin);
      setValues((current) => ({ ...current, code: "", password: "" }));
      setNow(Date.now());
      setStep("verification");
    } catch {
      setErrors({ form: copy.errors.generic });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!challenge || values.code.length !== 6) {
      setErrors({ code: copy.errors.codeLength });
      return;
    }
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
      const authenticatedRole = getAuthRoleFromBackend(data.verifyCredentialLogin.user.role);
      if (!authenticatedRole || authenticatedRole !== selectedRole) {
        setErrors({ form: copy.errors.generic });
        return;
      }
      const result = await signIn("credentials", {
        accessToken: data.verifyCredentialLogin.accessToken,
        expiresInSeconds: String(data.verifyCredentialLogin.expiresInSeconds),
        redirect: false,
      });
      if (result?.error) {
        setErrors({ form: copy.errors.session });
        return;
      }
      setValues(initialValues);
      router.replace(`/${locale}/${authenticatedRole}`);
      router.refresh();
    } catch {
      setErrors({ form: copy.errors.generic });
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
    } catch {
      setErrors({ form: copy.errors.generic });
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
    errors,
    expiresInSeconds,
    handleBackToLogin,
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
