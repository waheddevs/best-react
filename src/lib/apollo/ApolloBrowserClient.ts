import { ApolloClient } from "@apollo/client-integration-nextjs";

import { createApolloCache } from "@/lib/apollo/ApolloCache";
import { createApolloBrowserLink } from "@/lib/apollo/ApolloLinks";

export function createApolloBrowserClient(): ApolloClient {
  return new ApolloClient({
    cache: createApolloCache(),
    link: createApolloBrowserLink(),
  });
}
