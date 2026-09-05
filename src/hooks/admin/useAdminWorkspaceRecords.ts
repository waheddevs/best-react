"use client";

import { useMemo, useState } from "react";

import type { Locale } from "@/config/Locales";
import { useWorkspaceRecordSearch } from "@/hooks/useWorkspaceRecordSearch";
import type { AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

export function useAdminWorkspaceRecords(records: AdminWorkspaceRecord[], locale: Locale) {
  /* HOOKS */
  const { handleQueryChange, matchingRecords, query } = useWorkspaceRecordSearch(records, locale);
  const [attentionOnly, setAttentionOnly] = useState(false);
  const visibleRecords = useMemo(
    () =>
      attentionOnly
        ? matchingRecords.filter(
            (record) => record.status === "warning" || record.status === "danger",
          )
        : matchingRecords,
    [attentionOnly, matchingRecords],
  );

  /* HANDLERS */
  const handleFilterToggle = () => setAttentionOnly((current) => !current);

  return {
    attentionOnly,
    handleFilterToggle,
    handleQueryChange,
    query,
    visibleRecords,
  };
}
