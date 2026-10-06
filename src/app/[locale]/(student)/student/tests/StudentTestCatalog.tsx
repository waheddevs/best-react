import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";
import type { StudentTestPaper, StudentTestsCopy } from "@/types/student/StudentTests";

type StudentTestCatalogProps = {
  copy: StudentTestsCopy;
  locale: Locale;
  papers: StudentTestPaper[];
};

export function StudentTestCatalog({ copy, locale, papers }: StudentTestCatalogProps) {
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
        <section aria-label={copy.title} className="studentTests__catalog">
          {papers.map((paper) => (
            <Link
              className="studentTests__paper"
              href={`/${locale}/student/tests/${paper.id}`}
              key={paper.id}
            >
              <div className="studentTests__paperHeader">
                <div>
                  <span>{copy.moduleLabel}</span>
                  <strong>{copy.academicModuleLabel}</strong>
                </div>
                <span className="studentTests__available">{copy.availableLabel}</span>
              </div>
              <h2>{paper.title}</h2>
              <p>{paper.sourceLabel}</p>
              <div className="studentTests__paperFooter">
                <span>
                  {copy.allSkillsLabel} · {copy.yearLabel} {paper.academicYear}
                </span>
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
