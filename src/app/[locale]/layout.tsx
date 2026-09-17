import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { isLocale, locales } from "@/config/Locales";
import { getEventRegistrationCopy } from "@/dictionaries/public/EventRegistration";
import { getNotificationCopy } from "@/dictionaries/public/Notifications";
import { ApolloProvider } from "@/features/apollo/ApolloProvider";
import { NotificationProvider } from "@/features/notifications/NotificationProvider";
import { EventRegistrationProvider } from "@/features/events/EventRegistrationProvider";
import { AuthSessionProvider } from "@/features/auth/AuthSessionProvider";
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

  const eventRegistrationCopy = getEventRegistrationCopy(locale);
  const notificationCopy = getNotificationCopy(locale);

  return (
    <html lang={locale} className={GeistSans.variable} suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <BestThemeProvider>
            <ApolloProvider>
              <AuthSessionProvider>
                <MotionProvider>
                  <NotificationProvider copy={notificationCopy}>
                    <EventRegistrationProvider copy={eventRegistrationCopy} locale={locale}>
                      {children}
                    </EventRegistrationProvider>
                  </NotificationProvider>
                </MotionProvider>
              </AuthSessionProvider>
            </ApolloProvider>
          </BestThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
