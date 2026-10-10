import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { getStudentHeroCopy, type StudentHeroKind } from "@/dictionaries/student/StudentHero";

type StudentSectionHeroProps = {
  description: string;
  eyebrow: string;
  eyebrowHref?: string;
  eyebrowLinkLabel?: string;
  kind: StudentHeroKind;
  label?: string;
  locale: Locale;
  preview?: boolean;
  title: string;
  value?: number | string;
};

const iconImages = {
  dashboard: "/images/student/hero-icons/dashboard.svg",
  courses: "/images/student/hero-icons/courses.svg",
  schedule: "/images/student/hero-icons/schedule.svg",
  assignments: "/images/student/hero-icons/assignments.svg",
  library: "/images/student/hero-icons/library.svg",
  tests: "/images/student/hero-icons/tests.svg",
  results: "/images/student/hero-icons/results.svg",
  progress: "/images/student/hero-icons/progress.svg",
  payments: "/images/student/hero-icons/payments.svg",
  notifications: "/images/student/hero-icons/notifications.svg",
  settings: "/images/student/hero-icons/settings.svg",
} satisfies Record<StudentHeroKind, string>;

export function StudentSectionHero({
  description,
  eyebrow,
  eyebrowHref,
  eyebrowLinkLabel,
  kind,
  label,
  locale,
  preview = false,
  title,
  value,
}: StudentSectionHeroProps) {
  const copy = getStudentHeroCopy(locale);
  const iconSrc = iconImages[kind];

  return (
    <header className="studentHero">
      <span aria-hidden="true" className="studentHero__orbit" />
      <div className="studentHero__copy">
        {eyebrowHref ? (
          <Link className="studentHero__eyebrow" href={eyebrowHref} aria-label={eyebrowLinkLabel} title={eyebrowLinkLabel}>
            {eyebrow}
          </Link>
        ) : (
          <span className="studentHero__eyebrow">{eyebrow}</span>
        )}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <Image
        alt=""
        aria-hidden="true"
        className="studentHero__watermark"
        height={300}
        src={iconSrc}
        unoptimized
        width={300}
      />
      <div className="studentHero__visual">
        <div className="studentHero__signal">
          {value !== undefined ? <strong>{value}</strong> : null}
          <span>{label ?? copy.labels[kind]}</span>
          {preview ? <small>{copy.preview}</small> : null}
        </div>
      </div>
    </header>
  );
}
