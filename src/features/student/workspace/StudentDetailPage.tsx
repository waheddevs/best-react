import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type {
  StudentWorkspaceCopy,
  StudentWorkspaceRecord,
} from "@/types/student/StudentWorkspace";

type StudentDetailPageProps = {
  backHref: string;
  common: StudentWorkspaceCopy["common"];
  locale: Locale;
  record: StudentWorkspaceRecord;
};

export function StudentDetailPage({ backHref, common, locale, record }: StudentDetailPageProps) {
  return (
    <article className="studentWorkspace__detail">
      <Link className="studentWorkspace__back" href={`/${locale}${backHref}`}>
        <ArrowBackRounded aria-hidden="true" />
        {common.all}
      </Link>
      <header>
        <span className={`studentWorkspace__status studentWorkspace__status_${record.status}`}>
          {record.detail}
        </span>
        <h1>{record.title}</h1>
        <p>{record.meta}</p>
      </header>
      <div className="studentWorkspace__detailGrid">
        <section>
          <h2>{record.title}</h2>
          <p>{record.detail}</p>
          <p>{record.meta}</p>
        </section>
        <aside>
          <span>{common.previewNotice}</span>
          <strong>
            {typeof record.progress === "number" ? `${record.progress}%` : record.detail}
          </strong>
        </aside>
      </div>
    </article>
  );
}
