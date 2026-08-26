import type { Locale } from "@/config/Locales";

export type LocalizedResultText = Record<Locale, string>;

export type PublicResultVideoSource = {
  creator: string;
  licenseUrl: string;
  provider: "Pexels";
  url: string;
};

export type PublicResultVideo = {
  duration: "00:05";
  key: string;
  posterSrc: string;
  source: PublicResultVideoSource;
  title: LocalizedResultText;
  videoSrc: string;
};
