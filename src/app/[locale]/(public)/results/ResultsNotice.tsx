import FactCheckRounded from "@mui/icons-material/FactCheckRounded";

import { Section } from "@/components/ui/Section";
import styles from "@/css/public/results.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ResultsNoticeProps = {
  copy: PageCopy;
};

export function ResultsNotice({ copy }: ResultsNoticeProps) {
  return (
    <Section>
      <div className={styles.results__notice}>
        <span className={styles.results__noticeIcon}>
          <FactCheckRounded aria-hidden="true" className={styles.results__noticeIconSvg} />
        </span>
        <div>
          <h2 className={styles.results__noticeTitle}>
            {copy.results.noticeTitle}
          </h2>
          <p className={styles.results__noticeBody}>{copy.results.noticeBody}</p>
        </div>
      </div>
    </Section>
  );
}
