import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { teacherPracticePreviewItems } from "@/data/teacher/TeacherPracticePreview";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import { loadConnectedTeacherPractice } from "@/lib/teacher/TeacherGroupData";
import type {
  TeacherPracticeSkillKind,
  TeacherPracticeSkillSummary,
} from "@/types/teacher/TeacherPractice";

import { getGroupWorkspaceContext } from "../../../groups/[slug]/GroupWorkspaceRoute";
import { TeacherPracticeOverview } from "./TeacherPracticeOverview";

type TeacherPracticePageProps = {
  params: Promise<{ groupSlug: string; locale: string; practiceNumber: string }>;
};

const skillOrder = ["LISTENING", "READING", "WRITING", "SPEAKING"] as const;

function parsePracticeNumber(value: string) {
  if (!/^\d+$/.test(value)) return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

function skillKind(skill: (typeof skillOrder)[number]): TeacherPracticeSkillKind {
  return skill.toLowerCase() as TeacherPracticeSkillKind;
}

export async function generateMetadata({ params }: TeacherPracticePageProps): Promise<Metadata> {
  const { locale, practiceNumber } = await params;
  const number = parsePracticeNumber(practiceNumber);
  if (number === null || !isLocale(locale)) return {};
  const copy = getTeacherPracticesCopy(locale);
  return {
    title: `${copy.practiceTitle} ${number}`,
    robots: { follow: false, index: false },
  };
}

export default async function TeacherPracticePage({ params }: TeacherPracticePageProps) {
  const { groupSlug, locale: localeParam, practiceNumber: practiceNumberParam } = await params;
  const practiceNumber = parsePracticeNumber(practiceNumberParam);
  if (practiceNumber === null) notFound();

  const context = await getGroupWorkspaceContext(
    Promise.resolve({ locale: localeParam, slug: groupSlug }),
  );
  const { connected, group, locale } = context;
  const connectedPaper = connected
    ? await loadConnectedTeacherPractice(locale, group.id, practiceNumber)
    : null;
  const previewPractice = connected
    ? null
    : teacherPracticePreviewItems.find((item) => item.practiceNumber === practiceNumber);
  if (connected ? connectedPaper === null : previewPractice === undefined) notFound();

  const connectedSkills = connectedPaper?.skills ?? [];
  const skills: TeacherPracticeSkillSummary[] = skillOrder.map((skill) => {
    const record = connectedSkills.find((item) => item.skill === skill);
    const previewReady =
      !connected &&
      (skill === "LISTENING" ||
        skill === "READING" ||
        skill === "SPEAKING" ||
        (skill === "WRITING" && practiceNumber <= 10));
    return {
      durationMinutes:
        record?.durationMinutes ??
        (previewReady
          ? skill === "LISTENING"
            ? 30
            : skill === "READING" || skill === "WRITING"
              ? 60
              : 14
          : null),
      kind: skillKind(skill),
      questionCount:
        record?.questionCount ??
        (previewReady
          ? skill === "LISTENING" || skill === "READING"
            ? 40
            : skill === "WRITING"
              ? 2
              : 9
          : null),
      status:
        record === undefined
          ? previewReady
            ? "ready"
            : "empty"
          : record.status === "PUBLISHED"
            ? "ready"
            : "draft",
    };
  });
  const catalogPage = Math.ceil(practiceNumber / 16);
  const practicesHref = `/${locale}/teacher/groups/${groupSlug}/tests${catalogPage === 1 ? "" : `?page=${catalogPage}`}`;
  const practiceHref = `/${locale}/teacher/practices/${groupSlug}/${String(practiceNumber)}`;
  const skillHrefs = Object.fromEntries(
    skills.map(({ kind }) => [kind, `${practiceHref}/${kind}`]),
  ) as Record<TeacherPracticeSkillKind, string>;

  return (
    <TeacherPracticeOverview
      locale={locale}
      practiceNumber={practiceNumber}
      practicesHref={practicesHref}
      skillHrefs={skillHrefs}
      skills={skills}
    />
  );
}
