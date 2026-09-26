import { redirect } from "next/navigation";

import { getGroupWorkspaceContext, type GroupWorkspaceParams } from "../GroupWorkspaceRoute";

type GroupMaterialsPageProps = { params: GroupWorkspaceParams };

export default async function GroupMaterialsPage({ params }: GroupMaterialsPageProps) {
  const { locale, slug } = await getGroupWorkspaceContext(params);
  redirect(`/${locale}/teacher/groups/${slug}/lessons`);
}
