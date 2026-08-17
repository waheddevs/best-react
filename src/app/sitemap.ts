import type { MetadataRoute } from "next";

import { locales } from "@/config/locales";
import { siteConfig } from "@/config/site";
import { courses, events, libraryResources } from "@/data/public-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/courses",
    "/events",
    "/results",
    "/library",
    "/exams",
    "/about",
    "/faq",
    "/contact",
  ];
  const dynamicPaths = [
    ...courses.map((course) => `/courses/${course.slug}`),
    ...events.map((event) => `/events/${event.slug}`),
    ...libraryResources.map((resource) => `/library/${resource.slug}`),
  ];

  return locales.flatMap((locale) =>
    [...staticPaths, ...dynamicPaths].map((path) => ({
      url: new URL(`/${locale}${path}`, siteConfig.url).toString(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
