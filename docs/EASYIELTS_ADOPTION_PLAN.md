# easyIELTS adoption plan

Status: deterministic import complete; provider-backed generation cancelled,
2026-09-28.

## Source and permission

- Source repository: `https://github.com/thinkall/easyIELTS`
- Pinned source commit: `7b39a29fc82304ff2c976495e0250232def1baf4`
- The project owner confirmed that BEST LC has permission to import and adapt the
  source test data and permitted assets.
- Every imported record must retain a stable external source id and the pinned
  source commit so imports are reviewable and idempotent.

The source repository is an input, not a runtime dependency. BEST LC does not
embed the source application's local-storage state, browser-side answer keys,
custom Next.js server, or provider credentials.

## Source inventory

The static source catalogue contains:

- 10 Reading sets;
- 10 Listening sets;
- 10 Writing sets;
- 9 detailed Speaking topics plus three base Part 1/2/3 entries.

Speaking source entries are normalized into complete three-part BEST LC tests;
they are not treated as twelve independent full IELTS tests. The source also
contains a large private media library. Media is admitted only through the
existing BEST LC asset lifecycle and is never copied as an unreviewed directory
or committed Git history.

## Target architecture

```text
Pinned easyIELTS source
  -> deterministic import parser
  -> validated normalized import records
  -> existing versioned BEST LC test entities
  -> PostgreSQL
  -> authorized GraphQL operations
  -> generated Apollo client operations
  -> Teacher editor/read-only preview and Student simulator
```

The existing `Test`, immutable version, section, question, accepted-answer,
attempt, autosave, submission, scoring, result, and media models remain
authoritative. An importer may extend those models only through documented,
additive changes where stable provenance cannot be represented safely.

## Import invariants

- Import is idempotent by `(source, sourceCommit, externalId)`.
- Published versions are immutable; a changed source produces a new reviewed
  draft/version instead of mutating active attempts.
- Unsupported source question structures become explicit review findings and
  are never silently coerced.
- Correct answers, accepted alternatives, rationales, and scoring rules remain
  backend-only during an active Student attempt.
- Source media is registered through the existing private-media contract with
  rights, readiness, malware, and technical metadata checks.
- Database persistence and record counts are verified by integration tests.

## Frontend adoption

The source runner UX is adapted to BEST LC rather than mounted as a second app:

- Reading uses an accessible responsive passage/question split;
- Listening uses authorized audio and data-driven question groups;
- Writing uses Task 1/2 navigation, responsive visual material, an essay editor,
  and word count;
- Speaking uses the persisted three-part recording flow;
- Teacher remains an authoring/read-only-review surface;
- Student remains the only real simulator surface.

Tailwind utility classes from the source are translated into the existing
BEST LC Sass/token system. Source `localStorage`, client scoring, and Next.js API
routes are not adopted.

## Delivery and verification order

1. Pin and inventory source content.
2. Document source-to-BEST field and question-kind mapping.
3. Implement and test the backend import/seed path.
4. Expose imported published content through existing authorized GraphQL
   contracts, adding fields only when required.
5. Regenerate committed GraphQL schema and frontend operation artifacts.
6. Adapt Reading and Listening runners.
7. Adapt Writing and Speaking runners.
8. Verify Teacher preview/editor and Student start/autosave/resume/submit/result
   journeys.
9. Run database, GraphQL, scoring, frontend unit, lint, typecheck, and production
   build checks.
10. Keep the deterministic importer, Teacher authoring flow, and Student runners
    independent of external AI providers.

Provider-backed generation is cancelled. This adoption path must not include an
AI credential, SDK, browser call, backend generation operation, or assistant UI.
