# BEST LC public website

Frontend-only public website for BEST LC, built with Next.js App Router, strict TypeScript, Tailwind CSS, Material UI, and Motion for React.

## Run locally

This project uses Yarn 4 through Corepack.

For development:

```bash
corepack enable
yarn install
yarn dev
```

If the current Windows installation does not allow Corepack to create global shims, run the same commands as `corepack yarn install` and `corepack yarn dev`.

Open `http://localhost:3000`; the locale proxy redirects the root path to `/uz`.

For a production build and local production server:

```bash
corepack yarn build
corepack yarn start
```

Run Next.js through Yarn; `next start` by itself expects a global `next`
executable and is not the project command.

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

The site provides locale-prefixed Uzbek, Russian, and English versions of Home, Courses, Events, Results, Library, Exams, About, FAQ, and Contact pages. Course, event, and library detail routes are statically generated from typed local data.

## Content status

The official logo asset and verified business contact details have not been supplied. The UI therefore uses a temporary text mark and clearly labels draft programme, schedule, contact, result, and business content for later confirmation.
