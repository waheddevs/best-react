import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";

import type { AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

type AdminTablePaginationProps = {
  common: AdminWorkspaceCopy["common"];
  onPageChange: (page: number) => void;
  page: number;
  pageCount: number;
  totalRecords: number;
};

export function AdminTablePagination({
  common,
  onPageChange,
  page,
  pageCount,
  totalRecords,
}: AdminTablePaginationProps) {
  return (
    <footer className="adminWorkspace__pagination">
      <span>
        {totalRecords} {common.recordsLabel}
      </span>
      <div>
        <button
          aria-label={common.previousLabel}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          type="button"
        >
          <ChevronLeftRounded aria-hidden="true" />
          <span>{common.previousLabel}</span>
        </button>
        <strong>
          {common.pageLabel} {page} / {pageCount}
        </strong>
        <button
          aria-label={common.nextLabel}
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
          type="button"
        >
          <span>{common.nextLabel}</span>
          <ChevronRightRounded aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
