import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";

import type { StudentTestsCopy } from "@/types/student/StudentTests";

type StudentTestPaginationProps = {
  copy: StudentTestsCopy;
  currentPage: number;
  pathname: string;
  totalPages: number;
};

type PaginationItem = number | "ellipsis-left" | "ellipsis-right";

function paginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const visible = [...pages].filter((page) => page > 0 && page <= totalPages).sort((a, b) => a - b);
  const items: PaginationItem[] = [];
  visible.forEach((page, index) => {
    const previous = visible[index - 1];
    if (previous && page - previous > 1) {
      items.push(previous === 1 ? "ellipsis-left" : "ellipsis-right");
    }
    items.push(page);
  });
  return items;
}

function pageHref(pathname: string, page: number) {
  return page === 1 ? pathname : `${pathname}?page=${page}`;
}

export function StudentTestPagination({
  copy,
  currentPage,
  pathname,
  totalPages,
}: StudentTestPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label={copy.paginationLabel} className="studentTests__pagination">
      {currentPage > 1 ? (
        <Link
          aria-label={copy.previousPage}
          className="studentTests__paginationArrow"
          href={pageHref(pathname, currentPage - 1)}
          scroll={false}
        >
          <ArrowBackRounded aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className="studentTests__paginationArrow" data-disabled>
          <ArrowBackRounded aria-hidden="true" />
        </span>
      )}

      <div className="studentTests__paginationPages">
        {paginationItems(currentPage, totalPages).map((page) =>
          typeof page === "number" ? (
            <Link
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={copy.pageLabel.replace("{page}", String(page))}
              className="studentTests__paginationPage"
              href={pageHref(pathname, page)}
              key={page}
              scroll={false}
            >
              {page}
            </Link>
          ) : (
            <span aria-hidden="true" className="studentTests__paginationEllipsis" key={page}>
              …
            </span>
          ),
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          aria-label={copy.nextPage}
          className="studentTests__paginationArrow"
          href={pageHref(pathname, currentPage + 1)}
          scroll={false}
        >
          <ArrowForwardRounded aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className="studentTests__paginationArrow" data-disabled>
          <ArrowForwardRounded aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
