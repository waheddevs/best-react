import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";

import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__2" />
      <Container className="page-hero__3">
        <p className="page-hero__4">
          <AutoAwesomeRounded aria-hidden="true" sx={{ fontSize: 18 }} className="page-hero__5" />
          {eyebrow}
        </p>
        <h1 className="page-hero__6">{title}</h1>
        <p className="page-hero__7">{description}</p>
      </Container>
    </section>
  );
}
