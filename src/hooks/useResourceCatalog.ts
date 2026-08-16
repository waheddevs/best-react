"use client";

import { useMemo, useState } from "react";

import type { Locale } from "@/config/locales";
import type { LibraryResource, LibraryResourceType } from "@/types/public-content";

export type ResourceTypeFilter = "all" | LibraryResourceType;

const resourceTypes: ResourceTypeFilter[] = ["all", "guide", "checklist", "article"];

export function useResourceCatalog(resources: LibraryResource[], locale: Locale) {
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

  return {
    filteredResources,
    query,
    resourceTypes,
    setQuery,
    setType,
    type,
  };
}
