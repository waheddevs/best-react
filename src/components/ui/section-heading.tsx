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
  const alignment =
    align === "center" ? "section-heading-layout--center" : "section-heading-layout--left";

  return (
    <div className={`section-heading-layout ${alignment}`}>
      {eyebrow ? <p className="section-heading">{eyebrow}</p> : null}
      <h2 className="section-heading__2">{title}</h2>
      {description ? <p className="section-heading__3">{description}</p> : null}
    </div>
  );
}
