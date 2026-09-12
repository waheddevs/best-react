"use client";

import LogoutRounded from "@mui/icons-material/LogoutRounded";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/layout/navbar.module.css";
import type { Dictionary } from "@/dictionaries/public/Types";

type AuthNavbarActionsProps = {
  locale: Locale;
  labels: Dictionary["navigation"];
};

export function AuthNavbarActions({ locale, labels }: AuthNavbarActionsProps) {
  /* HOOKS */
  const { data: session, status } = useSession();

  /* HANDLERS */
  const handleSignOut = async () => {
    await signOut({ redirectTo: `/${locale}` });
  };

  if (status === "loading") {
    return <span aria-hidden="true" className={styles.navbar__authSkeleton} />;
  }

  if (!session?.user) {
    return (
      <ButtonLink
        className={styles.navbar__login}
        href={`/${locale}/login`}
        endIcon={null}
        hoverEffect="jump"
        shape="rounded"
        size="small"
      >
        {labels.login}
      </ButtonLink>
    );
  }

  const userLabel = session.user.name || session.user.email || labels.signedInAs;

  return (
    <>
      <span className={styles.navbar__session} title={`${labels.signedInAs}: ${userLabel}`}>
        <span aria-hidden="true" className={styles.navbar__sessionInitial}>
          {userLabel.charAt(0).toUpperCase()}
        </span>
        <span className={styles.navbar__sessionName}>{userLabel}</span>
      </span>
      <Button
        aria-label={labels.logout}
        onClick={handleSignOut}
        size="small"
        startIcon={<LogoutRounded />}
        variant="ghost"
      >
        <span className={styles.navbar__logoutLabel}>{labels.logout}</span>
      </Button>
    </>
  );
}
