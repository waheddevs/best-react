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
  const alignment = align === "center" ? "publicShared__sectionHeadingCenter" : "";

  return (
    <div className={`publicShared__sectionHeading ${alignment}`}>
      {eyebrow ? <p className="publicShared__sectionEyebrow">{eyebrow}</p> : null}
      <h2 className={`publicShared__sectionTitle ${titleClassName}`}>{title}</h2>
      {description ? (
        <p className={`publicShared__sectionDescription ${descriptionClassName}`}>{description}</p>
      ) : null}
    </div>
  );
}
