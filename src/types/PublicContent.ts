import type { Locale } from "@/config/Locales";
import type { StaticImageData } from "next/image";

export type LocalizedText = Record<Locale, string>;

export type CourseCategory = "language" | "technology" | "academic";
export type DeliveryFormat = "offline" | "hybrid" | "online";

export type Course = {
  slug: string;
  category: CourseCategory;
  image: string;
  imageAlt: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  level: LocalizedText;
  format: DeliveryFormat;
  formatLabel: LocalizedText;
  duration: LocalizedText;
  audience: LocalizedText;
  outcomes: Record<Locale, string[]>;
  curriculum: Record<Locale, string[]>;
  prerequisites: LocalizedText;
  requiresConfirmation: true;
};

export type PublicEvent = {
  slug: string;
  status: "upcoming" | "past";
  image: StaticImageData | string;
  imageAlt: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  formatLabel: LocalizedText;
  dateLabel: LocalizedText;
  timeLabel: LocalizedText;
  durationLabel: LocalizedText;
  priceLabel: LocalizedText;
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
