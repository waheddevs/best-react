"use client";

import { useRouter } from "next/navigation";
import FilterListRounded from "@mui/icons-material/FilterListRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { useMemo, useState } from "react";

import { getAdminRecordLabel } from "@/dictionaries/admin/AdminRecordCount";
import type { Locale } from "@/config/Locales";
import { getAdminStudentsCopy } from "@/dictionaries/admin/AdminStudents";
import { getAdminTeachersCopy } from "@/dictionaries/admin/AdminTeachers";
import { AdminStudentFilters } from "@/features/admin/students/AdminStudentFilters";
import { AdminStudentStatusCards } from "@/features/admin/students/AdminStudentStatusCards";
import { AdminTeacherFilters } from "@/features/admin/teachers/AdminTeacherFilters";
import { AdminTeachersTable } from "@/features/admin/teachers/AdminTeachersTable";
import { AdminTeacherStatusCards } from "@/features/admin/teachers/AdminTeacherStatusCards";
import { AdminProvisionUserForm } from "@/features/admin/users/AdminProvisionUserForm";
import { useAdminWorkspaceRecords } from "@/hooks/admin/useAdminWorkspaceRecords";
import type {
  AdminProvisionGroupOption,
  AdminProvisionUserCopy,
  ProvisionableUserRole,
} from "@/types/admin/AdminProvisionUser";
import type {
  AdminNavigationKey,
  AdminSectionCopy,
  AdminWorkspaceCopy,
} from "@/types/admin/AdminWorkspace";
import type { AdminStudentFilterState, AdminStudentStatus } from "@/types/admin/AdminStudents";
import type { AdminTeacherStatus, AdminTeacherStatusFilter } from "@/types/admin/AdminTeachers";

import { AdminPersonDetails } from "./AdminPersonDetails";
import type { AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";
import { AdminDataTable } from "./AdminDataTable";
import { AdminSpecializedContent } from "./AdminSpecializedContent";

type AdminSectionPageProps = {
  common: AdminWorkspaceCopy["common"];
  locale: Locale;
  provisionCopy?: AdminProvisionUserCopy;
  provisionGroups?: AdminProvisionGroupOption[];
  provisionRole?: ProvisionableUserRole;
  section: AdminSectionCopy;
  sectionKey: AdminNavigationKey;
  initialDetailId?: string;
};

export function AdminSectionPage({
  common,
  locale,
  provisionCopy,
  provisionGroups,
  provisionRole,
  section,
  sectionKey,
  initialDetailId,
}: AdminSectionPageProps) {
  const [detail, setDetail] = useState<AdminWorkspaceRecord | null>(
    () => section.records.find((record) => record.id === initialDetailId) ?? null,
  );
  const router = useRouter();
  const closeDetails = () => {
    setDetail(null);
    if (initialDetailId) router.replace(`/${locale}/admin/${sectionKey}`, { scroll: false });
  };
  /* HOOKS */
  const studentCopy = getAdminStudentsCopy(locale);
  const teacherCopy = getAdminTeachersCopy(locale);
  const [filterReferenceTime] = useState(() => Date.now());
  const [studentFilters, setStudentFilters] = useState<AdminStudentFilterState>({
    groupId: "ALL",
    joinedWithinDays: "ALL",
    status: "ALL",
    teacherId: "ALL",
  });
  const [deletedStudentIds, setDeletedStudentIds] = useState<Set<string>>(() => new Set());
  const [deletedTeacherIds, setDeletedTeacherIds] = useState<Set<string>>(() => new Set());
  const [teacherStatusFilter, setTeacherStatusFilter] = useState<AdminTeacherStatusFilter>("ALL");
  const studentDirectoryRecords = useMemo(
    () => section.records.filter((record) => !deletedStudentIds.has(record.id)),
    [deletedStudentIds, section.records],
  );
  const teacherDirectoryRecords = useMemo(
    () => section.records.filter((record) => !deletedTeacherIds.has(record.id)),
    [deletedTeacherIds, section.records],
  );
  const studentStatusCounts = useMemo(
    () =>
      studentDirectoryRecords.reduce<Record<AdminStudentStatus, number>>(
        (counts, record) => {
          if (record.studentStatus) counts[record.studentStatus] += 1;
          return counts;
        },
        { ACTIVE: 0, PAUSED: 0, DEBTOR: 0, DEPARTED: 0 },
      ),
    [studentDirectoryRecords],
  );
  const teacherStatusCounts = useMemo(
    () =>
      teacherDirectoryRecords.reduce<Record<AdminTeacherStatus, number>>(
        (counts, record) => {
          if (record.teacherStatus) counts[record.teacherStatus] += 1;
          return counts;
        },
        { ACTIVE: 0, PAUSED: 0, DEBTOR: 0 },
      ),
    [teacherDirectoryRecords],
  );
  const filteredSectionRecords = useMemo(() => {
    if (sectionKey === "teachers") {
      return teacherDirectoryRecords.filter(
        (record) => teacherStatusFilter === "ALL" || record.teacherStatus === teacherStatusFilter,
      );
    }
    if (sectionKey !== "students") return section.records;
    return studentDirectoryRecords.filter((record) => {
      const directory = record.studentDirectory;
      if (studentFilters.status !== "ALL" && record.studentStatus !== studentFilters.status)
        return false;
      if (studentFilters.groupId !== "ALL" && directory?.activeGroupId !== studentFilters.groupId)
        return false;
      if (
        studentFilters.teacherId !== "ALL" &&
        directory?.activeTeacherId !== studentFilters.teacherId
      )
        return false;
      if (studentFilters.joinedWithinDays !== "ALL") {
        if (!directory?.activeMembershipStartedAt) return false;
        const joinedAt = new Date(directory.activeMembershipStartedAt).getTime();
        const periodMilliseconds = Number(studentFilters.joinedWithinDays) * 24 * 60 * 60 * 1000;
        if (joinedAt < filterReferenceTime - periodMilliseconds) return false;
      }
      return true;
    });
  }, [
    filterReferenceTime,
    section.records,
    sectionKey,
    studentDirectoryRecords,
    studentFilters,
    teacherStatusFilter,
    teacherDirectoryRecords,
  ]);
  const {
    attentionOnly,
    handleFilterToggle,
    handlePageChange,
    handleQueryChange,
    handleSort,
    page,
    pageCount,
    query,
    sortDirection,
    sortKey,
    totalRecords,
    visibleRecords,
  } = useAdminWorkspaceRecords(filteredSectionRecords, locale);

  const paginationCommon = {
    ...common,
    recordsLabel: getAdminRecordLabel(locale, sectionKey, totalRecords),
  };

  const handleStudentFiltersChange = (filters: AdminStudentFilterState) => {
    setStudentFilters(filters);
    handlePageChange(1);
  };

  const handleStudentDeleted = (studentId: string) => {
    setDeletedStudentIds((current) => new Set(current).add(studentId));
  };

  const handleTeacherStatusChange = (status: AdminTeacherStatusFilter) => {
    setTeacherStatusFilter(status);
    handlePageChange(1);
  };

  const handleTeacherDeleted = (teacherId: string) => {
    setDeletedTeacherIds((current) => new Set(current).add(teacherId));
  };

  return (
    <article className="adminWorkspace">
      <header className="adminWorkspace__header">
        <div>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
      </header>
      {sectionKey === "students" ? (
        <AdminStudentStatusCards
          copy={studentCopy}
          counts={studentStatusCounts}
          total={studentDirectoryRecords.length}
        />
      ) : sectionKey === "teachers" ? (
        <AdminTeacherStatusCards
          copy={teacherCopy}
          counts={teacherStatusCounts}
          total={teacherDirectoryRecords.length}
        />
      ) : (
        <section className="adminWorkspace__metrics" aria-label={section.title}>
          <div>
            <span>{common.all}</span>
            <strong>{section.records.length}</strong>
          </div>
          <div>
            <span>{common.openQueueLabel}</span>
            <strong>
              {
                section.records.filter(
                  (record) => record.status === "warning" || record.status === "danger",
                ).length
              }
            </strong>
          </div>
          {section.metrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </section>
      )}
      {provisionCopy && provisionRole ? (
        <AdminProvisionUserForm
          copy={provisionCopy}
          groups={provisionGroups ?? []}
          role={provisionRole}
        />
      ) : null}
      {sectionKey === "students" ? (
        <AdminStudentFilters
          copy={studentCopy}
          onChange={handleStudentFiltersChange}
          onQueryChange={handleQueryChange}
          query={query}
          records={studentDirectoryRecords}
          searchLabel={common.searchLabel}
          searchPlaceholder={common.searchPlaceholder}
          statusLabel={common.statusLabel}
          value={studentFilters}
        />
      ) : sectionKey === "teachers" ? (
        <AdminTeacherFilters
          copy={teacherCopy}
          onQueryChange={handleQueryChange}
          onStatusChange={handleTeacherStatusChange}
          query={query}
          searchLabel={common.searchLabel}
          searchPlaceholder={common.searchPlaceholder}
          status={teacherStatusFilter}
          statusLabel={common.statusLabel}
        />
      ) : (
        <div className="adminWorkspace__toolbar">
          <label>
            <SearchRounded aria-hidden="true" />
            <span className="adminWorkspace__srOnly">{common.searchLabel}</span>
            <input
              onChange={handleQueryChange}
              placeholder={common.searchPlaceholder}
              type="search"
              value={query}
            />
          </label>
          <button aria-pressed={attentionOnly} onClick={handleFilterToggle} type="button">
            <FilterListRounded aria-hidden="true" />
            {attentionOnly ? common.all : common.openQueueLabel}
          </button>
        </div>
      )}
      {sectionKey === "schedule" ? (
        <AdminSpecializedContent
          common={paginationCommon}
          onPageChange={handlePageChange}
          page={page}
          pageCount={pageCount}
          records={visibleRecords}
          sectionKey={sectionKey}
          totalRecords={totalRecords}
        />
      ) : sectionKey === "teachers" ? (
        <AdminTeachersTable
          columns={section.records.find((record) => record.fields?.length)?.fields ?? []}
          common={paginationCommon}
          copy={teacherCopy}
          locale={locale}
          onPageChange={handlePageChange}
          onTeacherDeleted={handleTeacherDeleted}
          onDetails={setDetail}
          onSort={handleSort}
          page={page}
          pageCount={pageCount}
          records={visibleRecords}
          sectionTitle={section.title}
          sortDirection={sortDirection}
          sortKey={sortKey}
          totalRecords={totalRecords}
        />
      ) : (
        <AdminDataTable
          actionLabel={sectionKey === "students" ? studentCopy.actionsLabel : undefined}
          columns={section.records.find((record) => record.fields?.length)?.fields ?? []}
          common={paginationCommon}
          identityLabel={sectionKey === "students" ? studentCopy.nameLabel : undefined}
          locale={locale}
          onPageChange={handlePageChange}
          onSort={handleSort}
          onStudentDeleted={sectionKey === "students" ? handleStudentDeleted : undefined}
          onStudentDetails={setDetail}
          page={page}
          pageCount={pageCount}
          records={visibleRecords}
          sectionTitle={section.title}
          sortDirection={sortDirection}
          sortKey={sortKey}
          totalRecords={totalRecords}
          studentCopy={sectionKey === "students" ? studentCopy : undefined}
          variant={sectionKey === "students" ? "students" : "default"}
        />
      )}
      {detail && <AdminPersonDetails record={detail} locale={locale} onClose={closeDetails} />}
    </article>
  );
}
