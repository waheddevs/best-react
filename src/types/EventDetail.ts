import type { Locale } from "@/config/Locales";

export type EventSlug = string;

export type EventProgrammeItem = {
  description: string;
  time: string;
  title: string;
};

export type EventDetailFaqItem = {
  answer: string;
  question: string;
};

export type EventDetailLocaleContent = {
  audience: string[];
  faq: EventDetailFaqItem[];
  overview: string[];
  practicalInfo: string[];
  programme: EventProgrammeItem[];
  takeaways: string[];
};

export type EventDetailContent = Record<Locale, EventDetailLocaleContent>;

export type EventDetailsBySlug = Record<EventSlug, EventDetailContent>;
