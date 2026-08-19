import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { navigationItems } from "@/config/Navigation";
import type { Locale } from "@/config/Locales";
import styles from "@/css/layout/footer.module.css";
import type { Dictionary } from "@/dictionaries/public/Types";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type FooterProps = {
  locale: Locale;
  navigation: Dictionary["navigation"];
  copy: PageCopy["footer"];
};

export function Footer({ locale, navigation, copy }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__container}>
        <div className={styles.footer__brandColumn}>
          <Link href={`/${locale}`} className={styles.footer__brand}>
            <span className={styles.footer__brandMark}>
              B
            </span>
            <span className={styles.footer__brandName}>BEST LC</span>
          </Link>
          <p className={styles.footer__summary}>{copy.summary}</p>
        </div>
        <div>
          <h2 className={styles.footer__heading}>
            {copy.pages}
          </h2>
          <nav className={styles.footer__nav} aria-label={copy.pages}>
            {navigationItems.slice(1).map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={styles.footer__link}
              >
                {navigation[item.key]}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className={styles.footer__heading}>
            {copy.contact}
          </h2>
          <p className={styles.footer__contact}>{copy.contactPlaceholder}</p>
          <p className={styles.footer__legal}>{copy.legalPlaceholder}</p>
        </div>
      </Container>
      <div className={styles.footer__copyright}>
        <Container className={styles.footer__copyrightContainer}>
          © {new Date().getFullYear()} {copy.copyright}
        </Container>
      </div>
    </footer>
  );
}
