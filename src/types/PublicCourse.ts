import type { Locale } from "@/config/Locales";

export type LocalizedCourseText = Record<Locale, string>;
export type LocalizedCourseList = Record<Locale, string[]>;

export type CourseCategory = "english" | "exam" | "language";
export type CourseAccent = "blue" | "turquoise" | "yellow";

export type CourseTrack = {
  highlights: LocalizedCourseList;
  level: LocalizedCourseText;
  summary: LocalizedCourseText;
  title: LocalizedCourseText;
};

export type PublicCourse = {
  accent: CourseAccent;
  audience: LocalizedCourseText;
  category: CourseCategory;
  curriculum: LocalizedCourseList;
  duration: LocalizedCourseText;
  focus: LocalizedCourseText;
  formatLabel: LocalizedCourseText;
  highlights: LocalizedCourseList;
  image?: string;
  imageAlt?: LocalizedCourseText;
  level: LocalizedCourseText;
  outcomes: LocalizedCourseList;
  posterAlt?: LocalizedCourseText;
  posterImage?: string;
  posterTitle?: LocalizedCourseText;
  prerequisites: LocalizedCourseText;
  schedule: LocalizedCourseText;
  slug: string;
  summary: LocalizedCourseText;
  symbol: string;
  title: LocalizedCourseText;
  tracks?: CourseTrack[];
};
