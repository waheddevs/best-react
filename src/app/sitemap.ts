import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { courses, events, libraryResources } from "@/data/public-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/website",
    "/website/courses",
    "/website/events",
    "/website/results",
    "/website/library",
    "/website/exams",
    "/website/about",
    "/website/faq",
    "/website/contact",
  ];
  const dynamicPaths = [
    ...courses.map((course) => `/website/courses/${course.slug}`),
    ...events.map((event) => `/website/events/${event.slug}`),
    ...libraryResources.map((resource) => `/website/library/${resource.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/website" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/website" ? 1 : 0.7,
  }));
}
