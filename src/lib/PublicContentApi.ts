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
import type { MockExamDate, PublicExamOption } from "@/types/ExamPreview";
import type { FaqItem, PublicEvent } from "@/types/PublicContent";
import type { PublicCourse } from "@/types/PublicCourse";
import type { PublicResultVideo } from "@/types/PublicResult";

import { executeApolloQuery } from "./apollo/ApolloServerClient";
import {
  mapPublicCourse,
  mapPublicEvent,
  mapPublicEventDetail,
  mapPublicExamData,
  mapPublicFaq,
  mapPublicResultVideos,
} from "./PublicContentMapper";

export async function getPublicCourses(locale: Locale): Promise<PublicCourse[]> {
  const data = await executeApolloQuery<PublicCoursesQuery, { language: Language; first: number }>(
    PublicCoursesDocument,
    { first: 50, language: getApiLanguage(locale) },
    { revalidate: 300 },
  );
  return data.publicCourses.edges.map(({ node }) => mapPublicCourse(node));
}

export async function getPublicCourse(locale: Locale, slug: string): Promise<PublicCourse | null> {
  try {
    const data = await executeApolloQuery<PublicCourseQuery, { language: Language; slug: string }>(
      PublicCourseDocument,
      { language: getApiLanguage(locale), slug },
      { revalidate: 300 },
    );
    return mapPublicCourse(data.publicCourse);
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
  return data.publicEvents.edges.map(({ node }) => mapPublicEvent(node));
}

export async function getPublicEvent(
  locale: Locale,
  slug: string,
): Promise<ReturnType<typeof mapPublicEventDetail> | null> {
  try {
    const data = await executeApolloQuery<PublicEventQuery, { language: Language; slug: string }>(
      PublicEventDocument,
      { language: getApiLanguage(locale), slug },
      { revalidate: 300 },
    );
    return mapPublicEventDetail(data.publicEvent);
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
  return mapPublicFaq(data.publicFaq);
}

export async function getPublicExamData(
  locale: Locale,
): Promise<{ dates: MockExamDate[]; options: PublicExamOption[] }> {
  const data = await executeApolloQuery<PublicExamOfferingsQuery, { language: Language }>(
    PublicExamOfferingsDocument,
    { language: getApiLanguage(locale) },
    { revalidate: 60 },
  );
  return mapPublicExamData(data.publicExamOfferings, locale);
}

export async function getPublicResultVideos(locale: Locale): Promise<PublicResultVideo[]> {
  const data = await executeApolloQuery<PublicResultVideosQuery, { language: Language }>(
    PublicResultVideosDocument,
    { language: getApiLanguage(locale) },
    { revalidate: 300 },
  );
  return mapPublicResultVideos(data.publicResultVideos);
}
