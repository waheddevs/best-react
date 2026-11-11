export type TeacherAiMarkdownBlock = {
  kind: "paragraph" | "heading" | "code" | "list";
  text: string;
};

// Intentionally a small Markdown subset. HTML, links and image syntax remain
// inert text; model output can never load remote resources or execute code.
export function parseTeacherAiMarkdown(value: string): TeacherAiMarkdownBlock[] {
  const blocks: TeacherAiMarkdownBlock[] = [];
  let paragraph: string[] = [];
  let code: string[] | null = null;
  const flush = () => {
    if (paragraph.length) blocks.push({ kind: "paragraph", text: paragraph.join("\n") });
    paragraph = [];
  };
  for (const line of value.slice(0, 32_000).split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      flush();
      if (code) {
        blocks.push({ kind: "code", text: code.join("\n") });
        code = null;
      } else code = [];
    } else if (code) code.push(line);
    else if (/^#{1,6}\s/.test(line)) {
      flush();
      blocks.push({ kind: "heading", text: line.replace(/^#{1,6}\s+/, "") });
    } else if (/^\s*(?:[-*]|\d+\.)\s/.test(line)) {
      flush();
      blocks.push({ kind: "list", text: line.replace(/^\s*(?:[-*]|\d+\.)\s+/, "") });
    } else if (!line.trim()) flush();
    else paragraph.push(line);
  }
  flush();
  if (code) blocks.push({ kind: "code", text: code.join("\n") });
  return blocks;
}

export function shouldSendTeacherAiMessage(
  key: string,
  shift: boolean,
  composing: boolean,
): boolean {
  return key === "Enter" && !shift && !composing;
}

export function teacherAiRouteConversation(
  pathname: string,
  locale: string,
): string | null | undefined {
  const prefix = `/${locale}/teacher/ai-assistant`;
  const path = pathname.replace(/\/+$/, "");
  if (path === prefix) return null;
  if (path.startsWith(`${prefix}/`)) return path.slice(prefix.length + 1);
  return undefined;
}
