"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import type { ReactNode } from "react";

import { createApolloBrowserClient } from "@/lib/apollo/ApolloBrowserClient";

type ApolloProviderProps = {
  children: ReactNode;
};

export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <ApolloNextAppProvider makeClient={createApolloBrowserClient}>{children}</ApolloNextAppProvider>
  );
}
