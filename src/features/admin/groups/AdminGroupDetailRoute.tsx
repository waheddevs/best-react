import { notFound } from "next/navigation";
import { isLocale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminGroupCategoryLabel } from "@/dictionaries/admin/AdminGroups";
import { loadAdminWorkspaceData } from "@/lib/admin/AdminWorkspaceData";
import { adminTime } from "@/lib/admin/AdminRegistryPresentation";
import { AdminRegistry } from "../operations/AdminRegistry";

export async function AdminGroupDetailRoute({ locale, slug }: { locale: string; slug: string }) {
  if (!isLocale(locale)) notFound();
  const data = await loadAdminWorkspaceData("groups", locale);
  const record = data.records.find((item) => item.id === slug || item.group?.slug === slug);
  if (!record?.group) notFound();
  const group = record.group;
  const t = getAdminRegistryText(locale);
  const days = group.scheduleDays
    .map((day) =>
      new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(
        new Date(Date.UTC(2024, 0, day)),
      ),
    )
    .join(", ");
  return (
    <AdminRegistry
      locale={locale}
      section="groups"
      initialDetail={{
        id: record.id,
        name: record.title,
        status: record.status === "success" ? "ACTIVE" : "ARCHIVED",
        values: {},
        cells: [
          record.title,
          group.teacherName,
          days,
          `${adminTime(group.startsAtMinutes)}–${adminTime(group.endsAtMinutes)}`,
          group.room ?? "—",
          `${group.activeStudentCount}/${group.capacity}`,
          record.detail,
        ],
        details: [
          { label: t("category"), value: getAdminGroupCategoryLabel(locale, group.category) },
          { label: t("rate"), value: group.monthlyTuitionUzs ?? "—" },
        ],
      }}
    />
  );
}
