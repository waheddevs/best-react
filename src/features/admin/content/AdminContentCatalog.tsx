"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState, useDeferredValue } from "react";
import Link from "next/link";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import PublishOutlined from "@mui/icons-material/PublishOutlined";
import ArchiveOutlined from "@mui/icons-material/ArchiveOutlined";
import Dialog from "@mui/material/Dialog";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import {
  AdminContentCatalogDocument,
  AdminRemoveCourseDocument,
  AdminRemoveExamDocument,
  AdminRemoveEventDocument,
  AdminContentCourseStatusDocument,
  AdminContentEventStatusDocument,
  type AdminDirectoryInput,
} from "@/gql/graphql";
import type { AdminContentEntry, AdminContentSection } from "@/types/admin/AdminContent";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { AdminCourseDetails } from "./AdminCourseDetails";
import { AdminEventEditor } from "./AdminEventEditor";
import { AdminCourseEditor } from "./AdminCourseEditor";
import { AdminExamEditor } from "./AdminExamEditor";
import { AdminExamDetails } from "./AdminExamDetails";
import { AdminEventDetails } from "./AdminEventDetails";
import { getAdminCourseEditorText } from "@/dictionaries/admin/AdminCourseEditor";
import { AdminContentMetrics } from "./AdminContentMetrics";
import { AdminCatalogFilters } from "../operations/AdminCatalogFilters";
import { AdminContentTable } from "./AdminContentTable";
import { AdminContentPagination } from "./AdminContentPagination";
export function AdminContentCatalog({
  section,
  locale,
}: {
  section: AdminContentSection;
  locale: Locale;
}) {
  const ContentEditor =
    section === "courses"
      ? AdminCourseEditor
      : section === "exams"
        ? AdminExamEditor
        : AdminEventEditor;
  const t = getAdminContentText(locale),
    confirm = useConfirmDialog(),
    notifications = useNotifications();
  const [input, setInput] = useState<AdminDirectoryInput>({ page: 1, pageSize: 15 }),
    deferred = useDeferredValue(input);
  const [editor, setEditor] = useState<{ row?: AdminContentEntry } | null>(null),
    [busy, setBusy] = useState(false),
    [detail, setDetail] = useState<AdminContentEntry | null>(null);
  const query = useQuery(AdminContentCatalogDocument, {
    variables: {
      input: deferred,
      courses: section === "courses",
      events: section === "events",
      exams: section === "exams",
    },
    context: { authenticated: true },
    fetchPolicy: "network-only",
  });
  const [courseStatus] = useMutation(AdminContentCourseStatusDocument, {
      context: { authenticated: true },
    }),
    [eventStatus] = useMutation(AdminContentEventStatusDocument, {
      context: { authenticated: true },
    });
  const [removeCourse] = useMutation(AdminRemoveCourseDocument, {
    context: { authenticated: true },
  });
  const [removeExam] = useMutation(AdminRemoveExamDocument, {
    context: { authenticated: true },
  });
  const [removeEvent] = useMutation(AdminRemoveEventDocument, { context: { authenticated: true } });
  const removalPrefix = section === "events" ? "event" : section === "exams" ? "exam" : "course";
  const remove = async (id: string, updatedAt: string, name: string) => {
    if (busy) return;
    setBusy(true);
    try {
      if (
        !(await confirm({
          brand: "admin",
          title: t(`${removalPrefix}Delete`),
          message: t(`${removalPrefix}DeleteMessage`).replace("{name}", () => name),
          confirmLabel: t("deleteCourse"),
          cancelLabel: t("cancel"),
          tone: "danger",
          icon: "delete",
        }))
      )
        return;
      const removedId =
        section === "events"
          ? (
              await removeEvent({
                variables: { input: { eventId: id, expectedUpdatedAt: updatedAt } },
              })
            ).data?.adminRemoveEvent
          : section === "exams"
            ? (await removeExam({ variables: { input: { offeringId: id, revision: updatedAt } } }))
                .data?.adminRemoveExam
            : (
                await removeCourse({
                  variables: { input: { courseId: id, expectedUpdatedAt: updatedAt } },
                })
              ).data?.adminRemoveCourse;
      if (removedId !== id) throw new Error("Content removal failed");
      if (detail?.id === id) setDetail(null);
      if (editor?.row?.id === id) setEditor(null);
      const refreshed = await query.refetch();
      const directory =
        section === "events"
          ? refreshed.data?.adminEventCatalog
          : section === "exams"
            ? refreshed.data?.adminExamCatalog
            : refreshed.data?.adminCourseCatalog;
      if (directory)
        setInput((current) => ({
          ...current,
          page: Math.min(directory.page, directory.pageCount),
        }));
      notifications.success({
        title: t(`${removalPrefix}Delete`),
        message: t(`${removalPrefix}Deleted`),
      });
    } catch (error) {
      notifications.error({
        title: t(`${removalPrefix}Delete`),
        message: t(error instanceof Error && /changed/i.test(error.message) ? "conflict" : "error"),
      });
    } finally {
      setBusy(false);
    }
  };
  const page =
    section === "courses"
      ? query.data?.adminCourseCatalog
      : section === "events"
        ? query.data?.adminEventCatalog
        : query.data?.adminExamCatalog;
  const reload = () => query.refetch();
  const date = (v: string) =>
    new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "Asia/Tashkent" }).format(
      new Date(v),
    );
  const time = (v: string) =>
    new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Tashkent",
    }).format(new Date(v));
  const setStatus = async (id: string, status: "PUBLISHED" | "ARCHIVED", name: string) => {
    if (busy) return;
    setBusy(true);
    try {
      const archiving = status === "ARCHIVED";
      if (
        !(await confirm({
          brand: "admin",
          title: t(archiving ? "archive" : "publish"),
          message: archiving
            ? t(section === "courses" ? "archiveCourseMessage" : "archiveEventMessage").replace(
                "{name}",
                () => name,
              )
            : t("confirmPublish"),
          confirmLabel: t(archiving ? "archive" : "save"),
          cancelLabel: t("cancel"),
          tone: archiving ? "warning" : "default",
        }))
      )
        return;
      const reason = archiving ? t("archiveSystemNote") : undefined;
      if (section === "courses")
        await courseStatus({ variables: { input: { courseId: id, status, reason } } });
      else await eventStatus({ variables: { input: { eventId: id, status, reason } } });
      notifications.success({ message: t("savedPublic") });
      await reload();
    } catch {
      notifications.error({ message: t("error") });
    } finally {
      setBusy(false);
    }
  };
  const columns =
    section === "courses"
      ? ["courses", "category", "status", "registrations", "updated", "actions"]
      : section === "events"
        ? ["events", "date", "time", "location", "registrations", "status", "actions"]
        : ["exams", "formatLabel", "duration", "registrations", "status", "actions"];
  return (
    <article className="adminWorkspace adminRegistry adminContent" data-section={section}>
      <header className="adminWorkspace__header">
        <div>
          <h1>{t(section)}</h1>
          <p>{t("contentHelp")}</p>
        </div>
      </header>
      <AdminContentMetrics
        metrics={
          section === "courses" || section === "exams"
            ? [
                { key: "all", value: page ? String(page.totalCount) : "—" },
                ...(page?.metrics ?? []),
              ]
            : (page?.metrics ?? [])
        }
        locale={locale}
      />
      <section className="adminRegistry__creation">
        <header>
          <span className="adminRegistry__creationIcon">
            <AddCircleOutlineRounded />
          </span>
          <div>
            <h2>
              {!editor?.row
                ? t(
                    section === "courses"
                      ? "newCourse"
                      : section === "events"
                        ? "newEvent"
                        : "newExam",
                  )
                : `${t(editor?.row ? "edit" : "create")} · ${t(section)}`}
            </h2>
            <p>
              {section === "courses"
                ? getAdminCourseEditorText(locale)("courseHelp")
                : t(section === "exams" ? "examHelp" : "eventHelp")}
            </p>
          </div>
          <button
            type="button"
            className={!editor ? "adminRegistry__primary" : undefined}
            disabled={query.loading || Boolean(query.error)}
            onClick={() => setEditor(editor ? null : {})}
          >
            {editor ? <CloseRounded /> : <AddCircleOutlineRounded />}
            {t(editor ? "close" : "create")}
          </button>
        </header>
        {editor ? (
          <ContentEditor
            key={editor.row?.id ?? "new"}
            row={editor.row}
            locale={locale}
            onSaved={reload}
            onClose={() => setEditor(null)}
          />
        ) : null}
      </section>
      <AdminCatalogFilters
        dates={section === "events"}
        locale={locale}
        input={input}
        onChange={(v) => setInput((i) => ({ ...i, ...v, page: 1 }))}
        filters={[
          {
            key: "status",
            label: t("status"),
            options: ["DRAFT", "PUBLISHED", "ARCHIVED"].map((id) => ({ id, label: t(id) })),
          },
          ...(section === "courses"
            ? [
                {
                  key: "category",
                  label: t("category"),
                  options: ["ENGLISH", "EXAM", "LANGUAGE"].map((id) => ({
                    id,
                    label: t(id),
                  })),
                } as const,
              ]
            : []),
        ]}
      />
      {query.error ? (
        <p className="adminRegistry__error" role="alert">
          {t("error")} <button onClick={() => void reload()}>{t("retry")}</button>
        </p>
      ) : null}
      <AdminContentTable
        columns={columns}
        loading={query.loading}
        locale={locale}
        rows={(page?.nodes ?? []).map((row) => {
          const v =
            "versions" in row
              ? (row.versions.find((x) => x.language === locale.toUpperCase()) ?? row.versions[0])
              : (row.translations.find((x) => x.language === locale.toUpperCase()) ??
                row.translations[0]);
          const status = "versions" in row ? row.versions[0]?.status : row.status;
          const slug = "versions" in row ? row.versions[0]?.slug : "";
          const edit = () => {
            setEditor({ row });
            window.scrollTo({ top: 0, behavior: "smooth" });
          };
          const actions = (
            <div className="adminRegistry__actions">
              <button
                className="adminRegistry__action"
                onClick={() => setDetail(row)}
                aria-label={t("details")}
                title={t("details")}
              >
                <InfoOutlined />
              </button>
              <button
                className="adminRegistry__action"
                onClick={edit}
                aria-label={t("edit")}
                title={t("edit")}
              >
                <EditOutlined />
              </button>
              {section !== "exams" ? (
                <>
                  {status !== "PUBLISHED" ? (
                    <button
                      disabled={busy}
                      className="adminRegistry__action"
                      onClick={() => void setStatus(row.id, "PUBLISHED", v?.title ?? slug ?? "")}
                      aria-label={t("publish")}
                      title={t("publish")}
                    >
                      <PublishOutlined />
                    </button>
                  ) : null}
                  {status !== "ARCHIVED" ? (
                    <button
                      disabled={busy}
                      className="adminRegistry__action"
                      onClick={() => void setStatus(row.id, "ARCHIVED", v?.title ?? slug ?? "")}
                      aria-label={t("archive")}
                      title={t("archive")}
                    >
                      <ArchiveOutlined />
                    </button>
                  ) : null}
                </>
              ) : null}
              <button
                type="button"
                className="adminRegistry__action adminRegistry__action_delete"
                disabled={busy || query.loading}
                aria-label={`${t("deleteCourse")}: ${v?.title ?? slug}`}
                title={t("deleteCourse")}
                onClick={() =>
                  void remove(
                    row.id,
                    "revision" in row ? row.revision : row.updatedAt,
                    v?.title ?? slug,
                  )
                }
              >
                <DeleteOutlineRounded aria-hidden="true" />
              </button>
            </div>
          );
          const badge = (
            <span
              className={`adminRegistry__status adminRegistry__status_${status === "PUBLISHED" ? "success" : "neutral"}`}
            >
              {t(status ?? "DRAFT")}
            </span>
          );
          const title = <strong>{v?.title ?? slug}</strong>;
          const count = (
            <Link
              href={`/${locale}/admin/requests?kind=${section === "courses" ? "COURSE" : section === "events" ? "EVENT" : "EXAM"}&subject=${row.id}`}
            >
              {row.registrations}
            </Link>
          );
          return {
            id: row.id,
            cells:
              section === "courses"
                ? [
                    title,
                    v && "category" in v ? t(v.category) : "",
                    badge,
                    count,
                    "updatedAt" in row ? date(row.updatedAt) : "",
                    actions,
                  ]
                : section === "events"
                  ? [
                      title,
                      v && "startsAt" in v ? date(v.startsAt) : "",
                      v && "startsAt" in v ? time(v.startsAt) : "",
                      v && "location" in v ? v.location : "",
                      count,
                      badge,
                      actions,
                    ]
                  : [
                      title,
                      v?.formatLabel,
                      v && "duration" in v ? v.duration : "",
                      count,
                      badge,
                      actions,
                    ],
          };
        })}
      />
      <AdminContentPagination
        section={section}
        locale={locale}
        page={page?.page ?? 1}
        pageCount={page?.pageCount ?? 1}
        totalCount={page?.totalCount ?? 0}
        busy={query.loading}
        onChange={(page) => setInput((i) => ({ ...i, page }))}
      />
      <Dialog
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        aria-labelledby="admin-content-detail"
        slotProps={{
          paper: {
            className:
              section === "exams"
                ? "adminRegistry__dialog adminExamDetails"
                : "adminRegistry__dialog adminContentDetails",
          },
          backdrop: { className: "publicShared__notificationDialogBackdrop" },
        }}
      >
        {detail
          ? (() => {
              if (!("versions" in detail))
                return (
                  <AdminExamDetails exam={detail} locale={locale} onClose={() => setDetail(null)} />
                );
              const v =
                detail.versions.find((x) => x.language === locale.toUpperCase()) ??
                detail.versions[0];
              if (v && "timelineStatus" in v)
                return (
                  <AdminEventDetails
                    event={v}
                    registrations={detail.registrations}
                    locale={locale}
                    onClose={() => setDetail(null)}
                  />
                );
              return v ? (
                <AdminCourseDetails
                  course={v}
                  registrations={detail.registrations}
                  locale={locale}
                  onClose={() => setDetail(null)}
                />
              ) : null;
            })()
          : null}
      </Dialog>
    </article>
  );
}
