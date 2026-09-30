import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import type { TeacherCopy } from "@/types/teacher/Teacher";
import type { TeacherPracticePage } from "@/types/teacher/TeacherPractice";

import { GroupWorkspaceSectionHeader } from "../GroupWorkspaceSectionHeader";
import { TeacherCreatePracticeAction } from "./TeacherCreatePracticeAction";
import { TeacherPracticeCard } from "./TeacherPracticeCard";

type TeacherPracticeCatalogProps = TeacherPracticePage & {
  connected: boolean;
  copy: TeacherCopy;
  groupId: string;
  locale: Locale;
  pathname: string;
  practicePathname: string;
  totalStudentCount: number;
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

export function TeacherPracticeCatalog({
  connected,
  copy,
  currentPage,
  groupId,
  items,
  locale,
  pathname,
  practicePathname,
  totalStudentCount,
  totalItems,
  totalPages,
}: TeacherPracticeCatalogProps) {
  const labels = getTeacherPracticesCopy(locale);
  const pages = paginationItems(currentPage, totalPages);

  return (
    <section aria-labelledby="group-tests-title" className="teacherGroups__workspaceSection">
      <GroupWorkspaceSectionHeader
        action={
          <TeacherCreatePracticeAction
            connected={connected}
            groupId={groupId}
            locale={locale}
            practicePathname={practicePathname}
          />
        }
        description={labels.practiceCount(totalItems)}
        id="group-tests-title"
        title={copy.groupWorkspace.testsTitle}
      />

      {items.length > 0 ? (
        <div className="teacherGroups__practiceGrid">
          {items.map((practice) => {
            const detailHref = `${practicePathname}/${practice.practiceNumber}`;
            return (
              <TeacherPracticeCard
                connected={connected}
                detailHref={detailHref}
                key={practice.id}
                locale={locale}
                practice={practice}
                totalStudentCount={totalStudentCount}
              />
            );
          })}
        </div>
      ) : (
        <div className="teacherShared__emptyState">
          <div>
            <span className="teacherShared__emptyIcon">
              <SearchRounded aria-hidden="true" />
            </span>
            <h3 className="teacherShared__emptyTitle">{labels.noPractices}</h3>
          </div>
        </div>
      )}

      {totalPages > 1 ? (
        <nav aria-label={labels.paginationLabel} className="teacherGroups__practicePagination">
          {currentPage > 1 ? (
            <Link
              aria-label={labels.previousPage}
              className="teacherGroups__practicePaginationArrow"
              href={pageHref(pathname, currentPage - 1)}
              scroll={false}
            >
              <ArrowBackRounded aria-hidden="true" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="teacherGroups__practicePaginationArrow"
              data-disabled
            >
              <ArrowBackRounded aria-hidden="true" />
            </span>
          )}

          <div className="teacherGroups__practicePaginationPages">
            {pages.map((page) =>
              typeof page === "number" ? (
                <Link
                  aria-current={page === currentPage ? "page" : undefined}
                  aria-label={labels.pageLabel.replace("{page}", String(page))}
                  className="teacherGroups__practicePaginationPage"
                  href={pageHref(pathname, page)}
                  key={page}
                  scroll={false}
                >
                  {page}
                </Link>
              ) : (
                <span
                  aria-hidden="true"
                  className="teacherGroups__practicePaginationEllipsis"
                  key={page}
                >
                  …
                </span>
              ),
            )}
          </div>

          {currentPage < totalPages ? (
            <Link
              aria-label={labels.nextPage}
              className="teacherGroups__practicePaginationArrow"
              href={pageHref(pathname, currentPage + 1)}
              scroll={false}
            >
              <ArrowForwardRounded aria-hidden="true" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="teacherGroups__practicePaginationArrow"
              data-disabled
            >
              <ArrowForwardRounded aria-hidden="true" />
            </span>
          )}
        </nav>
      ) : null}
    </section>
  );
}
