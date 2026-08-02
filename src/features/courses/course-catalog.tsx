"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";

import { CourseCard } from "@/components/cards/course-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course, CourseCategory } from "@/types/public-content";

type CategoryFilter = "all" | CourseCategory;

type CourseCatalogProps = {
  courses: Course[];
  locale: Locale;
  copy: PageCopy;
};

export function CourseCatalog({ courses, locale, copy }: CourseCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

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

  const categories: CategoryFilter[] = ["all", "language", "technology", "academic"];

  return (
    <div>
      <div className="rounded-[1.75rem] border border-border bg-surface p-4 sm:p-5">
        <TextField
          fullWidth
          label={copy.common.search}
          placeholder={copy.courses.searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded aria-hidden="true" />
                </InputAdornment>
              ),
            },
          }}
        />
        <div className="mt-4 flex flex-wrap gap-2" aria-label={copy.courses.categoryLabel}>
          {categories.map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item)}
                className={`min-h-11 rounded-full border px-4 text-sm font-bold transition-colors ${
                  selected
                    ? "border-transparent bg-(image:--gradient-cta) text-white"
                    : "border-border bg-surface text-heading hover:border-brand"
                }`}
              >
                {copy.courses.categories[item]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} locale={locale} copy={copy} />
          ))
        ) : (
          <EmptyState message={copy.common.noResults} />
        )}
      </div>
    </div>
  );
}
