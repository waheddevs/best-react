"use client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState, useDeferredValue } from "react";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import {
  AdminRequestDirectoryDocument,
  AdminReviewRequestDocument,
  AdminRemoveRequestDocument,
  type AdminDirectoryInput,
  type AdminRequestDirectoryQuery,
  type IntakeStatus,
} from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { AdminRequestDetails } from "./AdminRequestDetails";
import { AdminContentMetrics } from "./AdminContentMetrics";
import { AdminRequestFilters } from "./AdminRequestFilters";
import { AdminRequestStatusMenu } from "./AdminRequestStatusMenu";
import { AdminContentTable } from "./AdminContentTable";
import { AdminContentPagination } from "./AdminContentPagination";
type Request = AdminRequestDirectoryQuery["adminRequestDirectory"]["nodes"][number];
const statuses: IntakeStatus[] = ["NEW", "IN_REVIEW", "RESOLVED", "REJECTED"];
export function AdminRequests({
  locale,
  kind,
  subject,
}: {
  locale: Locale;
  kind?: string;
  subject?: string;
}) {
  const t = getAdminContentText(locale),
    notifications = useNotifications();
  const confirm = useConfirmDialog();
  const [input, setInput] = useState<AdminDirectoryInput>({
      page: 1,
      pageSize: 15,
      category: ["COURSE", "EVENT", "EXAM"].includes(kind ?? "") ? kind : undefined,
      groupId: subject,
    }),
    deferred = useDeferredValue(input);
  const query = useQuery(AdminRequestDirectoryDocument, {
    variables: {
      input: deferred,
      language: locale === "uz" ? "UZ" : locale === "ru" ? "RU" : "EN",
    },
    context: { authenticated: true },
    fetchPolicy: "network-only",
  });
  const [review, { loading: busy }] = useMutation(AdminReviewRequestDocument, {
    context: { authenticated: true },
  });
  const [remove, { loading: removing }] = useMutation(AdminRemoveRequestDocument, {
    context: { authenticated: true },
  });
  const [detail, setDetail] = useState<Request | null>(null);
  const refreshRequests = async () => {
    try {
      const refreshed = await query.refetch();
      const directory = refreshed.data?.adminRequestDirectory;
      if (directory) {
        setInput((current) => ({ ...current, page: directory.page }));
        // Use the server's new version for further edits; filtered-out requests close.
        setDetail((current) =>
          current
            ? (directory.nodes.find(
                (item) => item.id === current.id && item.kind === current.kind,
              ) ?? null)
            : null,
        );
      } else setDetail(null);
    } catch {
      setDetail(null);
      notifications.error({ message: t("error") });
    }
  };
  const saveRequestNote = async (note: string) => {
    if (!detail || busy || removing) return false;
    try {
      const result = await review({
        variables: {
          input: {
            id: detail.id,
            kind: detail.kind,
            status: detail.status,
            note,
            expectedUpdatedAt: detail.updatedAt,
          },
        },
      });
      if (result.data?.adminReviewRequest !== detail.id) throw new Error("Review failed");
    } catch {
      return false;
    }
    notifications.success({ message: t("noteSaved") });
    await refreshRequests();
    return true;
  };
  const changeRequestStatus = async (request: Request, next: IntakeStatus) => {
    if (busy || removing || next === request.status) return;
    const accepted = await confirm({
      brand: "admin",
      tone: "default",
      title: t("changeRequestStatus"),
      message: t("requestStatusChange").replace("{to}", t(next)),
      confirmLabel: t("confirmStatusChange"),
      cancelLabel: t("cancel"),
    });
    if (!accepted) return;
    try {
      const result = await review({
        variables: {
          input: {
            id: request.id,
            kind: request.kind,
            status: next,
            // Preserve existing review notes; the API requires a nonempty note.
            note: request.reviewNote?.trim() || t("requestStatusSystemNote"),
            expectedUpdatedAt: request.updatedAt,
          },
        },
      });
      if (result.data?.adminReviewRequest !== request.id) throw new Error("Review failed");
    } catch {
      notifications.error({ title: t("changeRequestStatus"), message: t("conflict") });
      return;
    }
    notifications.success({ message: t("requestStatusSaved") });
    await refreshRequests();
  };
  const removeRequest = async (request: Request) => {
    if (removing || busy) return;
    if (
      !(await confirm({
        brand: "admin",
        tone: "danger",
        icon: "delete",
        title: t("removeRequest"),
        message: t("removeRequestMessage").replace("{name}", request.name),
        cancelLabel: t("cancel"),
        confirmLabel: t("removeRequest"),
      }))
    )
      return;
    try {
      const result = await remove({
        variables: {
          input: { id: request.id, kind: request.kind, expectedUpdatedAt: request.updatedAt },
        },
      });
      if (result.data?.adminRemoveRequest !== request.id) throw new Error("Removal failed");
    } catch {
      notifications.error({ title: t("removeRequest"), message: t("conflict") });
      return;
    }
    notifications.success({
      icon: "delete",
      title: t("removeRequest"),
      message: t("requestRemoved"),
    });
    try {
      const refreshed = await query.refetch();
      const currentPage = refreshed.data?.adminRequestDirectory.page;
      if (currentPage) setInput((current) => ({ ...current, page: currentPage }));
    } catch {
      notifications.error({ message: t("error") });
    }
  };
  const page = query.data?.adminRequestDirectory;
  const date = (s: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Tashkent",
    }).format(new Date(s));
  return (
    <article className="adminWorkspace adminRegistry adminContent" data-section="requests">
      <header className="adminWorkspace__header">
        <div>
          <h1>{t("requests")}</h1>
          <p>{t("requestsHelp")}</p>
        </div>
      </header>
      <AdminContentMetrics locale={locale} metrics={page?.metrics ?? []} />
      <AdminRequestFilters
        locale={locale}
        input={input}
        statuses={statuses}
        subjectName={input.groupId ? page?.nodes[0]?.subjectName : undefined}
        onChange={(v) =>
          setInput((i) => ({
            ...i,
            ...v,
            ...(Object.hasOwn(v, "category") ? { groupId: undefined } : {}),
            page: 1,
          }))
        }
      />
      {query.error ? (
        <p className="adminRegistry__error" role="alert">
          {t("error")} <button onClick={() => void query.refetch()}>{t("retry")}</button>
        </p>
      ) : null}
      <AdminContentTable
        locale={locale}
        loading={query.loading}
        columns={["name", "phone", "email", "type", "title", "date", "status", "actions"]}
        rows={(page?.nodes ?? []).map((r) => ({
          id: r.kind + r.id,
          cells: [
            <strong key="name">{r.name}</strong>,
            r.phone,
            r.email || "—",
            t(r.kind),
            r.subjectName,
            date(r.createdAt),
            <AdminRequestStatusMenu
              key="status"
              locale={locale}
              name={r.name}
              value={r.status}
              options={statuses}
              disabled={busy || removing || query.loading}
              onChange={(next) => void changeRequestStatus(r, next)}
            />,
            <div key="actions" className="adminRegistry__actions">
              <button
                type="button"
                className="adminRegistry__action"
                aria-label={t("details")}
                onClick={() => {
                  setDetail(r);
                }}
              >
                <InfoOutlined />
              </button>
              <button
                type="button"
                className="adminRegistry__action adminRegistry__action_delete"
                aria-label={`${t("removeRequest")}: ${r.name}`}
                title={t("removeRequest")}
                disabled={removing || busy}
                onClick={() => void removeRequest(r)}
              >
                <DeleteOutlineRounded aria-hidden="true" />
              </button>
            </div>,
          ],
        }))}
      />
      <AdminContentPagination
        section="requests"
        locale={locale}
        page={page?.page ?? 1}
        pageCount={page?.pageCount ?? 1}
        totalCount={page?.totalCount ?? 0}
        busy={query.loading}
        onChange={(page) => setInput((i) => ({ ...i, page }))}
      />
      {detail ? (
        <AdminRequestDetails
          key={detail.kind + detail.id}
          request={detail}
          locale={locale}
          busy={busy || removing || query.loading}
          statuses={statuses}
          onClose={() => setDetail(null)}
          onStatusChange={(next) => void changeRequestStatus(detail, next)}
          onSaveNote={saveRequestNote}
        />
      ) : null}
    </article>
  );
}
