import "server-only";

import { HttpLink, type OperationVariables, type TypedDocumentNode } from "@apollo/client";
import { ApolloClient, registerApolloClient } from "@apollo/client-integration-nextjs";

import { createApolloCache } from "@/lib/apollo/ApolloCache";
import { getApolloGraphqlUrl } from "@/lib/apollo/ApolloEndpoint";
import { toPublicApiError } from "@/lib/apollo/ApolloError";

type ApolloServerOperationOptions = {
  accessToken?: string;
  cache?: RequestCache;
  revalidate?: number;
};

const { getClient } = registerApolloClient(
  () =>
    new ApolloClient({
      cache: createApolloCache(),
      link: new HttpLink({ uri: getApolloGraphqlUrl() }),
    }),
);

function operationContext(options: ApolloServerOperationOptions) {
  return {
    fetchOptions: {
      ...(options.cache ? { cache: options.cache } : {}),
      ...(options.revalidate === undefined ? {} : { next: { revalidate: options.revalidate } }),
    },
    headers: options.accessToken ? { authorization: `Bearer ${options.accessToken}` } : {},
  };
}

export async function executeApolloQuery<TResult, TVariables extends OperationVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  options: ApolloServerOperationOptions = {},
): Promise<TResult> {
  try {
    const result = await getClient().query({
      context: operationContext(options),
      errorPolicy: "none",
      fetchPolicy: "no-cache",
      query: document,
      variables,
    });
    return result.data as TResult;
  } catch (error) {
    throw toPublicApiError(error);
  }
}

export async function executeApolloMutation<TResult, TVariables extends OperationVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  options: ApolloServerOperationOptions = {},
): Promise<TResult> {
  try {
    const result = await getClient().mutate({
      context: operationContext(options),
      errorPolicy: "none",
      fetchPolicy: "no-cache",
      mutation: document,
      variables,
    });
    if (!result.data) throw new Error("GraphQL mutation returned no data.");
    return result.data as TResult;
  } catch (error) {
    throw toPublicApiError(error);
  }
}
