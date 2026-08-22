import EmailRounded from "@mui/icons-material/EmailRounded";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Telegram from "@mui/icons-material/Telegram";
import Twitter from "@mui/icons-material/Twitter";
import Image from "next/image";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/config/Locales";
import {
  courseNavigationItems,
  examNavigationItems,
  footerPageNavigationItems,
} from "@/config/Navigation";
import styles from "@/css/layout/footer.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { Dictionary } from "@/dictionaries/public/Types";

import { FooterPattern } from "./FooterPattern";

type FooterProps = {
  locale: Locale;
  navigation: Dictionary["navigation"];
  copy: PageCopy["footer"];
};

export function Footer({ locale, navigation, copy }: FooterProps) {
  const contactItems = [
    { label: copy.address, Icon: LocationOnRounded },
    { label: copy.phone, Icon: PhoneRounded },
    { label: copy.email, Icon: EmailRounded },
    { label: copy.hours, Icon: ScheduleRounded },
  ];
  const socialItems = [
    { label: "Instagram", Icon: Instagram },
    { label: "Facebook", Icon: Facebook },
    { label: "Twitter", Icon: Twitter },
    { label: "Telegram", Icon: Telegram },
  ];

  return (
    <footer className={styles.footer}>
      <FooterPattern />
      <Container className={styles.footer__container}>
        <div className={styles.footer__brandColumn}>
          <ScrollToTopLink href={`/${locale}`} className={styles.footer__brand}>
            <span className={styles.footer__brandMark}>
              <Image
                src="/icons/logo.svg"
                alt=""
                width={44}
                height={44}
                className={styles.footer__brandIcon}
              />
            </span>
            <span className={styles.footer__brandName}>BEST LC</span>
          </ScrollToTopLink>
          <p className={styles.footer__summary}>{copy.summary}</p>
          <div className={styles.footer__socials} aria-label={copy.social}>
            {socialItems.map(({ label, Icon }) => (
              <span key={label} className={styles.footer__socialIcon} role="img" aria-label={label}>
                <Icon aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        <div className={styles.footer__sections}>
          <div className={styles.footer__column}>
            <h2 className={styles.footer__heading}>{copy.pages}</h2>
            <nav className={styles.footer__linkList} aria-label={copy.pages}>
              {footerPageNavigationItems.map((item) => (
                <ScrollToTopLink
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={styles.footer__link}
                >
                  {navigation[item.key]}
                </ScrollToTopLink>
              ))}
            </nav>
          </div>

          <div className={styles.footer__column}>
            <h2 className={styles.footer__heading}>{copy.courses}</h2>
            <nav className={styles.footer__linkList} aria-label={copy.courses}>
              {courseNavigationItems.map((item) => (
                <ScrollToTopLink
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={styles.footer__link}
                >
                  {navigation.courseMenu[item.key]}
                </ScrollToTopLink>
              ))}
            </nav>
          </div>

          <div className={styles.footer__column}>
            <h2 className={styles.footer__heading}>{copy.exams}</h2>
            <nav className={styles.footer__linkList} aria-label={copy.exams}>
              {examNavigationItems.map((item) => (
                <ScrollToTopLink
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={styles.footer__link}
                >
                  {navigation.examMenu[item.key]}
                </ScrollToTopLink>
              ))}
            </nav>
          </div>

          <div className={styles.footer__contactColumn}>
            <h2 className={styles.footer__heading}>{copy.contact}</h2>
            <ul className={styles.footer__contactList}>
              {contactItems.map(({ label, Icon }) => (
                <li key={label} className={styles.footer__contactItem}>
                  <Icon aria-hidden="true" className={styles.footer__contactIcon} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className={styles.footer__copyright}>
        <Container className={styles.footer__copyrightContainer}>
          <span>
            © {new Date().getFullYear()} {copy.copyright}
          </span>
          <span>{copy.legalPlaceholder}</span>
        </Container>
      </div>
    </footer>
  );
}
