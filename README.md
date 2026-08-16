# BEST LC public website

Frontend-only public website for BEST LC, built with Next.js App Router, strict TypeScript, Tailwind CSS, Material UI, and Motion for React.

## Run locally

This project uses Yarn 4 through Corepack.

For development:

```bash
corepack enable
yarn install
yarn run start
```

If the current Windows installation does not allow Corepack to create global
shims, use `corepack yarn install` and `corepack yarn run start`.

Open the public website at `http://localhost:3001/website`.

For a production build and local production server:

```bash
corepack yarn build
corepack yarn run start:production
```

`yarn run start` launches the development server on port `3001`. Use
`yarn run start:production` after a production build when testing the optimized
server locally.

## Verification

```bash
yarn format:check
yarn lint
yarn typecheck
yarn build
```

Use `yarn format` to format the source manually. VS Code is configured to use
Prettier automatically when a supported file is saved.

## Public routes

The public website lives under `src/app/website` and uses `/website` routes. Course, event, and library detail routes are statically generated from typed local data. Future application areas such as teachers, student, and admin can be added as sibling folders under `src/app` with their own layouts.

## Content status

The official logo asset and verified business contact details have not been supplied. The UI therefore uses a temporary text mark and clearly labels draft programme, schedule, contact, result, and business content for later confirmation.
