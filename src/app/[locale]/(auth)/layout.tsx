import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import styles from "@/css/public/auth.module.css";

type AuthLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({ children, params }: AuthLayoutProps) {
  const { locale } = await params;

  return (
    <div className={styles.auth__shell}>
      <div aria-hidden="true" className={styles.auth__background}>
        <div className={styles.auth__backgroundShift}>
          <Image
            alt=""
            className={styles.auth__backgroundImage}
            fill
            priority
            quality={95}
            sizes="100vw"
            src="/images/home-page/login-signup-img.webp"
          />
        </div>
      </div>
      <div aria-hidden="true" className={styles.auth__veil} />
      <Link aria-label="BEST LC" className={styles.auth__brand} href={`/${locale}`}>
        <span className={styles.auth__brandMark}>
          <Image alt="" height={96} priority src="/icons/logo.svg" width={96} />
        </span>
        <span className={styles.auth__brandName}>BEST LC</span>
      </Link>
      {children}
    </div>
  );
}
