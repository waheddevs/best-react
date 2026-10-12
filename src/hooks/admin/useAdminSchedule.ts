"use client";

import { useApolloClient } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { AdminOperationsDocument } from "@/gql/graphql";
import type { AdminScheduleLesson, AdminScheduleOptions } from "@/types/admin/AdminSchedule";

export function useAdminSchedule(from: string, to: string) {
  const client = useApolloClient();
  const [attempt, setAttempt] = useState(0);
  const key = `${from}:${to}:${attempt}`;
  const [result, setResult] = useState<{
    key: string;
    lessons: AdminScheduleLesson[];
    options: AdminScheduleOptions | null;
    error: boolean;
  }>({ key: "", lessons: [], options: null, error: false });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const lessons: AdminScheduleLesson[] = [];
        let options: AdminScheduleOptions | null = null;
        for (let page = 1; ; page++) {
          const { data } = await client.query({
            query: AdminOperationsDocument,
            variables: {
              input: { from, to, page, pageSize: 100, descending: false },
              groups: false,
              schedule: true,
              payments: false,
            },
            context: { authenticated: true },
            fetchPolicy: "network-only",
          });
          if (!active) return;
          if (!data?.adminLessonDirectory) throw new Error("Schedule unavailable");
          options = data.adminDirectoryOptions;
          lessons.push(...data.adminLessonDirectory.nodes);
          if (page >= data.adminLessonDirectory.pageCount) break;
        }
        if (active)
          setResult({
            key,
            lessons: [...new Map(lessons.map((row) => [row.id, row])).values()],
            options,
            error: false,
          });
      } catch {
        if (active) setResult({ key, lessons: [], options: null, error: true });
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [client, from, to, key]);

  const loading = result.key !== key;
  return {
    lessons: loading ? [] : result.lessons,
    options: result.options,
    error: !loading && result.error,
    loading,
    retry: () => setAttempt((value) => value + 1),
  };
}
