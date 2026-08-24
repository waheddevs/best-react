"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useCourseCatalog } from "@/hooks/public/courses/useCourseCatalog";
import type { Course } from "@/types/PublicContent";

type CourseCatalogProps = {
  courses: Course[];
  locale: Locale;
  copy: PageCopy;
};

export function CourseCatalog({ courses, locale, copy }: CourseCatalogProps) {
  /* HOOKS */
  const catalog = useCourseCatalog({ courses, locale });
  const { query, category, categories, filteredCourses } = catalog;

  /* HANDLERS */
  const { handleQueryChange, handleCategoryChange } = catalog;

  return (
    <div>
      <div className={styles.courses__catalogFilters}>
        <TextField
          fullWidth
          label={copy.common.search}
          placeholder={copy.courses.searchPlaceholder}
          value={query}
          onChange={handleQueryChange}
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
        <div className={styles.courses__catalogCategories} aria-label={copy.courses.categoryLabel}>
          {categories.map((item) => {
            const selected = category === item;
            return (
              <Button
                key={item}
                aria-pressed={selected}
                onClick={() => handleCategoryChange(item)}
                shape="pill"
                size="small"
                variant="filter"
              >
                {copy.courses.categories[item]}
              </Button>
            );
          })}
        </div>
      </div>

      <div className={styles.courses__catalogGrid}>
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
