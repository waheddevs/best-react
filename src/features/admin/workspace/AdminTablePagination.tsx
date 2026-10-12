import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";

import type { AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

type AdminTablePaginationProps = {
  common: AdminWorkspaceCopy["common"];
  busy?: boolean;
  detached?: boolean;
  onPageChange: (page: number) => void;
  page: number;
  pageCount: number;
  totalRecords: number;
};

export function AdminTablePagination({
  common,
  busy = false,
  detached = false,
  onPageChange,
  page,
  pageCount,
  totalRecords,
}: AdminTablePaginationProps) {
  const controls = (
    <>
      <button
        aria-label={common.previousLabel}
        disabled={busy || page <= 1}
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
        disabled={busy || page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        <span>{common.nextLabel}</span>
        <ChevronRightRounded aria-hidden="true" />
      </button>
    </>
  );

  return (
    <footer
      className={[
        "adminWorkspace__pagination",
        detached ? "adminWorkspace__pagination_detached" : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {detached ? null : (
        <span>
          {totalRecords} {common.recordsLabel}
        </span>
      )}
      <div className={detached ? "adminWorkspace__paginationCard" : undefined}>{controls}</div>
      {detached ? (
        <span className="adminWorkspace__recordCount">
          {totalRecords} {common.recordsLabel}
        </span>
      ) : null}
    </footer>
  );
}
