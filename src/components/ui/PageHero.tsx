import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";

import { Container } from "@/components/ui/Container";
import styles from "@/css/public/shared.module.css";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className={styles.publicShared__pageHero}>
      <div className={styles.publicShared__pageHeroGlow} />
      <Container className={styles.publicShared__pageHeroContainer}>
        <p className={styles.publicShared__pageHeroEyebrow}>
          <AutoAwesomeRounded
            aria-hidden="true"
            className={styles.publicShared__pageHeroIcon}
          />
          {eyebrow}
        </p>
        <h1 className={styles.publicShared__pageHeroTitle}>
          {title}
        </h1>
        <p className={styles.publicShared__pageHeroDescription}>
          {description}
        </p>
      </Container>
    </section>
  );
}
