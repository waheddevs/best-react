import InfoOutlined from "@mui/icons-material/InfoOutlined";

type StudentReadingSectionIntroProps = {
  instructions: string;
  generalInstruction: string;
  generalInstructionLabel: string;
};

export function StudentReadingSectionIntro({
  instructions,
  generalInstruction,
  generalInstructionLabel,
}: StudentReadingSectionIntroProps) {
  return (
    <div className="studentListeningSectionIntro studentReadingSectionIntro">
      <article className="studentListeningSectionIntro__condition">
        <h2>{instructions}</h2>
      </article>
      <article
        aria-label={generalInstructionLabel}
        className="studentListeningSectionIntro__instruction"
      >
        <span aria-hidden="true" className="studentListeningSectionIntro__icon">
          <InfoOutlined />
        </span>
        <p>{generalInstruction}</p>
      </article>
    </div>
  );
}
