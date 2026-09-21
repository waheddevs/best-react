import type { ReactNode } from "react";

type TeacherPageHeaderProps = {
  actions?: ReactNode;
  eyebrow: string;
  title: string;
};

export function TeacherPageHeader({ actions, eyebrow, title }: TeacherPageHeaderProps) {
  return (
    <header className="teacherShared__pageHeader">
      <div>
        <p className="teacherShared__eyebrow">{eyebrow}</p>
        <h1 className="teacherShared__pageTitle">{title}</h1>
      </div>
      {actions ? <div className="teacherShared__pageActions">{actions}</div> : null}
    </header>
  );
}
