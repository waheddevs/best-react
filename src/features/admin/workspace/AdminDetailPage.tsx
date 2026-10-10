import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type { AdminWorkspaceCopy, AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

import { AdminRecordAvatar } from "./AdminRecordAvatar";

type AdminDetailPageProps = {
  backHref: string;
  common: AdminWorkspaceCopy["common"];
  locale: Locale;
  record: AdminWorkspaceRecord;
};

export function AdminDetailPage({ backHref, common, locale, record }: AdminDetailPageProps) {
  return (
    <article className="adminWorkspace__detail">
      <Link href={`/${locale}${backHref}`}>
        <ArrowBackRounded />
        {common.all}
      </Link>
      <header>
        {record.avatarUrl !== undefined ? (
          <AdminRecordAvatar
            avatarUrl={record.avatarUrl}
            className="adminWorkspace__avatar--detail"
            displayName={record.title}
          />
        ) : null}
        <small>{record.id}</small>
        <h1>{record.title}</h1>
        <p>{record.meta}</p>
        <span className={`adminWorkspace__status adminWorkspace__status_${record.status}`}>
          {record.detail}
        </span>
      </header>
      <div className="adminWorkspace__detailPanels">
        <section>
          <span>{common.connectedNotice}</span>
          <h2>{record.title}</h2>
          {record.fields?.length ? (
            <dl className="adminWorkspace__detailFacts">
              {record.fields.map((field) => (
                <div key={field.key}>
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p>{record.detail}</p>
          )}
        </section>
        <aside>
          <span>{common.detailLabel}</span>
          <strong>{record.id}</strong>
          <p>{record.meta}</p>
        </aside>
      </div>
    </article>
  );
}
