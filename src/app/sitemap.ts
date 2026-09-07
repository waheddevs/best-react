import type { MetadataRoute } from "next";

import { locales } from "@/config/Locales";
import { siteConfig } from "@/config/Site";
import { getPublicCourses, getPublicEvents } from "@/lib/PublicContentApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/courses", "/events", "/results", "/exams", "/about", "/contact"];
  const content = await Promise.all(
    locales.map(async (locale) => ({
      courses: await getPublicCourses(locale),
      events: await getPublicEvents(locale),
      locale,
    })),
  );

  return content.flatMap(({ courses, events, locale }) => {
    const dynamicPaths = [
      ...courses.map((course) => `/courses/${course.slug}`),
      ...events.map((event) => `/events/${event.slug}`),
    ];
    return [...staticPaths, ...dynamicPaths].map((path) => ({
      url: new URL(`/${locale}${path}`, siteConfig.url).toString(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    }));
  });
}
