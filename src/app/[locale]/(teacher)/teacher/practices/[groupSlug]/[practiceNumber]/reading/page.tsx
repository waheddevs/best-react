import type { Metadata } from "next";

import { isLocale } from "@/config/Locales";

import {
  getTeacherPracticeContext,
  parsePracticeNumber,
  type TeacherPracticeParams,
} from "../TeacherPracticeRoute";
import { TeacherPracticeSkillPage } from "../TeacherPracticeSkillPage";

type TeacherReadingPageProps = { params: TeacherPracticeParams };

export async function generateMetadata({ params }: TeacherReadingPageProps): Promise<Metadata> {
  const { locale, practiceNumber } = await params;
  const number = parsePracticeNumber(practiceNumber);
  if (number === null || !isLocale(locale)) return {};
  return {
    title: `Reading · Practice test ${String(number)}`,
    robots: { follow: false, index: false },
  };
}

export default async function TeacherReadingPage({ params }: TeacherReadingPageProps) {
  const context = await getTeacherPracticeContext(params);
  return (
    <TeacherPracticeSkillPage
      locale={context.locale}
      practiceHref={context.practiceHref}
      practiceNumber={context.practiceNumber}
      skill="reading"
    />
  );
}
