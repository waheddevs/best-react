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
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-black tracking-[0.2em] text-action uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-[clamp(2rem,4vw,3.75rem)] leading-[1.02] font-black tracking-[-0.055em] text-heading">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-[68ch] text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
