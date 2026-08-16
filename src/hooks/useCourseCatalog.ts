"use client";

import { useMemo, useState } from "react";

import type { Locale } from "@/config/locales";
import type { Course, CourseCategory } from "@/types/public-content";

export type CourseCategoryFilter = "all" | CourseCategory;

const courseCategories: CourseCategoryFilter[] = ["all", "language", "technology", "academic"];

export function useCourseCatalog(courses: Course[], locale: Locale) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CourseCategoryFilter>("all");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);

    return courses.filter((course) => {
      const matchesCategory = category === "all" || course.category === category;
      const searchable = `${course.title[locale]} ${course.summary[locale]}`.toLocaleLowerCase(
        locale,
      );

      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [category, courses, locale, query]);

  return {
    categories: courseCategories,
    category,
    filteredCourses,
    query,
    setCategory,
    setQuery,
  };
}
