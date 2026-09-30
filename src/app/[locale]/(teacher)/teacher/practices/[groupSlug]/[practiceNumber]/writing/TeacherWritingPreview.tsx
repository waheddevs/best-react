"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import { useState } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import type { TeacherWritingSessionContent } from "@/types/teacher/TeacherWriting";

type TeacherWritingPreviewProps = {
  content: TeacherWritingSessionContent;
  locale: Locale;
  practiceNumber: number;
  returnHref: string;
};

const copy = {
  uz: {
    answer: "Student javobi",
    back: "Writing sahifasidan chiqish",
    minimum: "Kamida {count} ta so'z",
    preview: "READ-ONLY PREVIEW",
    previewHint:
      "Bu sahifa kontentni tekshirish uchun. Yozish, autosave, timer va submit Student dashboardda ishlaydi.",
    readOnly: "Faqat ko'rish",
    source: "Task material",
    task: "TASK {number}",
    title: "Writing · Practice test {number}",
  },
  ru: {
    answer: "Ответ студента",
    back: "Выйти из Writing",
    minimum: "Не менее {count} слов",
    preview: "ТОЛЬКО ПРОСМОТР",
    previewHint:
      "Страница предназначена для проверки контента. Редактор, автосохранение, таймер и отправка работают в кабинете студента.",
    readOnly: "Без изменений",
    source: "Материал задания",
    task: "ЗАДАНИЕ {number}",
    title: "Writing · Practice test {number}",
  },
  en: {
    answer: "Student answer",
    back: "Exit Writing",
    minimum: "At least {count} words",
    preview: "READ-ONLY PREVIEW",
    previewHint:
      "Use this page to verify content. Writing, autosave, timing and submission run in the Student workspace.",
    readOnly: "Read only",
    source: "Task material",
    task: "TASK {number}",
    title: "Writing · Practice test {number}",
  },
} as const;

export function TeacherWritingPreview({
  content,
  locale,
  practiceNumber,
  returnHref,
}: TeacherWritingPreviewProps) {
  const labels = copy[locale];
  const [currentTask, setCurrentTask] = useState(0);
  const task = content.tasks[currentTask];
  if (!task) return null;

  return (
    <main className="teacherWritingPreview">
      <header className="teacherWritingPreview__header">
        <ScrollToTopLink
          aria-label={labels.back}
          className="teacherGroups__backLink"
          href={returnHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>
        <div>
          <span>{labels.preview}</span>
          <h1>{labels.title.replace("{number}", String(practiceNumber))}</h1>
          <p>{task.title}</p>
        </div>
        <div className="teacherWritingPreview__status">
          <VisibilityOutlined aria-hidden="true" />
          {labels.readOnly}
        </div>
      </header>

      <p className="teacherWritingPreview__notice">{labels.previewHint}</p>

      <nav aria-label={labels.title} className="teacherWritingPreview__tasks">
        {content.tasks.map((item, index) => (
          <button
            aria-current={index === currentTask ? "step" : undefined}
            key={item.position}
            onClick={() => setCurrentTask(index)}
            type="button"
          >
            <span>{labels.task.replace("{number}", String(item.position))}</span>
            <small>{item.suggestedMinutes} min</small>
          </button>
        ))}
      </nav>

      <section className="teacherWritingPreview__workspace">
        <article className="teacherWritingPreview__source">
          <div>
            <span>{labels.source}</span>
            <strong>{labels.minimum.replace("{count}", String(task.minimumWords))}</strong>
          </div>
          <h2>{task.title}</h2>
          <p>{task.instructions}</p>
          {task.content ? <div>{task.content}</div> : null}
          <blockquote>{task.prompt}</blockquote>
        </article>

        <div className="teacherWritingPreview__answer">
          <label htmlFor="teacher-writing-preview-answer">{labels.answer}</label>
          <textarea disabled id="teacher-writing-preview-answer" placeholder={labels.previewHint} />
          <footer>
            <strong>0</strong>
            <span>{labels.readOnly}</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
