"use client";

import type { Locale } from "@/config/Locales";
import type { TeacherTestAuthoringVersionFieldsFragment } from "@/gql/graphql";

import { TeacherListeningPartTwoEditor } from "./TeacherListeningPartTwoEditor";

type TeacherListeningPartThreeEditorProps = {
  initialVersion: TeacherTestAuthoringVersionFieldsFragment;
  locale: Locale;
  practiceHref: string;
  practiceNumber: number;
};

export function TeacherListeningPartThreeEditor(props: TeacherListeningPartThreeEditorProps) {
  return <TeacherListeningPartTwoEditor {...props} part={3} />;
}
