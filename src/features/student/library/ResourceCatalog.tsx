"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/config/Locales";
import styles from "@/css/student/library.module.css";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import { useResourceCatalog } from "@/hooks/student/library/useResourceCatalog";
import type { LibraryResource } from "@/types/student/Library";

import { ResourceCard } from "./ResourceCard";

type ResourceCatalogProps = {
  resources: LibraryResource[];
  locale: Locale;
  copy: StudentLibraryCopy;
};

export function ResourceCatalog({ resources, locale, copy }: ResourceCatalogProps) {
  /* HOOKS */
  const catalog = useResourceCatalog({ resources, locale });
  const { query, type, resourceTypes, filteredResources } = catalog;

  /* HANDLERS */
  const { handleQueryChange, handleTypeChange } = catalog;

  return (
    <div>
      <div className={styles.library__catalogFilters}>
        <TextField
          fullWidth
          label={copy.searchLabel}
          placeholder={copy.searchPlaceholder}
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
        <div className={styles.library__catalogTypes} aria-label={copy.title}>
          {resourceTypes.map((item) => {
            const selected = type === item;
            return (
              <Button
                key={item}
                aria-pressed={selected}
                onClick={() => handleTypeChange(item)}
                shape="pill"
                size="small"
                variant="filter"
              >
                {copy.types[item]}
              </Button>
            );
          })}
        </div>
      </div>
      <div className={styles.library__catalogGrid}>
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} locale={locale} copy={copy} />
          ))
        ) : (
          <EmptyState message={copy.noResults} />
        )}
      </div>
    </div>
  );
}
