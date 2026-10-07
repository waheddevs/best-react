import type { Locale } from "@/config/Locales";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";
import type { StudentTestPaper, StudentTestsCopy } from "@/types/student/StudentTests";

import { StudentTestCard } from "./StudentTestCard";
import { StudentTestPagination } from "./StudentTestPagination";

type StudentTestCatalogProps = {
  copy: StudentTestsCopy;
  locale: Locale;
  papers: StudentTestPaper[];
  requestedPage: number;
};

const pageSize = 9;

function testNumber(paper: StudentTestPaper): number | null {
  const match =
    /(?:test|practice)-(\d+)(?:-|$)/i.exec(paper.slug) ??
    /\b(?:test|practice)\s*#?\s*(\d+)\b/i.exec(paper.title);
  const number = match ? Number(match[1]) : null;
  return number !== null && Number.isSafeInteger(number) && number > 0 ? number : null;
}

export function StudentTestCatalog({
  copy,
  locale,
  papers,
  requestedPage,
}: StudentTestCatalogProps) {
  const orderedPapers = papers
    .map((paper, index) => ({ paper, index, number: testNumber(paper) }))
    .sort((a, b) => (a.number ?? Infinity) - (b.number ?? Infinity) || a.index - b.index);
  const totalPages = Math.max(1, Math.ceil(papers.length / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visiblePapers = orderedPapers.slice(startIndex, startIndex + pageSize);

  return (
    <article className="studentTests">
      <StudentSectionHero
        description={copy.subtitle}
        eyebrow={copy.eyebrow}
        kind="tests"
        locale={locale}
        title={copy.title}
        value={papers.length}
      />

      {papers.length === 0 ? (
        <p className="studentTests__empty">{copy.emptyLabel}</p>
      ) : (
        <>
          <section aria-label={copy.title} className="studentTests__catalog">
            {visiblePapers.map(({ paper, number }, index) => (
              <StudentTestCard
                copy={copy}
                key={paper.id}
                locale={locale}
                number={number ?? startIndex + index + 1}
                paper={paper}
              />
            ))}
          </section>
          <StudentTestPagination
            copy={copy}
            currentPage={currentPage}
            pathname={`/${locale}/student/tests`}
            totalPages={totalPages}
          />
        </>
      )}
    </article>
  );
}
