import InfoOutlined from "@mui/icons-material/InfoOutlined";

type StudentTestSectionIntroProps = {
  question: string;
  instruction: string;
  instructionLabel: string;
};

export function StudentTestSectionIntro({
  question,
  instruction,
  instructionLabel,
}: StudentTestSectionIntroProps) {
  return (
    <div className="studentListeningSectionIntro">
      <article className="studentListeningSectionIntro__condition">
        <h2>{question}</h2>
      </article>
      <article aria-label={instructionLabel} className="studentListeningSectionIntro__instruction">
        <span aria-hidden="true" className="studentListeningSectionIntro__icon">
          <InfoOutlined />
        </span>
        <p>{instruction}</p>
      </article>
    </div>
  );
}
