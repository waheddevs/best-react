import Image from "next/image";

import { LocaleSwitcher } from "@/components/navigation/LocaleSwitcher";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { NavbarLink } from "@/components/navigation/NavbarLink";
import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { navbarNavigationItems } from "@/config/Navigation";
import type { Locale } from "@/config/Locales";
import styles from "@/css/layout/navbar.module.css";
import type { Dictionary } from "@/dictionaries/public/Types";

type NavbarProps = {
  locale: Locale;
  labels: Dictionary["navigation"];
};

export function Navbar({ locale, labels }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <Container className={styles.navbar__container}>
        <ScrollToTopLink
          href={`/${locale}`}
          aria-label={labels.home}
          className={styles.navbar__brand}
        >
          <span className={styles.navbar__brandMark}>
            <Image
              src="/icons/logo.svg"
              alt=""
              width={36}
              height={36}
              className={styles.navbar__brandIcon}
              priority
            />
          </span>
          <span className={styles.navbar__brandCopy}>
            <span className={styles.navbar__brandName}>BEST LC</span>
          </span>
        </ScrollToTopLink>

        <nav aria-label={labels.menu} className={styles.navbar__desktopNav}>
          {navbarNavigationItems.map((item) => (
            <NavbarLink key={item.key} locale={locale} href={item.href} label={labels[item.key]} />
          ))}
        </nav>

        <div className={styles.navbar__actions}>
          <div className={styles.navbar__localeDesktop}>
            <LocaleSwitcher locale={locale} label={labels.language} />
          </div>
          <div className={styles.navbar__auth}>
            <ButtonLink
              className={styles.navbar__login}
              href={`/${locale}/login`}
              endIcon={null}
              hoverEffect="jump"
              rel="noopener noreferrer"
              shape="rounded"
              size="small"
              target="_blank"
            >
              {labels.login}
            </ButtonLink>
          </div>
          <MobileNavigation locale={locale} labels={labels} />
        </div>
      </Container>
    </header>
  );
}
