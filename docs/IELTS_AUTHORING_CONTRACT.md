# IELTS authoring contract

Status: Phase 0 contract baseline, 2026-09-27. This document defines the
deterministic draft shape that Teacher authoring, PDF import, dynamic previews,
and Student delivery must share. Provider-backed generation is out of scope.

## Ownership and authority

- `best-server` is authoritative for role/ownership checks, draft mutations,
  validation, answer secrecy, and publication.
- `best-react` may mirror validation for immediate Teacher feedback, but a
  browser result never authorizes publication.
- Published versions are immutable. Import proposals are never published
  records and cannot overwrite a Teacher draft without confirmation.
- Student active-attempt operations receive renderable prompts/options only;
  correct answers, rationales, import confidence, and review notes stay outside
  that payload.

## Normalized draft

```text
IeltsAuthoringDraft
  skill, primaryLanguage, translations, settings
  sections[]
    id, position, translations, contentBlocks[]
  questions[]
    id, sectionId, position, kind, translations
    answerLimit?, maxSelections?, options[]
    answerProposal[], rationale?, sourceReference?
```

Supported question kinds initially match the backend enum:

- `SINGLE_CHOICE`
- `MULTIPLE_CHOICE`
- `TRUE_FALSE_NOT_GIVEN`
- `YES_NO_NOT_GIVEN`
- `MATCHING`
- `SHORT_TEXT`
- `LONG_TEXT`
- `AUDIO_RESPONSE`

The importer must report unsupported IELTS structures as review issues. It must
not silently coerce them into a different type.

## Ordered content blocks

| Kind             | Required data                                    | Renderer behavior                                       |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `HEADING`        | localized text and level                         | semantic heading, no executable markup                  |
| `RICH_TEXT`      | localized plain/allow-listed rich text           | wraps naturally; no fixed-height container              |
| `IMAGE`          | private media id, dimensions, localized alt text | responsive intrinsic ratio; zoom may be offered         |
| `TABLE`          | localized caption, header and body cells         | horizontal containment on narrow screens                |
| `AUDIO`          | private media id and duration                    | authorized audio player; no generated placeholder audio |
| `QUESTION_GROUP` | ordered question ids                             | places normalized inputs without embedding form HTML    |

Content blocks are intentionally ordered. A section's previous single `content`
and `mediaObjectId` fields map into blocks during migration/adapter work; the
legacy fields are not sufficient for mixed passages, maps, charts, and tables.

## Skill rules

### Listening

- One or more ordered sections.
- Objective questions belong to an existing section.
- An audio block is required before publication for a full listening paper.
- Question count is data-driven; the layout must not assume 40.

### Reading

- One or more ordered passage sections.
- Every section has readable content blocks and one or more questions.
- Question count is data-driven; long text, images, and tables remain usable on
  mobile and desktop.

### Writing

- IELTS Academic/General full practice contains ordered Task 1 and Task 2
  sections with one `LONG_TEXT` response question each.
- Task metadata includes suggested minutes and minimum words rather than
  deriving them from visual position in the client.
- Task 1 may contain one or more image/table blocks; Task 2 may be text-only.

### Speaking

- Three ordered parts.
- Part 2 contains one cue-card prompt with ordered bullet prompts and timing
  metadata. Parts 1 and 3 contain a data-driven number of prompts.
- Responses use `AUDIO_RESPONSE`; no correct-answer proposal is required.

## Validation and publication

Validation findings contain a stable code, severity (`ERROR` or `WARNING`),
path, and optional related source page/region. Publication is blocked by:

- empty or duplicate ids/positions;
- missing primary-language title, instructions, prompt, or required alt text;
- questions pointing to missing sections;
- invalid kind-specific options, selections, answer limits, or answers;
- missing required Writing/Speaking structure or Listening audio;
- unknown content block kind, invalid media dimensions, or invalid crop bounds;
- unresolved critical import findings or missing source-rights confirmation.

The initial frontend validator implements structural checks for fast feedback.
The backend implementation must repeat and own these checks before accepting a
publish mutation.

## Renderer mapping

| Authoring field                 | Teacher preview                          | Student runner                          |
| ------------------------------- | ---------------------------------------- | --------------------------------------- |
| `skill`                         | selects skill theme and preview shell    | selects dynamic layout preset           |
| section `position`              | orders navigation and preview            | orders navigation and groups questions  |
| content blocks                  | read-only source preview                 | authorized source/task material         |
| question `kind`                 | shows expected input and answer proposal | selects the normalized response control |
| `answerLimit` / `maxSelections` | validation/read-only metadata            | constrains response input               |
| option translations             | localized answer preview                 | localized selectable options            |
| `answerProposal` / `rationale`  | Teacher-only                             | never sent during an active attempt     |

## Next backend slice

Before changing Prisma, record the matching data design in `best-server` and
update its repository instructions for the approved Phase 0 work. Then extend
GraphQL authoring inputs/objects and integration tests. Frontend operations and
UI follow generated schema artifacts; they must not invent an alternate API.
