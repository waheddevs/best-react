"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import type { Locale } from "@/config/Locales";
import { useWorkspaceRecordSearch } from "@/hooks/useWorkspaceRecordSearch";
import type { AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

export function useAdminWorkspaceRecords(records: AdminWorkspaceRecord[], locale: Locale) {
  /* HOOKS */
  const { handleQueryChange, matchingRecords, query } = useWorkspaceRecordSearch(records, locale);
  const [attentionOnly, setAttentionOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");
  const [sortKey, setSortKey] = useState<"detail" | "meta" | "title">("title");
  const pageSize = 10;
  const filteredRecords = useMemo(
    () =>
      attentionOnly
        ? matchingRecords.filter(
            (record) => record.status === "warning" || record.status === "danger",
          )
        : matchingRecords,
    [attentionOnly, matchingRecords],
  );
  const sortedRecords = useMemo(
    () =>
      [...filteredRecords].sort((first, second) => {
        const result = first[sortKey].localeCompare(second[sortKey], locale);
        return sortDirection === "ascending" ? result : -result;
      }),
    [filteredRecords, locale, sortDirection, sortKey],
  );
  const pageCount = Math.max(1, Math.ceil(sortedRecords.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleRecords = sortedRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  /* HANDLERS */
  const handleFilterToggle = () => {
    setAttentionOnly((current) => !current);
    setPage(1);
  };
  const handlePageChange = (nextPage: number) =>
    setPage(Math.min(Math.max(nextPage, 1), pageCount));
  const handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(event);
    setPage(1);
  };
  const handleSort = (nextSortKey: typeof sortKey) => {
    if (nextSortKey === sortKey) {
      setSortDirection((current) => (current === "ascending" ? "descending" : "ascending"));
    } else {
      setSortKey(nextSortKey);
      setSortDirection("ascending");
    }
    setPage(1);
  };

  return {
    attentionOnly,
    handleFilterToggle,
    handlePageChange,
    handleQueryChange: handleQueryUpdate,
    handleSort,
    page: currentPage,
    pageCount,
    query,
    sortDirection,
    sortKey,
    totalRecords: filteredRecords.length,
    visibleRecords,
  };
}
