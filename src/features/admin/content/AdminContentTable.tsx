import type { ReactNode } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
export function AdminContentTable({
  columns,
  rows,
  loading,
  locale,
}: {
  columns: string[];
  rows: { id: string; cells: ReactNode[] }[];
  loading: boolean;
  locale: Locale;
}) {
  const t = getAdminContentText(locale);
  return (
    <div className="adminRegistry__tablePanel" aria-busy={loading}>
      <div className="adminRegistry__tableScroll">
        <table className="adminRegistry__table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className={c === "actions" ? "adminRegistry__actionHeading" : undefined}
                >
                  {t(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                {r.cells.map((cell, i) => (
                  <td
                    key={columns[i]}
                    data-label={t(columns[i])}
                    className={columns[i] === "actions" ? "adminRegistry__actionCell" : undefined}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length ? (
          <p className="adminRegistry__empty" role="status">
            {t(loading ? "loading" : "empty")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
