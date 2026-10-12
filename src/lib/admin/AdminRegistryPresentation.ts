import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import type { AdminOperationsQuery } from "@/gql/graphql";
import type { AdminRegistryRow, AdminRegistrySection } from "@/types/admin/AdminRegistry";

export function adminMoney(value: string, locale: Locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "UZS",
    maximumFractionDigits: 0,
  }).format(BigInt(value));
}
export function adminTime(value: number | null) {
  return value === null
    ? "—"
    : `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}
export function tashkentInput(value: string) {
  const d = new Date(new Date(value).getTime() + 5 * 3600000);
  return d.toISOString().slice(0, 16);
}
export const registryColumns: Record<AdminRegistrySection, string[]> = {
  groups: ["group", "teacher", "date", "time", "room", "students", "status"],
  schedule: ["lessonDate", "time", "group", "teacher", "room", "students", "status"],
  payments: ["student", "group", "month", "dueDate", "amount", "paid", "balance", "status"],
  salary: ["teacher", "month", "groups", "students", "base", "bonus", "deduction", "net", "status"],
};
export function registryRows(
  data: AdminOperationsQuery | undefined,
  section: AdminRegistrySection,
  locale: Locale,
): AdminRegistryRow[] {
  if (!data) return [];
  const t = getAdminRegistryText(locale);
  const money = (v: string) => adminMoney(v, locale);
  const date = (v: string) =>
    new Intl.DateTimeFormat(locale, { timeZone: "Asia/Tashkent", dateStyle: "medium" }).format(
      new Date(v),
    );
  const time = (v: string) =>
    new Intl.DateTimeFormat(locale, {
      timeZone: "Asia/Tashkent",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(v));
  const week = (n: number) =>
    new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(
      new Date(Date.UTC(2024, 0, n)),
    );
  if (section === "groups")
    return (data.adminGroupDirectory?.nodes ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      status: r.status,
      updatedAt: r.updatedAt,
      href: `/${locale}/admin/groups/${r.slug}`,
      cells: [
        r.name,
        r.teacherName,
        r.scheduleDays.map(week).join(", "),
        `${adminTime(r.startsAtMinutes)}–${adminTime(r.endsAtMinutes)}`,
        r.room ?? "—",
        `${r.activeStudentCount}/15`,
        t(r.status),
      ],
      values: {
        name: r.name,
        slug: r.slug,
        teacherId: r.teacherId,
        category: r.category ?? "CEFR",
        room: r.room ?? "",
        days: r.scheduleDays.join(","),
        start: adminTime(r.startsAtMinutes),
        end: adminTime(r.endsAtMinutes),
        rate: r.monthlyTuitionUzs ?? "300000",
      },
      details: [{ label: t("rate"), value: money(r.monthlyTuitionUzs ?? "0") }],
    }));
  if (section === "schedule")
    return (data.adminLessonDirectory?.nodes ?? []).map((r) => ({
      id: r.id,
      name:
        r.translations.find((x) => x.language === locale.toUpperCase())?.title ??
        r.translations[0]?.title ??
        r.groupName,
      status: r.status,
      updatedAt: r.updatedAt,
      cells: [
        date(r.startsAt),
        `${time(r.startsAt)}–${time(r.endsAt)}`,
        r.groupName,
        r.teacherName,
        r.room ?? "—",
        String(r.studentCount),
        `${t(r.status)}${r.hasConflict ? ` · ${t("conflicts")}` : ""}`,
      ],
      values: {
        groupId: r.groupId,
        name: r.translations[0]?.title ?? r.groupName,
        from: tashkentInput(r.startsAt),
        to: tashkentInput(r.endsAt),
        room: r.room ?? "",
        titleUz: r.translations.find((x) => x.language === "UZ")?.title ?? "",
        titleRu: r.translations.find((x) => x.language === "RU")?.title ?? "",
        titleEn: r.translations.find((x) => x.language === "EN")?.title ?? "",
        summaryUz: r.translations.find((x) => x.language === "UZ")?.summary ?? "",
        summaryRu: r.translations.find((x) => x.language === "RU")?.summary ?? "",
        summaryEn: r.translations.find((x) => x.language === "EN")?.summary ?? "",
      },
      details: r.translations.map((x) => ({ label: x.language, value: x.title })),
    }));
  if (section === "payments")
    return (data.adminPaymentDirectory?.nodes ?? []).map((r) => ({
      id: r.id,
      name: r.studentName,
      status: r.status,
      href: `/${locale}/admin/payments/${r.id}`,
      cells: [
        r.studentName,
        r.groupName,
        r.month,
        date(r.dueDate),
        money(r.amountUzs),
        money(r.paidUzs),
        money(r.balanceUzs),
        t(r.status),
      ],
      values: {},
      details: [
        { label: t("adjustment"), value: money(r.adjustmentUzs) },
        ...r.events.map((e) => ({
          label: `${date(e.date)} · ${e.kind}`,
          value: `${money(e.amountUzs)}${e.note ? ` · ${e.note}` : ""}`,
        })),
      ],
    }));
  return (data.adminSalaryDirectory?.nodes ?? []).map((r) => ({
    id: r.id,
    name: r.teacherName,
    status: r.status,
    version: r.version,
    cells: [
      r.teacherName,
      r.month,
      String(r.groupCount),
      String(r.studentCount),
      money(r.baseUzs),
      money(r.bonusUzs),
      money(r.deductionUzs),
      money(r.netUzs),
      t(r.status),
    ],
    values: {
      teacherId: r.teacherId,
      month: r.month,
      base: r.baseUzs,
      bonus: r.bonusUzs,
      deduction: r.deductionUzs,
      note: r.note ?? "",
    },
    details: [
      { label: t("note"), value: r.note ?? "—" },
      { label: t("students"), value: t("currentCounts") },
    ],
  }));
}
