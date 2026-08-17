"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";

import { ResourceCard } from "@/components/cards/resource-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { LibraryResource, LibraryResourceType } from "@/types/public-content";

type ResourceTypeFilter = "all" | LibraryResourceType;

type ResourceCatalogProps = {
  resources: LibraryResource[];
  locale: Locale;
  copy: PageCopy;
};

export function ResourceCatalog({ resources, locale, copy }: ResourceCatalogProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ResourceTypeFilter>("all");

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    return resources.filter((resource) => {
      const matchesType = type === "all" || resource.type === type;
      const searchable = `${resource.title[locale]} ${resource.summary[locale]}`.toLocaleLowerCase(
        locale,
      );
      return matchesType && searchable.includes(normalizedQuery);
    });
  }, [locale, query, resources, type]);

  const types: ResourceTypeFilter[] = ["all", "guide", "checklist", "article"];

  return (
    <div>
      <div className="rounded-[1.75rem] border border-border bg-surface p-4 sm:p-5">
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
        <div className="mt-4 flex flex-wrap gap-2" aria-label={copy.library.title}>
          {types.map((item) => {
            const selected = type === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setType(item)}
                className={`min-h-11 rounded-full border px-4 text-sm font-bold transition-colors ${
                  selected
                    ? "border-transparent bg-(image:--gradient-cta) text-white"
                    : "border-border bg-surface text-heading hover:border-brand"
                }`}
              >
                {copy.library.types[item]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
