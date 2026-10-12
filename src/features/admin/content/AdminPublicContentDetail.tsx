"use client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import type { Locale } from "@/config/Locales";
import { AdminPublicContentDetailDocument } from "@/gql/graphql";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { AdminContentDetailBody } from "./AdminContentDetailBody";
export function AdminPublicContentDetail({
  locale,
  slug,
  section,
}: {
  locale: Locale;
  slug: string;
  section: "courses" | "events";
}) {
  const t = getAdminContentText(locale),
    query = useQuery(AdminPublicContentDetailDocument, {
      variables: {
        slug,
        language: locale === "uz" ? "UZ" : locale === "ru" ? "RU" : "EN",
        course: section === "courses",
        event: section === "events",
      },
      context: { authenticated: true },
      fetchPolicy: "network-only",
    });
  const row = section === "courses" ? query.data?.adminCourse : query.data?.adminEvent;
  return (
    <article className="adminWorkspace adminRegistry adminContent">
      <header className="adminWorkspace__header">
        <div>
          <Link href={`/${locale}/admin/${section}`}>{t(section)}</Link>
          <h1>{row?.title ?? t("details")}</h1>
        </div>
        {row?.status === "PUBLISHED" ? (
          <Link href={`/${locale}/${section}/${slug}`}>{t("viewPublic")}</Link>
        ) : null}
      </header>
      {query.error ? (
        <p className="adminRegistry__error" role="alert">
          {t("error")} <button onClick={() => void query.refetch()}>{t("retry")}</button>
        </p>
      ) : null}
      {row ? (
        <section className="adminRegistry__creation adminContent__detail">
          <AdminContentDetailBody locale={locale} content={row} />
        </section>
      ) : (
        <p role="status">{t(query.loading ? "loading" : "empty")}</p>
      )}
    </article>
  );
}
