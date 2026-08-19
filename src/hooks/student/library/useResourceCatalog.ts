import { useMemo, useState, type ChangeEvent } from "react";

import type { Locale } from "@/config/Locales";
import type { LibraryResource, LibraryResourceType } from "@/types/student/Library";

export type ResourceTypeFilter = "all" | LibraryResourceType;

const resourceTypes: ResourceTypeFilter[] = ["all", "guide", "checklist", "article"];

type UseResourceCatalogOptions = {
  resources: LibraryResource[];
  locale: Locale;
};

export function useResourceCatalog({ resources, locale }: UseResourceCatalogOptions) {
  /* HOOKS */
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

  /* HANDLERS */
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleTypeChange = (nextType: ResourceTypeFilter) => {
    setType(nextType);
  };

  return {
    query,
    type,
    resourceTypes,
    filteredResources,
    handleQueryChange,
    handleTypeChange,
  };
}
