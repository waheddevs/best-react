"use client";

import DoneRounded from "@mui/icons-material/DoneRounded";
import { useLazyQuery } from "@apollo/client/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import {
  TeacherResultInboxDocument,
  type AttemptStatus,
  type TeacherResultInboxQuery,
  type TestSkill,
} from "@/gql/graphql";
import type { TeacherGroup } from "@/types/teacher/Teacher";

import { TeacherResultFilterDropdown } from "./TeacherResultFilterDropdown";
import { TeacherResultSearchInput } from "./TeacherResultSearchInput";

type Inbox = TeacherResultInboxQuery["teacherResultInbox"];
type Filters = {
  after?: string;
  groupId?: string;
  paperId?: string;
  search?: string;
  skill?: TestSkill;
  status?: AttemptStatus;
};

const resultSkills = ["LISTENING", "READING", "WRITING", "SPEAKING"] as const;
const resultStatuses = ["SUBMITTED", "SCORED"] as const;

function resultUrl(locale: Locale, filters: Filters): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) query.set(key, value);
  }
  const suffix = query.toString();
  return `/${locale}/teacher/results${suffix ? `?${suffix}` : ""}`;
}

function resultSkill(value: string): TestSkill | undefined {
  return resultSkills.find((skill) => skill === value);
}

function resultStatus(value: string): AttemptStatus | undefined {
  return resultStatuses.find((status) => status === value);
}

export function TeacherResultsInbox({
  filters,
  groups,
  inbox,
  locale,
}: {
  filters: Filters;
  groups: TeacherGroup[];
  inbox: Inbox;
  locale: Locale;
}) {
  const copy = getTeacherResultsCopy(locale);
  const requestSequence = useRef(0);
  const [activeFilters, setActiveFilters] = useState(filters);
  const [currentInbox, setCurrentInbox] = useState(inbox);
  const [filterError, setFilterError] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchInputKey, setSearchInputKey] = useState(0);
  const [loadInbox] = useLazyQuery(TeacherResultInboxDocument, {
    fetchPolicy: "network-only",
  });

  const updateResults = useCallback(
    async (nextFilters: Filters) => {
      const sequence = requestSequence.current + 1;
      requestSequence.current = sequence;
      setActiveFilters(nextFilters);
      setFilterError(false);
      setIsFiltering(true);
      window.history.replaceState(window.history.state, "", resultUrl(locale, nextFilters));
      try {
        const result = await loadInbox({
          context: { authenticated: true },
          variables: { ...nextFilters, first: 25 },
        });
        if (sequence === requestSequence.current && result.data) {
          setCurrentInbox(result.data.teacherResultInbox);
        }
      } catch {
        if (sequence === requestSequence.current) setFilterError(true);
      } finally {
        if (sequence === requestSequence.current) setIsFiltering(false);
      }
    },
    [loadInbox, locale],
  );

  const updateFilter = (name: "groupId" | "skill" | "status", value: string) => {
    const nextFilters: Filters = { ...activeFilters, after: undefined };
    if (name === "groupId") nextFilters.groupId = value || undefined;
    if (name === "skill") nextFilters.skill = resultSkill(value);
    if (name === "status") nextFilters.status = resultStatus(value);
    void updateResults(nextFilters);
  };

  return (
    <main className="teacherResults">
      <TeacherPageHeader eyebrow={copy.eyebrow} title={copy.title} />

      <div className="teacherResults__filters">
        <TeacherResultFilterDropdown
          label={copy.group}
          onChange={(value) => updateFilter("groupId", value)}
          options={[
            { label: copy.allGroups, value: "" },
            ...groups.map((group) => ({ label: group.name, value: group.id })),
          ]}
          value={activeFilters.groupId ?? ""}
        />
        <TeacherResultFilterDropdown
          label={copy.skill}
          onChange={(value) => updateFilter("skill", value)}
          options={[
            { label: copy.allSkills, value: "" },
            ...resultSkills.map((skill) => ({
              label: copy.skills[skill],
              value: skill,
            })),
          ]}
          value={activeFilters.skill ?? ""}
        />
        <TeacherResultFilterDropdown
          label={copy.status}
          onChange={(value) => updateFilter("status", value)}
          options={[
            { label: copy.allStatuses, value: "" },
            ...resultStatuses.map((status) => ({
              label: copy.statuses[status],
              value: status,
            })),
          ]}
          value={activeFilters.status ?? ""}
        />
        <TeacherResultSearchInput
          initialValue={activeFilters.search ?? ""}
          key={searchInputKey}
          label={copy.search}
          onSearch={(value) =>
            void updateResults({
              ...activeFilters,
              after: undefined,
              search: value.trim() || undefined,
            })
          }
        />
        <Link
          className="teacherResults__clearFilters"
          href={`/${locale}/teacher/results`}
          onClick={(event) => {
            event.preventDefault();
            setSearchInputKey((currentKey) => currentKey + 1);
            void updateResults({});
          }}
        >
          {copy.clear}
        </Link>
      </div>

      {filterError ? <p className="teacherResults__filterError">{copy.filterError}</p> : null}
      <div aria-busy={isFiltering} className="teacherResults__tableWrap" data-loading={isFiltering}>
        <table>
          <thead>
            <tr>
              <th>{copy.student}</th>
              <th>{copy.group}</th>
              <th>{copy.test}</th>
              <th>{copy.skill}</th>
              <th>{copy.submitted}</th>
              <th>{copy.status}</th>
              <th>{copy.action}</th>
            </tr>
          </thead>
          <tbody>
            {currentInbox.edges.map(({ node }) => (
              <tr key={node.attemptId}>
                <td>{node.studentDisplayName}</td>
                <td>{node.groupName}</td>
                <td>
                  {node.practiceNumber ? `${copy.practiceTest} ${node.practiceNumber}` : node.title}
                </td>
                <td>{node.skill ? copy.skills[node.skill] : "—"}</td>
                <td>
                  {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
                    new Date(node.submittedAt),
                  )}
                </td>
                <td>
                  <span data-status={node.status}>
                    {node.status === "SCORED" ? <DoneRounded aria-hidden="true" /> : null}
                    {copy.statuses[node.status]}
                  </span>
                </td>
                <td>
                  {node.skill &&
                  (node.status === "SCORED" ||
                    node.skill === "WRITING" ||
                    node.skill === "SPEAKING") ? (
                    <Link href={`/${locale}/teacher/results/${node.attemptId}`}>
                      {(node.skill === "WRITING" || node.skill === "SPEAKING") &&
                      node.status !== "SCORED"
                        ? copy.review
                        : copy.view}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentInbox.edges.length === 0 ? <p>{copy.empty}</p> : null}
      </div>
      {currentInbox.pageInfo.hasNextPage && currentInbox.pageInfo.endCursor ? (
        <button
          className="teacherResults__next"
          onClick={() =>
            void updateResults({
              ...activeFilters,
              after: currentInbox.pageInfo.endCursor ?? undefined,
            })
          }
          type="button"
        >
          {copy.next}
        </button>
      ) : null}
    </main>
  );
}
