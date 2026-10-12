import CloseRounded from "@mui/icons-material/CloseRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import type { Locale } from "@/config/Locales";
import type { AdminDirectoryInput } from "@/gql/graphql";
import { getAdminMessagesText } from "@/dictionaries/admin/AdminMessages";
import { AdminRegistrySelect } from "../operations/AdminRegistrySelect";
import { AdminDateFilter } from "../operations/AdminDateFilter";

export function AdminMessageFilters({
  locale,
  input,
  statuses,
  onChange,
}: {
  locale: Locale;
  input: AdminDirectoryInput;
  statuses: string[];
  onChange: (value: Partial<AdminDirectoryInput>) => void;
}) {
  const t = getAdminMessagesText(locale);
  const chips: Array<{ key: string; label: string; reset: Partial<AdminDirectoryInput> }> = [];
  if (input.status)
    chips.push({ key: "status", label: t(input.status), reset: { status: undefined } });
  for (const key of ["from", "to"] as const) {
    const date = input[key]?.slice(0, 10);
    if (date)
      chips.push({
        key,
        label: `${t(key)}: ${new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`))}`,
        reset: { [key]: undefined },
      });
  }

  return (
    <section className="adminMessageFilters" aria-label={t("searchMessages")}>
      <div className="adminMessageFilters__row">
        <label className="adminRegistryFilters__search">
          <SearchRounded aria-hidden="true" />
          <input
            type="search"
            aria-label={t("searchMessages")}
            placeholder={t("searchMessages")}
            value={input.search ?? ""}
            onChange={(event) => onChange({ search: event.target.value })}
          />
        </label>
        <div className="adminMessageFilters__cards">
          <AdminRegistrySelect
            label={t("status")}
            value={input.status ?? ""}
            options={[{ id: "", label: t("all") }, ...statuses.map((id) => ({ id, label: t(id) }))]}
            onChange={(status) => onChange({ status: status || undefined })}
          />
          {(["from", "to"] as const).map((key) => (
            <AdminDateFilter
              key={key}
              locale={locale}
              label={t(key)}
              value={input[key]?.slice(0, 10) ?? ""}
              onChange={(value) => onChange({ [key]: value || undefined })}
            />
          ))}
        </div>
      </div>
      {chips.length ? (
        <div className="adminMessageFilters__chips" role="group" aria-label={t("filterSummary")}>
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              aria-label={`${t("removeFilter")}: ${chip.label}`}
              onClick={() => onChange(chip.reset)}
            >
              <span>{chip.label}</span>
              <CloseRounded aria-hidden="true" />
            </button>
          ))}
          <button
            className="adminMessageFilters__clear"
            type="button"
            onClick={() =>
              onChange({
                status: undefined,
                from: undefined,
                to: undefined,
              })
            }
          >
            {t("reset")}
          </button>
        </div>
      ) : null}
    </section>
  );
}
