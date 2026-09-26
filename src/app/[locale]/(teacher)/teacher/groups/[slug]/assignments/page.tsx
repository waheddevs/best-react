import { redirect } from "next/navigation";

import { getGroupWorkspaceContext, type GroupWorkspaceParams } from "../GroupWorkspaceRoute";

type GroupAssignmentsPageProps = { params: GroupWorkspaceParams };

export default async function GroupAssignmentsPage({ params }: GroupAssignmentsPageProps) {
  const { locale, slug } = await getGroupWorkspaceContext(params);
  redirect(`/${locale}/teacher/groups/${slug}/tests`);
}
