import type { StaticImageData } from "next/image";

import type { Locale } from "@/config/Locales";
import type { EventSlug } from "@/types/EventDetail";

export type LocalizedText = Record<Locale, string>;

export type PublicEvent = {
  id?: string;
  slug: EventSlug;
  status: "upcoming" | "past";
  image: StaticImageData | string;
  imageAlt: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  formatLabel: LocalizedText;
  dateLabel: LocalizedText;
  timeLabel: LocalizedText;
  durationLabel: LocalizedText;
  locationLabel: LocalizedText;
  topics: Record<Locale, string[]>;
  requiresConfirmation: true;
};

export type FaqCategory = "courses" | "format" | "exams" | "events" | "registration";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: LocalizedText;
  answer: LocalizedText;
};
