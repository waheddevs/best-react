"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import { useMemo, useState } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { getTeacherObjectivePracticeCopy } from "@/dictionaries/teacher/TeacherObjectivePractice";
import { resolveDynamicTestLayout } from "@/lib/tests/DynamicTestLayout";
import type {
  TeacherObjectivePracticeContent,
  TeacherObjectivePracticeSkill,
} from "@/types/teacher/TeacherObjectivePractice";

type TeacherObjectivePreviewProps = {
  content: TeacherObjectivePracticeContent;
  locale: Locale;
  practiceNumber: number;
  returnHref: string;
  skill: TeacherObjectivePracticeSkill;
};

export function TeacherObjectivePreview({
  content,
  locale,
  practiceNumber,
  returnHref,
  skill,
}: TeacherObjectivePreviewProps) {
  const labels = getTeacherObjectivePracticeCopy(locale);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const section = content.sections[currentSectionIndex];
  const layout = useMemo(
    () =>
      resolveDynamicTestLayout(
        skill === "listening" ? "LISTENING" : "READING",
        content.sections,
        content.sections.flatMap((item) =>
          item.questions.map((question) => ({
            id: question.id,
            position: question.position,
            sectionId: item.id,
          })),
        ),
      ),
    [content.sections, skill],
  );

  if (!section) return null;
  const SkillIcon = skill === "listening" ? HeadphonesRounded : MenuBookRounded;
  const skillLabel = skill === "listening" ? labels.listening : labels.reading;

  return (
    <main className="teacherObjectivePreview" data-density={layout.density} data-skill={skill}>
      <header className="teacherObjectivePreview__header">
        <ScrollToTopLink
          aria-label={labels.back}
          className="teacherGroups__backLink"
          href={returnHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>
        <div>
          <span>{labels.preview}</span>
          <h1>
            {labels.title
              .replace("{skill}", skillLabel)
              .replace("{number}", String(practiceNumber))}
          </h1>
          <p>{content.title}</p>
        </div>
        <span className="teacherObjectivePreview__status">
          <VisibilityOutlined aria-hidden="true" />
          {labels.readOnly}
        </span>
      </header>

      <div className="teacherObjectivePreview__notice">
        <SkillIcon aria-hidden="true" />
        <span>{labels.previewHint}</span>
        <strong>
          {content.durationMinutes === null
            ? labels.questions.replace(
                "{count}",
                String(content.sections.reduce((count, item) => count + item.questions.length, 0)),
              )
            : labels.duration.replace("{count}", String(content.durationMinutes))}
        </strong>
      </div>

      <nav aria-label={content.title} className="teacherObjectivePreview__sections">
        {content.sections.map((item, index) => (
          <button
            aria-current={index === currentSectionIndex ? "step" : undefined}
            key={item.id}
            onClick={() => setCurrentSectionIndex(index)}
            type="button"
          >
            <span>{labels.part.replace("{number}", String(item.position))}</span>
            <small>{labels.questions.replace("{count}", String(item.questions.length))}</small>
          </button>
        ))}
      </nav>

      <section className="teacherObjectivePreview__workspace">
        <article className="teacherObjectivePreview__material">
          <span>{labels.part.replace("{number}", String(section.position))}</span>
          <h2>{section.title}</h2>
          <p className="teacherObjectivePreview__instructions">{section.instructions}</p>
          {skill === "listening" && section.mediaObjectId ? (
            <div className="teacherObjectivePreview__audio">
              <HeadphonesRounded aria-hidden="true" />
              <span>{labels.audio}</span>
            </div>
          ) : null}
          {section.content ? (
            <div className="teacherObjectivePreview__content">
              {section.content.split(/\n{2,}/).map((paragraph, index) => (
                <p key={`${section.id}-paragraph-${String(index)}`}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {section.mediaObjectId && skill === "reading" ? (
            <div className="teacherObjectivePreview__visual">
              <MenuBookRounded aria-hidden="true" />
              <span>{labels.visual}</span>
            </div>
          ) : null}
        </article>

        <div className="teacherObjectivePreview__questions">
          {section.questions.map((question) => (
            <article key={question.id}>
              <span>{labels.question.replace("{number}", String(question.position))}</span>
              <h3>{question.prompt}</h3>
              {question.options.length > 0 ? (
                <div className="teacherObjectivePreview__options">
                  {question.options.map((option) => (
                    <label key={option.id}>
                      <input disabled name={question.id} type="radio" />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <label className="teacherObjectivePreview__textAnswer">
                  <span>{labels.answer}</span>
                  <input disabled type="text" />
                </label>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
