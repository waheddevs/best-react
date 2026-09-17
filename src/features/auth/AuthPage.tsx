import type { Locale } from "@/config/Locales";
import styles from "@/css/public/auth.module.css";
import type { AuthCopy } from "@/dictionaries/public/Auth";
import { AuthCredentialForm } from "@/features/auth/AuthCredentialForm";
import { AuthRoleSelector } from "@/features/auth/AuthRoleSelector";
import type { AuthRole } from "@/types/Auth";

type AuthPageProps = {
  copy: AuthCopy;
  locale: Locale;
  role?: AuthRole;
  sessionExpired?: boolean;
};

export function AuthPage({ copy, locale, role, sessionExpired = false }: AuthPageProps) {
  if (!role) {
    return (
      <main className={styles.auth}>
        <div className={styles.auth__frame}>
          <div className={styles.auth__layout}>
            <section
              aria-labelledby="auth-role-title"
              className={`${styles.auth__panel} ${styles.auth__rolePanel}`}
            >
              <div aria-hidden="true" className={styles.auth__panelGlow} />
              <div className={styles.auth__panelHeader}>
                <span className={styles.auth__eyebrow}>{copy.roleSelection.eyebrow}</span>
                <h2 className={styles.auth__title} id="auth-role-title">
                  {copy.roleSelection.title}
                </h2>
                <p className={styles.auth__description}>{copy.roleSelection.description}</p>
              </div>
              <AuthRoleSelector copy={copy} locale={locale} />
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
          <section aria-labelledby="auth-title" className={styles.auth__panel}>
            <div aria-hidden="true" className={styles.auth__panelGlow} />
            <AuthCredentialForm
              copy={copy}
              locale={locale}
              role={role}
              sessionExpired={sessionExpired}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
