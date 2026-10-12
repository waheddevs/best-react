"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import ArchiveOutlined from "@mui/icons-material/ArchiveOutlined";
import CheckRounded from "@mui/icons-material/CheckRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import RestoreRounded from "@mui/icons-material/RestoreRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import { useDeferredValue, useState, type ReactNode } from "react";
import type { Locale } from "@/config/Locales";
import { AdminContentPagination } from "../content/AdminContentPagination";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import {
  AdminOperationsDocument,
  AdminSetGroupStatusDocument,
  AdminSetLessonStatusDocument,
  AdminFinalizeSalaryDocument,
  type AdminDirectoryInput,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { adminMoney, registryColumns, registryRows } from "@/lib/admin/AdminRegistryPresentation";
import type { AdminRegistryRow, AdminRegistrySection } from "@/types/admin/AdminRegistry";
import { AdminRegistryEditor } from "./AdminRegistryEditor";
import { AdminRegistrySelect } from "./AdminRegistrySelect";
import { AdminDateFilter } from "./AdminDateFilter";
import { AdminCatalogFilters } from "./AdminCatalogFilters";

export function AdminRegistry({
  locale,
  section,
}: {
  locale: Locale;
  section: AdminRegistrySection;
}) {
  const t = getAdminRegistryText(locale);
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const initialInput = (): AdminDirectoryInput => {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent" }).format(
      new Date(),
    );
    const lastDay = new Date(new Date(today + "T00:00:00Z").getTime() + 6 * 86400000)
      .toISOString()
      .slice(0, 10);
    return {
      page: 1,
      pageSize: 15,
      descending: false,
      ...(section === "schedule" ? { from: today, to: lastDay } : {}),
    };
  };
  const [input, setInput] = useState<AdminDirectoryInput>(initialInput);
  const deferred = useDeferredValue(input);
  const [editor, setEditor] = useState<{ row: AdminRegistryRow | null } | null>(null);
  const [detail, setDetail] = useState<AdminRegistryRow | null>(null);
  const [pending, setPending] = useState<{ row: AdminRegistryRow; status: string } | null>(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const query = useQuery(AdminOperationsDocument, {
    variables: {
      input: deferred,
      groups: section === "groups",
      schedule: section === "schedule",
      payments: section === "payments",
      salary: section === "salary",
    },
    context: { authenticated: true },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [setGroupStatus] = useMutation(AdminSetGroupStatusDocument, {
    context: { authenticated: true },
  });
  const [setLessonStatus] = useMutation(AdminSetLessonStatusDocument, {
    context: { authenticated: true },
  });
  const [finalize] = useMutation(AdminFinalizeSalaryDocument, { context: { authenticated: true } });
  const data = query.data;
  const page =
    section === "groups"
      ? data?.adminGroupDirectory
      : section === "schedule"
        ? data?.adminLessonDirectory
        : section === "payments"
          ? data?.adminPaymentDirectory
          : data?.adminSalaryDirectory;
  const rows = registryRows(data, section, locale);
  const columns = registryColumns[section];
  const options = data?.adminDirectoryOptions ?? { teachers: [], groups: [], students: [] };
  const update = (next: Partial<AdminDirectoryInput>) =>
    setInput((i) => ({ ...i, ...next, page: 1 }));
  const reload = async () => {
    await query.refetch();
  };
  const perform = async (row: AdminRegistryRow, status: string, actionReason = "") => {
    if (busy) return;
    const groupConfirmation =
      section === "groups"
        ? [
            { status: "DELETED", title: "groupDelete", confirm: "remove" },
            { status: "ARCHIVED", title: "groupArchive", confirm: "archive" },
            { status: "ACTIVE", title: "groupRestore", confirm: "restore" },
          ].find((action) => action.status === status)
        : undefined;
    if (
      !(await confirm({
        brand: "admin",
        title: t(groupConfirmation?.title ?? "confirm"),
        message: groupConfirmation
          ? t(`${groupConfirmation.title}Message`).replace("{name}", () => row.name)
          : `${row.name}. ${t(section === "salary" ? "confirmMessage" : "confirmChange")}`,
        confirmLabel: t(
          groupConfirmation?.confirm ?? (status === "FINALIZED" ? "finalize" : "save"),
        ),
        cancelLabel: t("cancel"),
        tone: status === "DELETED" ? "danger" : "default",
        icon: status === "DELETED" ? "delete" : "tone",
      }))
    )
      return;
    setBusy(true);
    try {
      if (section === "groups") await setGroupStatus({ variables: { groupId: row.id, status } });
      else if (section === "schedule")
        await setLessonStatus({ variables: { lessonId: row.id, status, reason: actionReason } });
      else await finalize({ variables: { id: row.id, version: row.version ?? 0 } });
      notifications.success({ message: t("saved") });
      setPending(null);
      setReason("");
      await reload();
    } catch (error) {
      notifications.error({
        message:
          error instanceof Error && /changed|booked|active|already/i.test(error.message)
            ? t("conflict")
            : t("error"),
      });
    } finally {
      setBusy(false);
    }
  };
  const action = (row: AdminRegistryRow, status: string) => {
    if (section === "schedule") {
      setReason("");
      setPending({ row, status });
    } else void perform(row, status);
  };
  const filter = (
    key: "status" | "teacherId" | "groupId" | "category" | "studentId",
    label: string,
    items: Array<{ id: string; label: string }>,
  ) => (
    <AdminRegistrySelect
      label={t(label)}
      options={[{ id: "", label: t("all") }, ...items]}
      value={String(input[key] ?? "")}
      onChange={(v) => update({ [key]: v || undefined })}
      wide={key === "teacherId"}
    />
  );
  const statuses =
    section === "groups"
      ? ["ACTIVE", "ARCHIVED"]
      : section === "schedule"
        ? ["SCHEDULED", "DRAFT", "COMPLETED", "CANCELLED"]
        : section === "payments"
          ? ["PAID", "UNPAID"]
          : ["DRAFT", "FINALIZED"];
  const title =
    section === "groups" ? "newGroup" : section === "schedule" ? "newLesson" : "newSalary";
  const moneyKeys = new Set(["billed", "paid", "outstanding", "payable", "bonus", "deduction"]);
  const iconButton = (label: string, click: () => void, icon: ReactNode, danger = false) => (
    <button
      type="button"
      className={
        danger ? "adminRegistry__action adminRegistry__action_delete" : "adminRegistry__action"
      }
      aria-label={t(label)}
      title={t(label)}
      onClick={click}
      disabled={busy}
    >
      {icon}
    </button>
  );
  return (
    <article className="adminWorkspace adminRegistry">
      <header className="adminWorkspace__header">
        <div>
          <h1>{t(section)}</h1>
          <p>{t(section + "Description")}</p>
        </div>
      </header>
      <section className="adminRegistryMetrics" aria-label={t(section)}>
        {page?.metrics.map((metric, i) => (
          <div
            className="adminRegistryMetrics__card"
            data-tone={["all", "active", "paused", "debtor", "all"][i]}
            key={metric.key}
          >
            <span className="adminRegistryMetrics__icon">
              <GroupsOutlined aria-hidden="true" />
            </span>
            <div className="adminRegistryMetrics__content">
              <span>{t(metric.key)}</span>
              <strong>
                {moneyKeys.has(metric.key)
                  ? adminMoney(metric.value, locale)
                  : metric.key === "collection"
                    ? metric.value + "%"
                    : metric.value}
              </strong>
            </div>
            <div className="adminRegistryMetrics__progress">
              <i style={{ width: "100%" }} />
            </div>
          </div>
        ))}
      </section>
      {section !== "payments" ? (
        <section className="adminRegistry__creation">
          <header>
            <span className="adminRegistry__creationIcon">
              <AddCircleOutlineRounded aria-hidden="true" />
            </span>
            <div>
              <h2>{t(editor?.row ? "edit" : title)}</h2>
              <p>{t(section + "Description")}</p>
            </div>
            <button
              className={editor ? "" : "adminRegistry__primary"}
              onClick={() => setEditor(editor ? null : { row: null })}
              type="button"
              disabled={busy || query.loading || Boolean(query.error)}
            >
              {editor ? (
                <CloseRounded aria-hidden="true" />
              ) : (
                <AddCircleOutlineRounded aria-hidden="true" />
              )}
              {t(editor ? "close" : "create")}
            </button>
          </header>
          {editor ? (
            <AdminRegistryEditor
              key={editor.row?.id ?? "new"}
              section={section}
              locale={locale}
              row={editor.row}
              options={options}
              onClose={() => setEditor(null)}
              onSaved={reload}
            />
          ) : null}
        </section>
      ) : null}
      {section === "groups" ? (
        <AdminCatalogFilters
          locale={locale}
          input={input}
          onChange={update}
          filters={[
            {
              key: "status",
              label: t("status"),
              options: statuses.map((id) => ({ id, label: t(id) })),
            },
            {
              key: "category",
              label: t("category"),
              options: [
                { id: "IELTS", label: "IELTS" },
                { id: "CEFR", label: "CEFR" },
                { id: "GENERAL_ENGLISH", label: "General English" },
              ],
            },
            { key: "teacherId", label: t("teacher"), options: options.teachers, wide: true },
          ]}
        />
      ) : (
        <section className="adminRegistryFilters" aria-label={t("search")}>
          <label className="adminRegistryFilters__search">
            <SearchRounded aria-hidden="true" />
            <input
              aria-label={t("search")}
              type="search"
              placeholder={t("search")}
              value={input.search ?? ""}
              onChange={(e) => update({ search: e.target.value })}
            />
          </label>
          {filter(
            "status",
            "status",
            statuses.map((id) => ({ id, label: t(id) })),
          )}
          {section !== "payments" ? filter("teacherId", "teacher", options.teachers) : null}
          {section === "schedule" || section === "payments"
            ? filter("groupId", "group", options.groups)
            : null}
          {section === "payments" ? filter("studentId", "student", options.students) : null}
          {section === "payments" || section === "salary" ? (
            <label className="adminRegistryFilters__date">
              <span>{t("month")}</span>
              <input
                type="month"
                value={input.month ?? ""}
                onChange={(e) => update({ month: e.target.value || undefined })}
              />
            </label>
          ) : null}
          {section === "schedule" ? (
            <>
              {(["from", "to"] as const).map((key) => (
                <AdminDateFilter
                  key={key}
                  locale={locale}
                  label={t(key)}
                  value={input[key]?.slice(0, 10) ?? ""}
                  onChange={(value) => update({ [key]: value || undefined })}
                />
              ))}
              <label className="adminRegistryFilters__date">
                <span>{t("room")}</span>
                <input
                  value={input.room ?? ""}
                  onChange={(e) => update({ room: e.target.value || undefined })}
                />
              </label>
            </>
          ) : null}
          <button
            type="button"
            className="adminRegistry__reset"
            onClick={() => setInput(initialInput())}
          >
            {t("reset")}
          </button>
        </section>
      )}
      {query.error ? (
        <div className="adminRegistry__error" role="alert">
          {t("error")} <button onClick={() => void reload()}>{t("retry")}</button>
        </div>
      ) : null}
      <section className="adminRegistry__tableSection" aria-busy={query.loading}>
        <div className="adminRegistry__tablePanel">
          <div className="adminRegistry__tableScroll">
            <table className="adminRegistry__table">
              <thead>
                <tr>
                  {columns.map((col, i) => (
                    <th
                      scope="col"
                      key={col}
                      aria-sort={
                        i === 0 ? (input.descending ? "descending" : "ascending") : undefined
                      }
                    >
                      {i === 0 ? (
                        <button
                          type="button"
                          onClick={() => update({ descending: !input.descending })}
                        >
                          {t(col)}
                          <UnfoldMoreRounded aria-hidden="true" />
                        </button>
                      ) : (
                        t(col)
                      )}
                    </th>
                  ))}
                  <th scope="col" className="adminRegistry__actionHeading">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {row.cells.map((value, i) => (
                      <td key={columns[i]} data-label={t(columns[i])}>
                        {i === row.cells.length - 1 ? (
                          <span
                            className={`adminRegistry__status adminRegistry__status_${["ACTIVE", "PAID", "FINALIZED", "COMPLETED"].includes(row.status) ? "success" : ["CANCELLED", "UNPAID"].includes(row.status) ? "danger" : "neutral"}`}
                          >
                            {value}
                          </span>
                        ) : i === 0 ? (
                          <strong>{value}</strong>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                    <td className="adminRegistry__actionCell" data-label={t("actions")}>
                      <div className="adminRegistry__actions">
                        {row.href ? (
                          <Link
                            className="adminRegistry__action"
                            href={row.href}
                            aria-label={t("details")}
                            title={t("details")}
                          >
                            <InfoOutlined aria-hidden="true" />
                          </Link>
                        ) : (
                          iconButton(
                            "details",
                            () => setDetail(row),
                            <InfoOutlined aria-hidden="true" />,
                          )
                        )}
                        {section !== "payments" &&
                        !["FINALIZED", "COMPLETED", "CANCELLED", "ARCHIVED"].includes(row.status)
                          ? iconButton(
                              "edit",
                              () => {
                                setEditor({ row });
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              },
                              <EditOutlined aria-hidden="true" />,
                            )
                          : null}
                        {section === "groups" ? (
                          <>
                            {iconButton(
                              row.status === "ARCHIVED" ? "restore" : "archive",
                              () => action(row, row.status === "ARCHIVED" ? "ACTIVE" : "ARCHIVED"),
                              row.status === "ARCHIVED" ? (
                                <RestoreRounded aria-hidden="true" />
                              ) : (
                                <ArchiveOutlined aria-hidden="true" />
                              ),
                            )}
                            {iconButton(
                              "remove",
                              () => action(row, "DELETED"),
                              <DeleteOutlineRounded aria-hidden="true" />,
                              true,
                            )}
                          </>
                        ) : null}
                        {section === "schedule" && row.status !== "COMPLETED"
                          ? iconButton(
                              row.status === "CANCELLED" ? "restore" : "cancelLesson",
                              () =>
                                action(row, row.status === "CANCELLED" ? "SCHEDULED" : "CANCELLED"),
                              row.status === "CANCELLED" ? (
                                <RestoreRounded aria-hidden="true" />
                              ) : (
                                <CloseRounded aria-hidden="true" />
                              ),
                            )
                          : null}
                        {section === "schedule" && row.status === "SCHEDULED"
                          ? iconButton(
                              "COMPLETED",
                              () => action(row, "COMPLETED"),
                              <CheckRounded aria-hidden="true" />,
                            )
                          : null}
                        {section === "salary" && row.status === "DRAFT"
                          ? iconButton(
                              "finalize",
                              () => action(row, "FINALIZED"),
                              <CheckRounded aria-hidden="true" />,
                            )
                          : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!rows.length ? (
              <p role="status" className="adminRegistry__empty">
                {t(query.loading ? "loading" : "empty")}
              </p>
            ) : null}
          </div>
        </div>
        <AdminContentPagination
          locale={locale}
          section={section}
          page={page?.page ?? 1}
          pageCount={page?.pageCount ?? 1}
          totalCount={page?.totalCount ?? 0}
          busy={query.loading}
          onChange={(nextPage) => setInput((current) => ({ ...current, page: nextPage }))}
        />
      </section>
      <Dialog
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        slotProps={{ paper: { className: "adminRegistry__dialog" } }}
        aria-labelledby="admin-registry-detail"
      >
        <header>
          <h2 id="admin-registry-detail">{detail?.name}</h2>
          <button type="button" onClick={() => setDetail(null)} aria-label={t("close")}>
            <CloseRounded />
          </button>
        </header>
        <dl>
          {detail?.cells.map((value, i) => (
            <div key={i}>
              <dt>{t(columns[i])}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          {detail?.details.map((d, i) => (
            <div key={"d" + i}>
              <dt>{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>
      </Dialog>
      <Dialog
        open={Boolean(pending)}
        onClose={() => !busy && setPending(null)}
        slotProps={{ paper: { className: "adminRegistry__dialog" } }}
        aria-labelledby="admin-registry-reason"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pending) void perform(pending.row, pending.status, reason);
          }}
        >
          <header>
            <h2 id="admin-registry-reason">{t("reason")}</h2>
          </header>
          <label>
            <span>{pending?.row.name}</span>
            <textarea
              required
              maxLength={1000}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={busy}
            />
          </label>
          <div className="adminRegistry__formActions">
            <button type="button" onClick={() => setPending(null)} disabled={busy}>
              {t("cancel")}
            </button>
            <button type="submit" className="adminRegistry__primary" disabled={busy}>
              {t("save")}
            </button>
          </div>
        </form>
      </Dialog>
    </article>
  );
}
