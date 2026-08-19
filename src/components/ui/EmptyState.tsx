import SearchOffRounded from "@mui/icons-material/SearchOffRounded";

import styles from "@/css/public/shared.module.css";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className={styles.publicShared__emptyState}>
      <div>
        <span className={styles.publicShared__emptyStateIcon}>
          <SearchOffRounded aria-hidden="true" />
        </span>
        <p className={styles.publicShared__emptyStateMessage}>{message}</p>
      </div>
    </div>
  );
}
