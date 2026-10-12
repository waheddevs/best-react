import type { Locale } from "@/config/Locales";
import { getAdminRecordLabel, type AdminCountSection } from "@/dictionaries/admin/AdminRecordCount";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { AdminTablePagination } from "../workspace/AdminTablePagination";
export function AdminContentPagination({
  page,
  pageCount,
  totalCount,
  busy,
  onChange,
  locale,
  section,
}: {
  page: number;
  pageCount: number;
  totalCount: number;
  busy: boolean;
  onChange: (page: number) => void;
  locale: Locale;
  section: AdminCountSection;
}) {
  const common = getAdminWorkspaceCopy(locale).common;
  return (
    <AdminTablePagination
      busy={busy}
      common={{ ...common, recordsLabel: getAdminRecordLabel(locale, section, totalCount) }}
      detached
      onPageChange={onChange}
      page={page}
      pageCount={pageCount}
      totalRecords={totalCount}
    />
  );
}
