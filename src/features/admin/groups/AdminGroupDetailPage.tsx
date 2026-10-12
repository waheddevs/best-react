import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import MeetingRoomRounded from "@mui/icons-material/MeetingRoomRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { getAdminGroupCategoryLabel } from "@/dictionaries/admin/AdminGroups";
import { formatAdminGroupSchedule } from "@/lib/admin/AdminGroupPresentation";
import type { AdminGroupsCopy } from "@/types/admin/AdminGroups";
import type { AdminWorkspaceCopy, AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

import { AdminGroupCapacity } from "./AdminGroupCapacity";

type AdminGroupDetailPageProps = {
  common: AdminWorkspaceCopy["common"];
  copy: AdminGroupsCopy;
  locale: Locale;
  record: AdminWorkspaceRecord;
};

export function AdminGroupDetailPage({ common, copy, locale, record }: AdminGroupDetailPageProps) {
  const group = record.group;
  if (!group) return null;

  return (
    <article className="adminGroupDetail">
      <Link className="adminGroupDetail__back" href={`/${locale}/admin/groups`}>
        <ArrowBackRounded aria-hidden="true" />
        {copy.backLabel}
      </Link>
      <header className="adminGroupDetail__hero">
        <div>
          <h1>{record.title}</h1>
          <p>
            {group.teacherName} · {group.branchName ?? copy.branchLabel}
          </p>
        </div>
        <span className={`adminWorkspace__status adminWorkspace__status_${record.status}`}>
          {record.detail}
        </span>
      </header>
      <section aria-label={copy.groupsSummaryLabel} className="adminGroupDetail__metrics">
        <div>
          <PersonRounded aria-hidden="true" />
          <span>
            <small>{copy.totalLearnersLabel}</small>
            <strong>{group.activeStudentCount}</strong>
          </span>
        </div>
        <div>
          <MeetingRoomRounded aria-hidden="true" />
          <span>
            <small>{copy.roomLabel}</small>
            <strong>{group.room ?? "—"}</strong>
          </span>
        </div>
        <div>
          <CalendarMonthRounded aria-hidden="true" />
          <span>
            <small>{copy.scheduleLabel}</small>
            <strong>{formatAdminGroupSchedule(group, locale)}</strong>
          </span>
        </div>
        <div>
          <PaymentsRounded aria-hidden="true" />
          <span>
            <small>{copy.monthlyTuitionLabel}</small>
            <strong>{group.monthlyTuitionUzs ?? "—"}</strong>
          </span>
        </div>
      </section>
      <div className="adminGroupDetail__grid">
        <section>
          <header>
            <span>{copy.capacityLabel}</span>
            <strong>
              {group.activeStudentCount}/{group.capacity}
            </strong>
          </header>
          <AdminGroupCapacity
            current={group.activeStudentCount}
            label={copy.capacityLabel}
            total={group.capacity}
          />
          <p>
            {copy.availableSeatsLabel}: {Math.max(0, group.capacity - group.activeStudentCount)}
          </p>
        </section>
        <aside>
          <dl>
            <div>
              <dt>{copy.categoryLabel}</dt>
              <dd>{getAdminGroupCategoryLabel(locale, group.category)}</dd>
            </div>
            <div>
              <dt>{copy.teacherLabel}</dt>
              <dd>{group.teacherName}</dd>
            </div>
            <div>
              <dt>{copy.branchLabel}</dt>
              <dd>{group.branchName ?? "—"}</dd>
            </div>
            <div>
              <dt>{common.idRecordLabel}</dt>
              <dd>{record.id}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
