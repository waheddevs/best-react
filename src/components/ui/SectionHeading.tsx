import styles from "@/css/public/shared.module.css";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  titleClassName = "",
  description,
  descriptionClassName = "",
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? styles.publicShared__sectionHeadingCenter : "";

  return (
    <div className={`${styles.publicShared__sectionHeading} ${alignment}`}>
      {eyebrow ? <p className={styles.publicShared__sectionEyebrow}>{eyebrow}</p> : null}
      <h2 className={`${styles.publicShared__sectionTitle} ${titleClassName}`}>{title}</h2>
      {description ? (
        <p className={`${styles.publicShared__sectionDescription} ${descriptionClassName}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
