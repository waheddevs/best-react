import SearchRounded from "@mui/icons-material/SearchRounded";
import type { ReactNode } from "react";
import type { Locale } from "@/config/Locales";
import type { AdminDirectoryInput } from "@/gql/graphql";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { AdminRegistrySelect } from "../operations/AdminRegistrySelect";
import { AdminDateFilter } from "../operations/AdminDateFilter";
export function AdminContentFilters({
  locale,
  input,
  onChange,
  statuses,
  types,
  dates = false,
  children,
}: {
  locale: Locale;
  input: AdminDirectoryInput;
  onChange: (v: Partial<AdminDirectoryInput>) => void;
  statuses: string[];
  types?: string[];
  dates?: boolean;
  children?: ReactNode;
}) {
  const t = getAdminContentText(locale);
  return (
    <section className="adminRegistryFilters" aria-label={t("search")}>
      <label className="adminRegistryFilters__search">
        <SearchRounded aria-hidden="true" />
        <input
          type="search"
          aria-label={t("search")}
          placeholder={t("search")}
          value={input.search ?? ""}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </label>
      <AdminRegistrySelect
        label={t("status")}
        value={input.status ?? ""}
        options={[{ id: "", label: t("all") }, ...statuses.map((id) => ({ id, label: t(id) }))]}
        onChange={(status) => onChange({ status: status || undefined })}
      />
      {types ? (
        <AdminRegistrySelect
          label={t("type")}
          value={input.category ?? ""}
          options={[{ id: "", label: t("all") }, ...types.map((id) => ({ id, label: t(id) }))]}
          onChange={(category) => onChange({ category: category || undefined })}
        />
      ) : null}
      {dates
        ? (["from", "to"] as const).map((key) => (
            <AdminDateFilter
              key={key}
              locale={locale}
              label={t(key)}
              value={input[key]?.slice(0, 10) ?? ""}
              onChange={(value) => onChange({ [key]: value || undefined })}
            />
          ))
        : null}
      {children}
      <button
        type="button"
        className="adminRegistry__reset"
        onClick={() =>
          onChange({
            search: "",
            status: undefined,
            category: undefined,
            from: undefined,
            to: undefined,
            groupId: undefined,
          })
        }
      >
        {t("reset")}
      </button>
    </section>
  );
}
