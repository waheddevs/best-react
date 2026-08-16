"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { ResourceCard } from "@/components/cards/resource-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import { useResourceCatalog } from "@/hooks/useResourceCatalog";
import type { LibraryResource } from "@/types/public-content";

type ResourceCatalogProps = {
  resources: LibraryResource[];
  locale: Locale;
  copy: PageCopy;
};

export function ResourceCatalog({ resources, locale, copy }: ResourceCatalogProps) {
  const { filteredResources, query, resourceTypes, setQuery, setType, type } = useResourceCatalog(
    resources,
    locale,
  );

  return (
    <div>
      <div className="resource-catalog">
        <TextField
          fullWidth
          label={copy.common.search}
          placeholder={copy.library.searchPlaceholder}
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
        <div className="resource-catalog__2" aria-label={copy.library.title}>
          {resourceTypes.map((item) => {
            const selected = type === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setType(item)}
                className={`resource-filter ${selected ? "resource-filter--selected" : ""}`}
              >
                {copy.library.types[item]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="resource-catalog__3">
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
