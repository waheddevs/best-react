"use client";

import type { Locale } from "@/config/Locales";
import { useAdminWorkspaceRecords } from "@/hooks/admin/useAdminWorkspaceRecords";
import type { AdminSectionCopy, AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

import { AdminDashboardActivity } from "./AdminDashboardActivity";
import { AdminDashboardMetrics } from "./AdminDashboardMetrics";
import { AdminDashboardQueue } from "./AdminDashboardQueue";

type AdminDashboardProps = {
  common: AdminWorkspaceCopy["common"];
  locale: Locale;
  section: AdminSectionCopy;
};

export function AdminDashboard({ common, locale, section }: AdminDashboardProps) {
  /* HOOKS */
  const { attentionOnly, handleFilterToggle, handleQueryChange, query, visibleRecords } =
    useAdminWorkspaceRecords(section.records, locale);

  return (
    <article className="adminWorkspace">
      <header className="adminWorkspace__header">
        <div>
          <span>{section.eyebrow}</span>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
        <div className="adminWorkspace__health">
          <i />
          <span>{common.connectedNotice}</span>
        </div>
      </header>

      <AdminDashboardMetrics metrics={section.metrics} title={section.title} />
      <AdminDashboardQueue
        attentionOnly={attentionOnly}
        common={common}
        onFilterToggle={handleFilterToggle}
        onQueryChange={handleQueryChange}
        query={query}
      />
      <AdminDashboardActivity
        common={common}
        locale={locale}
        records={visibleRecords}
        title={section.title}
      />
    </article>
  );
}
