import { useMemo, useState, type ChangeEvent } from "react";

import type { Locale } from "@/config/Locales";
import type { Course, CourseCategory } from "@/types/PublicContent";

export type CourseCategoryFilter = "all" | CourseCategory;

const categories: CourseCategoryFilter[] = ["all", "language", "technology", "academic"];

type UseCourseCatalogOptions = {
  courses: Course[];
  locale: Locale;
};

export function useCourseCatalog({ courses, locale }: UseCourseCatalogOptions) {
  /* HOOKS */
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

  /* HANDLERS */
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (nextCategory: CourseCategoryFilter) => {
    setCategory(nextCategory);
  };

  return {
    query,
    category,
    categories,
    filteredCourses,
    handleQueryChange,
    handleCategoryChange,
  };
}
