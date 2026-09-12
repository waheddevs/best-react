# BEST LC Gemini integration plan

Status: approved future direction; planning only. No Gemini code, credentials,
routes, database changes, or live AI behavior are part of the current dashboard
milestone. This plan starts after the Teacher and Student completion gate below.
The active boundaries in `AGENTS.md` continue to apply until that gate passes.

## 1. Goal and scope

Add a role-scoped educational assistant to the localized Teacher and Student
workspaces. Gemini helps create and review drafts, explain released results and
lessons, and research topics with sources. It is never an unrestricted agent and
never acts as the source of truth for grades, test publication, enrolment, account
changes, payments, or other business records.

| Role    | Initial capabilities                                                                                                                                                                            | Later, separately released capability                                                             |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Teacher | Generate test-question drafts from an owned lesson/topic; review a draft test for ambiguity, duplicates, coverage, language, and answer rationale; research a topic with source links           | Suggest rubric-based feedback on original Writing/Speaking submissions, subject to teacher review |
| Student | Explain a released result and the student's permitted mistakes; explain accessible lesson/library content at a chosen level; offer practice examples; research general topics with source links | More personalized learning suggestions from verified progress, after privacy and quality review   |

The Teacher owns every decision to accept, edit, publish, or reject generated
content. Deterministic scoring remains in the existing scoring worker. AI may
suggest feedback but does not issue or change an official grade. There is no
Teacher-to-Student messaging, public-site AI, autonomous web browsing/action,
or broad access to internal records in this milestone.

## 2. Start gate: dashboards first

Do not begin provider integration until all of these are demonstrated in the
existing `best-react` and sibling `best-server` repositories:

1. Teacher and Student route inventories, Uzbek/Russian/English copy, responsive
   states, accessibility, role-protected login, and logout meet sections 20A and
   20B of `AGENTS.md`.
2. The AI target flows use real authorized backend contracts: Teacher test draft
   authoring/review and lesson/material access; Student test attempt, autosave,
   submission, deterministic result/review release, and lesson/library reads.
   The present Teacher preview must not be passed to Gemini as real learner data.
3. Test versions are immutable after publication; a Student receives only an
   assigned version and their own permitted result. Correct answers are absent
   from active attempt and other unauthorized browser payloads.
4. Admin/Teacher review and publication permissions for tests and released
   results work where those actions are required by the target flow. This gate
   does not require unrelated Admin dashboard features to be finished.
5. Relevant backend integration tests, frontend lint/typecheck/build, and
   responsive role journeys pass. Open dashboard defects affecting ownership,
   answer secrecy, result release, or data integrity are resolved first.

Record the gate outcome and any remaining preview-only paths before the first
Gemini implementation PR. If a target backend contract is incomplete, postpone
that AI feature rather than create a fake endpoint or client-side workaround.

## 3. Data and privacy decision before coding

The initial free-tier pilot uses fictional/reserved or demonstrably
non-sensitive educational material. Do not send real learner identity,
submissions, results, voice, contact details, or confidential school records to
the free tier. Free-tier prompts and responses may be used to improve Google's
products; a real-data rollout requires a documented provider/data-processing
decision and an appropriate tier or alternative approved by BEST LC. Do not
assume removing names from free-text answers is sufficient anonymization.

Create a data inventory by feature: source, owner, sensitivity, permitted role,
payload fields, retention, and deletion behavior. Obtain the necessary client
policy/consent decision before processing learner data, especially data from
minors. Send only the minimum context needed for one request. Never include
passwords, session tokens, API keys, full class rosters, raw payment records,
or unrelated student records in prompts, logs, or traces. Review rights before
using licensed books, uploads, or external articles as AI context.

## 4. Architecture and contracts

```text
Teacher / Student UI
  -> existing same-origin GraphQL boundary
  -> NestJS authentication, role, ownership, release-policy checks
  -> AI application service (prompt templates, context selection, validation)
  -> server-side Gemini adapter
  -> validated draft / feedback / cited answer
```

- Keep `best-react` and `best-server` as siblings. Add no Next.js AI API route or
  browser Gemini SDK/key. Use the existing authenticated GraphQL pattern and
  Code Generator for frontend operations. Keep the provider key in backend
  secrets, never in `NEXT_PUBLIC_*` or a GraphQL response.
- Use the official Google GenAI JavaScript/TypeScript SDK in the backend when
  implementation begins. Hide it behind a narrow provider interface so model
  choice, retries, and a future provider change do not alter role/domain code.
- Define one server operation per permitted task, with bounded inputs and
  outputs. Example domains: test-draft generation, draft critique, released
  result explanation, lesson explanation, and sourced research. Avoid a generic
  `runAi(prompt, tools)` operation.
- Load context server-side using existing domain services. Enforce current role,
  group ownership/membership, lesson/library entitlement, result ownership,
  result release, and test-version checks on every request. Treat retrieved text
  as untrusted content, not instructions to grant access or call operations.
- Generate typed structured output for draft questions, critique findings, and
  feedback. Validate schema, length, allowed question types, locale, source
  references, and domain invariants before returning or saving a draft. An AI
  response that fails validation is an error, not a partial success.
- Use request-response calls for short explanations; use the existing Redis/
  BullMQ pattern for longer generation or evaluation, with idempotency,
  cancellation/timeout, retry caps, and a status query. Do not hold a database
  transaction open while awaiting Gemini.
- Keep created AI drafts separate from published test versions. Any new Prisma
  model or migration must first be described and reviewed under the backend
  repository's data-design/migration rules. Record request kind, actor, source
  and version ids, model/prompt version, status, cost/usage metadata, review
  decision, and audit events; avoid raw prompt/answer retention by default.
- Preserve stable locale (`uz`, `ru`, `en`) through requests and responses.
  Store localized editable content through existing translation/version rules;
  never silently overwrite a teacher's authored translation.

## 5. Delivery sequence

### Phase A — policy, baseline, and provider pilot

1. Complete the start gate and data/privacy decision. Update the matching
   backend `AGENTS.md` before its first Gemini code change so both repositories
   state the same deferred-scope exception.
2. Check current Google model availability, pricing, free-tier quotas, data
   terms, SDK, and grounding behavior again at implementation time. Begin with
   a free-tier Flash-Lite class model for low-cost drafts/explanations; compare
   a Flash class model on harder cases. Choose by measured Uzbek/Russian/English
   quality, latency, and quota, not by a hard-coded marketing name.
3. Add backend-only configuration, health checks, provider adapter, bounded
   concurrency, per-user and global rate limits, token/output caps, timeouts,
   429 handling, and a feature flag defaulting off. Keep a no-provider state
   explicit in UI and API behavior.
4. Build a fictional evaluation set in three languages: correct/incorrect
   examples, ambiguous questions, unsupported claims, prompt injection in
   lesson text, and forbidden cross-role or answer-key requests.

Exit: provider calls work with fictional data only; malformed/blocked/limited
responses fail safely; no key or protected context reaches the browser.

### Phase B — Teacher test drafting and review

1. Add an `AI draft` action inside the existing Teacher-owned test-authoring
   flow. Teacher supplies owned group/course/lesson, objective, level, language,
   question types, count, and optional constraints.
2. Generate questions, answer/rationale suggestions, and source references as
   editable drafts. Validate alignment with the chosen lesson and question
   contract. Keep suggested answer keys server-side and Teacher-only.
3. Add a `Review draft` action that flags ambiguity, duplicate choices,
   unsupported facts, difficulty mismatch, and weak distractors. Show evidence
   and uncertainty, not an automatic pass/fail claim.
4. Add a Teacher research action for lesson planning and test preparation.
   Prefer approved lesson/library sources, attach verifiable source links when
   grounding is enabled, and mark unsourced synthesis clearly.
5. Teacher edits/accepts individual items; existing completeness checks and
   publication permissions create the immutable test version. Audit which
   suggestions were accepted or rejected.

Exit: no AI call can publish, edit a published version, or change a learner's
result; every generated question is reviewed before publication.

### Phase C — Student explanation and research

1. Add `Explain this result` only for the Student's own released attempt and
   permitted answer review. Use the authoritative result and released feedback;
   never recalculate marks in Gemini or reveal hidden answer keys.
2. Add `Explain this lesson` on entitled lesson/library pages. Provide concise,
   age/level-appropriate explanations, examples, and optional practice prompts.
3. Disable assessment-specific help during an active timed attempt. The
   assistant must not answer live questions, expose the key, or infer a key
   from Teacher-only material.
4. Add a bounded research action with citations. First use approved course/
   library sources; use Google Search grounding only where available under the
   chosen tier and approved cost policy. Show source titles/links and distinguish
   sourced facts from an AI-generated explanation. If sources are unavailable,
   say so instead of inventing citations.

Exit: a Student sees only their own authorized data; output is labeled AI
assistance, localized, accessible, and useful without claiming an official
grade or verified fact where none exists.

### Phase D — optional Writing/Speaking evaluation suggestions

Start only after the earlier phases and a specific review of sensitive learner
submissions, audio/transcription, rubric quality, and provider terms. Use the
versioned rubric and submission contracts already reserved in `AGENTS.md`:
submission, rubric/version, asynchronous job, criterion evidence, confidence,
model/prompt version, teacher override, and immutable audit. Low-confidence,
inconsistent, or failed suggestions remain in `REVIEW_REQUIRED`. The Teacher
approves any official result through the existing result workflow. AI never
silently promotes a pending submission to a final score.

### Phase E — controlled rollout

Release behind role/feature flags to fictional data, then a small approved
cohort under the applicable data tier. Monitor quota use, 429s, latency,
validation failures, unsafe output, citation quality, teacher rejection rate,
and student feedback. Provide a kill switch and clear unavailable/retry states.
Expand only after the role, privacy, and quality checks remain green.

## 6. UX and quality requirements

- All entry points, status messages, errors, consent/notice copy, and generated
  output requests support Uzbek, Russian, and English. Preserve the active
  locale when following source links or returning to a dashboard page.
- Distinguish `draft`, `checking`, `ready`, `needs review`, `limited`, `failed`,
  and `unavailable`. A timeout or quota error must not look like a completed
  action. Provide a safe retry where idempotent and a manual workflow fallback.
- Explain that AI content can be wrong. Give Teachers an edit/reject control and
  Students a way to report a bad explanation. Do not present model confidence
  as a guaranteed accuracy score.
- Test authorization and ownership at the GraphQL/service layer, including
  cross-group Teacher access, cross-student result access, unreleased results,
  active attempts, answer-key leakage, disabled features, and replayed jobs.
- Test malformed structured output, unsafe content, unsupported language,
  stale test/rubric versions, duplicate requests, provider outage, quota
  exhaustion, timeout, and prompt injection in retrieved content.
- Maintain a reviewed multilingual evaluation set. Compare output to the
  authoritative lesson/result/rubric, check cited URLs, and run regression
  checks when model or prompt versions change. Require zero critical access or
  answer-leak failures and 100% human review before test publication or an
  official subjective grade.

## 7. Cost and operational guardrails

- Free tier is a pilot budget, not an unlimited production entitlement. Gemini
  limits are per project and vary by model; the current quota must be checked
  in AI Studio before each rollout. Configure per-user/day and project-wide
  ceilings, short prompts, output limits, and an explicit 429 fallback.
- Keep provider/model configuration in the backend and log only minimal usage
  metadata. Review data processing, retention, regional availability, and
  billing before changing to a paid tier or sending real learner data.
- Do not enable paid-only grounding or other billable tools by accident. Show
  sources only when the retrieval/grounding path actually supplied them.

## 8. Decision record and current references

- The user chose Gemini as the initial free AI candidate and directed that
  integration follow completion of Teacher and Student dashboards. This plan
  records the future scope; it does not move AI into the active dashboard work.
- Google GenAI SDK: https://ai.google.dev/gemini-api/docs/libraries
- API key security: https://ai.google.dev/gemini-api/docs/api-key
- Pricing/data-use table: https://ai.google.dev/gemini-api/docs/pricing
- Rate limits: https://ai.google.dev/gemini-api/docs/rate-limits
- Structured output: https://ai.google.dev/gemini-api/docs/structured-output
- Search grounding: https://ai.google.dev/gemini-api/docs/google-search

References checked 2026-09-12; recheck at implementation because models,
pricing, quotas, SDK behavior, and data terms can change.
