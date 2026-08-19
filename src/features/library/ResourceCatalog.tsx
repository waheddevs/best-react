"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { ResourceCard } from "@/components/cards/ResourceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/library.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useResourceCatalog } from "@/hooks/public/library/useResourceCatalog";
import type { LibraryResource } from "@/types/PublicContent";

type ResourceCatalogProps = {
  resources: LibraryResource[];
  locale: Locale;
  copy: PageCopy;
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
          label={copy.common.search}
          placeholder={copy.library.searchPlaceholder}
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
        <div className={styles.library__catalogTypes} aria-label={copy.library.title}>
          {resourceTypes.map((item) => {
            const selected = type === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => handleTypeChange(item)}
                className={`${styles.library__catalogType} ${selected ? styles.library__catalogTypeActive : ""}`}
              >
                {copy.library.types[item]}
              </button>
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
          <EmptyState message={copy.common.noResults} />
        )}
      </div>
    </div>
  );
}
