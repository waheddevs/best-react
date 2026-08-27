# BEST LC public website

BEST LC public website with a narrowly scoped Auth.js social-login boundary,
built with Next.js App Router, strict TypeScript, Tailwind CSS, Material UI, and
Motion for React.

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

## Social authentication setup

The localized `/[locale]/login` and `/[locale]/signup` screens use Auth.js with
Google, Facebook, and Apple. Copy `.env.example` to `.env.local`, replace every
placeholder, and keep the real values out of source control.

Register these local callback URLs for Google and Facebook:

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/facebook`

Production provider settings must use the deployed HTTPS origin with the same
callback paths. Apple web authentication must use an HTTPS callback such as
`https://your-domain.example/api/auth/callback/apple`; it also requires a
Services ID, associated App ID, verified domain, return URL, and generated
client secret. The related provider button stays disabled until both required
environment values are present.

Authentication currently uses a JWT session without a user database. It does
not include email/password registration, password reset, roles, dashboards, or
route protection.
