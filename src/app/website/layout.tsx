import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { defaultLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  const dictionary = getDictionary(defaultLocale);
  const pageCopy = getPageCopy(defaultLocale);

  return (
    <>
      <SiteHeader labels={dictionary.navigation} />
      {children}
      <SiteFooter navigation={dictionary.navigation} copy={pageCopy.footer} />
    </>
  );
}
