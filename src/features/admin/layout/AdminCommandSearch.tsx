"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import Link from "next/link";
import type { ChangeEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { WorkspaceNavigationItem } from "@/hooks/navigation/useWorkspaceShellNavigation";
import type { AdminNavigationKey, AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

type AdminCommandSearchProps = {
  emptyLabel: string;
  items: Array<WorkspaceNavigationItem<AdminNavigationKey>>;
  label: string;
  navigationCopy: AdminWorkspaceCopy["navigation"];
  placeholder: string;
};

export function AdminCommandSearch({
  emptyLabel,
  items,
  label,
  navigationCopy,
  placeholder,
}: AdminCommandSearchProps) {
  /* HOOKS */
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return [];
    return items.filter((item) =>
      navigationCopy[item.key].toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [items, navigationCopy, query]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  /* HANDLERS */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);
  const handleResultClick = () => setQuery("");
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") setQuery("");
  };

  return (
    <div className="adminShell__commandSearch">
      <label>
        <SearchRounded aria-hidden="true" />
        <span className="adminWorkspace__srOnly">{label}</span>
        <input
          aria-controls={query ? "admin-command-results" : undefined}
          aria-keyshortcuts="Control+K Meta+K"
          autoComplete="off"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={inputRef}
          type="search"
          value={query}
        />
        <kbd>Ctrl K</kbd>
      </label>
      {query ? (
        <div aria-label={label} className="adminShell__commandResults" id="admin-command-results">
          {results.length ? (
            results.map((item) => (
              <Link href={item.localizedHref} key={item.key} onClick={handleResultClick}>
                <span>{navigationCopy[item.key]}</span>
                <small>↗</small>
              </Link>
            ))
          ) : (
            <p>{emptyLabel}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
