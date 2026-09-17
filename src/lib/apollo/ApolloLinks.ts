import { ApolloLink, CombinedGraphQLErrors, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { getMainDefinition } from "@apollo/client/utilities";
import { getSession } from "next-auth/react";
import { Observable } from "rxjs";

import { getApolloGraphqlUrl } from "@/lib/apollo/ApolloEndpoint";

export function createApolloBrowserLink(): ApolloLink {
  const errorLink = new ErrorLink(({ error, forward, operation }) => {
    const context = operation.getContext();
    if (
      context.authenticated !== true ||
      context.bestAuthRetried === true ||
      !CombinedGraphQLErrors.is(error) ||
      !error.errors.some(({ extensions }) => extensions?.code === "UNAUTHENTICATED")
    ) {
      return;
    }

    operation.setContext({ bestAuthRetried: true });
    return new Observable((observer) => {
      let subscription: { unsubscribe(): void } | undefined;
      void getSession()
        .then((session) => {
          const accessToken = session?.bestApi?.accessToken;
          if (!accessToken) {
            observer.error(error);
            return;
          }
          operation.setContext(({ headers = {} }) => ({
            headers: { ...headers, authorization: `Bearer ${accessToken}` },
          }));
          subscription = forward(operation).subscribe(observer);
        })
        .catch((sessionError: unknown) => observer.error(sessionError));

      return () => subscription?.unsubscribe();
    });
  });
  const retryLink = new RetryLink({
    attempts: (attempt, operation) => {
      const definition = getMainDefinition(operation.query);
      return (
        attempt <= 2 &&
        definition.kind === "OperationDefinition" &&
        definition.operation === "query"
      );
    },
    delay: { initial: 250, jitter: true, max: 1_000 },
  });
  const authLink = new SetContextLink(async (context) => {
    if (typeof window === "undefined" || context.authenticated !== true) return {};
    const session = await getSession();
    const accessToken = session?.bestApi?.accessToken;
    return {
      headers: {
        ...(context.headers as Record<string, string> | undefined),
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      },
    };
  });
  const httpLink = new HttpLink({ uri: getApolloGraphqlUrl() });

  return ApolloLink.from([errorLink, retryLink, authLink, httpLink]);
}
