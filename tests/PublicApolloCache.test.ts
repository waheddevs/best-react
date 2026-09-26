import assert from "node:assert/strict";
import test from "node:test";

import { ApolloClient, ApolloLink, gql } from "@apollo/client";
import { Observable } from "rxjs";

const { createApolloCache } = (await import(
  new URL("../src/lib/apollo/ApolloCache.ts", import.meta.url).href
)) as typeof import("../src/lib/apollo/ApolloCache");

const PublicCacheTestDocument = gql`
  query PublicCacheTest($language: String!) {
    publicCourses(language: $language, first: 1) {
      edges {
        node {
          __typename
          id
          language
          title
        }
      }
    }
    publicEvents(language: $language, first: 1) {
      edges {
        node {
          __typename
          id
          language
          title
        }
      }
    }
    publicFaq(language: $language) {
      __typename
      id
      question
    }
    publicExamOfferings(language: $language) {
      __typename
      id
      title
    }
    publicResultVideos(language: $language) {
      __typename
      id
      title
    }
  }
`;

function publicResponse(language: string, title: string, question: string) {
  return {
    publicCourses: {
      edges: [{ node: { __typename: "PublicCourse", id: "shared-course", language, title } }],
    },
    publicEvents: {
      edges: [{ node: { __typename: "PublicEvent", id: "shared-event", language, title } }],
    },
    publicFaq: [{ __typename: "PublicFaqItem", id: "shared-faq", question }],
    publicExamOfferings: [{ __typename: "PublicExamOffering", id: "shared-exam", title }],
    publicResultVideos: [{ __typename: "PublicResultVideo", id: "shared-video", title }],
  };
}

test("Apollo keeps localized public records separate across languages", () => {
  const cache = createApolloCache();
  cache.writeQuery({
    query: PublicCacheTestDocument,
    variables: { language: "EN" },
    data: publicResponse("EN", "English course", "English question?"),
  });
  cache.writeQuery({
    query: PublicCacheTestDocument,
    variables: { language: "UZ" },
    data: publicResponse("UZ", "Uzbek course", "Uzbek question?"),
  });

  const english = cache.readQuery<ReturnType<typeof publicResponse>>({
    query: PublicCacheTestDocument,
    variables: { language: "EN" },
  });
  const uzbek = cache.readQuery<ReturnType<typeof publicResponse>>({
    query: PublicCacheTestDocument,
    variables: { language: "UZ" },
  });

  assert.equal(english?.publicCourses.edges[0]?.node.title, "English course");
  assert.equal(english?.publicEvents.edges[0]?.node.title, "English course");
  assert.equal(english?.publicFaq[0]?.question, "English question?");
  assert.equal(english?.publicExamOfferings[0]?.title, "English course");
  assert.equal(english?.publicResultVideos[0]?.title, "English course");
  assert.equal(uzbek?.publicCourses.edges[0]?.node.title, "Uzbek course");
  assert.equal(uzbek?.publicEvents.edges[0]?.node.title, "Uzbek course");
  assert.equal(uzbek?.publicFaq[0]?.question, "Uzbek question?");
  assert.equal(uzbek?.publicExamOfferings[0]?.title, "Uzbek course");
  assert.equal(uzbek?.publicResultVideos[0]?.title, "Uzbek course");
});

test("cache-and-network serves cached content before refreshing it", async () => {
  const cache = createApolloCache();
  cache.writeQuery({
    query: PublicCacheTestDocument,
    variables: { language: "EN" },
    data: publicResponse("EN", "Cached course", "Cached question?"),
  });
  const client = new ApolloClient({
    cache,
    link: new ApolloLink(
      () =>
        new Observable((observer) => {
          const timer = setTimeout(() => {
            observer.next({ data: publicResponse("EN", "Fresh course", "Fresh question?") });
            observer.complete();
          }, 10);
          return () => clearTimeout(timer);
        }),
    ),
  });
  const titles: string[] = [];

  await new Promise<void>((resolve, reject) => {
    const subscription = client
      .watchQuery<ReturnType<typeof publicResponse>>({
        query: PublicCacheTestDocument,
        variables: { language: "EN" },
        fetchPolicy: "cache-and-network",
      })
      .subscribe({
        next(result) {
          const title = result.data?.publicCourses?.edges?.[0]?.node?.title;
          if (title) titles.push(title);
          if (title === "Fresh course") {
            subscription.unsubscribe();
            resolve();
          }
        },
        error: reject,
      });
  });

  assert.deepEqual(titles, ["Cached course", "Fresh course"]);
});
