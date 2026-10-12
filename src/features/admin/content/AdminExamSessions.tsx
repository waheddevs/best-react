"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useDeferredValue, useState } from "react";
import EditOutlined from "@mui/icons-material/EditOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import Link from "next/link";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import {
  AdminExamSessionDirectoryDocument,
  AdminSaveExamSessionDocument,
  type AdminDirectoryInput,
  type AdminExamSessionDirectoryQuery,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { AdminRegistrySelect } from "../operations/AdminRegistrySelect";
import { AdminContentMetrics } from "./AdminContentMetrics";
import { AdminCatalogFilters } from "../operations/AdminCatalogFilters";
import { AdminContentTable } from "./AdminContentTable";
import { AdminContentPagination } from "./AdminContentPagination";
type Session = AdminExamSessionDirectoryQuery["adminExamSessionDirectory"]["nodes"][number];
export function AdminExamSessions({ locale }: { locale: Locale }) {
  const t = getAdminContentText(locale),
    notifications = useNotifications(),
    confirm = useConfirmDialog();
  const [input, setInput] = useState<AdminDirectoryInput>({ page: 1, pageSize: 15 }),
    deferred = useDeferredValue(input);
  const query = useQuery(AdminExamSessionDirectoryDocument, {
    variables: {
      input: deferred,
      language: locale === "uz" ? "UZ" : locale === "ru" ? "RU" : "EN",
    },
    context: { authenticated: true },
    fetchPolicy: "network-only",
  });
  const [save, { loading: busy }] = useMutation(AdminSaveExamSessionDocument, {
    context: { authenticated: true },
  });
  const [editor, setEditor] = useState<{ row?: Session } | null>(null),
    [form, setForm] = useState({ offeringId: "", startsAt: "", capacity: "", active: "yes" }),
    [error, setError] = useState("");
  const open = (row?: Session) => {
    setError("");
    setForm({
      offeringId: row?.offeringId ?? "",
      startsAt: row
        ? new Date(new Date(row.startsAt).getTime() + 5 * 3600000).toISOString().slice(0, 16)
        : "",
      capacity: row?.capacity ? String(row.capacity) : "",
      active: row?.active === false ? "no" : "yes",
    });
    setEditor({ row });
  };
  const page = query.data?.adminExamSessionDirectory;
  return (
    <>
      <AdminContentMetrics metrics={page?.metrics ?? []} locale={locale} />
      <section className="adminRegistry__creation">
        <header>
          <span className="adminRegistry__creationIcon">
            <AddCircleOutlineRounded />
          </span>
          <div>
            <h2>{t("sessions")}</h2>
            <p>Asia/Tashkent · UTC+05:00</p>
          </div>
          <button
            disabled={query.loading || Boolean(query.error)}
            className={!editor ? "adminRegistry__primary" : undefined}
            onClick={() => (editor ? setEditor(null) : open())}
          >
            {editor ? <CloseRounded /> : <AddCircleOutlineRounded />}
            {t(editor ? "close" : "newSession")}
          </button>
        </header>
        {editor ? (
          <form
            className="adminRegistry__editor adminExamEditor"
            data-section="exams"
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              if (!form.offeringId) {
                setError(t("invalid"));
                return;
              }
              if (
                editor.row &&
                !(await confirm({
                  brand: "admin",
                  title: t("save"),
                  message: t("confirmPublish"),
                  confirmLabel: t("save"),
                  cancelLabel: t("cancel"),
                }))
              )
                return;
              try {
                await save({
                  variables: {
                    input: {
                      ...(editor.row ? { id: editor.row.id, revision: editor.row.revision } : {}),
                      offeringId: form.offeringId,
                      startsAt: new Date(form.startsAt + ":00+05:00").toISOString(),
                      capacity: form.capacity ? Number(form.capacity) : null,
                      active: form.active === "yes",
                    },
                  },
                });
                setEditor(null);
                notifications.success({ message: t("savedPublic") });
                await query.refetch();
              } catch {
                setError(t("conflict"));
              }
            }}
          >
            <fieldset disabled={busy}>
              <div className="adminRegistry__formGrid">
                <AdminRegistrySelect
                  externalLabel
                  label={t("exams")}
                  disabled={busy || Boolean(editor.row)}
                  value={form.offeringId}
                  options={[{ id: "", label: t("select") }, ...(page?.offerings ?? [])]}
                  onChange={(offeringId) => setForm((f) => ({ ...f, offeringId }))}
                />
                <label>
                  {t("startsAt")}
                  <input
                    required
                    type="datetime-local"
                    value={form.startsAt}
                    onChange={(e) => setForm((f) => ({ ...f, startsAt: e.target.value }))}
                  />
                </label>
                <label>
                  {t("capacity")}
                  <input
                    type="number"
                    min={1}
                    max={100000}
                    step={1}
                    value={form.capacity}
                    onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
                  />
                </label>
                <AdminRegistrySelect
                  externalLabel
                  label={t("active")}
                  disabled={busy}
                  value={form.active}
                  options={[
                    { id: "yes", label: t("yes") },
                    { id: "no", label: t("no") },
                  ]}
                  onChange={(active) => setForm((f) => ({ ...f, active }))}
                />
              </div>
            </fieldset>
            {error ? (
              <p role="alert" className="adminRegistry__error">
                {error}
              </p>
            ) : null}
            <div className="adminRegistry__formActions">
              <button type="button" disabled={busy} onClick={() => setEditor(null)}>
                {t("cancel")}
              </button>
              <button className="adminRegistry__primary" disabled={busy}>
                {t("save")}
              </button>
            </div>
          </form>
        ) : null}
      </section>
      <AdminCatalogFilters
        locale={locale}
        input={input}
        filters={[
          {
            key: "status",
            label: t("status"),
            options: ["ACTIVE", "INACTIVE"].map((id) => ({ id, label: t(id) })),
          },
          { key: "groupId", label: t("exams"), options: page?.offerings ?? [], wide: true },
        ]}
        dates
        onChange={(v) => setInput((i) => ({ ...i, ...v, page: 1 }))}
      />
      {query.error ? (
        <p role="alert" className="adminRegistry__error">
          {t("error")} <button onClick={() => void query.refetch()}>{t("retry")}</button>
        </p>
      ) : null}
      <AdminContentTable
        locale={locale}
        loading={query.loading}
        columns={["exams", "date", "time", "capacity", "registrations", "status", "actions"]}
        rows={(page?.nodes ?? []).map((r) => ({
          id: r.id,
          cells: [
            <strong key="title">{r.title}</strong>,
            new Intl.DateTimeFormat(locale, {
              dateStyle: "medium",
              timeZone: "Asia/Tashkent",
            }).format(new Date(r.startsAt)),
            new Intl.DateTimeFormat(locale, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "Asia/Tashkent",
            }).format(new Date(r.startsAt)),
            r.capacity ?? "—",
            <Link key="link" href={`/${locale}/admin/requests?kind=EXAM&subject=${r.offeringId}`}>
              {r.registrations}
            </Link>,
            <span
              key="status"
              className={`adminRegistry__status adminRegistry__status_${r.active ? "success" : "neutral"}`}
            >
              {t(r.active ? "ACTIVE" : "INACTIVE")}
            </span>,
            <button
              key="edit"
              className="adminRegistry__action"
              onClick={() => open(r)}
              aria-label={t("edit")}
            >
              <EditOutlined />
            </button>,
          ],
        }))}
      />
      <AdminContentPagination
        section="sessions"
        locale={locale}
        page={page?.page ?? 1}
        pageCount={page?.pageCount ?? 1}
        totalCount={page?.totalCount ?? 0}
        busy={query.loading}
        onChange={(page) => setInput((i) => ({ ...i, page }))}
      />
    </>
  );
}
