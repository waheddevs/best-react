import type { MetadataRoute } from "next";

import { locales } from "@/config/Locales";
import { siteConfig } from "@/config/Site";
import { courses, events } from "@/data/PublicContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/courses", "/events", "/results", "/exams", "/about", "/contact"];
  const dynamicPaths = [
    ...courses.map((course) => `/courses/${course.slug}`),
    ...events.map((event) => `/events/${event.slug}`),
  ];

  return locales.flatMap((locale) =>
    [...staticPaths, ...dynamicPaths].map((path) => ({
      url: new URL(`/${locale}${path}`, siteConfig.url).toString(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
