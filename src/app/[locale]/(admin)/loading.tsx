import styles from "@/css/admin/workspace.module.css";

export default function AdminLoading() {
  return (
    <div aria-busy="true" className={styles.adminWorkspace}>
      <div className={styles.adminWorkspace__header} />
      <div className={styles.adminWorkspace__metrics}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
