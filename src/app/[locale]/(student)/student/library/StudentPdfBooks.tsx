"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import PictureAsPdfRounded from "@mui/icons-material/PictureAsPdfRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import {
  getStudentLibraryBookDownload,
  loadStudentLibraryBooks,
} from "@/features/student/library/StudentLibraryActions";
import type { StudentLibraryBooksQuery } from "@/gql/graphql";

type BookPage = Pick<StudentLibraryBooksQuery["studentLibraryItems"], "edges">;
type Book = BookPage["edges"][number]["node"];
type MaterialType = keyof StudentLibraryCopy["materialTypes"];
type SortOrder = "latest" | "oldest" | "alphabetical";

type StudentPdfBooksProps = {
  copy: StudentLibraryCopy;
  initialPage: BookPage | null;
  locale: Locale;
  onMaterialCountChange: (count: number) => void;
  preview: boolean;
};

const materialTypes: MaterialType[] = ["all", "Books", "Guides", "Articles"];

export function StudentPdfBooks({
  copy,
  initialPage,
  locale,
  onMaterialCountChange,
  preview,
}: StudentPdfBooksProps) {
  const [page, setPage] = useState(initialPage);
  const [type, setType] = useState<MaterialType>("all");
  const [sort, setSort] = useState<SortOrder>("latest");
  const [sortAnchor, setSortAnchor] = useState<HTMLElement | null>(null);
  const sortMenuId = useId();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const refreshInFlight = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const refreshBooks = useCallback(
    async (foreground = false) => {
      if (preview || refreshInFlight.current) return;
      refreshInFlight.current = true;
      if (foreground) setPending(true);
      try {
        const result = await loadStudentLibraryBooks(locale);
        if (!mounted.current) return;
        if (result.ok) {
          setPage(result.page);
          setError(false);
          onMaterialCountChange(
            result.page.edges.filter(({ node }) =>
              node.attachments.some(
                ({ mediaObject }) => mediaObject.mimeType === "application/pdf",
              ),
            ).length,
          );
        } else {
          setError(true);
        }
      } catch {
        if (mounted.current) setError(true);
      } finally {
        refreshInFlight.current = false;
        if (mounted.current && foreground) setPending(false);
      }
    },
    [locale, onMaterialCountChange, preview],
  );

  useEffect(() => {
    if (preview) return;
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void refreshBooks();
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);
    window.addEventListener("focus", refreshWhenVisible);
    const interval = window.setInterval(refreshWhenVisible, 45_000);
    return () => {
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.removeEventListener("focus", refreshWhenVisible);
      window.clearInterval(interval);
    };
  }, [preview, refreshBooks]);

  const books = useMemo(() => {
    const items = (page?.edges ?? [])
      .map(({ node }) => node)
      .filter(
        (item) =>
          item.attachments.some(({ mediaObject }) => mediaObject.mimeType === "application/pdf") &&
          (type === "all" || item.category.name === type),
      );
    return items.sort((a, b) => {
      if (sort === "alphabetical") return a.title.localeCompare(b.title, locale);
      const difference = Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      return sort === "latest" ? difference : -difference;
    });
  }, [locale, page, sort, type]);

  const openBook = async (book: Book) => {
    const media = book.attachments.find(
      ({ mediaObject }) => mediaObject.mimeType === "application/pdf",
    )?.mediaObject;
    if (!media) return;
    const tab = window.open("", "_blank");
    const result = await getStudentLibraryBookDownload(book.id, media.id);
    if (!result.ok) {
      tab?.close();
      setError(true);
      return;
    }
    if (tab) {
      tab.opener = null;
      tab.location.assign(result.url);
    } else {
      window.location.assign(result.url);
    }
  };

  const retry = async () => {
    if (pending || preview) return;
    await refreshBooks(true);
  };

  const sortOptions: { value: SortOrder; label: string }[] = [
    { value: "latest", label: copy.sortLatest },
    { value: "oldest", label: copy.sortOldest },
    { value: "alphabetical", label: copy.sortAlphabetical },
  ];

  return (
    <div className="studentLibrary">
      <section aria-label={copy.sortLabel} className="studentLibrary__filters">
        <div aria-label={copy.materialsTitle} className="studentLibrary__tabs" role="group">
          {materialTypes.map((value) => (
            <button
              aria-pressed={type === value}
              key={value}
              onClick={() => setType(value)}
              type="button"
            >
              {copy.materialTypes[value]}
            </button>
          ))}
        </div>
        <div className="studentLibrary__sort">
          <button
            aria-controls={sortAnchor ? sortMenuId : undefined}
            aria-expanded={Boolean(sortAnchor)}
            aria-haspopup="menu"
            aria-label={`${copy.sortLabel}: ${sortOptions.find(({ value }) => value === sort)?.label}`}
            className="studentShell__localeTrigger studentLibrary__sortTrigger"
            onClick={(event) => setSortAnchor(event.currentTarget)}
            type="button"
          >
            <span>{sortOptions.find(({ value }) => value === sort)?.label}</span>
            <ExpandMoreRounded aria-hidden="true" />
          </button>
          <Menu
            anchorEl={sortAnchor}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            id={sortMenuId}
            onClose={() => setSortAnchor(null)}
            open={Boolean(sortAnchor)}
            slotProps={{
              paper: {
                className: "studentShell__localeMenu studentLibrary__sortMenu",
                style: { width: sortAnchor?.offsetWidth },
              },
            }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {sortOptions.map(({ value, label }) => (
              <MenuItem
                className="studentShell__localeMenuItem"
                data-active={sort === value}
                key={value}
                onClick={() => { setSort(value); setSortAnchor(null); }}
                selected={sort === value}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </section>

      <section aria-labelledby="student-library-pdf-title" className="studentLibrary__content">
        <h2 id="student-library-pdf-title">{copy.materialsTitle}</h2>
        {error || (!page && !preview) ? (
          <div className="studentLibrary__message" role="alert">
            <p>{copy.pdfError}</p>
            <button disabled={pending} onClick={() => void retry()} type="button">
              {copy.pdfRetry}
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="studentLibrary__message">
            <span className="studentLibrary__emptyIcon"><PictureAsPdfRounded aria-hidden="true" /></span>
            <p>{copy.pdfEmpty}</p>
          </div>
        ) : (
          <div className="studentLibrary__list">
            {books.map((book) => {
              const media = book.attachments.find(
                ({ mediaObject }) => mediaObject.mimeType === "application/pdf",
              )?.mediaObject;
              return (
                <article className="studentLibrary__item" key={book.id}>
                  <span className="studentLibrary__itemIcon"><PictureAsPdfRounded aria-hidden="true" /></span>
                  <div className="studentLibrary__itemText">
                    <h3>{book.title}</h3>
                    {book.description ? <p>{book.description}</p> : null}
                    <small>
                      {copy.materialTypes[book.category.name as MaterialType] ?? book.category.name}
                      {media?.sizeBytes ? ` · ${(media.sizeBytes / 1024 / 1024).toFixed(1)} MB` : ""}
                    </small>
                  </div>
                  <button className="studentLibrary__open" onClick={() => void openBook(book)} type="button">
                    {copy.pdfOpen} <OpenInNewRounded aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
