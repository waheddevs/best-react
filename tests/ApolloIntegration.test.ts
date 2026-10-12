import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";

const PublicCoursesDocument = gql`
  query ApolloIntegrationPublicCourses($language: Language!, $first: Int!) {
    publicCourses(language: $language, first: $first) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const TeacherGroupsDocument = gql`
  query ApolloIntegrationTeacherGroups($first: Int, $after: String) {
    teacherGroups(first: $first, after: $after, status: ACTIVE) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const TeacherLibraryItemsDocument = gql`
  query ApolloIntegrationTeacherLibraryItems($first: Int) {
    teacherLibraryItems(first: $first) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const StudentLibraryItemsDocument = gql`
  query ApolloIntegrationStudentLibraryItems($language: Language!, $first: Int) {
    studentLibraryItems(language: $language, first: $first) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const graphqlUrl = process.env.BEST_API_INTERNAL_URL ?? "http://127.0.0.1:4199/graphql";

function integrationClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: graphqlUrl }),
  });
}

test("Apollo reads public content from the BEST GraphQL endpoint", async () => {
  const result = await integrationClient().query({
    fetchPolicy: "no-cache",
    query: PublicCoursesDocument,
    variables: { first: 5, language: "EN" },
  });

  const data = result.data as
    { publicCourses: { edges: Array<{ node: { id: string } }> } } | undefined;
  assert.ok(data);
  assert.ok(Array.isArray(data.publicCourses.edges));
  assert.ok(data.publicCourses.edges.length > 0);
  assert.equal(typeof data.publicCourses.edges[0]?.node.id, "string");
});

test("Apollo preserves backend authorization for Teacher operations", async () => {
  await assert.rejects(
    integrationClient().query({
      fetchPolicy: "no-cache",
      query: TeacherGroupsDocument,
      variables: { after: null, first: 1 },
    }),
    (error: unknown) =>
      error instanceof Error &&
      "errors" in error &&
      Array.isArray(error.errors) &&
      error.errors.some(
        (item: { extensions?: { code?: string } }) => item.extensions?.code === "UNAUTHENTICATED",
      ),
  );
});

test("overview finance totals require an authenticated Admin", async () => {
  const query = gql(
    readFileSync(new URL("../src/graphql/AdminOverviewFinance.graphql", import.meta.url), "utf8"),
  );
  await assert.rejects(
    integrationClient().query({
      query,
      variables: { input: { page: 1, pageSize: 1, month: "2026-09" } },
      fetchPolicy: "no-cache",
    }),
    (error: unknown) =>
      error instanceof Error &&
      "errors" in error &&
      Array.isArray(error.errors) &&
      error.errors.some(
        (item: { extensions?: { code?: string } }) => item.extensions?.code === "UNAUTHENTICATED",
      ),
  );
});

test("Library queries require the correct authenticated workspace role", async () => {
  for (const [query, variables] of [
    [TeacherLibraryItemsDocument, { first: 1 }],
    [StudentLibraryItemsDocument, { first: 1, language: "EN" }],
  ] as const) {
    await assert.rejects(
      integrationClient().query({ fetchPolicy: "no-cache", query, variables }),
      (error: unknown) =>
        error instanceof Error &&
        "errors" in error &&
        Array.isArray(error.errors) &&
        error.errors.some(
          (item: { extensions?: { code?: string } }) => item.extensions?.code === "UNAUTHENTICATED",
        ),
    );
  }
});
