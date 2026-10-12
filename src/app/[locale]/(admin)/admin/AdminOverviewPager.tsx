import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import type { Locale } from "@/config/Locales";
import { getAdminOverviewCopy } from "@/dictionaries/admin/AdminOverview";

export function AdminOverviewPager({
  locale,
  page,
  pages,
  onChange,
}: {
  locale: Locale;
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  const copy = getAdminOverviewCopy(locale);
  if (pages <= 1) return null;
  return (
    <div className="adminOverview__pager">
      <button
        type="button"
        aria-label={copy.previous}
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeftRounded />
      </button>
      <span aria-live="polite">
        {page + 1} / {pages}
      </span>
      <button
        type="button"
        aria-label={copy.more}
        disabled={page >= pages - 1}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRightRounded />
      </button>
    </div>
  );
}
