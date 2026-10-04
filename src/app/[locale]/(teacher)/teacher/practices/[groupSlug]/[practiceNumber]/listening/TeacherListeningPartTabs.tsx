"use client";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useState } from "react";

type TeacherListeningPartTabsProps = {
  activePart: 1 | 2 | 3 | 4;
  practiceHref: string;
};

export function TeacherListeningPartTabs({
  activePart,
  practiceHref,
}: TeacherListeningPartTabsProps) {
  const router = useRouter();
  const [transition, setTransition] = useState<{
    from: TeacherListeningPartTabsProps["activePart"];
    to: TeacherListeningPartTabsProps["activePart"];
  } | null>(null);
  const selectedPart = transition?.from === activePart ? transition.to : activePart;

  const navigate = (event: MouseEvent<HTMLAnchorElement>, part: 1 | 2 | 3 | 4) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    if (part === activePart) return;
    const href =
      part === 1 ? `${practiceHref}/listening` : `${practiceHref}/listening/part-${String(part)}`;
    setTransition({ from: activePart, to: part });
    router.push(href);
  };

  return (
    <Tabs
      aria-label="Listening parts"
      className="teacherGroups__categoryTabs teacherGroups__workspaceNav teacherPractices__partTabs"
      component="nav"
      scrollButtons={false}
      value={`part-${String(selectedPart)}`}
      variant="scrollable"
    >
      {([1, 2, 3, 4] as const).map((part) => {
        const href =
          part === 1
            ? `${practiceHref}/listening`
            : `${practiceHref}/listening/part-${String(part)}`;
        return (
          <Tab
            className="teacherGroups__categoryTab"
            component={Link}
            href={href}
            key={part}
            label={<span className="teacherGroups__categoryName">Part {part}</span>}
            onClick={(event) => navigate(event, part)}
            scroll={false}
            value={`part-${String(part)}`}
          />
        );
      })}
    </Tabs>
  );
}
