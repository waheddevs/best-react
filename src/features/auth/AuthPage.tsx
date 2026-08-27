import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { getAuthProviderAvailability } from "@/config/AuthProviders";
import styles from "@/css/public/auth.module.css";
import type { AuthCopy } from "@/dictionaries/public/Auth";
import { AuthCredentialForm } from "@/features/auth/AuthCredentialForm";
import { handleProviderSignIn } from "@/features/auth/AuthProviderActions";
import { AuthProviderButton } from "@/features/auth/AuthProviderButton";
import { AuthRoleSelector } from "@/features/auth/AuthRoleSelector";
import { authProviderIds, type AuthMode, type AuthRole } from "@/types/Auth";

type AuthPageProps = {
  copy: AuthCopy;
  error?: string;
  locale: Locale;
  mode: AuthMode;
  role?: AuthRole;
};

function getErrorMessage(copy: AuthCopy, error: string | undefined): string | null {
  if (!error) return null;

  if (error === "AccessDenied" || error === "Verification") {
    return copy.errors.accessDenied;
  }

  if (error === "OAuthAccountNotLinked") {
    return copy.errors.accountNotLinked;
  }

  if (error === "Configuration") {
    return copy.errors.configuration;
  }

  return copy.errors.default;
}

export function AuthPage({ copy, error, locale, mode, role }: AuthPageProps) {
  const availability = getAuthProviderAvailability();
  const modeCopy = copy.modes[mode];
  const switchMode: AuthMode = mode === "login" ? "signup" : "login";
  const errorMessage = getErrorMessage(copy, error);

  if (!role) {
    return (
      <main className={styles.auth}>
        <div className={styles.auth__frame}>
          <div className={styles.auth__layout}>
            <section
              className={`${styles.auth__panel} ${styles.auth__rolePanel}`}
              aria-labelledby="auth-role-title"
            >
              <div aria-hidden="true" className={styles.auth__panelGlow} />
              <div className={styles.auth__panelHeader}>
                <span className={styles.auth__eyebrow}>{copy.roleSelection.eyebrow}</span>
                <h2 className={styles.auth__title} id="auth-role-title">
                  {copy.roleSelection.title}
                </h2>
                <p className={styles.auth__description}>{copy.roleSelection.description}</p>
              </div>

              <AuthRoleSelector copy={copy} locale={locale} mode={mode} />
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.auth}>
      <div className={styles.auth__frame}>
        <div className={styles.auth__layout}>
          <section className={styles.auth__panel} aria-labelledby="auth-title">
            <div aria-hidden="true" className={styles.auth__panelGlow} />
            <div className={styles.auth__panelHeader}>
              <span className={styles.auth__eyebrow}>{modeCopy.eyebrow}</span>
              <h2 className={styles.auth__title} id="auth-title">
                {modeCopy.title}
              </h2>
              <p className={styles.auth__description}>{modeCopy.description}</p>
            </div>

            <div className={styles.auth__roleContext}>
              <span>
                {copy.roleSelection.selectedRoleLabel}: <strong>{copy.roles[role].title}</strong>
              </span>
              <Link href={`/${locale}/${mode}`} scroll={false}>
                {copy.roleSelection.changeRole}
              </Link>
            </div>

            {errorMessage ? (
              <div className={styles.auth__error} role="alert">
                <ErrorOutlineRounded aria-hidden="true" />
                <div>
                  <strong>{copy.errors.title}</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            ) : null}

            <AuthCredentialForm copy={copy} mode={mode} role={role} />

            {role === "student" ? (
              <>
                <div className={styles.auth__divider}>
                  <span>{copy.orContinue}</span>
                </div>

                <div className={styles.auth__providerList}>
                  {authProviderIds.map((provider) => {
                    const action = handleProviderSignIn.bind(null, provider, locale);

                    return (
                      <form action={action} className={styles.auth__providerForm} key={provider}>
                        <AuthProviderButton
                          available={availability[provider]}
                          label={copy.providers[provider]}
                          pendingLabel={copy.pending}
                          provider={provider}
                          unavailableLabel={copy.unavailable}
                        />
                      </form>
                    );
                  })}
                </div>
              </>
            ) : null}

            <p className={styles.auth__switchPrompt}>
              {modeCopy.switchPrompt}{" "}
              <Link href={`/${locale}/${switchMode}?role=${role}`} scroll={false}>
                {modeCopy.switchAction}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
