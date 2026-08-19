import type { Metadata } from "next";

import { locales, type Locale } from "@/config/Locales";
import { siteConfig } from "@/config/Site";

export function createPageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
  socialImage: string | null = "/og.webp",
): Metadata {
  const localizedPath = `/${locale}${path}`;
  const languages = Object.fromEntries(locales.map((item) => [item, `/${item}${path}`]));

  return {
    metadataBase: siteConfig.url,
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale,
      title,
      description,
      url: localizedPath,
      images: socialImage
        ? [
            socialImage === "/og.webp"
              ? { url: socialImage, width: 1672, height: 941, alt: `${title} — BEST LC` }
              : { url: socialImage, alt: `${title} — BEST LC` },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage ? [socialImage] : [],
    },
  };
}
