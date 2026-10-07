import "server-only";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import {
  StudentCurrentGroupDocument,
  StudentGroupLessonsDocument,
  StudentGroupMaterialsDocument,
  type Language,
  type StudentCurrentGroupQuery,
  type StudentGroupLessonsQuery,
  type StudentGroupMaterialsQuery,
} from "@/gql/graphql";
import { executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type { StudentGroupLesson, StudentGroupView } from "@/types/student/StudentGroup";

type LessonNode = StudentGroupLessonsQuery["studentGroupLessons"]["edges"][number]["node"];
type MaterialNode = StudentGroupMaterialsQuery["studentGroupMaterials"]["edges"][number]["node"];

export async function loadStudentGroup(locale: Locale): Promise<StudentGroupView | null> {
  const session = await auth();
  if (session?.bestApi?.role !== "STUDENT" || !session.bestApi.accessToken) {
    throw new Error("Student session required");
  }
  const accessToken = session.bestApi.accessToken;
  const current = await executeApolloQuery<StudentCurrentGroupQuery, Record<string, never>>(
    StudentCurrentGroupDocument,
    {},
    { accessToken, cache: "no-store" },
  );
  if (!current.studentCurrentGroup) return null;

  const group = current.studentCurrentGroup.group;
  const language = locale.toUpperCase() as Language;
  const [lessonNodes, materialNodes] = await Promise.all([
    loadAllLessons(group.id, accessToken),
    loadAllMaterials(group.id, language, accessToken),
  ]);
  const resources = new Map<string, { material: MaterialNode | null; task: MaterialNode | null }>();
  for (const node of materialNodes) {
    if (!node.lessonId) continue;
    const entry = resources.get(node.lessonId) ?? { material: null, task: null };
    if (node.kind === "MATERIAL" && !entry.material) entry.material = node;
    if (node.kind === "TASK" && !entry.task) entry.task = node;
    resources.set(node.lessonId, entry);
  }
  const lessons: StudentGroupLesson[] = lessonNodes.map((node) => {
    const translation =
      node.translations.find((item) => item.language === language) ?? node.translations[0];
    const linked = resources.get(node.id);
    return {
      id: node.id,
      name: translation?.title ?? `Lesson ${node.lessonNumber}`,
      number: node.lessonNumber,
      material: linked?.material ? mapResource(linked.material) : null,
      task: linked?.task ? mapResource(linked.task) : null,
    };
  });
  return {
    category: group.category,
    days: group.scheduleDays,
    endMinutes: group.endsAtMinutes,
    lessons,
    memberCount: group.activeStudentCount,
    name: group.name,
    room: group.room,
    startMinutes: group.startsAtMinutes,
  };
}

async function loadAllLessons(groupId: string, accessToken: string): Promise<LessonNode[]> {
  const nodes: LessonNode[] = [];
  let after: string | undefined;
  const seen = new Set<string>();
  while (true) {
    const result = await executeApolloQuery<
      StudentGroupLessonsQuery,
      { groupId: string; after?: string }
    >(StudentGroupLessonsDocument, { groupId, after }, { accessToken, cache: "no-store" });
    nodes.push(...result.studentGroupLessons.edges.map(({ node }) => node));
    if (!result.studentGroupLessons.pageInfo.hasNextPage) return nodes;
    const cursor = result.studentGroupLessons.pageInfo.endCursor;
    if (!cursor || seen.has(cursor)) throw new Error("Invalid lesson cursor");
    seen.add(cursor);
    after = cursor;
  }
}

async function loadAllMaterials(
  groupId: string,
  language: Language,
  accessToken: string,
): Promise<MaterialNode[]> {
  const nodes: MaterialNode[] = [];
  let after: string | undefined;
  const seen = new Set<string>();
  while (true) {
    const result = await executeApolloQuery<
      StudentGroupMaterialsQuery,
      { groupId: string; language: Language; after?: string }
    >(
      StudentGroupMaterialsDocument,
      { groupId, language, after },
      { accessToken, cache: "no-store" },
    );
    nodes.push(...result.studentGroupMaterials.edges.map(({ node }) => node));
    if (!result.studentGroupMaterials.pageInfo.hasNextPage) return nodes;
    const cursor = result.studentGroupMaterials.pageInfo.endCursor;
    if (!cursor || seen.has(cursor)) throw new Error("Invalid material cursor");
    seen.add(cursor);
    after = cursor;
  }
}

function mapResource(node: MaterialNode) {
  return {
    id: node.id,
    libraryItemId: node.libraryItemId,
    mediaObjectId: node.mediaObject.id,
    name: node.mediaObject.originalName,
  };
}
