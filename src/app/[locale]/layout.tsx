import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { isLocale, locales } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";
import { BestThemeProvider } from "@/theme/BestThemeProvider";

import "@/app/globals.css";

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
    uz: "BEST LC kurslari, tadbirlari va ta’lim yo‘nalishlari uchun rasmiy veb-sayt.",
    ru: "Официальный сайт курсов, событий и образовательных направлений BEST LC.",
    en: "The official website for BEST LC courses, events, and learning programmes.",
  };

  return {
    ...createPageMetadata(locale, "BEST LC", descriptions[locale]),
    icons: {
      icon: [{ url: "/icons/logo.svg", type: "image/svg+xml" }],
    },
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
    <html lang={locale} className={GeistSans.variable} suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <BestThemeProvider>
            <MotionProvider>
              <Navbar locale={locale} labels={dictionary.navigation} />
              {children}
              <Footer locale={locale} navigation={dictionary.navigation} copy={pageCopy.footer} />
            </MotionProvider>
          </BestThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
