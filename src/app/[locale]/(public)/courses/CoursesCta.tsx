import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type CoursesCtaProps = {
  locale: Locale;
  copy: PageCopy;
};

export function CoursesCta({ locale, copy }: CoursesCtaProps) {
  return (
    <Section tone="surface">
      <Reveal className="courses__cta" direction="scale">
        <span className="courses__ctaIcon">
          <ChatBubbleOutlineRounded aria-hidden="true" />
        </span>
        <h2>{copy.courses.ctaTitle}</h2>
        <p>{copy.courses.ctaDescription}</p>
        <ButtonLink href={`/${locale}/contact`} hoverEffect="jump" size="medium">
          {copy.common.contactCta}
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
