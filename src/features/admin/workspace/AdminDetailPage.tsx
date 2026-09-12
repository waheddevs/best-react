import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import styles from "@/css/admin/workspace.module.css";
import type { AdminWorkspaceCopy, AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

type AdminDetailPageProps = {
  backHref: string;
  common: AdminWorkspaceCopy["common"];
  locale: Locale;
  record: AdminWorkspaceRecord;
};

export function AdminDetailPage({ backHref, common, locale, record }: AdminDetailPageProps) {
  return (
    <article className={styles.adminWorkspace__detail}>
      <Link href={`/${locale}${backHref}`}>
        <ArrowBackRounded />
        {common.all}
      </Link>
      <header>
        <small>{record.id}</small>
        <h1>{record.title}</h1>
        <p>{record.meta}</p>
        <span
          className={`${styles.adminWorkspace__status} ${styles[`adminWorkspace__status_${record.status}`]}`}
        >
          {record.detail}
        </span>
      </header>
      <div className={styles.adminWorkspace__detailPanels}>
        <section>
          <span>{common.connectedNotice}</span>
          <h2>{record.title}</h2>
          <p>{record.detail}</p>
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
