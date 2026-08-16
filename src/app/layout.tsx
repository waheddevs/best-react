import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/config/site";
import { BestThemeProvider } from "@/theme/theme-provider";

import "@/app/globals.css";

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: {
    default: "BEST LC",
    template: "%s | BEST LC",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uz" className={geist.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript defaultMode="light" modeStorageKey="best-lc-theme" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <BestThemeProvider>
            <MotionProvider>{children}</MotionProvider>
          </BestThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
