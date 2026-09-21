import type { ReactNode } from "react";

type GroupWorkspaceSectionHeaderProps = {
  action?: ReactNode;
  description: string;
  id: string;
  title: string;
};

export function GroupWorkspaceSectionHeader({
  action,
  description,
  id,
  title,
}: GroupWorkspaceSectionHeaderProps) {
  return (
    <div className="teacherGroups__sectionIntro">
      <div>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
