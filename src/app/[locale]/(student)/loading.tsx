import styles from "@/css/student/workspace.module.css";

export default function StudentLoading() {
  return (
    <div aria-busy="true" className={styles.studentWorkspace}>
      <div className={styles.studentWorkspace__hero} />
      <div className={styles.studentWorkspace__summary}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
