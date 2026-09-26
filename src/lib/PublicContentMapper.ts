import type { Locale } from "@/config/Locales";
import type {
  PublicCourseQuery,
  PublicEventQuery,
  PublicExamOfferingsQuery,
  PublicFaqQuery,
  PublicResultVideosQuery,
} from "@/gql/graphql";
import type { EventDetailLocaleContent } from "@/types/EventDetail";
import type { MockExamDate, PublicExamOption } from "@/types/ExamPreview";
import type { FaqCategory, FaqItem, PublicEvent } from "@/types/PublicContent";
import type { PublicCourse } from "@/types/PublicCourse";
import type { PublicResultVideo } from "@/types/PublicResult";

const faqCategories = new Set<FaqCategory>([
  "courses",
  "format",
  "exams",
  "events",
  "registration",
]);

function localized<T>(value: T): Record<Locale, T> {
  return { en: value, ru: value, uz: value };
}

export function mapPublicCourse(node: PublicCourseQuery["publicCourse"]): PublicCourse {
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

export function mapPublicEvent(node: PublicEventQuery["publicEvent"]): PublicEvent {
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

export function mapPublicEventDetail(node: PublicEventQuery["publicEvent"]): {
  detail: EventDetailLocaleContent;
  event: PublicEvent;
} {
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
    event: mapPublicEvent(node),
  };
}

export function mapPublicFaq(items: PublicFaqQuery["publicFaq"]): FaqItem[] {
  return items.map((item) => ({
    answer: localized(item.answer),
    category: faqCategories.has(item.category as FaqCategory)
      ? (item.category as FaqCategory)
      : "registration",
    id: item.key,
    question: localized(item.question),
  }));
}

export function mapPublicExamData(
  offerings: PublicExamOfferingsQuery["publicExamOfferings"],
  locale: Locale,
): { dates: MockExamDate[]; options: PublicExamOption[] } {
  const mock = offerings.find((item) => item.key === "mock");
  return {
    dates: (mock?.sessions ?? []).map((session) => ({
      dateLabel: localized(formatDate(session.startsAt, locale)),
      timeLabel: localized(formatTime(session.startsAt, locale)),
      value: String(session.id),
    })),
    options: offerings.map((item) => ({
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

export function mapPublicResultVideos(
  items: PublicResultVideosQuery["publicResultVideos"],
): PublicResultVideo[] {
  return items.map((item) => ({
    duration: item.duration,
    key: item.key,
    posterSrc: item.posterPath,
    source: item.source,
    title: localized(item.title),
    videoSrc: item.videoPath,
  }));
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
