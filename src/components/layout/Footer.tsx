import EmailRounded from "@mui/icons-material/EmailRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Image from "next/image";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/config/Locales";
import {
  courseNavigationItems,
  examNavigationItems,
  footerPageNavigationItems,
} from "@/config/Navigation";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { Dictionary } from "@/dictionaries/public/Types";

import { FooterPattern } from "./FooterPattern";
import { FooterSocialLinks } from "./FooterSocialLinks";

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
  return (
    <footer className="footer">
      <FooterPattern />
      <Container className="footer__container">
        <div className="footer__brandColumn">
          <ScrollToTopLink href={`/${locale}`} className="footer__brand">
            <span className="footer__brandMark">
              <Image
                src="/icons/logo.svg"
                alt=""
                width={44}
                height={44}
                className="footer__brandIcon"
              />
            </span>
            <span className="footer__brandName">BEST LC</span>
          </ScrollToTopLink>
          <p className="footer__summary">{copy.summary}</p>
          <FooterSocialLinks
            ariaLabel={copy.social}
            closeLabel={copy.socialNoticeClose}
            message={copy.socialNoticeMessage}
            title={copy.socialNoticeTitle}
          />
        </div>

        <div className="footer__sections">
          <div className="footer__column">
            <h2 className="footer__heading">{copy.pages}</h2>
            <nav className="footer__linkList" aria-label={copy.pages}>
              {footerPageNavigationItems.map((item) => (
                <ScrollToTopLink
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="footer__link"
                >
                  {navigation[item.key]}
                </ScrollToTopLink>
              ))}
            </nav>
          </div>

          <div className="footer__column">
            <h2 className="footer__heading">{copy.courses}</h2>
            <nav className="footer__linkList" aria-label={copy.courses}>
              {courseNavigationItems.map((item) => (
                <ScrollToTopLink
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="footer__link"
                >
                  {navigation.courseMenu[item.key]}
                </ScrollToTopLink>
              ))}
            </nav>
          </div>

          <div className="footer__column">
            <h2 className="footer__heading">{copy.exams}</h2>
            <nav className="footer__linkList" aria-label={copy.exams}>
              {examNavigationItems.map((item) => (
                <ScrollToTopLink
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="footer__link"
                >
                  {navigation.examMenu[item.key]}
                </ScrollToTopLink>
              ))}
            </nav>
          </div>

          <div className="footer__contactColumn">
            <h2 className="footer__heading">{copy.contact}</h2>
            <ul className="footer__contactList">
              {contactItems.map(({ label, Icon }) => (
                <li key={label} className="footer__contactItem">
                  <Icon aria-hidden="true" className="footer__contactIcon" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="footer__copyright">
        <Container className="footer__copyrightContainer">
          <span>
            © {new Date().getFullYear()} {copy.copyright}
          </span>
          <span>{copy.legalPlaceholder}</span>
        </Container>
      </div>
    </footer>
  );
}
