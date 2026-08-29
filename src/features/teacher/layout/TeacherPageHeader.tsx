import type { ReactNode } from "react";

import styles from "@/css/teacher/shared.module.css";

type TeacherPageHeaderProps = {
  actions?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

export function TeacherPageHeader({
  actions,
  description,
  eyebrow,
  title,
}: TeacherPageHeaderProps) {
  return (
    <header className={styles.teacherShared__pageHeader}>
      <div>
        <p className={styles.teacherShared__eyebrow}>{eyebrow}</p>
        <h1 className={styles.teacherShared__pageTitle}>{title}</h1>
        <p className={styles.teacherShared__pageDescription}>{description}</p>
      </div>
      {actions ? <div className={styles.teacherShared__pageActions}>{actions}</div> : null}
    </header>
  );
}
