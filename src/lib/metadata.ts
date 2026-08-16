import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export function createPageMetadata(
  title: string,
  description: string,
  path = "",
  socialImage: string | null = "/og.webp",
): Metadata {
  const publicPath = `/website${path}`;

  return {
    metadataBase: siteConfig.url,
    title,
    description,
    alternates: {
      canonical: publicPath,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "uz_UZ",
      title,
      description,
      url: publicPath,
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
