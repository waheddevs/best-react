import type { Locale } from "@/config/Locales";

export type LocalizedResultText = Record<Locale, string>;

export type PublicResultVideoSource = {
  creator: string;
  licenseUrl: string;
  provider: string;
  url: string;
};

export type PublicResultVideo = {
  duration: string;
  key: string;
  posterSrc: string;
  source: PublicResultVideoSource;
  title: LocalizedResultText;
  videoSrc: string;
};
