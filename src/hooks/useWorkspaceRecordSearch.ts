"use client";

import { useMemo, useState, type ChangeEvent } from "react";

import type { Locale } from "@/config/Locales";

export type SearchableWorkspaceRecord = {
  detail: string;
  meta: string;
  title: string;
};

export function useWorkspaceRecordSearch<TRecord extends SearchableWorkspaceRecord>(
  records: TRecord[],
  locale: Locale,
) {
  /* HOOKS */
  const [query, setQuery] = useState("");
  const matchingRecords = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    if (!normalized) return records;

    return records.filter((record) =>
      `${record.title} ${record.meta} ${record.detail}`
        .toLocaleLowerCase(locale)
        .includes(normalized),
    );
  }, [locale, query, records]);

  /* HANDLERS */
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  return { handleQueryChange, matchingRecords, query };
}
