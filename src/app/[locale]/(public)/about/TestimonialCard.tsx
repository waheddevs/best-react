import FormatQuoteRounded from "@mui/icons-material/FormatQuoteRounded";

import styles from "@/css/public/about.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type Testimonial = PageCopy["about"]["testimonials"]["items"][number];

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className={styles.about__testimonialCard}>
      <div className={styles.about__testimonialTopline}>
        <FormatQuoteRounded className={styles.about__testimonialQuoteIcon} aria-hidden="true" />
      </div>

      <blockquote className={styles.about__testimonialQuote}>“{testimonial.quote}”</blockquote>

      <footer className={styles.about__testimonialFooter}>
        <span className={styles.about__testimonialAvatar} aria-hidden="true">
          {testimonial.initials}
        </span>
        <span>
          <strong className={styles.about__testimonialName}>{testimonial.name}</strong>
          <span className={styles.about__testimonialCourse}>{testimonial.course}</span>
        </span>
      </footer>

      <span className={styles.about__testimonialDecoration} aria-hidden="true" />
    </article>
  );
}
