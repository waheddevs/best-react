import Image from "next/image";

import { LocaleSwitcher } from "@/components/navigation/LocaleSwitcher";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { NavbarLink } from "@/components/navigation/NavbarLink";
import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { navbarNavigationItems } from "@/config/Navigation";
import type { Locale } from "@/config/Locales";
import type { Dictionary } from "@/dictionaries/public/Types";

type NavbarProps = {
  locale: Locale;
  labels: Dictionary["navigation"];
};

export function Navbar({ locale, labels }: NavbarProps) {
  return (
    <header className="navbar">
      <Container className="navbar__container">
        <ScrollToTopLink href={`/${locale}`} aria-label={labels.home} className="navbar__brand">
          <span className="navbar__brandMark">
            <Image
              src="/icons/logo.svg"
              alt=""
              width={36}
              height={36}
              className="navbar__brandIcon"
              priority
            />
          </span>
          <span className="navbar__brandCopy">
            <span className="navbar__brandName">BEST LC</span>
          </span>
        </ScrollToTopLink>

        <nav aria-label={labels.menu} className="navbar__desktopNav">
          {navbarNavigationItems.map((item) => (
            <NavbarLink key={item.key} locale={locale} href={item.href} label={labels[item.key]} />
          ))}
        </nav>

        <div className="navbar__actions">
          <div className="navbar__localeDesktop">
            <LocaleSwitcher locale={locale} label={labels.language} />
          </div>
          <div className="navbar__auth">
            <ButtonLink
              className="navbar__login"
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
