# BEST LC Academic Test 1 implementation plan

Status: approved and implementation started on 2026-09-23.

## Product decisions

- The product name is `BEST LC Academic Test 1`; `Mock` is not used in UI,
  routes, GraphQL naming, or persisted titles.
- The paper contains Listening, Reading, Writing, and Speaking.
- Assessment content is original English BEST LC material. Uzbek, Russian, and
  English localization applies to application chrome, validation, status, and
  help copy rather than translating the assessment itself.
- Listening and Reading results are answer-first lists. A selected result opens
  the relevant transcript/passage and highlights the server-released evidence
  location.
- Listening transcripts, correct answers, and evidence locations are never sent
  during an active attempt.
- Listening/Reading are scored deterministically. Writing/Speaking wait for an
  asynchronous Teacher review and release.

## Delivery order

1. Record and migrate the additive backend data design.
2. Extend versioned question/answer contracts and deterministic scoring.
3. Add paper catalog, skill attempt, released-result, and Teacher review APIs.
4. Import the single original 2026 paper and its reviewed media references.
5. Generate frontend GraphQL artifacts.
6. Replace the Student preview list/runner with connected catalog, overview,
   skill runners, autosave, and released results.
7. Add the Teacher Writing/Speaking review queue.
8. Run database, API, worker, frontend, accessibility, and responsive checks.
9. Request UI/API acceptance before generating any additional paper.

## Current implementation status

- Completed: additive schema and forward migration, paper catalog API, expanded
  active-attempt API, `objective-v2` scoring, result-history API, answer-first
  Reading/Listening result UI, and exact evidence highlighting.
- Completed: idempotent local seed for `BEST LC Academic Test 1` across the
  existing IELTS groups (Listening 40, Reading 40, Writing 2, Speaking 3).
- Completed checks: Prisma migration deploy, API integration, scoring unit and
  worker integration, frontend typecheck/lint, and production build.
- Next slice: protected Listening audio delivery, Speaking recording upload,
  and the Teacher Writing/Speaking rubric review and release UI/API.

## Student routes

```text
/[locale]/student/tests
/[locale]/student/tests/[testId]
/[locale]/student/tests/[testId]/[skill]/[attemptId]
/[locale]/student/results/[attemptId]
```

The desktop Reading/Listening result uses a list plus evidence panel. Mobile
uses two accessible views (`Answers` and `Passage`/`Transcript`) while retaining
the currently selected answer and highlight.

## Ownership

Student UI, hooks, dictionaries, types, and Sass remain under student-owned
directories. Teacher review code remains under teacher-owned directories.
Generated files under `src/gql/` are tooling-owned and are never edited by hand.
