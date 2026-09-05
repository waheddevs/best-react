import FilterListRounded from "@mui/icons-material/FilterListRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import type { ChangeEvent } from "react";

import styles from "@/css/admin/workspace.module.css";
import type { AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

type AdminDashboardQueueProps = {
  attentionOnly: boolean;
  common: AdminWorkspaceCopy["common"];
  onFilterToggle: () => void;
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  query: string;
};

export function AdminDashboardQueue({
  attentionOnly,
  common,
  onFilterToggle,
  onQueryChange,
  query,
}: AdminDashboardQueueProps) {
  return (
    <div className={styles.adminWorkspace__toolbar}>
      <label>
        <SearchRounded aria-hidden="true" />
        <span className={styles.adminWorkspace__srOnly}>{common.searchLabel}</span>
        <input
          onChange={onQueryChange}
          placeholder={common.searchPlaceholder}
          type="search"
          value={query}
        />
      </label>
      <button aria-pressed={attentionOnly} onClick={onFilterToggle} type="button">
        <FilterListRounded aria-hidden="true" />
        {attentionOnly ? common.all : common.openQueueLabel}
      </button>
    </div>
  );
}
