"use client";

import Link from "next/link";

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
  const attentionCount = section.records.filter(
    (record) => record.status === "warning" || record.status === "danger",
  ).length;

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

      <AdminDashboardMetrics locale={locale} metrics={section.metrics} title={section.title} />
      <div className="adminDashboard__contentGrid">
        <section className="adminDashboard__queuePanel">
          <div className="adminDashboard__panelHeader">
            <div>
              <span>{section.eyebrow}</span>
              <h2>{common.openQueueLabel}</h2>
            </div>
            <strong>{visibleRecords.length}</strong>
          </div>
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
        </section>
        <aside className="adminDashboard__statusPanel">
          <div className="adminDashboard__panelHeader">
            <div>
              <span>{common.statusLabel}</span>
              <h2>{common.connectedNotice}</h2>
            </div>
            <i aria-hidden="true" />
          </div>
          <dl>
            <div>
              <dt>{common.all}</dt>
              <dd>{section.records.length}</dd>
            </div>
            <div>
              <dt>{common.openQueueLabel}</dt>
              <dd>{attentionCount}</dd>
            </div>
          </dl>
          <nav aria-label={common.detailLabel}>
            {section.records.map((record) =>
              record.href ? (
                <Link href={`/${locale}${record.href}`} key={record.id}>
                  <span>{record.title}</span>
                  <strong>{record.meta}</strong>
                </Link>
              ) : null,
            )}
          </nav>
        </aside>
      </div>
    </article>
  );
}
