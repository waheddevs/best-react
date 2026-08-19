import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";

import styles from "@/css/public/home.module.css";

type HeroVisualProps = {
  label: string;
  title: string;
  progress: string;
};

export function HeroVisual({ label, title, progress }: HeroVisualProps) {
  return (
    <div className={styles.home__heroVisual} aria-label={label} role="img">
      <div className={styles.home__heroVisualShape} />
      <div className={styles.home__heroVisualCard}>
        <div className={styles.home__heroVisualHeader}>
          <span className={styles.home__heroVisualLabel}>
            {label}
          </span>
          <span className={styles.home__heroVisualBolt}>
            <BoltRounded aria-hidden="true" />
          </span>
        </div>
        <div className={styles.home__heroVisualCenter}>
          <div className={styles.home__heroVisualIcon}>
            <SchoolRounded aria-hidden="true" className={styles.home__heroVisualSchoolIcon} />
            <span className={styles.home__heroVisualTrend}>
              <TrendingUpRounded aria-hidden="true" />
            </span>
          </div>
        </div>
        <p className={styles.home__heroVisualTitle}>{title}</p>
        <div className={styles.home__heroVisualProgress}>
          <span className={styles.home__heroVisualProgressIcon}>
            <AutoStoriesRounded aria-hidden="true" />
          </span>
          <div className={styles.home__heroVisualProgressContent}>
            <p className={styles.home__heroVisualProgressLabel}>{progress}</p>
            <div className={styles.home__heroVisualProgressTrack}>
              <div className={styles.home__heroVisualProgressValue} />
            </div>
          </div>
        </div>
      </div>
      <span className={styles.home__heroVisualDot} />
      <span className={styles.home__heroVisualAccent} />
    </div>
  );
}
