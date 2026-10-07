"use client";

import { useState } from "react";

import type { Locale } from "@/config/Locales";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import type { StudentLibraryBooksQuery } from "@/gql/graphql";

import { LibraryHero } from "./LibraryHero";
import { StudentPdfBooks } from "./StudentPdfBooks";

type LibraryCatalogProps = {
  locale: Locale;
  copy: StudentLibraryCopy;
  bookPage: Pick<StudentLibraryBooksQuery["studentLibraryItems"], "edges"> | null;
  preview: boolean;
};

export function LibraryCatalog({ locale, copy, bookPage, preview }: LibraryCatalogProps) {
  const [materialCount, setMaterialCount] = useState<number | undefined>(
    bookPage ? countPdfItems(bookPage) : undefined,
  );

  return (
    <main className="studentWorkspace studentWorkspace--library">
      <LibraryHero copy={copy} locale={locale} resourceCount={materialCount} preview={preview} />
      <StudentPdfBooks
        copy={copy}
        initialPage={bookPage}
        locale={locale}
        onMaterialCountChange={setMaterialCount}
        preview={preview}
      />
    </main>
  );
}

function countPdfItems(page: Pick<StudentLibraryBooksQuery["studentLibraryItems"], "edges">) {
  return page.edges.filter(({ node }) =>
    node.attachments.some(({ mediaObject }) => mediaObject.mimeType === "application/pdf"),
  ).length;
}
