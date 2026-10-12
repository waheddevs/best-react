import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../best-server/packages/graphql/schema.graphql",
  documents: ["src/graphql/**/*.graphql"],
  config: {
    useTypeImports: true,
    scalars: { DateTime: "string" },
  },
  generates: {
    "src/gql/": {
      preset: "client",
      presetConfig: {
        documentMode: "string",
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
