import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import {
  loadConnectedTeacherGroups,
  loadConnectedTeacherResultInbox,
} from "@/lib/teacher/TeacherGroupData";
import {
  readTeacherResultFilterValue,
  readTeacherResultIdFilter,
} from "@/lib/teacher/TeacherResultFilters";
import type { AttemptStatus, TestSkill } from "@/gql/graphql";

import { TeacherResultsInbox } from "./TeacherResultsInbox";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const skills = ["LISTENING", "READING", "WRITING", "SPEAKING"] as const;
const statuses = ["SUBMITTED", "SCORED"] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getTeacherCopy(locale).metadata.results.title, robots: { index: false } };
}

export default async function TeacherResultsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const query = await searchParams;
  const value = (key: string) => readTeacherResultFilterValue(query, key);
  const idValue = (key: string) => readTeacherResultIdFilter(query, key);
  const skillValue = value("skill");
  const statusValue = value("status");
  const filters = {
    after: value("after"),
    groupId: idValue("groupId"),
    paperId: idValue("paperId"),
    search: value("search")?.slice(0, 80),
    skill: skills.includes(skillValue as (typeof skills)[number])
      ? (skillValue as TestSkill)
      : undefined,
    status: statuses.includes(statusValue as (typeof statuses)[number])
      ? (statusValue as AttemptStatus)
      : undefined,
  };
  const [groups, inbox] = await Promise.all([
    loadConnectedTeacherGroups(locale),
    loadConnectedTeacherResultInbox(locale, { ...filters, first: 25 }),
  ]);
  return <TeacherResultsInbox filters={filters} groups={groups} inbox={inbox} locale={locale} />;
}
