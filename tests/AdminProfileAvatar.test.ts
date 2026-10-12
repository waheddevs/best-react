import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { ApolloClient, ApolloLink, InMemoryCache, Observable } from "@apollo/client";
import { Kind, parse, type DocumentNode } from "graphql";

test("saved avatar changes reach the observed Admin profile without reloading", async () => {
  const document = parse(
    await readFile(new URL("../src/graphql/AdminWorkspace.graphql", import.meta.url), "utf8"),
  );
  function operation(name: string): DocumentNode {
    return {
      kind: Kind.DOCUMENT,
      definitions: document.definitions.filter(
        (definition) =>
          definition.kind === Kind.OPERATION_DEFINITION && definition.name?.value === name,
      ),
    };
  }
  const query = operation("AdminProfile");
  const mutation = operation("AdminUpdateProfile");
  const profile = {
    __typename: "UserProfile",
    id: "fictional-admin",
    displayName: "Example Admin",
    email: "admin@example.test",
    phone: null,
    branchName: null,
    preferredLanguage: "EN",
    avatarMediaObjectId: null,
    role: "ADMIN",
    status: "ACTIVE",
  };
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink(
      (request) =>
        new Observable((observer) => {
          observer.next({
            data:
              request.operationName === "AdminProfile"
                ? { myProfile: profile }
                : {
                    updateMyProfile: {
                      __typename: "UpdateMyProfilePayload",
                      profile: {
                        ...profile,
                        avatarMediaObjectId: request.variables.input.avatarMediaObjectId,
                      },
                    },
                  },
          });
          observer.complete();
        }),
    ),
  });
  const watched = client.watchQuery<{
    myProfile: Omit<typeof profile, "avatarMediaObjectId"> & { avatarMediaObjectId: string | null };
  }>({ query });
  const seen: Array<string | null> = [];
  const subscription = watched.subscribe((result) => {
    if (result.dataState === "complete") seen.push(result.data.myProfile.avatarMediaObjectId);
  });
  try {
    await client.query({ query });
    for (const mediaId of ["first-avatar", "replacement-avatar", null]) {
      await client.mutate({
        mutation,
        variables: {
          input: {
            displayName: profile.displayName,
            preferredLanguage: "EN",
            avatarMediaObjectId: mediaId,
          },
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
      assert.equal(watched.getCurrentResult().data?.myProfile?.avatarMediaObjectId, mediaId);
      assert.equal(seen.at(-1), mediaId);
    }
  } finally {
    subscription.unsubscribe();
    client.stop();
  }
});
