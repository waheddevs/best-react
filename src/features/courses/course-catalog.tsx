"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { CourseCard } from "@/components/cards/course-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import { useCourseCatalog } from "@/hooks/useCourseCatalog";
import type { Course } from "@/types/public-content";

type CourseCatalogProps = {
  courses: Course[];
  locale: Locale;
  copy: PageCopy;
};

export function CourseCatalog({ courses, locale, copy }: CourseCatalogProps) {
  const { categories, category, filteredCourses, query, setCategory, setQuery } = useCourseCatalog(
    courses,
    locale,
  );

  return (
    <div>
      <div className="course-catalog">
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
        <div className="course-catalog__2" aria-label={copy.courses.categoryLabel}>
          {categories.map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item)}
                className={`course-filter ${selected ? "course-filter--selected" : ""}`}
              >
                {copy.courses.categories[item]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="course-catalog__3">
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
