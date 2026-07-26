import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { isLocale, locales } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";
import { BestThemeProvider } from "@/theme/theme-provider";

import "@/app/globals.css";

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const descriptions = {
    uz: "BEST LC kurslari, tadbirlari va ochiq ta’lim resurslari uchun rasmiy veb-sayt.",
    ru: "Официальный сайт курсов, событий и открытых образовательных ресурсов BEST LC.",
    en: "The official website for BEST LC courses, events, and open learning resources.",
  };

  return {
    ...createPageMetadata(locale, "BEST LC", descriptions[locale]),
    title: {
      default: "BEST LC",
      template: "%s | BEST LC",
    },
  };
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const pageCopy = getPageCopy(locale);

  return (
    <html lang={locale} className={geist.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript defaultMode="light" modeStorageKey="best-lc-theme" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <BestThemeProvider>
            <MotionProvider>
              <SiteHeader locale={locale} labels={dictionary.navigation} />
              {children}
              <SiteFooter
                locale={locale}
                navigation={dictionary.navigation}
                copy={pageCopy.footer}
              />
            </MotionProvider>
          </BestThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
