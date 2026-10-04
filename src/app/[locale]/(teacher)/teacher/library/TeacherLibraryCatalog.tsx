"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import PictureAsPdfRounded from "@mui/icons-material/PictureAsPdfRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { useMemo, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getTeacherLibraryCopy } from "@/dictionaries/teacher/TeacherLibrary";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import {
  archiveTeacherLibraryBook,
  createTeacherLibraryBook,
  loadTeacherLibraryBooks,
} from "@/features/teacher/library/TeacherLibraryActions";
import {
  confirmTeacherLessonUpload,
  createTeacherLessonUploadIntent,
  getTeacherLessonFileDownload,
} from "@/features/teacher/groups/TeacherLessonPlanActions";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { TeacherLibraryItemsQuery } from "@/gql/graphql";

type BookPage = TeacherLibraryItemsQuery["teacherLibraryItems"];
type Book = BookPage["edges"][number]["node"];

type TeacherLibraryCatalogProps = {
  initialPage: BookPage | null;
  locale: Locale;
  preview: boolean;
};

const maxPdfBytes = 50 * 1024 * 1024;

function bookText(book: Book, locale: Locale) {
  return (
    book.translations.find(({ language }) => language === locale.toUpperCase()) ??
    book.translations.find(({ language }) => language === book.primaryLanguage) ??
    book.translations[0]
  );
}

export function TeacherLibraryCatalog({
  initialPage,
  locale,
  preview,
}: TeacherLibraryCatalogProps) {
  const copy = getTeacherLibraryCopy(locale);
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const fileInput = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState<BookPage | null>(initialPage);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const books = useMemo(
    () =>
      (page?.edges ?? [])
        .map(({ node }) => node)
        .filter((book) =>
          book.attachments.some(({ mediaObject }) => mediaObject.mimeType === "application/pdf"),
        )
        .filter((book) => {
          const term = search.trim().toLocaleLowerCase(locale);
          return !term || bookText(book, locale)?.title.toLocaleLowerCase(locale).includes(term);
        }),
    [locale, page, search],
  );

  const resetForm = () => {
    setFormOpen(false);
    setTitle("");
    setDescription("");
    setFile(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const refreshBooks = async () => {
    setLoading(true);
    const result = await loadTeacherLibraryBooks();
    setPage(result.ok ? result.page : null);
    setLoading(false);
  };

  const handleFile = (chosen?: File) => {
    if (!chosen) return;
    if (
      !chosen.name.toLowerCase().endsWith(".pdf") ||
      chosen.size < 1 ||
      chosen.size > maxPdfBytes
    ) {
      notifications.error({ title: copy.file, message: copy.fileError });
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    setFile(chosen);
    if (!title) setTitle(chosen.name.replace(/\.pdf$/i, ""));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || pending || preview || !title.trim()) return;
    setPending(true);
    try {
      const intent = await createTeacherLessonUploadIntent({
        mimeType: "application/pdf",
        originalName: file.name,
        sizeBytes: file.size,
      });
      if (!intent.ok) throw new Error(intent.code);
      const upload = await fetch(intent.uploadIntent.url, {
        body: file,
        headers: new Headers(
          intent.uploadIntent.requiredHeaders.map(({ name, value }): [string, string] => [
            name,
            value,
          ]),
        ),
        method: intent.uploadIntent.method,
      });
      if (!upload.ok) throw new Error("UPLOAD_FAILED");
      const confirmed = await confirmTeacherLessonUpload(intent.uploadIntent.mediaObjectId);
      if (!confirmed.ok) throw new Error(confirmed.code);
      if (
        confirmed.mediaObject.status !== "READY" ||
        confirmed.mediaObject.malwareStatus !== "CLEAN"
      ) {
        throw new Error("PDF_NOT_READY");
      }
      const saved = await createTeacherLibraryBook({
        description,
        locale,
        mediaObjectId: confirmed.mediaObject.id,
        title,
      });
      if (!saved.ok) throw new Error(saved.code);
      resetForm();
      notifications.success({ title: copy.books, message: copy.saved });
      await refreshBooks();
    } catch {
      notifications.error({ title: copy.books, message: copy.saveError });
    } finally {
      setPending(false);
    }
  };

  const openBook = async (book: Book, download: boolean) => {
    const media = book.attachments.find(
      ({ mediaObject }) => mediaObject.mimeType === "application/pdf",
    )?.mediaObject;
    if (!media) return;
    const tab = download ? null : window.open("", "_blank");
    setBusyId(book.id);
    const result = await getTeacherLessonFileDownload(media.id);
    setBusyId(null);
    if (!result.ok) {
      tab?.close();
      notifications.error({ title: copy.books, message: copy.openError });
      return;
    }
    if (!download) {
      if (tab) {
        tab.opener = null;
        tab.location.assign(result.downloadIntent.url);
      } else {
        window.location.assign(result.downloadIntent.url);
      }
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = result.downloadIntent.url;
    anchor.download = media.originalName;
    anchor.rel = "noopener";
    anchor.click();
  };

  const archiveBook = async (book: Book) => {
    const accepted = await confirm({
      cancelLabel: copy.cancel,
      confirmLabel: copy.archive,
      icon: "delete",
      message: copy.archiveMessage,
      title: copy.archiveTitle,
      tone: "danger",
    });
    if (!accepted) return;
    setBusyId(book.id);
    const result = await archiveTeacherLibraryBook(book.id);
    setBusyId(null);
    if (!result.ok) {
      notifications.error({ title: copy.books, message: copy.archiveError });
      return;
    }
    setPage((current) =>
      current
        ? {
            ...current,
            edges: current.edges.filter(({ node }) => node.id !== book.id),
          }
        : current,
    );
    notifications.success({ title: copy.books, message: copy.archived });
  };

  const loadMore = async () => {
    if (!page?.pageInfo.endCursor || loading) return;
    setLoading(true);
    const result = await loadTeacherLibraryBooks(page.pageInfo.endCursor);
    if (result.ok) {
      setPage((current) =>
        current
          ? {
              edges: [...current.edges, ...result.page.edges],
              pageInfo: result.page.pageInfo,
            }
          : result.page,
      );
    } else {
      notifications.error({ title: copy.books, message: copy.unavailable });
    }
    setLoading(false);
  };

  return (
    <main className="teacherLibrary">
      <TeacherPageHeader eyebrow={copy.eyebrow} title={copy.title} />

      <div className="teacherLibrary__intro">
        <p>{copy.description}</p>
        <Button
          className="teacherLibrary__add"
          disabled={preview}
          hoverEffect="jump"
          onClick={() => setFormOpen(true)}
          shape="soft"
          size="small"
          startIcon={<AddRounded />}
          variant="primary"
        >
          {copy.add}
        </Button>
      </div>

      {preview ? <p className="teacherLibrary__notice">{copy.previewNotice}</p> : null}

      {formOpen ? (
        <section aria-labelledby="teacher-library-upload-title" className="teacherLibrary__upload">
          <div className="teacherLibrary__uploadHeader">
            <h3 id="teacher-library-upload-title">{copy.uploadTitle}</h3>
            <button aria-label={copy.cancel} disabled={pending} onClick={resetForm} type="button">
              <CloseRounded />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <span>{copy.name}</span>
              <input
                autoFocus
                maxLength={240}
                onChange={(event) => setTitle(event.target.value)}
                required
                value={title}
              />
            </label>
            <label>
              <span>{copy.details}</span>
              <textarea
                maxLength={2000}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                value={description}
              />
            </label>
            <label className="teacherLibrary__fileField">
              <span>{copy.file}</span>
              <span className="teacherLibrary__filePicker">
                <PictureAsPdfRounded aria-hidden="true" /> {file?.name ?? copy.chooseFile}
              </span>
              <small>{copy.fileHelp}</small>
              <input
                accept=".pdf,application/pdf"
                onChange={(event) => handleFile(event.target.files?.[0])}
                ref={fileInput}
                required
                type="file"
              />
            </label>
            <div className="teacherLibrary__formActions">
              <button disabled={pending} onClick={resetForm} type="button">
                {copy.cancel}
              </button>
              <button disabled={pending || !file} type="submit">
                {pending ? copy.saving : copy.save}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section aria-label={copy.books} className="teacherLibrary__collection">
        <div className="teacherLibrary__toolbar">
          <h2>{copy.books}</h2>
          <label className="teacherLibrary__search">
            <SearchRounded aria-hidden="true" />
            <input
              aria-label={copy.search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.search}
              type="search"
              value={search}
            />
          </label>
        </div>

        {!page ? (
          <div className="teacherLibrary__state">
            <p>{copy.unavailable}</p>
            <button disabled={loading} onClick={() => void refreshBooks()} type="button">
              {copy.retry}
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="teacherLibrary__state">
            <MenuBookRounded aria-hidden="true" />
            <h3>{search ? copy.noMatch : copy.empty}</h3>
            {!search ? <p>{copy.emptyDescription}</p> : null}
          </div>
        ) : (
          <div className="teacherLibrary__grid">
            {books.map((book) => {
              const text = bookText(book, locale);
              const media = book.attachments.find(
                ({ mediaObject }) => mediaObject.mimeType === "application/pdf",
              )?.mediaObject;
              return (
                <article className="teacherLibrary__book" key={book.id}>
                  <div className="teacherLibrary__cover">
                    <PictureAsPdfRounded aria-hidden="true" />
                    <span>PDF</span>
                  </div>
                  <div className="teacherLibrary__bookBody">
                    <span className="teacherLibrary__bookMeta">{copy.allGroups}</span>
                    <h3>{text?.title ?? media?.originalName}</h3>
                    {text?.description ? <p>{text.description}</p> : null}
                    <small>
                      {media?.sizeBytes
                        ? `${(media.sizeBytes / 1024 / 1024).toFixed(1)} MB`
                        : "PDF"}
                    </small>
                  </div>
                  <div className="teacherLibrary__bookActions">
                    <button
                      disabled={busyId === book.id}
                      onClick={() => void openBook(book, false)}
                      type="button"
                    >
                      <OpenInNewRounded aria-hidden="true" /> {copy.open}
                    </button>
                    <button
                      aria-label={copy.download}
                      disabled={busyId === book.id}
                      onClick={() => void openBook(book, true)}
                      title={copy.download}
                      type="button"
                    >
                      <DownloadRounded aria-hidden="true" />
                    </button>
                    <button
                      aria-label={copy.archive}
                      disabled={busyId === book.id}
                      onClick={() => void archiveBook(book)}
                      title={copy.archive}
                      type="button"
                    >
                      <DeleteOutlineRounded aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        {page?.pageInfo.hasNextPage ? (
          <button
            className="teacherLibrary__more"
            disabled={loading}
            onClick={() => void loadMore()}
            type="button"
          >
            {copy.loadMore}
          </button>
        ) : null}
      </section>
    </main>
  );
}
