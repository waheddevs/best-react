import type { Metadata } from "next";

import {
  getTeacherGroupAssignments,
  getTeacherGroupMaterials,
  getTeacherGroupTests,
} from "@/data/teacher/TeacherPreviewData";
import { loadConnectedTeacherGroupOverview } from "@/lib/teacher/TeacherGroupData";

import { GroupOverview } from "./GroupOverview";
import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "./GroupWorkspaceRoute";

type GroupOverviewPageProps = { params: GroupWorkspaceParams };

export function generateMetadata({ params }: GroupOverviewPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "overview");
}

export default async function GroupOverviewPage({ params }: GroupOverviewPageProps) {
  const { connected, copy, group, locale, slug } = await getGroupWorkspaceContext(params);
  const previewAssignments = connected ? [] : getTeacherGroupAssignments(slug);
  const previewMaterials = connected ? [] : getTeacherGroupMaterials(slug);
  const previewTests = connected ? [] : getTeacherGroupTests(slug);
  const workspace = connected
    ? await loadConnectedTeacherGroupOverview(locale, group.id)
    : {
        metrics: {
          activeAssignments: previewAssignments.filter(
            (assignment) => assignment.status === "active",
          ).length,
          materials: previewMaterials.length,
          scheduledTests: previewTests.filter((test) => test.status === "scheduled").length,
          students: group.learnerCount,
        },
        rosterSummary: null,
      };

  return (
    <GroupOverview
      copy={copy}
      group={group}
      locale={locale}
      metrics={workspace.metrics}
      rosterSummary={workspace.rosterSummary}
    />
  );
}
