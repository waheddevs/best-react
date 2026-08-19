import InfoRounded from "@mui/icons-material/InfoRounded";

import styles from "@/css/public/shared.module.css";

type DraftNoticeProps = {
  badge: string;
  note: string;
};

export function DraftNotice({ badge, note }: DraftNoticeProps) {
  return (
    <div className={styles.publicShared__draftNotice}>
      <InfoRounded aria-hidden="true" className={styles.publicShared__draftNoticeIcon} />
      <p>
        <strong className={styles.publicShared__draftNoticeBadge}>{badge}.</strong> {note}
      </p>
    </div>
  );
}
