"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useMutation } from "@apollo/client/react";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import type { Locale } from "@/config/Locales";
import {
  AdminRemoveMessageDocument,
  AdminUpdateMessageStatusDocument,
  type IntakeStatus,
} from "@/gql/graphql";
import { getAdminMessagesText } from "@/dictionaries/admin/AdminMessages";
import type { AdminMessage, AdminMessageFilters as Filters } from "@/types/admin/AdminMessages";
import { filterAdminMessages } from "@/lib/admin/AdminMessageDirectory";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { AdminContentTable } from "../content/AdminContentTable";
import { AdminContentMetrics } from "../content/AdminContentMetrics";
import { AdminContentPagination } from "../content/AdminContentPagination";
import { AdminMessageFilters } from "../content/AdminMessageFilters";
import { AdminMessageStatusMenu } from "../content/AdminMessageStatusMenu";
import { AdminMessageDetails } from "../content/AdminMessageDetails";

const statuses: IntakeStatus[] = ["NEW", "IN_REVIEW", "RESOLVED", "REJECTED"];
const pageSize = 15;

export function AdminMessages({
  locale,
  initialMessages,
}: {
  locale: Locale;
  initialMessages: AdminMessage[];
}) {
  const t = getAdminMessagesText(locale);
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const [messages, setMessages] = useState(initialMessages);
  const [filters, setFilters] = useState<Filters>({ search: "", status: "", from: "", to: "" });
  const [page, setPage] = useState(1);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const deferred = useDeferredValue(filters);
  const [update, { loading }] = useMutation(AdminUpdateMessageStatusDocument, {
    context: { authenticated: true },
  });
  const [remove, { loading: removing }] = useMutation(AdminRemoveMessageDocument, {
    context: { authenticated: true },
  });
  const busy = loading || removing || confirming;
  const rows = useMemo(() => filterAdminMessages(messages, deferred), [messages, deferred]);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const detail = messages.find((message) => message.id === detailId);
  const metrics = statuses.map((key) => ({
    key,
    value: String(messages.filter((message) => message.status === key).length),
  }));
  const date = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Tashkent",
    }).format(new Date(value));

  const changeStatus = async (message: AdminMessage, status: IntakeStatus) => {
    if (busy || status === message.status) return;
    setConfirming(true);
    try {
      const accepted = await confirm({
        brand: "admin",
        tone: "default",
        title: t("changeRequestStatus"),
        message: t("requestStatusChange").replace("{to}", t(status)),
        confirmLabel: t("confirmStatusChange"),
        cancelLabel: t("cancel"),
      });
      if (!accepted) return;
      const result = await update({
        variables: {
          input: {
            intakeId: message.id,
            status,
            reviewNote: message.reviewNote?.trim() || t("statusSystemNote"),
          },
        },
      });
      const saved = result.data?.adminSetContactRequestStatus.intake;
      if (!saved || saved.id !== message.id || saved.status !== status)
        throw new Error("Message update failed");
      setMessages((current) => current.map((item) => (item.id === saved.id ? saved : item)));
      notifications.success({ message: t("statusSaved") });
    } catch {
      notifications.error({ title: t("changeRequestStatus"), message: t("conflict") });
    } finally {
      setConfirming(false);
    }
  };

  const deleteMessage = async (message: AdminMessage) => {
    if (busy) return;
    setConfirming(true);
    try {
      const accepted = await confirm({
        brand: "admin",
        tone: "danger",
        icon: "delete",
        title: t("deleteMessage"),
        message: t("deleteMessageConfirm").replace("{name}", message.name),
        confirmLabel: t("deleteMessage"),
        cancelLabel: t("cancel"),
      });
      if (!accepted) return;
      const result = await remove({ variables: { input: { messageId: message.id } } });
      if (result.data?.adminRemoveMessage !== message.id) throw new Error("Message removal failed");
      setMessages((current) => current.filter((item) => item.id !== message.id));
      setDetailId((current) => (current === message.id ? null : current));
      notifications.success({
        icon: "delete",
        title: t("deleteMessage"),
        message: t("messageDeleted"),
      });
    } catch {
      notifications.error({ title: t("deleteMessage"), message: t("conflict") });
    } finally {
      setConfirming(false);
    }
  };

  return (
    <article className="adminWorkspace adminRegistry adminContent adminMessages">
      <header className="adminWorkspace__header">
        <div>
          <h1>{t("messages")}</h1>
          <p>{t("messagesHelp")}</p>
        </div>
      </header>
      <AdminContentMetrics locale={locale} metrics={metrics} />
      <AdminMessageFilters
        locale={locale}
        input={filters}
        statuses={statuses}
        onChange={(value) => {
          setFilters((current) => ({
            ...current,
            ...(Object.hasOwn(value, "search") ? { search: value.search ?? "" } : {}),
            ...(Object.hasOwn(value, "status") ? { status: value.status ?? "" } : {}),
            ...(Object.hasOwn(value, "from") ? { from: value.from ?? "" } : {}),
            ...(Object.hasOwn(value, "to") ? { to: value.to ?? "" } : {}),
          }));
          setPage(1);
        }}
      />
      {filters.from && filters.to && filters.from > filters.to ? (
        <p className="adminRegistry__error" role="alert">
          {t("dateRangeError")}
        </p>
      ) : null}
      <AdminContentTable
        locale={locale}
        loading={filters !== deferred}
        columns={["name", "email", "subject", "date", "status", "actions"]}
        rows={rows.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((message) => ({
          id: message.id,
          cells: [
            <strong key="name" className="adminMessages__cell" title={message.name}>
              {message.name}
            </strong>,
            <span key="email" className="adminMessages__cell" title={message.email ?? undefined}>
              {message.email || "—"}
            </span>,
            <span
              key="subject"
              className="adminMessages__subject"
              title={message.subject ?? undefined}
            >
              {message.subject || "—"}
            </span>,
            date(message.createdAt),
            <AdminMessageStatusMenu
              key="status"
              locale={locale}
              name={message.name}
              value={message.status}
              options={statuses}
              disabled={busy}
              onChange={(status) => void changeStatus(message, status)}
            />,
            <div key="actions" className="adminRegistry__actions">
              <button
                type="button"
                className="adminRegistry__action"
                aria-label={`${t("details")}: ${message.name}`}
                title={t("details")}
                disabled={busy}
                onClick={() => setDetailId(message.id)}
              >
                <InfoOutlined aria-hidden="true" />
              </button>
              <button
                type="button"
                className="adminRegistry__action adminRegistry__action_delete"
                aria-label={`${t("deleteMessage")}: ${message.name}`}
                title={t("deleteMessage")}
                disabled={busy}
                onClick={() => void deleteMessage(message)}
              >
                <DeleteOutlineRounded aria-hidden="true" />
              </button>
            </div>,
          ],
        }))}
      />
      <AdminContentPagination
        section="messages"
        locale={locale}
        page={currentPage}
        pageCount={pageCount}
        totalCount={rows.length}
        onChange={setPage}
        busy={busy || filters !== deferred}
      />
      {detail ? (
        <AdminMessageDetails
          message={detail}
          locale={locale}
          busy={busy}
          statuses={statuses}
          onClose={() => setDetailId(null)}
          onStatusChange={(status) => void changeStatus(detail, status)}
        />
      ) : null}
    </article>
  );
}
