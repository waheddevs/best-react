"use client";

import Apple from "@mui/icons-material/Apple";
import FacebookRounded from "@mui/icons-material/FacebookRounded";
import Google from "@mui/icons-material/Google";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import styles from "@/css/public/auth.module.css";
import type { AuthProviderId } from "@/types/Auth";

const providerIcons: Record<AuthProviderId, ReactNode> = {
  google: <Google />,
  facebook: <FacebookRounded />,
  apple: <Apple />,
};

const providerClassNames: Record<AuthProviderId, string> = {
  google: styles.auth__providerGoogle,
  facebook: styles.auth__providerFacebook,
  apple: styles.auth__providerApple,
};

type AuthProviderButtonProps = {
  available: boolean;
  label: string;
  pendingLabel: string;
  provider: AuthProviderId;
  unavailableLabel: string;
};

export function AuthProviderButton({
  available,
  label,
  pendingLabel,
  provider,
  unavailableLabel,
}: AuthProviderButtonProps) {
  /* HOOKS */
  const { pending } = useFormStatus();

  return (
    <Button
      aria-label={label}
      className={`${styles.auth__providerButton} ${providerClassNames[provider]}`}
      disabled={!available || pending}
      fullWidth
      shape="soft"
      size="large"
      title={available ? undefined : unavailableLabel}
      type="submit"
      variant="surface"
    >
      <span aria-hidden="true" className={styles.auth__providerLogo}>
        {providerIcons[provider]}
      </span>
      <span className={styles.auth__visuallyHidden}>{pending ? pendingLabel : label}</span>
    </Button>
  );
}
