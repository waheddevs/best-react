import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { Locale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";

type SiteChromeProps = {
  children: ReactNode;
  locale: Locale;
};

export function SiteChrome({ children, locale }: SiteChromeProps) {
  const dictionary = getDictionary(locale);
  const pageCopy = getPageCopy(locale);

  return (
    <>
      <Navbar locale={locale} labels={dictionary.navigation} />
      {children}
      <Footer locale={locale} navigation={dictionary.navigation} copy={pageCopy.footer} />
    </>
  );
}
