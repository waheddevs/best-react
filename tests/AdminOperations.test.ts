import assert from "node:assert/strict";
import test from "node:test";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const { AdminOperationsDocument } = (await import(
  new URL("../src/gql/graphql.ts", import.meta.url).href
)) as typeof import("../src/gql/graphql");

test("Payments reads the generated query without a retired salary variable", async () => {
  let requested = false;
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://api.example/graphql",
      fetch: async (_url, init) => {
        requested = true;
        const body = JSON.parse(String(init?.body)) as {
          query: string;
          variables: Record<string, unknown>;
        };
        assert.doesNotMatch(body.query, /adminSalaryDirectory|\$salary/);
        assert.equal(body.variables.payments, true);
        return Response.json({
          data: {
            adminDirectoryOptions: { teachers: [], groups: [], students: [] },
            adminPaymentDirectory: {
              page: 1,
              pageCount: 1,
              totalCount: 0,
              nodes: [],
              metrics: [{ key: "paid", value: "300000" }],
            },
          },
        });
      },
    }),
  });
  try {
    const result = await client.query({
      query: AdminOperationsDocument,
      fetchPolicy: "network-only",
      variables: {
        input: { page: 1, pageSize: 15 },
        groups: false,
        schedule: false,
        payments: true,
      },
    });
    assert.equal(requested, true);
    assert.deepEqual(result.data?.adminPaymentDirectory?.metrics, [
      { key: "paid", value: "300000" },
    ]);
  } finally {
    client.stop();
  }
});
