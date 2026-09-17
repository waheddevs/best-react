import type { Locale } from "@/config/Locales";
import { getApiLanguage } from "@/lib/ApiLanguage";
import {
  PublicCourseDocument,
  PublicCoursesDocument,
  PublicEventDocument,
  PublicEventsDocument,
  PublicExamOfferingsDocument,
  PublicFaqDocument,
  PublicResultVideosDocument,
  type Language,
  type PublicCourseQuery,
  type PublicCoursesQuery,
  type PublicEventQuery,
  type PublicEventsQuery,
  type PublicExamOfferingsQuery,
  type PublicFaqQuery,
  type PublicResultVideosQuery,
} from "@/gql/graphql";
import type { EventDetailLocaleContent } from "@/types/EventDetail";
import type { MockExamDate, PublicExamOption } from "@/types/ExamPreview";
import type { FaqCategory, FaqItem, PublicEvent } from "@/types/PublicContent";
import type { PublicCourse } from "@/types/PublicCourse";
import type { PublicResultVideo } from "@/types/PublicResult";

import { executeApolloQuery } from "./apollo/ApolloServerClient";

type CourseNode = PublicCourseQuery["publicCourse"];
type EventNode = PublicEventQuery["publicEvent"];

const faqCategories = new Set<FaqCategory>([
  "courses",
  "format",
  "exams",
  "events",
  "registration",
]);

export async function getPublicCourses(locale: Locale): Promise<PublicCourse[]> {
  const data = await executeApolloQuery<PublicCoursesQuery, { language: Language; first: number }>(
    PublicCoursesDocument,
    { first: 50, language: getApiLanguage(locale) },
    { revalidate: 300 },
  );
  return data.publicCourses.edges.map(({ node }) => mapCourse(node));
}

export async function getPublicCourse(locale: Locale, slug: string): Promise<PublicCourse | null> {
  try {
    const data = await executeApolloQuery<PublicCourseQuery, { language: Language; slug: string }>(
      PublicCourseDocument,
      { language: getApiLanguage(locale), slug },
      { revalidate: 300 },
    );
    return mapCourse(data.publicCourse);
  } catch {
    return null;
  }
}

export async function getPublicEvents(locale: Locale): Promise<PublicEvent[]> {
  const data = await executeApolloQuery<PublicEventsQuery, { language: Language; first: number }>(
    PublicEventsDocument,
    { first: 50, language: getApiLanguage(locale) },
    { revalidate: 300 },
  );
  return data.publicEvents.edges.map(({ node }) => mapEvent(node));
}

export async function getPublicEvent(
  locale: Locale,
  slug: string,
): Promise<{ detail: EventDetailLocaleContent; event: PublicEvent } | null> {
  try {
    const data = await executeApolloQuery<PublicEventQuery, { language: Language; slug: string }>(
      PublicEventDocument,
      { language: getApiLanguage(locale), slug },
      { revalidate: 300 },
    );
    const node = data.publicEvent;
    return {
      detail: {
        audience: node.audience,
        faq: node.faq,
        overview: node.overview,
        practicalInfo: node.practicalInfo,
        programme: node.programme.map((item) => ({
          description: item.description,
          time: item.timeLabel,
          title: item.title,
        })),
        takeaways: node.takeaways,
      },
      event: mapEvent(node),
    };
  } catch {
    return null;
  }
}

export async function getPublicFaq(locale: Locale): Promise<FaqItem[]> {
  const data = await executeApolloQuery<PublicFaqQuery, { language: Language }>(
    PublicFaqDocument,
    { language: getApiLanguage(locale) },
    { revalidate: 300 },
  );
  return data.publicFaq.map((item) => ({
    answer: localized(item.answer),
    category: faqCategories.has(item.category as FaqCategory)
      ? (item.category as FaqCategory)
      : "registration",
    id: item.key,
    question: localized(item.question),
  }));
}

export async function getPublicExamData(
  locale: Locale,
): Promise<{ dates: MockExamDate[]; options: PublicExamOption[] }> {
  const data = await executeApolloQuery<PublicExamOfferingsQuery, { language: Language }>(
    PublicExamOfferingsDocument,
    { language: getApiLanguage(locale) },
    { revalidate: 60 },
  );
  const mock = data.publicExamOfferings.find((item) => item.key === "mock");
  return {
    dates: (mock?.sessions ?? []).map((session) => ({
      dateLabel: localized(formatDate(session.startsAt, locale)),
      timeLabel: localized(formatTime(session.startsAt, locale)),
      value: String(session.id),
    })),
    options: data.publicExamOfferings.map((item) => ({
      description: localized(item.description),
      duration: localized(item.duration),
      format: localized(item.formatLabel),
      highlights: item.highlights.map(localized),
      id: String(item.id),
      key: toExamKind(item.key),
      level: localized(item.level),
      title: localized(item.title),
    })),
  };
}

export async function getPublicResultVideos(locale: Locale): Promise<PublicResultVideo[]> {
  const data = await executeApolloQuery<PublicResultVideosQuery, { language: Language }>(
    PublicResultVideosDocument,
    { language: getApiLanguage(locale) },
    { revalidate: 300 },
  );
  return data.publicResultVideos.map((item) => ({
    duration: item.duration,
    key: item.key,
    posterSrc: item.posterPath,
    source: item.source,
    title: localized(item.title),
    videoSrc: item.videoPath,
  }));
}

function localized<T>(value: T): Record<Locale, T> {
  return { en: value, ru: value, uz: value };
}

function mapCourse(node: CourseNode): PublicCourse {
  return {
    accent: node.accent.toLowerCase() as PublicCourse["accent"],
    audience: localized(node.audience ?? ""),
    category: node.category.toLowerCase() as PublicCourse["category"],
    ...(node.comparisonTitle ? { comparisonTitle: localized(node.comparisonTitle) } : {}),
    curriculum: localized(node.curriculum),
    duration: localized(node.duration ?? ""),
    featured: node.featured,
    focus: localized(node.focus ?? ""),
    formatLabel: localized(node.formatLabel ?? ""),
    highlights: localized(node.highlights),
    ...(node.heroVariant === "immersive" ? { heroVariant: "immersive" as const } : {}),
    id: String(node.id),
    ...(node.imagePath ? { image: node.imagePath } : {}),
    ...(node.imageAlt ? { imageAlt: localized(node.imageAlt) } : {}),
    level: localized(node.level ?? ""),
    outcomes: localized(node.outcomes),
    overview: localized(node.overview),
    ...(node.posterAlt ? { posterAlt: localized(node.posterAlt) } : {}),
    ...(node.posterImagePath ? { posterImage: node.posterImagePath } : {}),
    ...(node.posterTitle ? { posterTitle: localized(node.posterTitle) } : {}),
    prerequisites: localized(node.prerequisites ?? ""),
    schedule: localized(node.schedule ?? ""),
    slug: node.slug,
    summary: localized(node.description),
    symbol: node.symbol,
    title: localized(node.title),
    tracks: node.tracks.map((track) => ({
      highlights: localized(track.highlights),
      level: localized(track.level),
      summary: localized(track.summary),
      title: localized(track.title),
    })),
  };
}

function mapEvent(node: EventNode): PublicEvent {
  return {
    dateLabel: localized(node.dateLabel ?? formatDate(node.startsAt, "en")),
    durationLabel: localized(node.durationLabel ?? ""),
    formatLabel: localized(node.formatLabel ?? ""),
    id: String(node.id),
    image: node.imagePath ?? "/images/events-page/WebinarDrEdmund.webp",
    imageAlt: localized(node.imageAlt ?? ""),
    locationLabel: localized(node.locationLabel ?? node.location ?? ""),
    requiresConfirmation: true,
    slug: node.slug,
    status: node.timelineStatus === "UPCOMING" ? "upcoming" : "past",
    summary: localized(node.description),
    timeLabel: localized(node.timeLabel ?? formatTime(node.startsAt, "en")),
    title: localized(node.title),
    topics: localized(node.topics),
  };
}

function formatDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(value));
}

function formatTime(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(
    new Date(value),
  );
}

function toExamKind(value: string): PublicExamOption["key"] {
  if (value === "ielts" || value === "cefr" || value === "mock") return value;
  throw new Error(`Unsupported public exam kind: ${value}`);
}
