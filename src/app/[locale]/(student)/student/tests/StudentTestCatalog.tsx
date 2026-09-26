import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type { StudentTestPaper, StudentTestsCopy } from "@/types/student/StudentTests";

type StudentTestCatalogProps = {
  copy: StudentTestsCopy;
  locale: Locale;
  papers: StudentTestPaper[];
};

export function StudentTestCatalog({ copy, locale, papers }: StudentTestCatalogProps) {
  return (
    <article className="studentTests">
      <header className="studentTests__hero">
        <span>{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
      </header>

      {papers.length === 0 ? (
        <p className="studentTests__empty">{copy.emptyLabel}</p>
      ) : (
        <section aria-label={copy.title} className="studentTests__catalog">
          {papers.map((paper) => (
            <Link
              className="studentTests__paper"
              href={`/${locale}/student/tests/${paper.id}`}
              key={paper.id}
            >
              <div className="studentTests__paperHeader">
                <div>
                  <span>{copy.yearLabel}</span>
                  <strong>{paper.academicYear}</strong>
                </div>
                <span className="studentTests__available">{copy.availableLabel}</span>
              </div>
              <h2>{paper.title}</h2>
              <p>{paper.sourceLabel}</p>
              <div className="studentTests__paperFooter">
                <span>{copy.allSkillsLabel}</span>
                <span>
                  {copy.continueLabel}
                  <ArrowForwardRounded aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </article>
  );
}
