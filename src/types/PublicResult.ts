import type { Locale } from "@/config/Locales";

export type LocalizedResultText = Record<Locale, string>;

export type PublicResultVideo = {
  category: LocalizedResultText;
  duration: string;
  key: string;
  learner: LocalizedResultText;
  outcome: LocalizedResultText;
  posterSrc: string;
  summary: LocalizedResultText;
  title: LocalizedResultText;
  videoSrc: string;
};
