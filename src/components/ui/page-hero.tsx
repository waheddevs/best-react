import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";

import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-(image:--gradient-hero) py-16 sm:py-20 lg:py-24">
      <div className="absolute -top-28 -right-20 size-80 rounded-full bg-brand/15 blur-3xl" />
      <Container className="relative">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-bold text-heading">
          <AutoAwesomeRounded aria-hidden="true" sx={{ fontSize: 18 }} className="text-coral" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-[clamp(3rem,7vw,6rem)] leading-[0.94] font-black tracking-[-0.07em] text-heading">
          {title}
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      </Container>
    </section>
  );
}
