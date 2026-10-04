"use client";

import PictureAsPdfRounded from "@mui/icons-material/PictureAsPdfRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import {
  getStudentLibraryBookDownload,
  loadStudentLibraryBooks,
} from "@/features/student/library/StudentLibraryActions";
import type { StudentLibraryBooksQuery } from "@/gql/graphql";

type BookPage = StudentLibraryBooksQuery["studentLibraryItems"];

type StudentPdfBooksProps = {
  copy: StudentLibraryCopy;
  initialPage: BookPage | null;
  locale: Locale;
};

export function StudentPdfBooks({ copy, initialPage, locale }: StudentPdfBooksProps) {
  const [page, setPage] = useState(initialPage);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const books = (page?.edges ?? [])
    .map(({ node }) => node)
    .filter(
      (item) =>
        item.category.name === "Books" &&
        item.attachments.some(({ mediaObject }) => mediaObject.mimeType === "application/pdf"),
    );

  const openBook = async (book: (typeof books)[number]) => {
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

  const loadMore = async () => {
    if (!page?.pageInfo.endCursor || pending) return;
    setPending(true);
    const result = await loadStudentLibraryBooks(locale, page.pageInfo.endCursor);
    if (result.ok) {
      setPage((current) =>
        current
          ? { edges: [...current.edges, ...result.page.edges], pageInfo: result.page.pageInfo }
          : result.page,
      );
    } else {
      setError(true);
    }
    setPending(false);
  };

  const retry = async () => {
    if (pending) return;
    setPending(true);
    const result = await loadStudentLibraryBooks(locale);
    setPage(result.ok ? result.page : null);
    setError(!result.ok);
    setPending(false);
  };

  return (
    <section aria-labelledby="student-library-pdf-title" className="library__pdfSection">
      <h2 id="student-library-pdf-title">{copy.pdfBooks}</h2>
      {error || !page ? (
        <div className="library__pdfError" role="alert">
          <p>{copy.pdfError}</p>
          <button disabled={pending} onClick={() => void retry()} type="button">
            {copy.pdfRetry}
          </button>
        </div>
      ) : null}
      {page && books.length === 0 && !page.pageInfo.hasNextPage ? <p>{copy.pdfEmpty}</p> : null}
      {books.length > 0 ? (
        <div className="library__pdfGrid">
          {books.map((book) => (
            <article className="library__pdfCard" key={book.id}>
              <PictureAsPdfRounded aria-hidden="true" />
              <h3>{book.title}</h3>
              {book.description ? <p>{book.description}</p> : null}
              <button onClick={() => void openBook(book)} type="button">
                {copy.pdfOpen} <OpenInNewRounded aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      ) : null}
      {page?.pageInfo.hasNextPage ? (
        <button
          className="library__pdfMore"
          disabled={pending}
          onClick={() => void loadMore()}
          type="button"
        >
          {copy.pdfLoadMore}
        </button>
      ) : null}
    </section>
  );
}
