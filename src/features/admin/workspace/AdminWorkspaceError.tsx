"use client";

import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";

type AdminWorkspaceErrorProps = { retry: () => void };

export function AdminWorkspaceError({ retry }: AdminWorkspaceErrorProps) {
  /* HOOKS */
  const locale = useCurrentLocale();
  const common = getAdminWorkspaceCopy(locale).common;

  /* HANDLERS */
  const handleRetry = () => retry();

  return (
    <div className="adminWorkspace__error" role="alert">
      <p>{common.errorLabel}</p>
      <button onClick={handleRetry} type="button">
        {common.retryLabel}
      </button>
    </div>
  );
}
