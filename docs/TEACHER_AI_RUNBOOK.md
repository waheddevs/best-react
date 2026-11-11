# Teacher AI activation and rollback

The feature is implemented but disabled by default. Existing Teacher tools do
not require an OpenRouter credential. Student/Admin AI, automatic school context,
grading, files, tools and paid models remain outside this release.

## Local preparation

From `best-server`, with PostgreSQL and Redis available:

```powershell
corepack yarn install --immutable
corepack yarn database:generate
corepack yarn build
corepack yarn assistant:test:integration
```

The integration suite creates and drops its own random `best_ai_test_*` database,
applies all migrations and uses an isolated Redis queue with a fictional provider
transport. It never calls OpenRouter. The configured PostgreSQL test role needs
permission to create a disposable database. Do not point tests at production.

Apply the additive migration to the intended local/deployment database through
the normal migration procedure, with AI disabled:

```powershell
corepack yarn database:migrate:status
corepack yarn database:migrate:deploy
```

The new migration is `20261107010000_teacher_ai_chat`. It was exercised on fresh
temporary PostgreSQL databases, then applied to the existing local
`127.0.0.1:5432/best` database after confirming it was the only pending migration.
No production database was changed. Never rewrite an already applied migration
or reset a business DB.

The API generates the code-first GraphQL schema in development. From `best-react`
run `corepack yarn codegen` after schema changes. AI operations have already been
generated in `src/gql/`; do not edit them manually.

## Live pilot configuration

Place the key in ignored `best-server/.env`, never in chat or frontend variables.
Use the same settings for API and assistant worker. Resolve the chosen Teacher's
UUID from the backend account, rather than treating an email/client role as access.

```dotenv
TEACHER_AI_CHAT_ENABLED=true
OPENROUTER_API_KEY=<server-side-key>
AI_CHAT_MODEL=xingchen-agi/xing4.0-29b-a4b:free
AI_CHAT_PROVIDER_ENDPOINT=phala
AI_CHAT_PRIVACY_REVIEWED=true
AI_CHAT_PILOT_TEACHER_IDS=<backend-teacher-uuid>
AI_CHAT_PROCESSING_NOTICE_VERSION=teacher-ai-v1
AI_CHAT_RETENTION_DAYS=7
AI_CHAT_DAILY_BUDGET_USD=0
AI_CHAT_DAILY_REQUEST_LIMIT=40
AI_CHAT_TEACHER_DAILY_REQUEST_LIMIT=10
AI_CHAT_REQUESTS_PER_MINUTE=10
AI_CHAT_CONCURRENCY=1
AI_CHAT_MAX_INPUT_CHARACTERS=4000
AI_CHAT_MAX_CONTEXT_TOKENS=8192
AI_CHAT_MAX_OUTPUT_TOKENS=1024
AI_CHAT_TIMEOUT_MS=60000
```

Verify the pinned model exists, every catalog price is zero, its context window
is sufficient, and the chosen endpoint supports denied data collection and ZDR.
Before setting `AI_CHAT_PRIVACY_REVIEWED=true`, review the exact model/endpoint
against the live ZDR endpoint catalog. The gateway requires a matching model ID
and endpoint tag, `safety_retention=false`, and online status before every call.
Request-level `zdr:true` enforces ZDR independently of account-wide enforcement,
but account defaults can also permit Safety Retention; the explicit endpoint check
excludes that tier. Account-wide privacy settings were not inspected or changed.
If there is no eligible free endpoint, leave
the feature unavailable; do not silently relax privacy or choose a paid model.
See [provider routing](https://openrouter.ai/docs/guides/routing/provider-selection)
and [ZDR](https://openrouter.ai/docs/guides/features/zdr).

The gateway checks fresh model prices and endpoint privacy before each dispatch, pins the endpoint,
disables fallback, requests zero maximum prices and records usage. A free quota
or unavailable provider produces an honest error. Application caps do not guarantee
provider capacity. Input is bounded using conservative UTF-8 bytes plus framing;
review the selected model's tokenizer family before activating it. The current
model uses [SentencePiece](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B/blob/main/tokenization_xing4_0.py).
The byte-based estimate is conservative for ordinary lesson text, not an exact
tokenizer count; the configured 8192-token budget is well below the reviewed
262144-token provider context window.

On 2026-11-08 the selected free model and Phala endpoint passed live metadata
checks and the supplied active Teacher was added to the local allowlist. The
key is in ignored `best-server/.env`; committed examples contain placeholders.
Two separate direct inference checks returned HTTP 429. The owner also signed
in locally and sent a request through the UI: the stored run is FAILED/RATE_LIMITED
with a REJECTED provider call. The one accepted app request is below the daily
Teacher quota. Key metadata still reported total/daily usage USD 0. A successful
live reply is therefore still pending. UI copy describes a temporary restriction
without claiming that the Teacher exhausted their own quota.
The local frontend is running at `http://localhost:3107`, API at port 4199,
and the separate assistant worker is running. Port 3000 belongs to another project.

Start separate local processes with `corepack yarn dev:api` and
`corepack yarn dev:assistant`, then the frontend with `corepack yarn dev`.
`BEST_API_INTERNAL_URL` must point to that API; browser operations use the existing
same-origin `/best-api/graphql` rewrite. Set `BEST_DASHBOARD_PREVIEW=false` for
connected testing and sign in with the selected Teacher account.

## Teacher smoke test

1. Open the lower-right AI button; accept the displayed processing notice and send a
   fictional teaching question. Verify queued/generating and a persisted reply.
2. Expand to `/en/teacher/ai-assistant/<id>`, refresh, and confirm the same history.
   Switch between panel and page with an unsent draft.
3. Rename, cancel an in-flight request, archive, and open archived history.
4. Try mobile Back/Escape, light/dark, Uzbek/Russian/English and a second tab.
5. Verify another Teacher cannot read the conversation. Check that reported usage
   is zero and no transcript or key appears in logs.

Real provider response quality/latency and free endpoint availability require this
final live smoke test. All automated inference checks used fictional responses.

## Deployment and rollback

`Dockerfile` includes the independent assistant worker. `compose.production.yml`
adds an optional `teacher-ai` profile, shared configuration and a 384 MB worker
limit. Syntax was validated with fictional secret placeholders; no deployment
or Docker image build was performed during this task.

Deploy the additive schema and compatible services disabled first. After pilot
configuration, enable the worker with the deployment's `--profile teacher-ai`.
Keep the worker running for retention maintenance even when dispatch is disabled.

To roll back, set `TEACHER_AI_CHAT_ENABLED=false` in both API and worker and restart
both. New sends and dispatch are blocked; retained history remains readable. An
already transmitted provider request cannot be recalled. Do not remove tables or
stop retention maintenance as a rollback shortcut. Cancellation suppresses reply
publication and cannot promise provider-side erasure.

The worker marks expired leases safely; uncertain dispatched requests become
`FAILED/AMBIGUOUS` and are never automatically replayed. Safe explicit retries
reuse the original user message but consume a new quota slot. A nonzero cost
report creates `AI_COST_POLICY_VIOLATION` and permanently blocks dispatch until a
reviewed recovery change. Never truncate the audit ledger to restore service.

Seven-day retention describes active conversation storage from creation. Backups,
content-free audit/outbox retention and downstream provider policies are separate.
Change the notice version whenever the externally disclosed processing policy
changes; old conversations then require a new conversation and fresh consent.
