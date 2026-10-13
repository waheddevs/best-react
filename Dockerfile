# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim AS build
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable
COPY . .
# Public configuration only. Never pass authentication secrets as build arguments.
# The API must be healthy with the restored database before this build runs.
ARG BEST_API_INTERNAL_URL
ARG BEST_SITE_URL
ENV BEST_API_INTERNAL_URL=$BEST_API_INTERNAL_URL \
    BEST_SITE_URL=$BEST_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
RUN test -n "$BEST_API_INTERNAL_URL" && test -n "$BEST_SITE_URL"
RUN yarn lint
# Apollo integration requires a separately provisioned test DB, never production data.
RUN find tests -name '*.test.ts' ! -name 'ApolloIntegration.test.ts' -print0 | xargs -0 node --experimental-strip-types --test
RUN yarn build && yarn typecheck

FROM node:24-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
