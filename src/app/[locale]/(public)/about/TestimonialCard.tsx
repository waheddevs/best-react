import FormatQuoteRounded from "@mui/icons-material/FormatQuoteRounded";

import type { PageCopy } from "@/dictionaries/public/PageCopy";

type Testimonial = PageCopy["about"]["testimonials"]["items"][number];

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="about__testimonialCard">
      <div className="about__testimonialTopline">
        <FormatQuoteRounded className="about__testimonialQuoteIcon" aria-hidden="true" />
      </div>

      <blockquote className="about__testimonialQuote">“{testimonial.quote}”</blockquote>

      <footer className="about__testimonialFooter">
        <span className="about__testimonialAvatar" aria-hidden="true">
          {testimonial.initials}
        </span>
        <span>
          <strong className="about__testimonialName">{testimonial.name}</strong>
          <span className="about__testimonialCourse">{testimonial.course}</span>
        </span>
      </footer>

      <span className="about__testimonialDecoration" aria-hidden="true" />
    </article>
  );
}
