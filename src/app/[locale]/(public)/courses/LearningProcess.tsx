import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type LearningProcessProps = {
  copy: PageCopy;
};

export function LearningProcess({ copy }: LearningProcessProps) {
  return (
    <Section tone="background">
      <Reveal className={styles.courses__sectionHeading}>
        <SectionHeading
          align="center"
          eyebrow={copy.courses.processEyebrow}
          title={copy.courses.processTitle}
          description={copy.courses.processDescription}
        />
      </Reveal>
      <StaggerGroup className={styles.courses__processGrid} delay={0.06}>
        {copy.courses.processItems.map((item, index) => (
          <StaggerItem className={styles.courses__processItem} key={item.title}>
            <article className={styles.courses__processCard}>
              <span className={styles.courses__processNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
              {index < copy.courses.processItems.length - 1 ? (
                <ArrowForwardRounded aria-hidden="true" className={styles.courses__processArrow} />
              ) : null}
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
