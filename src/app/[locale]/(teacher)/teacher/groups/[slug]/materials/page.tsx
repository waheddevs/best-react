import type { Metadata } from "next";

import {
  getTeacherGroupLessons,
  getTeacherGroupMaterials,
} from "@/data/teacher/TeacherPreviewData";

import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "../GroupWorkspaceRoute";
import { GroupMaterials } from "./GroupMaterials";

type GroupMaterialsPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupMaterialsPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "materials");
}

export default async function GroupMaterialsPage({ params }: GroupMaterialsPageProps) {
  const { copy, locale, slug } = await getGroupWorkspaceContext(params);
  return (
    <GroupMaterials
      copy={copy}
      lessons={getTeacherGroupLessons(slug)}
      locale={locale}
      materials={getTeacherGroupMaterials(slug)}
    />
  );
}
