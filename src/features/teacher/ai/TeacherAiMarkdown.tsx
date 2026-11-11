import type { ReactNode } from "react";
import { parseTeacherAiMarkdown } from "@/features/teacher/ai/TeacherAiMarkdownModel";

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={index}>{part.slice(1, -1)}</code>;
    return part;
  });
}

export function TeacherAiMarkdown({ content }: { content: string }) {
  return (
    <div className="teacherAi__markdown">
      {parseTeacherAiMarkdown(content).map((block, index) => {
        if (block.kind === "code")
          return (
            <pre key={index}>
              <code>{block.text}</code>
            </pre>
          );
        if (block.kind === "heading") return <h3 key={index}>{inline(block.text)}</h3>;
        if (block.kind === "list")
          return (
            <ul key={index}>
              <li>{inline(block.text)}</li>
            </ul>
          );
        return <p key={index}>{inline(block.text)}</p>;
      })}
    </div>
  );
}
