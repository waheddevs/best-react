type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? styles.publicShared__sectionHeadingCenter : "";

  return (
    <div className={`${styles.publicShared__sectionHeading} ${alignment}`}>
      {eyebrow ? (
        <p className={styles.publicShared__sectionEyebrow}>{eyebrow}</p>
      ) : null}
      <h2 className={styles.publicShared__sectionTitle}>
        {title}
      </h2>
      {description ? (
        <p className={styles.publicShared__sectionDescription}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
import styles from "@/css/public/shared.module.css";
