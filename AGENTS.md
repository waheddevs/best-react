# BEST LC Website and Role Workspaces — Project Instructions

## 1. Project mission

Build a production-quality public website and localized Teacher Workspace for
**BEST LC**, an education brand. The product must feel **minimalistic, creative,
bright, modern, trustworthy, and professional**. This is a real project, not a
generic demo or an off-the-shelf admin template.

The public website is now an approved full-stack milestone backed by the sibling
`best-server` GraphQL/PostgreSQL application. Teacher remains a frontend preview;
Student and Admin use their separately approved connected contracts. Preserve
the public website described in the BEST LC Notion plan:

- Home
- Events
- Courses
- Results
- Exams
- About us with an embedded FAQ section
- Contact
- Language switching

Source plan:
https://strong-cartwheel-b38.notion.site/BEST-LC-3a7609e0e68d80639a23c4c941e8ad5d

The active milestone now includes the localized Teacher Workspace described in
sections 2C and 20A plus the approved Student Workspace, operational Admin
Workspace, and their backend integration described in sections 2D and 20B-20D.
The Teacher inventory still comes from the user-supplied 102.2-second mobile
reference video `IMG_7623.MP4`, except the Teacher chat workflow that the user
explicitly removed from scope.

## 2. Non-negotiable scope boundaries

Do not implement or scaffold any of the following outside the approved
Student, Teacher, and operational Admin milestones:

- Parent/Guardian dashboards
- Super Admin, platform-owner, or infrastructure-administration tools
- Password reset, custom credentials authentication, or account dashboards
  beyond the explicitly approved auth-shell exception below
- Payment-provider checkout, card collection, bank transfer initiation, payroll
  execution, or refunds
- Certificates or AI grading
- Teacher or Student chat
- Fake integrations or buttons that pretend to perform server-side work

Public exam pages may explain exam formats, rules, dates, and registration steps,
and accept registration requests, but users must not be able to take an exam on
the public website.

### 2E. Approved public website backend integration

- Public courses, events and event detail content, About FAQ, exam offerings and
  MOCK sessions, and result-video metadata are owned by PostgreSQL and loaded
  through the sibling NestJS GraphQL API. Do not reintroduce runtime business-
  content arrays in frontend data modules.
- UI-only labels and navigation copy remain in the localized frontend
  dictionaries. All mutable business/editorial content is localized in the
  database for Uzbek, Russian, and English.
- Course registration, event registration, exam registration, and Contact
  messages are real public GraphQL mutations. They require explicit consent,
  validate input on client and server, persist intake records, and show success
  only after the API accepts the request.
- The frontend consumes backend schema artifacts with GraphQL Code Generator.
  Generated files under `src/gql/` are tooling-owned exceptions to handwritten
  filename/export conventions and must never be edited manually.
- Use `BEST_API_INTERNAL_URL` for Server Component reads and the same-origin
  `/best-api/graphql` rewrite for browser mutations. Do not add duplicate Next.js
  API routes or expose backend infrastructure credentials to the browser.
- Every new or changed public query/mutation needs a proportional API integration
  test using fictional/reserved test data and database persistence assertions.

Student, Teacher, and operational Admin frontend/backend work is approved only
within sections 2C, 2D, and 20A-20D. Stop and ask before adding a Parent portal,
Super Admin, credentials registration/password reset, payment-provider
processing, certificates, AI grading, chat, or unrelated backend capability.

The localized Student Library at `/[locale]/student/library` remains
student-owned and is now integrated into the approved Student application shell.
Its content, slugs, feature logic, data, types, dictionaries, and styles must
remain under student-owned directories.

## 2A. Approved auth-shell and social-auth exception

The user explicitly approved localized login and signup screens, a frontend role
selection step, and real Google, Facebook, and Apple verification. This
exception is deliberately narrow:

- Own the UI at `/[locale]/login` and `/[locale]/signup` inside an `(auth)` route
  group with a dedicated full-screen shell and no public Navbar or Footer.
- Keep the mirrored full-screen background in the shared `(auth)/layout.tsx` so
  it remains stable while the login and signup panels transition independently.
- Use Auth.js with the App Router callback handler at
  `/api/auth/[...nextauth]`, JWT sessions, secure HttpOnly cookies, and logout.
- Keep provider credentials in ignored environment files. Commit only an
  `.env.example` template; never commit secrets, private keys, or provider
  tokens.
- Keep Google, Facebook, and Apple actions disabled when their required
  credentials are absent. Do not pretend verification succeeded.
- Before either auth form, show the localized liquid-glass role selector for
  Teacher, Student, and operational Admin. Preserve the selected role through
  the localized Login/Signup switch with a validated query parameter; missing
  or unknown values must return to the selector.
- Teacher forms add a Teacher ID field and Admin forms add an Admin ID field.
  Student forms retain the existing fields. Login uses role ID where applicable,
  email, and password; Signup additionally uses name and confirmation.
- Show Google, Facebook, and Apple verification only for the Student role.
  Teacher and Admin auth forms must not render the social divider or provider
  controls.
- The Admin option represents operational staff who will later manage learners,
  attendance, and payment status. It is not Super Admin. Do not add Super Admin
  to this selector or scaffold its future separate URL without fresh approval.
- A client-selected role, role ID, or query parameter is presentation state,
  never trusted authorization. The auth shell still does not authorize
  email/password registration, password reset, or email delivery. Database-
  backed identity mapping, server-loaded roles, route protection, and field-
  level authorization are approved only for the Student/Admin integration in
  section 2D and must be implemented by the sibling backend; never trust the
  selector or query parameter itself.
- The approved auth card may show email, password, confirmation, and forgot-
  password controls to match the supplied visual reference. Until credentials
  auth is separately approved, these values must never leave the browser or be
  stored; submission clears the form and shows a localized unavailable notice.
- Keep auth copy localized in Uzbek, Russian, and English under
  `dictionaries/public/Auth.ts`, server-only provider availability in
  `config/AuthProviders.ts`, and auth presentation/actions in `features/auth/`.
- Do not render a separate locale switcher inside the auth shell. Every Login,
  Signup, enrolment-to-auth, mode-switch, provider-error, and auth-home link must
  preserve the active localized route so users enter auth in their current
  Uzbek, Russian, or English context.
- Public routes use `SiteChrome`. Auth, Student, Teacher, and Admin routes each
  bypass it and use their own role-appropriate shell while remaining under the
  locale root providers.

## 2B. Client-preview content convention

This milestone is a client-preview prototype. Until the client supplies real
business content and backend contracts, use complete, thematic fictional
placeholder data throughout the public website and all role workspaces so
layouts, content density, filtering, detail pages, and workflows can be
reviewed realistically. Connected Student/Admin data replaces fixtures through
explicit adapters only when an authenticated backend contract is available.

- Placeholder content may include course details, event schedules, preview
  statistics, fictional learner stories, teacher profiles, business history,
  contact details, addresses, and social links.
- Keep all replaceable content centralized in typed dictionaries or data
  modules. Mark it at the data level as preview/placeholder content or add one
  concise ownership comment so it cannot be mistaken for production truth.
- Use obviously reserved values for technical contact identifiers where
  practical, such as `.example` email domains and zero-filled phone numbers.
- Do not use a real person's identity, quote, score, or private information as
  fictional content. Licensed stock footage with recognizable people may be
  used only as clearly marked generic client-preview material; never identify
  its subjects as BEST LC learners or imply their endorsement. Keep creator,
  source-page, and license metadata centralized with the media data. Fictional
  people and AI/editorial visuals must remain clearly synthetic preview
  material.
- Replace preview content with client-supplied real data before production
  launch, while preserving the established types and presentation structure.
- This convention authorizes fictional preview content, not fake functionality.
  Approved public registration/contact flows use real persistence as specified
  in section 2E. Never simulate payments or other backend flows without fresh
  explicit approval.

## 2C. Approved Teacher Workspace exception

The user explicitly approved a complete localized Teacher Workspace based on
the supplied mobile reference video. This exception is deliberately limited to
the teacher-owned frontend preview:

- Own the workspace at `/[locale]/teacher` and the child routes listed in
  section 20A, inside the `(teacher)` route group with a dedicated responsive
  application shell and no public Navbar or Footer.
- Deliver one responsive Next.js web application, not a separate native mobile
  application. Desktop/web and mobile presentations share the same routes,
  typed data, interaction logic, and feature set.
- Reproduce every in-scope screen, content section, navigation item, control,
  state, and function visible in the reference video. The Teacher chat shortcut,
  search, member list, composer, and attachment workflow are explicitly removed
  and must not be implemented. Do not reduce the remaining inventory to only
  Overview, Courses, Schedule, Students, and Settings.
- Treat the video as a product-structure and interaction reference, not a source
  of production data or a pixel-perfect mandate. Do not copy names, phone
  numbers, financial figures, messages, avatars, or other identifying content
  visible in the recording. Use centralized fictional preview data and reserved
  technical identifiers.
- The workspace remains unprotected until real Teacher credential verification
  and authorization are separately approved. It must not expose real learner,
  teacher, attendance, payment, salary, session, or account data.
- All required preview interactions use in-memory fictional state unless this
  file explicitly permits a safe browser preference such as the teacher-only
  night-mode setting. Session-local changes reset on refresh and must be
  disclosed as preview behavior where a user could otherwise mistake them for
  saved server data.
- Search, filters, tabs, drawers, dialogs, menus, accordions, language routing,
  theme switching, and local message/task state may work fully in the browser.
  No teacher action may call an API, send a message, place a phone call, upload
  a file, change a password, create or delete an account, alter a real session,
  modify a payment, or persist business data.
- Buttons representing future server work must still have the visible and
  accessible UI required by the video, but their preview outcome must be honest:
  open the relevant form/detail/confirmation, update only fictional in-memory
  state when specifically allowed in section 20A, or show a localized
  unavailable notice. Never claim that remote work succeeded.
- Real Auth.js logout may continue to operate for an actual provider session.
  The Teacher Workspace does not authorize Teacher credentials auth, role
  claims, redirects based on trusted roles, or route guards.
- Keep all teacher route components, features, hooks, CSS, dictionaries, typed
  preview data, and types under teacher-owned directories. Do not leak Teacher
  Workspace copy or business entities into public or student ownership.

## 2D. Approved Student/Admin frontend and backend milestone

The user explicitly approved sections 20B-20D and authorized implementation in
both this frontend repository and the sibling `best-server` backend repository.

- Build every Student and operational Admin route listed in sections 20B and
  20C in Uzbek, Russian, and English.
- Build frontend and backend together by domain, preserving the existing
  backend architecture and completed contracts instead of rebuilding them.
- Use real backend queries/mutations where an approved, secure contract exists.
  Keep an honest typed preview adapter only where a backend contract is not yet
  complete.
- Add database models and migrations only after recording their design in the
  backend repository, following its AGENTS.md migration rules.
- Implement server-side Student/Teacher/Admin authorization and ownership.
  Client route visibility or role query parameters are never authorization.
- Backend-driven loading, empty, error, retry, permission, pagination,
  validation, conflict, and persistence states are now in scope and must be
  developed alongside each connected frontend slice.
- Student tests may become a real authorized test runner only through the
  existing versioned attempt/autosave/submission/scoring contracts. Never expose
  correct answers or calculate authoritative results in the browser.
- Student/Admin payment surfaces may connect to verified invoice and ledger
  records, but payment-provider checkout, card/bank collection, refunds, and
  payroll execution remain out of scope.
- Preserve the repositories as siblings. Do not move `best-react` into
  `best-server` or create a combined monorepo.
- Keep all four product surfaces visually distinct as defined in section 11A.

## 3. Required technical stack

- Latest stable **Next.js** using the **App Router**
- **React** version selected by the current stable Next.js installer
- **TypeScript** in strict mode
- **Tailwind CSS** using the current official Next.js installation approach
- **Material UI (MUI)** for Material icons and selected accessible interactive
  UI primitives
- **Motion for React** (`motion`) only for animations that are not better served
  by CSS transitions
- ESLint using the configuration generated or recommended by current Next.js
- Package manager: preserve the existing lockfile; if no lockfile exists, use npm

Application source must use `.ts` and `.tsx`. Do not create `.js` or `.jsx`
application files. Tool-required configuration files such as
`eslint.config.mjs` or `postcss.config.mjs` are allowed when required by their
official documentation.

MUI is the approved component library for icons and selected UI materials. Do
not introduce another component framework or a prebuilt visual theme. Tailwind
remains the primary layout and brand-styling system, while MUI components must be
themed specifically for BEST LC rather than retaining their default appearance.

## 4. Documentation-first rule

Implementation must stay within current stable official documentation. Before
using a Next.js API or changing framework configuration, verify that the API is
documented for the current stable App Router.

Primary references:

- App Router: https://nextjs.org/docs/app
- Installation: https://nextjs.org/docs/app/getting-started/installation
- Project structure: https://nextjs.org/docs/app/getting-started/project-structure
- TypeScript: https://nextjs.org/docs/app/api-reference/config/typescript
- Internationalization: https://nextjs.org/docs/app/guides/internationalization
- Metadata and OG images:
  https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Image optimization: https://nextjs.org/docs/app/getting-started/images
- Tailwind with Next.js:
  https://tailwindcss.com/docs/installation/framework-guides/nextjs
- Motion for React: https://motion.dev/docs/react
- Reduced motion: https://motion.dev/docs/react-use-reduced-motion
- MUI with Next.js: https://mui.com/material-ui/integrations/nextjs/
- MUI Material Icons: https://mui.com/material-ui/material-icons/
- MUI theming: https://mui.com/material-ui/customization/theming/

Rules:

- Do not copy an old Pages Router pattern into the App Router.
- Do not use deprecated Next.js APIs.
- Do not copy Tailwind v3 configuration into a newer Tailwind project.
- Do not suppress framework, TypeScript, or ESLint errors to make a build pass.
- When documentation and an assumption conflict, follow the documentation.
- Keep `devIndicators: false` in `next.config.ts` so the Next.js development
  tools launcher does not overlap the website UI. This hides only the launcher;
  build and runtime errors must remain visible through the normal dev tooling.

## 5. Next.js architecture rules

- Use `src/` to separate application code from root configuration.
- Use the App Router only; do not create a `pages/` directory.
- Pages and layouts are Server Components by default.
- Add `'use client'` only to the smallest interactive leaf component that needs
  state, effects, browser APIs, theme switching, filtering, or Motion hooks.
- Do not turn an entire route into a Client Component solely for animation.
- Use `next/link` for internal navigation.
- Use `next/image` for raster images and provide meaningful `alt` text.
- Use the locally bundled official `geist` package for optimized typography.
- Use the Metadata API for route metadata.
- Use static local data and static rendering for this frontend milestone.
- Use `generateStaticParams` for locale and local dynamic routes when suitable.
- Use `notFound()` for unknown local slugs.
- Provide `not-found.tsx`; add loading UI only where it improves the experience.
- Do not add Next.js API routes, route handlers, or server actions beyond the
  approved Auth.js handler. Public data and submissions use the sibling API.

## 6. Recommended source structure

Use this structure as the default. Small refinements are allowed when they make
the code cleaner without changing scope.

```text
src/
  app/
    [locale]/
      (public)/
        (home)/
          HomeHero.tsx
          HeroCopy.tsx
          TrustStrip.tsx
          FeaturedCourses.tsx
          LearningProcess.tsx
          ResultsPreview.tsx
          UpcomingEvents.tsx
          FinalCta.tsx
          HeroVisual.tsx
          page.tsx
        courses/
          CoursesHero.tsx
          CoursesCatalog.tsx
          LanguageCourses.tsx
          CourseComparison.tsx
          LearningProcess.tsx
          CoursesCta.tsx
          page.tsx
          [slug]/
            CourseHero.tsx
            CourseHeroVisual.tsx
            CourseOverview.tsx
            CourseAudience.tsx
            CourseTracks.tsx
            CourseOutcomes.tsx
            CourseCurriculum.tsx
            CoursePrerequisites.tsx
            CourseSidebar.tsx
            page.tsx
        events/
          EventsHero.tsx
          EventsCatalog.tsx
          page.tsx
          [slug]/
            EventHero.tsx
            EventTopics.tsx
            EventDetails.tsx
            page.tsx
        results/
          ResultsHero.tsx
          ResultStories.tsx
          LearningJourney.tsx
          OutcomeCategories.tsx
          ResultsCta.tsx
          page.tsx
        exams/
          ExamsHero.tsx
          ExamsHeroVisual.tsx
          ExamInstructions.tsx
          ExamOptions.tsx
          ExamResults.tsx
          page.tsx
        about/
          AboutHero.tsx
          AboutFaq.tsx
          AboutFaqList.tsx
          Mission.tsx
          Values.tsx
          WhyBest.tsx
          Story.tsx
          page.tsx
        contact/
          ContactHero.tsx
          ContactContent.tsx
          page.tsx
      (student)/
        layout.tsx
        loading.tsx
        student/
          page.tsx
          courses/
          schedule/
          assignments/
          library/
            LibraryHero.tsx
            LibraryCatalog.tsx
            page.tsx
            [slug]/
              ResourceHero.tsx
              ResourceContent.tsx
              RelatedResources.tsx
              page.tsx
          tests/
          results/
          progress/
          payments/
          notifications/
          settings/
      (teacher)/
        layout.tsx
        loading.tsx
        teacher/
          DashboardOverview.tsx
          page.tsx
          groups/
            GroupsCatalog.tsx
            page.tsx
            [slug]/
              GroupHeader.tsx
              GroupOverview.tsx
              GroupStudentList.tsx
              GroupWorkspaceCreateAction.tsx
              GroupWorkspaceNavigation.tsx
              GroupWorkspaceRoute.ts
              GroupWorkspaceSectionHeader.tsx
              layout.tsx
              page.tsx
              students/
                page.tsx
              lessons/
                GroupLessonEditorAction.tsx
                GroupLessons.tsx
                page.tsx
                [lessonId]/
                  LessonDetail.tsx
                  page.tsx
              materials/
                GroupMaterials.tsx
                page.tsx
              assignments/
                GroupAssignments.tsx
                page.tsx
              tests/
                GroupTests.tsx
                page.tsx
          tasks/
            TeacherTaskList.tsx
            page.tsx
          finance/
            FinanceDashboard.tsx
            page.tsx
          reception/
            ReceptionSchedule.tsx
            page.tsx
          transfer-requests/
            TransferRequestList.tsx
            page.tsx
          profile/
            TeacherProfile.tsx
            TeacherSettings.tsx
            page.tsx
      (admin)/
        layout.tsx
        loading.tsx
        admin/
          page.tsx
          requests/
          students/
          teachers/
          groups/
          courses/
          events/
          locations/
          schedule/
          attendance/
          payments/
          tests/
          results/
          library/
          imports/
          transfer-requests/
          notifications/
          audit/
          reports/
          settings/
      layout.tsx
      not-found.tsx
    globals.css
    sitemap.ts
    robots.ts
  components/
    layout/
    navigation/
      ScrollToTopLink.tsx
    sections/
    ui/
    motion/
  features/
    courses/
    events/
    results/
    exams/
    contact/
      ContactForm.tsx
    student/
      library/
        ResourceCatalog.tsx
        ResourceCard.tsx
    teacher/
      dashboard/
      groups/
      tasks/
      finance/
      reception/
      profile/
  hooks/
    useCurrentLocale.ts
    navigation/
      useMobileNavigation.ts
      useLocaleSwitcher.ts
      useActivePath.ts
      useScrollToTop.ts
    public/
      contact/
        useContactForm.ts
      exams/
        useExamRegistration.ts
        useExamResultsPreview.ts
    student/
      library/
        useResourceCatalog.ts
    teacher/
      dashboard/
      groups/
      tasks/
      finance/
      profile/
  config/
  gql/                  # generated GraphQL client artifacts
  graphql/
    PublicWebsite.graphql
  data/
    student/
      LibraryResources.ts
    teacher/
      TeacherPreviewData.ts
  dictionaries/
    public/
      En.ts
      Ru.ts
      Uz.ts
      Types.ts
      PageCopy.ts
      ExamPreview.ts
      GetDictionary.ts
    student/
      Library.ts
      StudentWorkspace.ts
    teacher/
      Teacher.ts
    admin/
      AdminWorkspace.ts
  css/
    public/
      home.module.css
      about.module.css
      contact.module.css
      courses.module.css
      events.module.css
      exams.module.css
      results.module.css
      shared.module.css
    layout/
      navbar.module.css
      footer.module.css
    student/
      library.module.css
      shell.module.css
      workspace.module.css
    teacher/
      shell.module.css
      dashboard.module.css
      groups.module.css
      tasks.module.css
      finance.module.css
      reception.module.css
      profile.module.css
      transferRequests.module.css
      loading.module.css
    admin/
      shell.module.css
      workspace.module.css
  lib/
  types/
    ExamPreview.ts
    student/
      Library.ts
    teacher/
      Teacher.ts
public/
  icons/
    logo.svg
  images/
```

Keep route files thin. A route should resolve params, validate local entities,
create metadata, load typed data and dictionaries, and assemble its route-local
section components. Substantial section JSX must not accumulate in `page.tsx`.

Page-specific section components must be colocated directly beside the owning
`page.tsx`. Use semantic PascalCase filenames such as `Mission.tsx` or
`CourseOutcomes.tsx`, and make the named component export exactly match the file
name (`Mission.tsx` exports `Mission`). Framework-reserved files such as
`page.tsx`, `layout.tsx`, and `not-found.tsx` remain lowercase. Do not use
ordinal names such as `FirstSection` or generic wrappers such as `Component1`.

All `.ts` and `.tsx` filenames inside `components/cards`, `components/layout`,
`components/motion`, `components/navigation`, `components/ui`, `config`,
`data`, `dictionaries`, `features`, `lib`, `theme`, and `types` must use
PascalCase. Every React
component file must have one primary named component export whose name exactly
matches the filename, for example `CourseCard.tsx` exports `CourseCard`. Split
multiple component exports into separate matching files, as with
`StaggerGroup.tsx` and `StaggerItem.tsx`.

Non-component module symbols continue to follow TypeScript semantics: functions,
constants, and data values use camelCase, while types use PascalCase. Their
PascalCase module filename describes the module and does not force functions
such as `getDictionary` or constants such as `navigationItems` to masquerade as
React components. Next.js framework-reserved route files remain lowercase.

Custom hooks are an explicit exception to the PascalCase file rule. Every hook
filename and its named export must use the same React-standard camelCase name
beginning with `use`, for example `useContactForm.ts` exports
`useContactForm`. Keep a small number of genuinely shared hooks directly in
`src/hooks/`. When page- or area-owned hooks grow, group them by ownership, such
as `hooks/public/courses/`, `hooks/public/contact/`, or `hooks/navigation/`;
do not reorganize hooks based only on an arbitrary numeric threshold.

Move reusable state, derived data, effects, router integration, refs, and
interaction rules out of presentation components into focused custom hooks.
Do not wrap an existing library hook with a pass-through custom hook unless the
wrapper adds real project behavior. Event callback names must contain the
`handle` prefix and describe the interaction, such as `handleSubmit`,
`handleMenuClose`, or `handleCategoryChange`. In interactive components and
custom hooks, separate hook declarations and event handlers with the exact
comments `/* HOOKS */` and `/* HANDLERS */` whenever those sections exist.

The homepage uses the `(home)` route group so its components can live beside its
`page.tsx` without adding `/home` to localized URLs. Keep reusable primitives in
`components/`, and keep reusable or interactive domain logic in `features/`;
route-local components may compose those shared layers.

Keep all public-website localization files under `dictionaries/public/`,
including the locale dictionaries, their shared types, page copy, and the
dictionary loader. Keep Student Library copy in
`dictionaries/student/Library.ts`. Keep all Teacher Workspace copy in
`dictionaries/teacher/`; reserve `dictionaries/admin/` exclusively for the
future administrator area.

Whenever any new user-facing copy, label, FAQ, content item, or fictional
preview data is added, provide Uzbek (`uz`), Russian (`ru`), and English (`en`)
versions in the same change. Do not ship a new content value in only one or two
locales with the intention of translating it later.

All component styling must live under `src/css/` as scoped CSS Modules. Keep
one stylesheet per public page under `css/public/`, named after its route, such
as `home.module.css` or `about.module.css`. Keep reusable public primitives in
`css/public/shared.module.css`, and keep Navbar/Footer styling in
`css/layout/navbar.module.css` and `css/layout/footer.module.css`. Student
Library styles belong in `css/student/library.module.css`; Teacher Workspace
shell and page styles belong in focused modules under `css/teacher/`. Reserve
the empty `css/admin/` directory for the future administrator area.

Within each page stylesheet, separate ownership with exact section comments,
for example `/* HomeHero */`, `/* FeaturedCourses */`, and `/* FaqPreview */`.
Use a page-scoped BEM namespace with camelCase element names, such as `.home`,
`.home__hero`, and `.home__heroImage`. Components must import the owning module
through the `@/*` alias and reference `styles.home__hero`; do not place long
Tailwind utility strings directly in TSX.

CSS Modules that use Tailwind v4 utilities must begin with an `@reference` to
`app/globals.css`, then group those utilities with `@apply`. Keep
`app/globals.css` limited to Tailwind setup, semantic design tokens, theme/base
rules, and truly global behavior. Use CSS variables directly for selectors or
MUI overrides that are clearer as plain CSS. Avoid styling the same property in
both a CSS Module and an inline utility or `sx` block.

Keep the official Tailwind CSS IntelliSense VS Code extension in workspace
recommendations. The workspace may ignore only the native CSS validator's
`unknownAtRules` diagnostic because Tailwind v4 directives such as `@apply`,
`@reference`, and `@theme` are validated by Tailwind tooling; do not disable
general CSS validation or Tailwind linting.

Whenever the user introduces or changes a project-wide architecture, naming,
source-organization, styling, or workflow convention, update this `AGENTS.md`
in the same change so future work follows it. This standing instruction is the
user's ongoing permission to maintain the file; do not ask for separate
permission each time.

## 7. Clean source rules

Apply clean-code and clean-source practices throughout the project:

- Enable TypeScript `strict` mode.
- Never use `any`. Use explicit types, generics, unions, or `unknown` with
  narrowing.
- Prefer small, focused components with one clear responsibility.
- Separate content/data, rendering, and interaction logic.
- Store repeated public content in typed data modules, not scattered JSX.
- Store shared constants and navigation definitions in `config/`.
- Use semantic names; avoid names such as `Component1`, `data2`, or `temp`.
- Use PascalCase for components and exported types.
- Use camelCase for functions, variables, and hooks.
- Use kebab-case route segments.
- Avoid deeply nested conditionals and duplicated markup.
- Prefer composition over oversized components and prop-heavy abstractions.
- Do not build abstractions before at least two real use cases exist.
- Do not create page or component classes in global CSS; use the owning scoped
  CSS Module.
- Do not repeat long utility sets across CSS Modules; move genuinely shared
  styles into `public/shared.module.css` or a focused reusable component.
- Do not hardcode brand colors repeatedly in JSX.
- Do not leave dead code, commented-out experiments, unused imports, or console
  statements.
- Avoid barrel files when they hide ownership or create circular imports.
- Use the `@/*` import alias for application source.
- Keep dependencies minimal and justify every new package.

### Refactor workflow convention

Apply the following convention to every subsequent Public, Student, Teacher,
and Admin refactor unless the user explicitly changes scope:

- Refactoring may be delivered together with new functionality when the user
  explicitly requests it or when it belongs to an already approved active plan.
  Keep the new functionality clearly owned and reviewable; do not hide an
  unrelated feature, visual redesign, route, dependency, backend expansion, or
  breaking behavior change inside a cleanup-only refactor. Preserve unaffected
  UI, localization, accessibility semantics, navigation, state transitions, and
  preview/backend boundaries.
- Replace oversized generic route renderers with a domain-owned composition when
  a page has a real domain identity. For example, the Admin root owns
  `AdminDashboard`, which composes focused metrics, queue, and activity
  components instead of accumulating all dashboard JSX in `page.tsx` or a
  generic section renderer.
- Keep route files thin: validate params, create metadata, obtain typed copy/data,
  and assemble the owning domain component. Route files do not own substantial
  presentation or interaction logic.
- Give each extracted component one clear responsibility, one primary named
  export matching its PascalCase filename, and role/domain ownership under
  `features/`. Do not create pass-through wrappers merely to reduce line counts.
- Move reusable state, derived collections, effects, pathname/locale behavior,
  and event rules into focused custom hooks. Hooks return state and behavior,
  never JSX or visual controls. Create a shared hook only after at least two real
  consumers need the same behavior; keep role-specific extensions in their role
  hook directories.
- In every interactive component or custom hook, place hook declarations and
  derived hook state below the exact `/* HOOKS */` comment. Place named event
  callbacks below the exact `/* HANDLERS */` comment. Omit a section comment only
  when that section does not exist. Every named event callback uses the
  `handle...` prefix.
- Keep localized copy, typed preview data, presentation, and interaction logic
  in their existing ownership layers. Refactoring must not silently move
  business fixtures into JSX or turn frontend view models into backend DTOs.
- Preserve unaffected CSS Module selectors and visible output during structural
  refactors. An explicitly requested or already approved feature may add the
  focused styles and states it requires. Do not combine role-specific Student/
  Admin/Public/Teacher styles merely because their logic shares a hook.
- After each refactor slice, run targeted Prettier, TypeScript typecheck, ESLint,
  `git diff --check`, and a production build proportional to the affected
  surface. Treat a visual or behavioral difference as a regression unless it
  was separately approved.

### Shared button system

- Use `components/ui/Button.tsx` for semantic action buttons and
  `components/ui/ButtonLink.tsx` for navigation CTAs. Both must use the shared
  variant, size, shape, icon, disabled, and focus system from
  `components/ui/ButtonStyles.ts` and `css/public/shared.module.css`.
- Use the shared `components/ui/IconButton.tsx` wrapper for icon-only controls;
  always provide its required accessible `label`. Keep MUI Menu, Dialog,
  Drawer, Select, and similar accessibility-heavy primitives where appropriate.
- Approved text-button variants are `primary`, `secondary`, `outline`, `ghost`,
  `filter`, `inverseOutline`, `surface`, and `danger`; approved sizes are
  `small`, `medium`, and `large`, with `rounded`, `soft`, and `pill` shapes.
- Keep the shared `medium` button at a compact 44 px minimum height with 14 px
  text so default card and form actions maintain one visual rhythm. Reserve the
  explicit `small` and `large` sizes for intentionally quieter or stronger
  controls.
- Use the shared fixed-width form-action class for the Exams result lookup and
  Contact submit controls so neither stretches across its form panel and both
  retain the same compact width.
- Page and feature CSS may control layout, state-specific visibility, or a
  genuinely domain-specific accent, but must not duplicate shared button
  padding, typography, radius, focus, disabled, or common hover rules.
- Use the shared `hoverEffect="jump"` option for the Navbar signup, event
  registration submit, homepage Explore Courses CTA, About Mission course CTA,
  Courses contact CTA, notification confirmation action, centred-alert Close,
  and event Attend action. On fine-pointer hover, move the control upward by
  `2px` without changing its occupied layout size. Keep button text and icons
  untransformed and crisp; do not scale the button node itself or add a
  press/active transform.
- Do not create or return visual button components from hooks. Hooks own button
  behaviour only when reusable state or interaction logic is required.

## 7A. Material UI usage boundary

Use the current stable MUI packages and follow MUI's official App Router
integration documentation. Expected packages include:

- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`
- `@mui/material-nextjs` and `@emotion/cache` when required by the installed
  Next.js/MUI integration

Integration rules:

- Use the documented `AppRouterCacheProvider` import that matches the installed
  Next.js major version. Do not hardcode an outdated versioned import path.
- When combining MUI with Tailwind CSS, enable the documented CSS layer option
  so style precedence is predictable.
- Create a typed, light-only BEST LC MUI theme that mirrors the approved brand
  tokens, typography, radius, spacing, and component states.
- Keep shared MUI outlined-form treatment in `theme/FormStyles.ts` and compose
  it into both the public BEST theme and the Teacher theme. The native input
  inside an outlined field must not receive the global square focus outline;
  the rounded MUI root border remains the visible focus indicator. Give every
  shrunk outlined label a surface backing and inline breathing room so its text
  never collides with the notch border in light or dark mode.
- Use the same Geist font variable in both Tailwind and the MUI theme.
- Do not load Roboto or Material Icon fonts from a CDN.
- Do not let default MUI blue, default typography, ripple behavior, shadows, or
  border radius define the website's visual identity.

Use MUI primarily for:

- Icons through `@mui/icons-material`
- `IconButton`, `Tooltip`, `Dialog`, `Drawer`, `Accordion`, `Tabs`, `Menu`,
  `TextField`, `FormControl`, `Select`, and similar accessibility-heavy
  interactive primitives when they improve quality
- Consistent focus, disabled, validation, and keyboard behavior

Use semantic HTML and Tailwind primarily for:

- Page layout and section composition
- Containers, grids, spacing, responsive behavior, and decorative styling
- Most static cards and content sections
- Brand-specific hero and marketing compositions

Do not rebuild the entire site with `Box`, `Stack`, `Grid`, and `Typography` when
semantic HTML plus Tailwind is simpler and sends less client JavaScript.

Icon rules:

- Use one consistent Material icon family, preferably Rounded or Outlined.
- Import icons from their direct module paths for better bundle behavior, for
  example `@mui/icons-material/SchoolRounded`.
- Keep stroke/fill style, optical size, and color consistent within a section.
- Decorative icons use appropriate presentation semantics.
- Interactive icon-only controls must have an accessible name such as an
  `aria-label` and a visible tooltip when helpful.
- Do not mix MUI icons with unrelated icon packs unless the official BEST logo
  or a uniquely required brand symbol has no MUI equivalent.
- For every non-trivial illustration, follow this asset decision order to keep
  the application source compact:
  1. Research existing local assets, the approved Material icon family, and
     suitable reusable visual material first. Prefer a direct MUI import inside
     a branded wrapper when it meets the brief.
  2. If no suitable material exists, generate a page-owned raster asset, verify
     it visually, and render it through `next/image` inside a stable responsive
     wrapper.
  3. Build the illustration from CSS only when research and image generation
     cannot satisfy the requirement. Keep that fallback focused and avoid large
     collections of one-off shape selectors.
- Simple layout, borders, backgrounds, glows, and small geometric decoration
  may continue to use CSS without running the full illustration workflow.
- Avoid large amounts of one-off `sx` styling. Prefer the shared MUI theme,
  component `styleOverrides`, and small branded wrapper components.

## 7B. Notification system

Use the shared notification system for frontend feedback instead of adding
page-local alert implementations:

- Use the existing MUI `Snackbar` as the non-blocking toast engine with the
  custom BEST LC `LiquidToast` as its only content surface. Keep the queue and
  timer state inside the global `NotificationProvider`; do not add another
  toast package.
- Use the existing MUI `Dialog` primitive for blocking confirmations and alert
  dialogs. Do not add a separate confirmation package.
- Keep notification components and context in `features/notifications/`, and
  keep `useNotifications.tsx` and `useConfirmDialog.ts` in
  `hooks/notifications/`.
- Every toast and confirmation must render a distinct `title` followed by its
  related `message`. The shared hooks may use localized defaults when either
  value is omitted.
- Blocking confirmations and centred alerts use the same vertically centred
  hierarchy: icon, title, message, then centred actions. Keep multiple actions
  grouped together below the copy. Centred alerts must open in place with a
  centre-origin scale and fade; do not translate them vertically from an edge.
- Keep notification titles compact and messages to exactly two short
  sentences: the first states the notification outcome, and the second adds a
  warm user-facing note. Put extended explanations in the owning page or dialog
  instead of the alert.
- Keep notification types in `types/Notification.ts`, localized default copy in
  `dictionaries/public/Notifications.ts`, and liquid-glass styles under the
  `/* Notifications */` section of `css/public/shared.module.css`.
- The locale layout owns the single global `NotificationProvider`. Do not mount
  page-specific toaster instances.
- Ordinary non-loading toasts auto-dismiss after 1000 ms by default. Loading
  toasts remain visible until they are replaced or dismissed; their resulting
  success or error toast uses the same 1000 ms default.
- Keep ordinary non-blocking toasts at the top-right. Use the shared
  `showCenterAlert` liquid dialog only for deliberate centre-screen feedback
  such as the event-registration preview and Footer social-media coming-soon
  notice. The coming-soon notice uses its dedicated campaign icon tone.
- Use MUI `Fade` for ordinary toast entry and exit, plus a root-level vertical
  entrance from 28 px above with a 2 px downward overshoot before settling. Do
  not apply horizontal movement, scale, or a viewport-edge slide, and do not add
  another translating wrapper around the liquid-glass surface. Its background,
  icon, title, and message must paint and move as one contained surface. Use one
  translucent gradient and one `backdrop-filter` on the unified surface; do not
  place competing glass backgrounds or filters on wrapper or content layers.
- Preserve keyboard access, Escape dismissal, dialog focus management,
  reduced-motion behavior, readable contrast, and a solid background fallback
  when `backdrop-filter` is unavailable.
- Notifications must not claim that an unimplemented payment, authentication,
  or other backend action succeeded. Public course/event/exam/contact success is
  allowed only after its real GraphQL mutation returns an accepted receipt.
- Do not connect Events `Details` or `Attend` controls to notifications or other
  actions outside the approved registration flow.

## 7C. Event registration

- The event registration visual is owned by
  `features/events/EventRegistrationProvider.tsx` and opened through
  `hooks/public/events/useEventRegistration.ts` so one shared dialog serves all
  event cards.
- `Attend` opens the shared MUI registration dialog with a blurred backdrop and
  the selected upcoming-event context. For a past event, `Attend` must skip the
  form and open the shared centred alert with an error tone, a red cancel icon,
  and localized archive/registration-closed copy. Do not mount a separate
  dialog or alert per card.
- The form validates required identity/contact, participant count, email format,
  and explicit consent. `Register` calls `registerForEvent`, keeps the dialog
  open on error, and opens the centred success alert only after persistence.
- Keep registration copy localized in Uzbek, Russian, and English under
  `dictionaries/public/EventRegistration.ts`.

## 7D. Exam registration request

- Keep every top-level Exams section heading block centred, including its
  eyebrow, title, and supporting description. Dialog and card headings retain
  their own content-driven alignment.
- IELTS, CEFR, and MOCK forms submit through `submitExamRegistration`. MOCK uses
  an active database session id and server-side capacity validation. Do not
  claim Telegram delivery; success means only that the intake record persisted.
- IELTS and CEFR use the shared exam form; MOCK adds a required database session
  selection. Keep localized UI copy in
  `dictionaries/public/ExamPreview.ts`, state in focused hooks under
  `hooks/public/exams/`, and rendering in `features/exams/`.
- The Results preview collects a fictional Candidate ID and birth date only in
  client state, then opens the shared login-required confirmation. Confirming
  Login must close the alert and navigate to the approved localized Student
  login form while preserving the active locale. It must not create a Student
  Results route, dashboard, authorization rule, or persistence.
- Use the branded MUI Select menu for exam-level selection and the shared Exams
  calendar popover for date selection. Do not fall back to browser-native
  dropdown or date-picker popups whose appearance cannot follow brand tokens.
- Match each exam-registration summary gradient to its card accent using only
  darker and lighter shades of that one hue: blue for IELTS, turquoise for
  CEFR, and yellow for MOCK. Do not blend different exam accent colors within
  one summary gradient.
- Public intake and MOCK dates use the approved backend contracts. Telegram
  delivery remains unimplemented; the separate result-lookup behavior follows
  the Student contract and must not fabricate a result.

## 8. Brand color system

Use the following approved palette as the design source of truth.

### Core colors

| Token           |       Hex | Purpose                                   |
| --------------- | --------: | ----------------------------------------- |
| Brand turquoise | `#49BFD1` | Logo color, icons, decorative highlights  |
| Deep navy       | `#102A43` | Headings, navigation, strong text         |
| Action blue     | `#2563EB` | Links, active states, CTA gradient        |
| Sunny yellow    | `#FFC857` | Selective emphasis and educational energy |
| Background      | `#F4FBFD` | Main light canvas                         |
| Surface         | `#FFFFFF` | Cards and elevated surfaces               |
| Text            | `#172033` | Main body text                            |
| Muted           | `#64748B` | Secondary text                            |
| Border          | `#D9EDF1` | Dividers and subtle card borders          |
| Coral           | `#FF6B6B` | Rare badge, deadline, or alert accent     |

### Approved gradients

```css
--gradient-cta: linear-gradient(135deg, #0e7490 0%, #2563eb 100%);
--gradient-cta-corner: linear-gradient(45deg, #0e7490 0%, #2563eb 100%);
--gradient-hero: linear-gradient(135deg, #eafbfd 0%, #eef4ff 58%, #ffffff 100%);
--gradient-accent: linear-gradient(135deg, #ffc857 0%, #ff8a5b 100%);
```

### Color rules

- Use Action blue `#2563EB` for the Navbar logo icon.
- Do not place normal-size white text on `#49BFD1`; contrast is insufficient.
- On brand turquoise, use deep navy text.
- White CTA text is allowed on the dark teal-to-blue CTA gradient.
- Yellow must use deep navy text, not white text.
- Coral is an accent, not a primary color.
- Gradients must be focused accents, not backgrounds for every section or card.
- Reserve `--gradient-cta-corner` for the homepage Explore Courses CTA, Navbar
  signup button, and the matching centred-alert Close action, with the dark end
  at bottom-left and the lighter end at top-right.
- Avoid uncontrolled neon colors and rainbow gradients.
- Define semantic CSS variables in `globals.css`, then expose them through the
  current Tailwind theme-variable approach.

## 9. Theme boundaries

The public website and auth shell use the fixed light public BEST LC theme. The
Student and Admin workspaces each use a separate fixed-light semantic token set
and MUI theme defined for that role; they must not inherit the public page skin
or the Teacher theme. Do not add public, auth, Student, or Admin dark/light
toggles, browser-preference detection, or dark-mode locale labels.

The Teacher Workspace is the only dark-mode exception: its Profile screen must expose
the `Night mode` control visible in the reference video and apply a complete,
accessible teacher-only dark theme. Scope the theme state and semantic tokens to
  the `(teacher)` layout so the public, auth, Student, and Admin surfaces never
  change. A small safe browser preference may remember the teacher theme; do not
store profile, student, finance, or other business data with it.

## 10. Typography and visual rhythm

- Use the official locally bundled `geist` package as the single optimized
  variable sans-serif family.
- Keep `GeistSans.variable` connected to the shared `--font-geist-sans` token
  used by Tailwind and the MUI theme.
- Use large editorial headings with tight, deliberate line-height.
- Use fluid type with `clamp()` where appropriate.
- Keep body copy readable at approximately 16–18 px.
- Keep text lines near 55–75 characters.
- Use a consistent type scale; do not invent a new size per section.
- Use strong weight contrast instead of many different colors.
- Use Uzbek Latin text as the default content language.

## 11. Minimalistic–creative design direction

The design must be recognizably BEST LC and must not look like an off-the-shelf
SaaS template.

Required visual principles:

- Generous whitespace and clear hierarchy
- A disciplined grid with occasional controlled asymmetry
- Strong editorial hero typography
- Soft cyan/blue environmental glow rather than heavy background decoration
- Geometric motifs derived from the shape and rays of the BEST logo
- Rounded cards with restrained borders and soft shadows
- A mixture of full-width editorial sections and compact bento-style clusters
- Realistic education imagery or polished illustrations with consistent style
- Clear primary and secondary actions
- Visually distinct section transitions created by spacing, shape, or subtle
  tone changes instead of excessive dividers
- High-quality mobile composition, not merely stacked desktop cards

Avoid:

- Excessive glassmorphism
- A gradient on every button, icon, heading, and card
- Too many floating blobs or decorative particles
- Repetitive rows of identical cards
- Oversized shadows and glowing neon borders
- Auto-playing carousels
- Stock-template copy and generic lorem ipsum
- Decorative elements that compete with the CTA
- Animation added only to make the page look busy

## 11A. Role-specific application design systems

Public, Teacher, Student, and operational Admin are one BEST LC product family,
but they must be immediately distinguishable by color, layout, shaping, density,
navigation, and interaction rhythm. Share the logo, Geist typography,
accessibility rules, locale infrastructure, and genuinely neutral primitives;
do not copy one role shell and merely recolor it.

- Public is an editorial marketing experience: bright white and soft cyan
  surfaces, BEST turquoise/action-blue/yellow accents, generous whitespace,
  asymmetric hero compositions, large rounded promotional cards, authentic
  education imagery, and restrained brand motion.
- Teacher is a focused classroom operations workspace: retain its solid
  action-blue desktop rail, white work canvas, turquoise support accents,
  medium 16-20 px radii, compact operational cards, and teacher-only dark mode.
  It should feel practical and instructor-led rather than promotional.
- Student is an encouraging learning cockpit: use an indigo/violet primary,
  sky and mint progress accents, warm off-white surfaces, soft 22-28 px cards,
  modular lesson/progress tiles, a rounded floating desktop navigation rail and
  compact mobile dock. Prefer visual learning paths, progress rings, deadlines,
  and calm spacious grouping. Do not reuse the Teacher solid-blue rail, Teacher
  dashboard card geometry, or public marketing section alternation.
- Admin is a precise operations console: use deep navy/slate navigation,
  emerald and cyan state accents, cool-gray work surfaces, sharper 10-14 px
  radii, a collapsible dark rail, dense filter toolbars, semantic data tables,
  split panes, bulk-action bars, and restrained transitions. Do not present the
  Admin area as a grid of Student/Teacher-style learning cards.
- Each role owns its shell, semantic CSS variables, MUI theme, CSS Modules,
  responsive navigation composition, empty/loading/error visuals, and chart/
  status palette. Cross-role components may share behavior, but role adapters
  must control their appearance and density.
- Use color semantically and keep WCAG 2.2 AA contrast. Status meaning must stay
  consistent (success, warning, danger, information) even when its exact shade
  is adapted to the role palette.

## 12. Layout system

- Mobile-first implementation.
- Validate at approximately 375, 768, 1024, and 1440 px widths.
- Use a centered content container around 1200–1280 px.
- Maintain comfortable mobile gutters and progressively larger desktop gutters.
- Use a consistent spacing scale.
- Standard top-level content sections must use equal top and bottom spacing via
  the shared `Section` rhythm: 64 px on mobile, 80 px on small screens, and
  96 px on desktop (`py-16 sm:py-20 lg:py-24`). Raw custom content sections
  must match that symmetric rhythm. Heroes, compact trust strips, and pinned
  scroll experiences may use purpose-built values, but their visible top and
  bottom boundaries must remain equal; low-height viewport overrides must also
  stay symmetric. Control heading-to-content distance separately instead of
  distorting the section boundary padding.
- Keep interactive targets at least 44×44 px where practical.
- Prevent horizontal overflow at all supported widths.
- Header must remain usable with long translated labels.
- Mobile navigation must trap focus while open and close with Escape.
- After every public-page hero, full-width top-level content sections must
  alternate in DOM order, beginning with Surface (`#FFFFFF`), followed by
  Background (`#F4FBFD`), and then repeating that sequence. Use the shared
  `Section` tone API or the owning page CSS for raw full-width sections. Nested
  semantic sections inside one full-width layout do not start a new color band.
  Do not substitute gradients or nearby shades in this sequence unless the
  user explicitly approves an exception.

## 13. Animation direction

Modern motion is a required part of the brand experience. It must be smooth,
subtle, purposeful, and production-ready.

### Use CSS for

- Color transitions
- Border and shadow transitions
- Simple button and link hover states
- Small icon movement
- Focus-visible states

### Use Motion for React for

- Section reveal sequences
- Staggered card entrance
- Hero composition entrance
- Small number/stat count-up effects
- Filter and accordion layout transitions where CSS is insufficient
- Very subtle scroll-linked decorative movement

### Motion rules

- Keep Motion components in small client boundaries.
- Prefer `transform` and `opacity`; avoid properties that trigger expensive
  layout or paint work.
- Most interaction transitions should be around 160–280 ms.
- Section entrances may be around 400–650 ms.
- Stagger intervals should usually stay around 40–90 ms.
- Scroll reveals should generally run once.
- Use subtle distance: commonly 8–24 px, not dramatic off-screen travel.
- Hover scale should stay restrained, usually no more than about 1.02.
- Avoid long-running continuous motion. If used for one decorative hero element,
  it must be slow, low-amplitude, and nonessential.
- Do not block navigation or content access while an animation runs.
- Do not animate large areas with blur filters during scroll.
- Use `MotionConfig` or `useReducedMotion` to honor the visitor's reduced-motion
  preference.
- With reduced motion enabled, remove parallax and large transforms; preserve
  only short opacity or color transitions where helpful.

Create a small reusable motion system instead of ad hoc animation values:

- `MotionProvider`
- `Reveal`
- `StaggerGroup`
- `StaggerItem`
- `AnimatedCounter` only for centralized real or clearly marked preview statistics

Do not make every component a motion component.

The current homepage motion pilot is intentionally limited to `HomeHero` and
`TrustStrip`: `HeroCopy` uses a staggered left-to-right transform/opacity
entrance with masked title lines; `HeroVisual` enters once from right to left;
each of the four decorative hero planes has one independent entrance; and
`HeroLandmark` enters once from bottom to top. TrustStrip items reveal once with
the shared stagger system. Preserve reduced-motion behavior. Do not add a
blocking loader, WebGL/Three.js scene, autoplay background video, or continuous
hero animations when extending this pilot.

## 14. Public route map

Use locale-prefixed public routes following the current Next.js App Router i18n
guidance:

```text
/uz
/uz/courses
/uz/courses/[slug]
/uz/events
/uz/events/[slug]
/uz/results
/uz/exams
/uz/about
/uz/contact
```

The Library is not a public route. Its approved localized student routes are
`/uz/student/library` and `/uz/student/library/[slug]`, with equivalent `/ru`
and `/en` paths. Do not add Student Library routes to the public sitemap or
public navigation.

Prepare equivalent `/ru` and `/en` routes. Default locale is `uz`. The locale
switcher should preserve the corresponding current path when possible.

The approved Teacher Workspace route map is:

```text
/uz/teacher
/uz/teacher/groups
/uz/teacher/groups/[slug]
/uz/teacher/groups/[slug]/students
/uz/teacher/groups/[slug]/lessons
/uz/teacher/groups/[slug]/lessons/[lessonId]
/uz/teacher/groups/[slug]/materials
/uz/teacher/groups/[slug]/assignments
/uz/teacher/groups/[slug]/tests
/uz/teacher/tasks
/uz/teacher/finance
/uz/teacher/reception
/uz/teacher/transfer-requests
/uz/teacher/profile
```

Prepare equivalent `/ru` and `/en` routes. Teacher routes are application
surfaces, not public marketing pages: exclude them from public navigation and
the public sitemap, and mark their metadata `noindex, nofollow`. Teacher remains
a clearly disclosed preview until Teacher credential verification is approved.

Use the current documented Next.js locale-routing mechanism. If current docs
use `proxy.ts`, follow that documentation rather than older middleware examples.

## 15. Global navigation and footer

### Header

- BEST icon from `public/icons/logo.svg` at the left, followed by the `BEST LC`
  wordmark in the main Geist font at `font-bold` weight. Render the Navbar icon
  at 36×36 px.
- Public navigation only
- Language switcher
- Primary CTA: `Kurslarni ko‘rish`
- Responsive mobile menu

A top-level Navbar link is active for its exact route and nested detail routes;
active links use the Action blue token (`--action-blue`, the same color as
“today” in the hero).

Every internal route link across the public, approved student UI, and Teacher
Workspace—including Navbar, Footer, cards, CTA buttons, locale controls, side
navigation, bottom navigation, and back links—must use the shared
`ScrollToTopLink` component or the same `useScrollToTop` hook so a newly selected
route opens at the top. Hash links must retain their target-section scrolling.
Do not implement a pathname effect that overrides the browser's normal
Back/Forward scroll restoration.

The shared layout component filenames and named exports must be exactly
`Navbar.tsx` / `Navbar` and `Footer.tsx` / `Footer`. Do not restore the older
`site-header.tsx` or `site-footer.tsx` naming.

On desktop, both Courses and Exams are plain top-level Navbar links. Neither may
render an arrow, selection panel, or dropdown. Footer course and exam groups may
continue using the centralized course and exam navigation items with their
typed localized labels.

Until the user supplies the future course and exam page ideas, do not implement
their page logic merely because the Navbar links exist. The matching PascalCase
files beside `courses/page.tsx` remain empty placeholders and do not create
routes or contain component logic.

Suggested Uzbek labels:

- Bosh sahifa
- Kurslar
- Tadbirlar
- Natijalar
- Imtihonlar
- Biz haqimizda
- FAQ
- Aloqa

The desktop header may group lower-priority destinations under a clear menu if
needed. Do not squeeze every label into a crowded navigation bar.

### Footer

- Brand summary
- Public page links
- Contact information placeholders
- Social links placeholders
- Language control if useful
- Copyright
- Privacy and terms placeholders

Place the Footer FAQ link immediately after About us and target the localized
About FAQ anchor (`/[locale]/about#faq`). There is no standalone public FAQ
route.

The user explicitly approved fictitious contact and business values throughout
the client-preview website. Keep them centralized in typed dictionaries, prefer
zero-filled phone numbers and reserved `.example` email domains, mark them as
preview content at the data level, and replace them before production launch.
Do not copy real third-party identities or private contact information.

## 16. Home page requirements

Build the home page as a deliberate conversion journey:

1. **Hero**
   - Strong Uzbek headline
   - Short value proposition
   - Primary CTA: `Kurslarni ko‘rish`
   - Secondary CTA: `Biz bilan bog‘lanish`
   - Creative education visual or illustration
   - Logo-derived geometric motion accents

2. **Trust strip**
   - Use real client-provided numbers when available
   - Until then, use centralized thematic preview metrics marked for replacement

3. **Featured courses**
   - A curated preview with clear level, format, and duration labels

4. **Learning process**
   - A concise three- or four-step visual explanation

5. **Results preview**
   - Real student outcomes or centralized fictional case-study placeholders

6. **Upcoming events preview**

7. **Final CTA**
    - Clear next action leading to Courses or Contact

This is the approved complete Home composition. Do not add separate `Why BEST`
or FAQ preview sections to Home without fresh approval; the anchored FAQ belongs
to About.

Do not place every public page as an equally weighted card on the home page.
Maintain hierarchy and breathing room.

## 17. Courses

### Courses list

- Page hero and concise explanation
- A server-rendered, two-level catalogue: three featured programmes followed by
  compact Russian, French, German, and Chinese course cards
- No search or client-side filter UI while the catalogue remains limited to the
  approved seven directions
- Featured course cards with title, category, level, duration, and three concise
  programme highlights
- A responsive course-comparison section, four-step learning process, and final
  CTA to Contact
- Reference material may inform fictional listing content only; never reproduce
  an external card's visual design, colour treatment, layout, or CTA styling
- No fake enrollment persistence

### Course detail

- Overview
- Who the course is for
- Learning outcomes
- Curriculum preview
- Optional data-driven learning tracks, such as Pre-IELTS, IELTS Standard, and
  IELTS Advanced
- Duration and format
- Teacher placeholder only when verified content is supplied
- FAQ or prerequisites
- CTA to Contact

Use static local slugs and `generateStaticParams` where appropriate.

## 18. Events

### Events list

- Upcoming and past event presentation
- Optional local client-side filters
- Clear date, location/online format, and short summary
- Elegant empty state

### Event detail

- Event title and visual
- Date, time, format, and location placeholder
- Agenda or key topics
- Supplied speaker information or a centralized fictional preview profile
- CTA to the shared backend-connected event registration modal

The event registration UI confirms attendance only after the API persists an
accepted intake receipt. Never log the submitted form payload.

## 19. Results

This page represents public student success and BEST LC outcomes, not private
exam results.

- Introductory story and real or marked preview aggregate metrics
- Eight explicitly marked preview five-second, 9:16 Reels-format video scenes
  in a responsive 4-by-2 desktop gallery, with local media kept under
  `public/videos/`. Licensed stock footage may show recognizable characters,
  but must remain generic and may not be paired with invented identities,
  quotes, scores, or claims. Video cards show only the poster and centred play
  icon; keep all descriptive card copy visually hidden from the gallery.
- Real or fictional preview before/after learning journeys
- Outcome categories or visual timeline
- CTA to explore courses
- Give every post-hero Results heading and content block a subtle, one-time
  bottom-to-top entrance using the shared reveal system. Preserve full
  reduced-motion support.

Never reuse a real person's identity or private information as placeholder
content. Keep fictional names, synthetic visuals, quotes, scores,
certifications, and employment outcomes centralized, marked as preview data,
and easy to replace before production. For licensed stock footage, centralize
the creator, source page, and license reference, and replace the footage with
client-approved learner media before production.

## 20. Student Library

The Library belongs only to the localized Student Workspace route at
`/[locale]/student/library`; public navigation, home, public dictionaries,
public data, and the public sitemap must not reference it. Its connected content
uses the authenticated Student Library backend contract; explicit preview mode
continues to use centralized fictional resources without claiming protection.

- Resource search
- Category filters
- Resource cards: article, guide, checklist, or video placeholder
- Resource detail route for local content
- Reading time/type metadata
- Related resources
- Useful empty state

Keep its route components, catalogue/card features, filter hook, page CSS,
typed content, type declarations, and translations under their corresponding
student-owned directories. No upload system, user bookmarks, protected
downloads, Library authorization, or CMS integration is authorized in this
milestone.

## 20A. Teacher Workspace

The Teacher Workspace is a responsive web CRM preview. The 102.2-second
user-supplied mobile reference video is authoritative for feature inventory and
mobile behavior, but it is not the desktop layout specification. Its visual
language may be refined to match BEST LC, but none of the in-scope screens,
sections, or visible functions below may be omitted. Teacher chat is the explicit
exception and remains out of scope.

Design and implement desktop/web and mobile compositions in parallel for every
Teacher feature. Do not finish the narrow mobile version first and postpone the
desktop workspace, and do not build a desktop-only interface with mobile polish
left for the end. Each route is complete only when both compositions have full
feature parity. Desktop must use the available space as a professional web
workspace with persistent navigation, wider information hierarchy, responsive
grids or split views where useful, and bounded content widths rather than a
stretched phone screen.

### Teacher design architecture

Use the approved `Bright Educational Workspace` direction. The Teacher
Workspace must remain visibly related to the public BEST LC brand while becoming
denser, faster to scan, and more operational. It must not resemble a generic
admin template.

- Use the approved fullscreen composition derived from the supplied dashboard
  reference: a solid Action-blue side rail fixed to the viewport edge and a
  bright white workspace filling the rest of the screen. Do not wrap the
  application in a centred floating card, viewport margin, outer radius, or
  decorative page-canvas frame. Keep navigation items fully contained inside
  the rail. The active destination is a floating white card with a 14 px soft
  radius, balanced side insets, subtle depth, a slim turquoise leading
  indicator, and a small turquoise-tinted icon surface. Do not merge the active
  item into the workspace or add concave connector curves. Use the same active
  navigation treatment in the mobile Drawer and height-constrained scrolling
  navigation. Use brand turquoise for supportive identity and sunny yellow
  only for selective educational emphasis or warnings.
- Teacher semantic tokens are: primary `#2563EB`, brand accent `#49BFD1`, deep
  navy `#102A43`, yellow `#FFC857`, canvas `#F4FBFD`, surface `#FFFFFF`, main
  text `#172033`, muted text `#64748B`, and border `#D9EDF1`.
- Operational states use success `#15803D`, warning `#B45309`, danger
  `#DC2626`, information `#2563EB`, and neutral `#64748B`. Always pair color
  with an icon and localized text; never encode status through color alone.
- Avoid rainbow cards. Prefer white surfaces with a semantic icon wrapper,
  subtle tinted badge, progress accent, or narrow state border. Reserve solid
  color or dark cards for a small number of focal summaries such as monthly
  income.
- Use `16px` standard card radii, `20px` focal-dashboard card radii, and
  `12px-14px` control radii. Use one-pixel borders and restrained shadows only
  for floating or important surfaces.
- Use Geist throughout. Page titles are approximately `28px-32px`, section
  titles `20px-24px`, card titles `16px-18px`, body copy `14px-16px`, metadata
  `12px-13px`, and primary statistics `28px-40px`. Preserve the type hierarchy
  when labels grow in Russian or English.
- Give each major Teacher page a concise, route-specific localized eyebrow
  above its title, such as `Bugungi faoliyat`, `Guruhlarni boshqarish`, or
  `Moliyaviy ko‘rinish`. Do not expose the technical `Frontend preview` label
  in page headers. Keep preview terminology only where it honestly identifies
  session-local, unsaved, fictional, or unavailable behavior.
- Keep compact section-action links such as `To‘liq jadval` and `Barchasini
  ko‘rish` free of a permanent underline. Reveal the underline from left to
  right with a short CSS transition on hover and keyboard focus, disable that
  transition for reduced-motion users, and apply the shared behavior
  consistently to equivalent Teacher section links instead of styling
  individual routes separately.
- Desktop uses a `256px` persistent blue side rail, an approximately `64px`
  clean white top bar, and a fullscreen workspace. Only the inner content
  column remains bounded for readability; the application shell itself always
  fills the viewport without outer corner radii or shell shadows. Use a
  twelve-column responsive content layout, multi-column metric grids, compact
  bordered rows, split views, and wide schedule layouts where they materially
  improve scanning.
- Mobile uses `16px` gutters, a compact top bar, the approved four-item bottom
  navigation, touch targets of at least `44px`, primarily single-column cards,
  and bounded horizontal scrollers only for quick metrics, month filters, or
  schedules that genuinely require them.
- Below the desktop breakpoint, keep the shell fullscreen. Preserve the same
  blue-rail identity inside the MUI Drawer and use a white bottom-navigation
  surface with a solid-blue active destination. Do not introduce tablet-only
  outer margins or radii, and do not shrink the desktop rail into a narrow
  icon-only column.
- Use the MUI Rounded icon family consistently. Avatars may use fictional
  initials or synthetic preview imagery; never reuse identities from the video.
- Interaction motion is subtle: approximately `160ms-280ms` for hover/focus,
  a two-pixel card/button lift on fine pointers, and short opacity/transform
  entrances for route content or new preview messages. Never animate business
  data continuously, and honor reduced motion.
- The teacher-only dark palette uses canvas `#0B1220`, sidebar/surface
  `#111C2E`, elevated surface `#17243A`, border `#263750`, text `#F3F7FC`, muted
  text `#A7B4C7`, primary `#60A5FA`, and turquoise `#67D8E8`. Define complete
  semantic dark tokens rather than inverting the light UI.

### Teacher application shell and navigation

- Use a dedicated `(teacher)/layout.tsx` with a persistent desktop side rail,
  an accessible MUI `Drawer` on smaller screens, a compact top bar, and the
  four-item mobile bottom navigation visible in the reference.
- Desktop and mobile shells must be alternative responsive presentations of the
  same navigation model, not duplicated route trees or independent state
  implementations.
- The top bar includes the BEST identity, contextual page title where useful,
  an accessible menu control, the teacher identity, and the visible notification
  control.
- The mobile bottom navigation contains exactly the primary destinations shown
  in the video: Dashboard, Groups, Finance, and Profile. It must expose the
  current route, respect safe areas, remain keyboard accessible, and never hide
  focused content.
- The full navigation drawer contains the teacher preview identity card plus:
  Dashboard, Groups, Tasks, Finance, Transfer Requests, and Settings. Keep the
  Reception route accessible through its contextual Dashboard schedule link,
  but do not duplicate it in the side rail. The drawer also contains the Uzbek,
  Russian, and English locale control shown in the recording. Keep Log out
  exclusively inside Settings so the shared verification dialog always
  precedes the action.
- Drawer and bottom-navigation items must preserve the active locale. The drawer
  closes on selection and Escape, traps focus while open, restores focus to its
  trigger, and indicates the active route without relying on color alone.
- In the side-rail locale control, inactive language buttons reuse the same
  translucent white hover surface, white foreground, timing, and subtle upward
  motion as inactive navigation links. The active language keeps its solid
  white selected surface while hovered.
- The notification shortcut must have an accessible label. Because the reference
  does not show a notification list, the bell may open a localized fictional
  preview panel; it must not fabricate remote delivery or read state.

### Dashboard

- Teacher header with fictional avatar, display name, role/handle, notification
  control, and menu access. Teacher chat is not part of this milestone and must
  not be added to the workspace.
- Lead with a localized `Today’s classes` timeline instead of abstract circular
  progress indicators. Wide screens show four schedule cards; tablet uses a
  two-column grid and mobile uses a bounded horizontal scroller. Each card shows
  stable lesson id, start/end time, group and slug, room, learner count, and an
  explicit `active`, `next`, `planned`, or `completed` state. The active lesson
  receives the strongest emphasis, each lesson opens its group, and the section
  links to the complete Reception schedule. Keep this typed contract ready for
  a future backend response rather than deriving core lesson identity from card
  position or presentation labels.
- Use a wide-desktop `8 + 4` command-centre grid: `My groups` occupies the main
  two-thirds as a `2 x 2` card grid, while the summary metrics form a stacked
  right rail. On wide screens, offset the metric rail by the group section
  heading height so its first card row aligns with the first group-card row;
  remove that offset when the columns stack. Keep four equal metric cards in a
  balanced `2 x 2` grid: current-
  month new learners, total active learners, departed learners, and `Together
  with BEST School`. Use the brand-blue-to-teal gradient only for the new-
  learner metric. In all four cards, keep the secondary label aligned to the
  top-left, the icon in the top-right, and anchor the primary value to the
  bottom-left. Primary metric values are typed numbers and render as numbers
  only; move units or duration context into the localized secondary label and
  format the numeric value for the active locale. Keep cards compact at
  approximately 136 px high. Values remain centralized fictional preview
  metrics.
- Group preview cards include group name, room, lesson days and time, learner
  count, and progress/attendance percentage. Selecting a group opens its
  localized detail route. Preserve the `2 x 2` arrangement through laptop and
  tablet widths, then use the reference-inspired horizontal card scroller on
  mobile. Keep each preview card compact at approximately 136 px high and place
  its progress bar and attendance percentage together in one bottom-aligned
  footer row so unused card height becomes intentional spacing rather than an
  empty lower area.
- Keep the teacher content container left-aligned after the side rail with a
  1600 px maximum width and approximately 40 px wide-desktop inner gutters; do
  not reintroduce the large centred whitespace between the rail and content.
- `Library` preview with the Podcasts and Videos entries shown in the recording.
  These are teacher dashboard resources, not the Student Library route. Until
  resource content is approved, they open an honest localized preview/unavailable
  state and do not invent downloads or protected media.
- Dashboard content uses the populated typed preview model in this frontend
  milestone. Data-fetch loading, empty, error, and unavailable states are
  deferred and must be implemented in parallel with the approved backend
  integration.

### Groups catalogue

- Render every assigned group as a compact card with group name, fictional
  teacher identity, lesson-day pattern, lesson time, room where supplied,
  learner count, and navigation affordance.
- Support the long scrolling catalogue density demonstrated in the video.
  Preserve legibility at mobile width and provide a multi-column desktop
  layout. Backend-driven loading, empty, error, and unavailable states are
  deferred to the approved backend integration.
- Group selection opens `/[locale]/teacher/groups/[slug]`; unknown local slugs
  use `notFound()` and all preview groups participate in `generateStaticParams`.

### Group detail and learner roster

- Header with back navigation, group name, room/schedule summary, member action,
  and the green group-state control visible in the recording.
- Treat the group detail as one nested workspace with `Overview`, `Students`,
  `Lessons`, `Materials`, `Assignments`, and `Tests` routes. The shared group
  header and horizontal tab navigation belong to the `[slug]/layout.tsx`; mobile
  keeps every destination in a bounded horizontal tab scroller. The base group
  URL opens Overview, while the former roster becomes the Students route.
- Make `TeacherLessonSession` the central learning entity. Link materials,
  assignments, and tests to a stable lesson id and group slug through typed
  preview contracts; never infer those relationships from array position,
  localized labels, or presentation order. Each local lesson participates in
  static params and unknown group or lesson ids use `notFound()`.
- Overview summarizes the next and most recent lesson plus active assignments,
  scheduled tests, material count, and learner count. Lesson detail shows its
  date, time, room, attendance, objective, and only the materials, assignments,
  and tests linked to that lesson.
- Lessons render a chronological schedule/timeline. Materials contain
  written articles, books, and worksheets with honest format metadata;
  Assignments show due dates and submission progress; Tests show kind, date,
  duration, and question count. Do not render fake downloads, submissions,
  scoring, or an interactive online-test engine while backend/media contracts
  are unavailable.
- Lessons, Materials, Assignments, and Tests each expose a localized create
  action in the section header. The lesson editor must cover topic, objective,
  status, date, start/end time, room, present/total attendance, and linked
  materials, assignments, and tests; reuse it for both Add and lesson-detail
  Edit. Lesson detail also exposes Delete through the shared danger confirmation
  dialog. Keep the visible action labels compact as localized `Edit` and
  `Delete` without repeating `lesson`; Delete uses a transparent red outline
  at rest and fills solid red with white content on fine-pointer hover. Edit may
  update the mounted detail preview in memory and Delete may return to the
  lesson list, but both must explicitly disclose that no backend record was
  persisted or deleted. Other create forms close with the central unsaved-
  preview notification and must not append fake persistent records.
- Summary counters for total, active, paused/stopped, departed, and other status
  categories represented in the reference. Do not collapse the colored status
  cards into one aggregate number.
- Search field plus the debtors filter shown in the video. Filtering and search
  operate on typed fictional learners and expose an accessible result count and
  empty state.
- Learner rows/cards include ordinal or avatar/initial, fictional name, status,
  payment/balance summary, task/progress percentage, and the complete colored
  quick-action strip visible in the reference. Problem/debtor rows retain the
  distinct alert treatment and a text/icon status so color is never the sole cue.
- Preserve the visible per-learner contact, status, task/progress, and detail
  affordances. Where the low-resolution reference does not establish an exact
  business effect, keep the control and accessible label but use a localized
  preview detail/confirmation instead of inventing a backend mutation.
- The fixed `Add learner` action opens a localized preview form/dialog and may
  add a fictional learner to in-memory state for the session only. It must state
  that the learner is not saved and must never collect or transmit real personal
  data.
- Contact actions never initiate a real call or external message in this
  milestone. Use reserved phone numbers and a preview detail/confirmation.

### Tasks

- Recreate the `Tasks` screen with back navigation and the top status filter,
  including the `Pending` state visible in the recording.
- Support at least the two reference task categories: `Missed attendance for
  three days` with urgent/red treatment, and `Phone call required (PAUSE)` with
  warning/yellow treatment.
- Each task card includes type/status, localized explanation, fictional learner,
  group, reserved phone number, created timestamp, overflow action, and the
  `Done` control shown in the video.
- Status filtering must work locally. Marking a task done updates only the
  in-memory preview collection, provides honest localized feedback, and allows
  the completed state to be inspected without claiming server persistence.
- Provide pending, completed, filtered-empty, and all-clear states. A
  backend-driven loading state is deferred to backend integration.

### Finance

- Finance is a read-only teacher analytics screen; it must never include payment
  entry, checkout, transfer, refund, payroll mutation, or editable financial
  controls.
- Include horizontally scrollable month tabs and the dark income summary card
  from the reference with current-month income, expected amount, payment rate,
  and attendance rate.
- Include the complete finance-detail card grid represented in the recording:
  paid amount, payment percentage, expected/pending amount, debt amount, learner
  count, group count, salary/expense total, and penalty total. Labels and values
  are typed, localized, fictional preview data.
- Month selection updates the read-only summary and detail grid locally. Currency
  and percentages use locale-aware formatting; financial differences include
  icons/text and sufficient contrast rather than color alone.
- Render the populated fictional snapshots in this frontend milestone. Add
  loading, no-data, error, and unavailable states in parallel with backend
  integration. Never copy the exact figures visible in the supplied recording
  into production content.

### Reception schedule

- Recreate the `Reception` screen with its title, supporting branch/room copy,
  refresh control, and the dense time-and-room schedule grid shown in the video.
- The grid includes time rows, room/space columns, lesson cells, fictional
  teacher/group labels, and the small status/count metadata visible in the
  reference. It must support horizontal scrolling on mobile and an accessible
  table or grid interpretation for assistive technology.
- Refresh resets or reloads the current local preview snapshot and communicates
  that no remote schedule was fetched. Backend-driven loading, empty, error,
  and unavailable schedule states are deferred to backend integration.

### Transfer Requests

- Provide the dedicated localized Transfer Requests route and the reference
  empty state with directional-transfer icon, title, and supporting message.
- Also define typed pending, approved, and declined preview request states so
  the page is structurally ready when fictional rows are added, but do not add
  approval/rejection mutations or claim a request was submitted in this
  frontend milestone.

### Profile and settings

- Use a centred desktop profile workspace capped at approximately 1200 px with
  a `4 + 8` composition: a sticky teacher summary card on the left and grouped
  settings on the right. The summary owns profile-photo and log-out actions;
  the settings column groups account, access/security, and preference rows,
  while account deletion remains isolated in a clearly marked danger zone.
  Collapse this composition to one non-sticky column on mobile.
- Profile header card includes a fictional avatar, teacher display name,
  `Teacher` role badge, reserved phone number, active language, and fictional
  branch/location metadata.
- Recreate every settings row visible in the recording: Profile information,
  Change password, Computer login (QR), Change profile photo, Active sessions,
  Language, Night mode, Delete account, and Log out.
- Profile information may edit fictional display fields in memory only and must
  disclose that changes are not saved. Do not collect or persist real personal
  data.
- Change password renders the complete localized form and validation states but
  must clear values and show the unavailable notice; credentials never leave
  the browser or enter logs/storage.
- Computer login may show a clearly synthetic, non-scannable preview QR visual
  and instructions. Never encode a token, credential, URL, or real session.
- Keep Change profile photo visible as a preview setting, but defer the complete
  image-preview, upload, validation, object-URL lifecycle, and persistence flow
  until it can be implemented in parallel with the approved backend contract.
  Until then, the control may show a selected local filename and an honest
  localized notice; it must not upload or persist the file.
- Active sessions displays typed fictional device/session rows and explanatory
  preview copy. It must not inspect browser, Auth.js, operating-system, or device
  session stores and must not pretend to revoke a session.
- Language switches between Uzbek, Russian, and English while preserving the
  matching Teacher Workspace route.
- Night mode is functional only inside the Teacher Workspace as defined in
  section 9, with accessible contrast and a labeled switch.
- Delete account opens the shared blocking confirmation, then reports that the
  service is unavailable; it must not delete or mutate anything.
- Log out first opens the shared danger confirmation, then uses real Auth.js
  sign-out when an actual provider session exists and otherwise returns to the
  localized login screen without claiming a remote Teacher credential session
  was ended. Keep both Delete account and Log out confirmations localized and
  thematically matched to their danger or warning tone.

### Teacher data, interaction, and ownership rules

- Centralize replaceable teacher, group, learner, task, finance,
  schedule, transfer-request, profile, notification, and resource preview data
  under `data/teacher/`, with explicit types under `types/teacher/`.
- Centralize all Uzbek, Russian, and English Teacher Workspace copy under
  `dictionaries/teacher/`. No teacher UI string may be hardcoded in a component.
- Keep state and interaction rules in focused hooks under `hooks/teacher/` and
  reusable teacher rendering under `features/teacher/`. Route-local sections
  remain colocated beside their owning `page.tsx`.
- Use the shared notification system for preview disclosures, completion
  feedback, confirmations, and unavailable actions. Teacher notifications must
  never claim a backend mutation succeeded.
- Never use real identities or any personal or financial content from the
  reference video. Preview phone numbers use zero-filled reserved patterns, and
  all people remain clearly fictional data marked for replacement.
- Do not store Teacher Workspace business state in cookies, localStorage,
  sessionStorage, IndexedDB, URL query strings, analytics, or logs. The isolated
  teacher night-mode preference is the only approved persistence exception.
- All screens require responsive mobile, tablet, and desktop compositions,
  WCAG 2.2 AA keyboard/focus behavior, reduced-motion support, and no horizontal
  page overflow. Data-fetch loading, empty, error, unavailable, and permission
  states are deferred and must be delivered alongside backend integration.
  Intentional horizontal scrolling inside group, finance-month, or schedule
  containers must be keyboard reachable and clearly bounded.
- Desktop and mobile must expose the same data, actions, filters, statuses, and
  preview disclosures. A function shown in the reference video may change its
  placement or presentation on desktop, but it may not disappear.

## 20B. Approved Student Dashboard and integration milestone

The user approved this complete route and feature inventory together with its
backend implementation. Build the review-ready Student experience and the
matching GraphQL contracts, authorization, persistence, loading/error/permission
states, and supported real operations in parallel. Fictional seeded data remains
the safe development baseline until client-owned business data is supplied.

### Student objectives and boundaries

- Build one responsive localized Student Workspace with desktop, tablet, and
  mobile feature parity.
- Reuse the BEST LC brand language while giving Student pages a focused,
  encouraging learning-product identity rather than copying the denser Teacher
  or Admin shell.
- Preserve the existing Student Library content, slugs, types, dictionaries,
  features, and CSS ownership while integrating it into the future Student
  application shell.
- Protect Student routes through server-authenticated backend authorization.
  Presentation-only role state is never authorization, and local development
  preview access must be explicit, isolated, and impossible in production.
- Use centralized fictional learners, courses, schedules, assignments, tests,
  attempts, results, progress, payment-status summaries, notifications, and
  profile data. Never reuse identities or values from real people.
- Implement only operations backed by an approved server contract, validation,
  ownership check, idempotency/concurrency rule, and truthful success/failure
  response. Payment records are read-only ledger/status data; no payment-provider
  checkout, card/bank collection, refund execution, or payroll is approved.
- Teacher chat has been removed from the product. Do not introduce Student chat,
  direct messaging, or a disguised messaging route without fresh approval.
- Implement backend-driven loading, error, permission, cursor-pagination, retry,
  conflict/recovery, upload, and persistence states alongside each vertical
  slice. The UI must also include populated layouts, local filters, validation,
  dialogs, and useful interaction-generated empty states.

### Approved Student route map

Create these localized routes:

```text
/[locale]/student
/[locale]/student/courses
/[locale]/student/courses/[slug]
/[locale]/student/schedule
/[locale]/student/assignments
/[locale]/student/assignments/[assignmentId]
/[locale]/student/library
/[locale]/student/library/[slug]
/[locale]/student/tests
/[locale]/student/tests/[testId]
/[locale]/student/results
/[locale]/student/results/[attemptId]
/[locale]/student/progress
/[locale]/student/payments
/[locale]/student/notifications
/[locale]/student/settings
```

Prepare equivalent Uzbek, Russian, and English pages. Student application routes
must remain outside public navigation and the public sitemap and use localized
`noindex, nofollow` metadata until production identity, authorization, content,
and indexing policy are approved.

### Student application shell

- Own the shell in `(student)/layout.tsx` without the public Navbar or Footer.
  The current Library may continue using `SiteChrome` until the approved Student
  shell is implemented, then it moves into that shell without changing its URL.
- Desktop uses a persistent navigation rail, compact top bar, bounded content
  width, notification access, localized Student identity, and clear active
  destination.
- Mobile uses an accessible Drawer plus a four- or five-item bottom navigation
  selected from Dashboard, Courses, Assignments, Tests, and Profile/Settings.
  Secondary destinations remain available in the Drawer.
- Use one centralized navigation model for desktop, Drawer, bottom navigation,
  breadcrumbs, active-state resolution, and localized route preservation.
- Preserve safe areas, keyboard focus, Escape behavior, focus restoration,
  touch targets of at least 44 px, and scroll-to-top behavior.
- Keep the Student workspace on the fixed light BEST theme during the frontend
  milestone. Do not inherit or control the Teacher-only night-mode preference.
- The top bar notification control opens fictional preview notifications or the
  Notifications route. It must not claim delivery, read receipt, or remote state.
- Logout follows the same approved Auth.js behavior as the Teacher shell when an
  actual provider session exists; otherwise it returns to the localized Student
  login form without claiming a server session ended.

### Student dashboard

- Lead with the learner’s current course/group, next lesson, room or online
  format, teacher preview identity, and one clear continue/view action.
- Include today/upcoming schedule, active assignments, available or scheduled
  tests, recent results, progress snapshot, payment-status summary, and relevant
  Library resources.
- Use stable entity ids and route links rather than deriving identity from card
  order or localized labels.
- Show compact status cards for attendance, completed work, pending assignments,
  test average, and course progress; do not invent verified achievements.
- Dashboard shortcuts must lead to the owning Student routes and preserve locale.
- Populated frontend-preview cards use centralized typed data. Backend-derived
  freshness timestamps and live counters are deferred until the API exists.

### My courses and course detail

- Courses lists active, upcoming, paused, and completed enrolment previews with
  course name, level, group, teacher, schedule, progress, and status.
- Course detail contains overview, group/schedule, current module, lesson
  timeline, linked materials, linked assignments, linked tests, attendance
  summary, and progress milestones.
- Link every lesson, material, assignment, and test by stable ids. Never infer
  relationships from array position or translated copy.
- Course detail may expose preview-only `Continue learning`, resource-open, and
  assignment/test navigation. Protected media and lesson bodies remain honest
  unavailable previews until backend authorization and storage exist.
- Do not add enrolment purchase, checkout, certificate generation, or course
  cancellation behavior in the frontend milestone.

### Student schedule

- Provide day, week, and agenda presentations backed by one schedule contract.
- Each entry contains id, date, start/end time, course/group, teacher, room or
  online format, lesson status, and linked destination.
- Support local date navigation, today action, course filter, and accessible
  mobile horizontal scrolling where necessary.
- Do not fabricate live attendance check-in, remote meeting access, or calendar
  synchronization. These actions display localized unavailable notices.

### Assignments

- Provide All, Pending, Submitted, Reviewed, Late, and Unavailable filters with
  localized counts and useful filtered-empty states.
- Assignment cards show stable id, course/group, lesson, title, instructions
  summary, due date, status, points/weight when applicable, and attachment
  metadata.
- Detail pages include full instructions, rubric preview, permitted attachment
  list, submission status, teacher feedback preview, and related lesson links.
- The frontend milestone may render a complete submission form and local
  validation, but file transfer and final submission remain unavailable. Values
  must not leave the browser or be stored.
- When backend integration begins, add signed uploads, resumable submission,
  duplicate-submit protection, deadline enforcement, and server-owned status.

### Student Library

- Preserve the existing searchable/filterable Library catalogue and local
  detail routes while adapting their navigation and page chrome to the Student
  shell.
- Expand the planned contract to articles, books, guides, worksheets, test
  support, PDF, image, audio, and video metadata without fabricating protected
  downloads.
- Resource detail includes type, category, reading/duration metadata, localized
  content, related resources, source/license metadata when required, and honest
  availability.
- Bookmarks, recently viewed state, downloads, progress, and access rules remain
  backend-phase features. Do not persist them locally as fake account state.

### Tests catalogue

- Provide Available, Scheduled, In progress, Submitted, Completed, Expired, and
  Unavailable views.
- Test cards contain stable test/version id, title, course/group, sections,
  question count, duration, availability window, attempt policy, and status.
- Support local search/filter/sort and accessible result counts.
- Start/Resume controls open the local Test Runner preview only for fictional
  fixtures. They must disclose that refresh loses the preview attempt and that
  no official result is produced.
- Never expose fixture correct answers in list or runner payload-shaped objects.
  Keep answer keys in a separate Admin/scoring preview module if a visual result
  fixture requires them.

### Test Runner frontend preview

- Use a distraction-free Student shell variation with test identity, section
  navigation, question navigator, answered/unanswered/review flags, timer
  presentation, progress, accessibility controls, and explicit exit behavior.
- Support preview question renderers for single choice, multiple choice,
  true/false, short text, long text, matching, ordering, and media-prompt
  placeholders. Do not add a type without a typed contract and keyboard path.
- Keep answers, review flags, and current position in React memory only. Do not
  write attempts or answers to cookies, localStorage, sessionStorage, IndexedDB,
  query strings, analytics, or logs.
- Warn before leaving, expiring, or submitting. The preview submit action may
  show a clearly labeled demonstration completion state but must not calculate
  or claim an official score.
- Autosave, resume after refresh, server timing, concurrency protection,
  connection recovery, final locking, deterministic scoring, and result-ready
  events are backend-parallel features.
- Provide keyboard navigation, visible focus, screen-reader section/question
  context, non-color status labels, and reduced-motion behavior.

### Results

- Results history supports course, test type, status, and date filters.
- Result cards show attempt id, test/version, submission date, status, total
  score when a fictional completed result exists, and review availability.
- Result detail includes overall summary, section/criterion breakdown,
  permitted answer review, teacher feedback, attempt metadata, and next-step
  recommendations.
- Clearly distinguish Completed, Pending review, Review required, Withheld,
  Cancelled, and Unavailable states.
- Writing and Speaking scores must remain pending/manual unless a teacher or a
  separately approved AI-evaluation workflow has produced an approved result.
- Do not let the frontend derive official scores from submitted answers. During
  preview, results come only from explicit fictional result fixtures.

### Progress

- Show course completion, attendance trend, assignment completion, test trend,
  section strengths, improvement areas, and milestone timeline.
- Every chart needs a readable text/table equivalent or accessible summary.
- Use stable typed historical fixtures and locale-aware dates/numbers.
- Do not present predictive claims, rankings, certificates, streak guarantees,
  or AI recommendations as verified facts.
- Real aggregation, comparison periods, cohort benchmarks, and recalculation
  belong to backend services and are added during parallel integration.

### Student payments

- Payments is a read-only account-status surface in the frontend milestone.
- Show fictional invoice periods, expected amount, paid amount, balance, due
  date, status, and receipt availability using locale-aware currency formatting.
- Distinguish Paid, Partial, Due, Overdue, Waived, Refunded, and Unavailable with
  icon and text, never color alone.
- Do not add checkout, card entry, bank details, transfer initiation, payment
  confirmation, refunds, or fake receipt downloads.
- Real payment provider integration requires separate explicit approval beyond
  the general backend milestone. Backend work may first expose verified ledger
  and invoice records as read-only data.

### Student notifications

- Provide a localized notification centre for lesson changes, assignment
  deadlines, test availability/results, payment-status reminders, and system
  notices using fictional fixtures.
- Support local category filtering and mounted-session read/unread presentation
  only when clearly disclosed as unsaved preview state.
- Do not send notifications, create subscriptions, claim delivery, or persist
  read state until the backend notification contract exists.

### Student settings

- Include fictional profile information, language, notification preferences,
  accessibility preferences, security rows, active-session preview, and logout.
- Profile edits and preference forms may validate locally but must disclose that
  they are not saved.
- Password, email/phone verification, profile-photo upload, session revocation,
  account deletion, and notification delivery settings remain unavailable until
  supported by real authenticated backend operations.
- Language switching preserves the equivalent Student route and safe dynamic
  identifiers.
- Keep all business/account state out of browser persistence. Only a separately
  approved harmless display preference may use local storage.

### Student ownership and contracts

- Own Student route components under `app/[locale]/(student)/student/`, reusable
  Student presentation under `features/student/`, state under `hooks/student/`,
  preview data under `data/student/`, copy under `dictionaries/student/`, types
  under `types/student/`, and styles under `css/student/`.
- Keep all new Student copy complete in Uzbek, Russian, and English in the same
  change.
- Model stable ids, ISO timestamps, minor-unit money values with currency,
  explicit status unions, optionality, and entity relationships in types rather
  than parsing display strings.
- Route components remain thin, use `generateStaticParams` for approved local
  preview ids/slugs where suitable, and use `notFound()` for unknown fixtures.
  Replace static enumeration with authorized backend lookup during integration.
- Student UI view models must not become backend DTOs. During integration,
  generated GraphQL operation types feed explicit adapters that create the
  existing view models.

### Student frontend verification and completion

Before the Student frontend milestone can be presented as complete:

- Every approved route renders in Uzbek, Russian, and English.
- Desktop, tablet, and mobile expose equivalent data and actions.
- Navigation, locale switching, Back/Forward behavior, dynamic links, test exit,
  and refresh-reset behavior work without broken routes.
- Course, schedule, assignment, Library, test, result, progress, payment,
  notification, and settings fixtures are relationally consistent.
- Local filters, validation, dialogs, selected states, interaction-generated
  empty states, keyboard flows, focus restoration, and reduced motion work.
- No preview action transmits or persists personal, payment, answer, file, or
  business data.
- Test Runner never claims official autosave, submission, or scoring.
- Student pages remain noindex/nofollow and absent from the public sitemap and
  marketing navigation.
- Repository lint, typecheck, build, and relevant automated tests pass.

## 20C. Approved operational Admin Dashboard and integration milestone

The user approved the complete operational Admin route inventory and its backend
integration. This is operational Admin, not Super Admin. Build authorization,
validated persistence, auditability, and honest network states with each
frontend vertical slice.

### Admin role and boundaries

- Admin represents BEST LC operational staff managing learners, teachers,
  groups, schedules, attendance, payment status, academic content, tests,
  results, transfers, and review queues.
- Admin is not Super Admin. Do not add global role/permission editing, secret
  management, auth-provider configuration, infrastructure controls, database
  access, impersonation, or unrestricted audit deletion.
- Use fictional operational data only. Never copy real learner, parent, teacher,
  salary, payment, credential, Telegram-session, or contact information.
- Create/edit/status actions require an approved GraphQL mutation, server-side
  authorization and validation, audit coverage, and conflict-safe behavior.
  In-memory previews may exist only as an explicitly labeled development state.
- Payment processing, refunds, payroll transfer, account creation, credential
  issuance, file publication, notification delivery, and destructive deletion
  must not be simulated as remotely successful.
- Implement backend-driven loading, error, permission, pagination, concurrency,
  audit-write, upload, and persistence states in parallel with the backend. The
  UI also includes populated tables, filtering, selection, validation, dialogs,
  detail drawers/pages, and honest unavailable outcomes.

### Approved Admin route map

Create these localized routes:

```text
/[locale]/admin
/[locale]/admin/requests
/[locale]/admin/students
/[locale]/admin/students/[studentId]
/[locale]/admin/teachers
/[locale]/admin/teachers/[teacherId]
/[locale]/admin/groups
/[locale]/admin/groups/[slug]
/[locale]/admin/courses
/[locale]/admin/courses/[slug]
/[locale]/admin/events
/[locale]/admin/events/[slug]
/[locale]/admin/locations
/[locale]/admin/schedule
/[locale]/admin/attendance
/[locale]/admin/payments
/[locale]/admin/payments/[recordId]
/[locale]/admin/tests
/[locale]/admin/tests/[testId]
/[locale]/admin/results
/[locale]/admin/library
/[locale]/admin/library/[resourceId]
/[locale]/admin/imports
/[locale]/admin/imports/[jobId]
/[locale]/admin/transfer-requests
/[locale]/admin/notifications
/[locale]/admin/audit
/[locale]/admin/reports
/[locale]/admin/settings
```

Prepare equivalent Uzbek, Russian, and English routes. Keep all Admin pages out
of public navigation and sitemap and mark them `noindex, nofollow`.

### Admin application shell

- Use a dedicated `(admin)/layout.tsx` with no public Navbar or Footer.
- Desktop uses a persistent collapsible side rail, top command/search area,
  branch context, notification/review queue shortcuts, localized Admin identity,
  and bounded but data-dense content.
- Mobile uses an accessible Drawer and compact bottom navigation for Dashboard,
  Students, Groups, Payments, and Settings; all other destinations remain in
  the Drawer.
- Derive every navigation presentation from one typed Admin navigation model
  with locale preservation and correct nested-route active states.
- Keep the preview theme light and visibly BEST LC, with denser tables and
  operational surfaces than Student or public pages. Do not introduce a theme
  toggle unless separately approved.
- Provide responsive alternatives for wide tables: priority columns, row
  expansion/detail Drawer, bounded horizontal scroll, and accessible table
  semantics. Do not hide essential actions only on desktop.
- Global Admin search may filter fictional preview entities locally. Cross-
  entity server search, recent history, and permissions are backend features.

### Admin dashboard

- Show operational summaries for active learners, active teachers, groups,
  today’s lessons, attendance exceptions, overdue payment status, pending
  transfers, tests awaiting review, and Library/import review items.
- Include today’s schedule/room occupancy, urgent task queue, recent operational
  events, and direct links to owning routes.
- Use semantic status icons/text and restrained color; avoid a rainbow metric
  dashboard.
- Metrics and queues must share stable ids with their detail modules so every
  dashboard action opens a real preview destination.

### Public requests and intake queues

- Unify fictional Contact enquiries, course-interest requests, event
  registrations, and public IELTS/CEFR/MOCK exam requests under one operational
  Requests route with typed category tabs.
- Each request includes stable id, source, created time, fictional requester,
  reserved contact value, locale, related course/event/exam, consent/status
  metadata, assignee placeholder, and notes/audit placement.
- Support New, In review, Contacted, Resolved, Rejected, Duplicate, and
  Unavailable states with search, filters, counts, and detail Drawer/page.
- Preview assignment, note, and status controls may update mounted fictional
  state with unsaved disclosure. They must not send email/Telegram messages,
  place calls, enroll a learner, register attendance, or claim a remote request
  was processed.
- Course, event, exam, and Contact requests come from the real public GraphQL
  mutations and share stable persisted ids with Admin intake views. Admin status
  changes remain subject to its own authorization and audit rules.

### Learner management

- Provide searchable, sortable, filterable learner table/cards with status,
  student id, fictional contact, branch, course/group, attendance, progress,
  payment status, and last activity.
- Filters include branch, course, group, learning status, attendance risk,
  payment status, and date where relevant.
- Learner detail includes profile summary, enrolments, group membership,
  schedule, attendance history, assignments, tests/results, payment ledger
  summary, transfer history, notes/audit preview, and account status.
- Add/Edit learner forms use fictional preview fields and local validation.
  They may create/update mounted in-memory preview rows only with explicit
  unsaved disclosure.
- Pause, activate, transfer, remove, reset-access, and delete actions require
  clear confirmation. Until backend authorization exists they either make an
  explicitly unsaved in-memory transition or show unavailable; they must never
  claim a real account changed.
- Do not collect real personal data during review.

### Teacher and staff management

- Provide teacher catalogue with teacher id, subject, branch, assigned groups,
  workload, schedule, attendance/reporting status, and account state.
- Teacher detail includes profile, group assignments, timetable, learner count,
  attendance summary, task summary, finance-summary visibility appropriate to
  operational Admin, and activity/audit preview.
- Add/Edit/assign forms validate fictional inputs locally. Account creation,
  credential issuance, salary mutation, session revocation, and deletion remain
  backend-authorized actions.
- Operational Admin may manage teacher assignments in the future but may not
  create Super Admins or edit platform-wide roles/permissions.

### Courses, groups, and enrolments

- Courses provide catalogue, localized content status, levels, duration,
  delivery format, active groups, capacity, and enrolment summary.
- Course detail includes public-facing content preview, curriculum/module
  structure, groups, teachers, test associations, Library associations, and
  publication readiness.
- Groups provide branch, room, teacher, schedule, capacity, learner roster,
  attendance, assignments, tests, payment-risk summary, and status.
- Group detail aligns stable lesson/material/assignment/test ids with the
  Teacher and Student view models.
- Create/Edit course or group, assign teacher, move learner, and change status
  flows may be fully rendered and locally validated, but preview changes remain
  unsaved.
- Capacity conflicts, duplicate membership, overlapping schedules, and illegal
  status transitions become server validation during backend integration; plan
  visible error placement now without pretending enforcement exists.

### Events

- Provide an operational event catalogue with Draft, Scheduled, Registration
  open, Full, Completed, Cancelled, Archived, and Unavailable states.
- Event detail/editor covers localized title/summary, date/time/time zone,
  location or online format, capacity, registration window, programme, speaker
  preview, media metadata, related courses, and public visibility.
- Show persisted registration counts and link to the owning Requests queue.
- Create/Edit/Duplicate/Cancel/Publish controls may update an in-memory draft
  only with unsaved disclosure. Real publication, registration capacity,
  notifications remain separate work; public content and registration capacity
  already synchronize through the approved backend contract.

### Locations, branches, rooms, and schedule

- Locations shows fictional branches, rooms/spaces, capacity, delivery type,
  opening status, and schedule occupancy.
- Schedule supports day/week/agenda and room/teacher/group perspectives from one
  typed schedule model.
- Admin can locally filter by branch, room, teacher, group, course, and status.
- Create/Edit lesson/session dialogs include date, time, room, teacher, group,
  capacity, lesson identity, and conflict-summary placement.
- The preview must not claim calendar synchronization or conflict-safe saving.
  Backend integration adds transactions, conflict checks, and authoritative
  availability.

### Attendance operations

- Provide session-first attendance with date, branch, group, teacher, room,
  expected count, present/absent/late/excused/unmarked totals, and completion
  status.
- Attendance detail includes learner rows, status selection, note/reason,
  change-history placeholder, and links to learner/group/session.
- Filters include date range, branch, group, teacher, learner, completion state,
  and attendance exception.
- Preview status marking may update mounted fictional state with unsaved
  disclosure. Real attendance changes require authenticated server ownership,
  validation, timestamp, actor, and audit event.
- Provide bulk-selection UI only when each selected row remains reviewable.
  Never claim a bulk update succeeded without backend confirmation.

### Payments and finance operations

- Admin Payments manages invoice and ledger status, not payment processing.
- Provide period, branch, group, learner, status, method metadata, due date,
  expected, paid, balance, discount/waiver, refund status, and receipt metadata.
- Detail pages show immutable-looking ledger entries, adjustments, related
  learner/enrolment, actor/audit placeholder, and explanatory notes.
- Filters and summaries cover Paid, Partial, Due, Overdue, Waived, Refunded,
  Disputed, and Unavailable states with locale-aware currency.
- Add payment, adjustment, waiver, refund, and receipt controls may open complete
  review forms, but the frontend milestone must not change financial totals or
  claim a transaction. These remain unavailable until backend accounting rules
  and explicit payment-provider scope are approved.
- Teacher salary/penalty summaries may be visible only where the planned Admin
  role permits them. Payroll execution is out of scope.

### Tests, question authoring, and results oversight

- Tests catalogue supports Draft, Ready for review, Scheduled, Published,
  Closed, Archived, and Unavailable states.
- Test detail/builder covers localized metadata, sections, timing, navigation
  rules, question order, attempt policy, availability, scoring model, course/
  group assignment, and version history placement.
- Provide typed authoring previews for each Student runner question type,
  including answer/rubric configuration kept strictly out of Student payload-
  shaped fixtures.
- Preview create/edit/reorder/duplicate/validate/publish controls may update an
  in-memory draft only. Publish, schedule, and version creation must not claim
  server success.
- Results oversight includes attempt status, deterministic score breakdown,
  pending Writing/Speaking review, withheld/cancelled states, reviewer
  assignment, and audit-history placement.
- Manual review UI includes rubric criteria, evidence/response viewer, feedback,
  proposed score, moderation status, and explicit finalization confirmation.
  Final results cannot be persisted until backend authorization and atomic
  result rules exist.

### Library, Telegram imports, and content review

- Library management lists resources by type, locale completeness, category,
  source, rights status, media status, publication state, and associations.
- Resource detail/editor covers Uzbek/Russian/English content, metadata, source/
  license evidence, asset placeholders, related courses/tests, preview, and
  publication checklist.
- Imports lists source, cursor/progress, item counts, duplicates, failures,
  review backlog, timestamps, and job status from fictional fixtures.
- Import detail includes traceable source message identity, raw-source summary,
  media metadata, classification, deduplication result, validation issues, and
  normalized-resource preview.
- Approve, reject, reclassify, retry, merge, and publish flows may be rendered
  for UX review but remain unsaved in-memory previews. No Telegram connection,
  file download, upload, or publication occurs in this frontend milestone.
- Unknown, unsafe, incomplete, rights-unverified, or untranslated content must
  never appear in the Student-visible fixture set.

### Transfer requests

- Provide Pending, Approved, Declined, Cancelled, and Completed views with
  learner, source/destination group, reason, capacity, schedule-conflict,
  payment/attendance note, requester, reviewer, and timestamps.
- Detail review shows the learner and both group summaries before any decision.
- Preview approval/decline may update mounted fictional state only after a
  confirmation and unsaved notice. Real transfer requires one server
  transaction, capacity validation, membership update, schedule checks, and
  audit event.

### Admin notifications

- Provide template and audience-selection UI for operational notices such as
  schedule changes, attendance follow-up, payment reminders, test publication,
  and result availability.
- Audience preview supports branch, course, group, role, and selected recipients
  using fictional counts without exposing private recipient data.
- Drafting and local preview are allowed; send, schedule, delivery, retry,
  read-receipt, and provider integration remain unavailable until backend
  contracts and explicit communication approval exist.

### Audit and operational history

- Provide a read-only fictional audit timeline with actor role, action,
  entity type/id, timestamp, reason, and safe before/after summary.
- Filters include actor, action, entity, date, and severity.
- Never allow editing or deleting audit entries.
- Real audit data, sensitive-field redaction, retention, export, and permission
  policy are backend/security responsibilities.

### Reports and exports

- Provide read-only academic, enrolment, attendance, test/result, payment-status,
  teacher-workload, room-utilization, request-queue, and content-review reports
  from typed fictional snapshots.
- Every chart has a textual/table equivalent and clearly states its period,
  filters, unit, currency, and preview status.
- Support local date, branch, course, group, and status filters.
- Export, scheduled report delivery, saved report configuration, drill-through
  permissions, and authoritative aggregation remain backend features. Export
  controls may be visible but must show an unavailable notice rather than
  generating misleading business files.

### Admin settings

- Include operational Admin profile, language, notification preferences,
  accessibility preferences, active-session preview, branch context, and logout.
- Keep role/permission management, secret/configuration management, auth
  providers, integrations, backups, billing-provider keys, and infrastructure
  settings out of operational Admin.
- Password, profile-photo upload, session revocation, account deletion, and
  persistent preferences remain unavailable until supported by authenticated
  backend operations.

### Admin ownership and contracts

- Own route components under `app/[locale]/(admin)/admin/`, reusable Admin UI
  under `features/admin/`, hooks under `hooks/admin/`, preview data under
  `data/admin/`, copy under `dictionaries/admin/`, types under `types/admin/`,
  and styles under `css/admin/`.
- Keep all Admin copy complete in Uzbek, Russian, and English.
- Use stable ids, ISO timestamps, explicit statuses, minor-unit money values,
  currency codes, actor/reason fields, and relationship keys.
- Keep pages thin and split data-dense tables, filter bars, detail panels,
  forms, and action menus into focused components.
- Use `generateStaticParams` for local preview detail ids/slugs where suitable
  and `notFound()` for unknown fixtures; move to authorized backend lookup when
  the Admin data source becomes real.
- Admin view models stay separate from generated backend operation types and
  receive data through explicit adapters during integration.

### Admin frontend verification and completion

Before the Admin frontend milestone can be presented as complete:

- Every approved route renders in all three locales and remains outside public
  navigation and sitemap.
- Desktop, tablet, and mobile expose equivalent information and actions.
- Tables, cards, filters, sorting, selection, detail views, dialogs, forms,
  confirmations, focus behavior, and interaction-generated empty states work.
- Cross-links among requests, learners, teachers, courses, groups, schedule,
  attendance, payments, tests/results, Library/imports, transfers, and reports
  use consistent ids.
- Preview actions never claim account, attendance, payment, publication,
  notification, result, or audit persistence.
- Operational Admin cannot access or appear to control Super Admin capabilities.
- No real personal, credential, payment, salary, Telegram-session, or content-
  rights data is included.
- Public request views distinguish persisted submissions from intentionally
  fictional dashboard-preview records.
- Reports remain transparent fictional snapshots and exports do not claim
  production truth.
- Repository lint, typecheck, build, and relevant automated tests pass.

## 20D. Shared Student/Admin parallel delivery plan

### Approval and execution status

- Sections 20B-20D and the matching sibling-backend work are explicitly
  approved and active.
- Build frontend and backend as parallel vertical slices: contract and policy,
  backend domain/resolver/persistence, generated frontend operation types,
  role-owned UI states, and end-to-end verification.
- Keep `best-react` and `best-server` as sibling repositories. Do not migrate
  either repository into the other or create a combined monorepo.
- Existing public, Auth, Teacher, and backend behavior is a protected baseline;
  preserve unrelated work and extend existing domains rather than duplicating
  them.

Explicit non-goals remain Parent/Guardian portals, Super Admin, Teacher/Student
chat, lead-sales CRM beyond the defined request queue, HR/payroll execution,
payment-provider checkout, production CMS outside the defined Course/Event/
Library operations, certificates, AI grading, native mobile applications, and
real integrations. Add any of these only through a new user-approved scope
change recorded in this file.

The current frontend does not need to be visually complete before Student/Admin
work begins. Preserve the working baseline and complete UI and backend contracts
in the same vertical stream so neither side accumulates knowingly incompatible
assumptions.

### Parallel frontend/backend architecture

- Establish role-owned shells, navigation, route metadata, dictionaries, types,
  preview data, and CSS before route-by-route implementation.
- Introduce neutral shared domain primitives only after Student/Admin create a
  second real consumer. Shared modules may define ids, localized text, money,
  date ranges, and relationship keys, but must not contain role-specific copy,
  permissions, page view models, or business mutations.
- Keep canonical fictional relationships consistent across role-owned preview
  projections: the same group, course, lesson, assignment, test version, and
  result ids must connect related Student, Teacher, and Admin screens.
- Do not make the existing Teacher feature import Student/Admin dictionaries or
  page models. Share only genuinely neutral contracts or small UI primitives.
- Put data access behind focused role/domain adapter functions rather than
  reading large fixture objects throughout components. Adapters may use typed
  seed fixtures for explicit preview mode and generated GraphQL operations for
  connected mode, with matching view models and honest state labels.
- Keep Server Components as route/data assembly boundaries and Client
  Components as the smallest interactive filters, forms, menus, dialogs,
  runners, tables, or charts.
- Do not build a fake API, mock route handlers, server actions, browser database,
  or persistence layer to make the preview look connected.

### UI and integration state boundary

Implement for every relevant route:

- Populated fictional screens and relational detail routes.
- Responsive navigation and layout parity.
- Local search, filters, sorting, tabs, pagination presentation, selection,
  accordions, menus, dialogs, and validation.
- Validated server-backed mutations where approved; use in-memory drafts only
  before submit or in explicitly labeled preview/development mode.
- Interaction-generated empty states and honest unavailable notices.
- Static fixtures for completed, pending, blocked, warning, and informational
  visual states where needed to review layout.

Implement in the current parallel backend integration:

- Server-authenticated route protection and field-level authorization.
- Query loading, network error, retry, permission denied, stale data, cursor
  pagination, optimistic concurrency, and offline/recovery behavior.
- Real create/update/delete, autosave, submission, scoring, uploads, downloads,
  notifications, payment records, session management, and audit persistence.
- Server validation, conflict detection, idempotency, rate limits, monitoring,
  and secure failure handling.
- Profile-photo preview/upload lifecycle and other file workflows tied to signed
  storage contracts.

### Frontend source ownership

```text
src/
  app/[locale]/
    (student)/
      layout.tsx
      student/
        page.tsx
        courses/
        schedule/
        assignments/
        library/
        tests/
        results/
        progress/
        payments/
        notifications/
        settings/
    (admin)/
      layout.tsx
      admin/
        page.tsx
        requests/
        students/
        teachers/
        groups/
        courses/
        events/
        locations/
        schedule/
        attendance/
        payments/
        tests/
        results/
        library/
        imports/
        transfer-requests/
        notifications/
        audit/
        reports/
        settings/
  features/
    student/
    admin/
  hooks/
    student/
    admin/
  data/
    student/
    admin/
  dictionaries/
    student/
    admin/
  css/
    student/
    admin/
  types/
    domain/
    student/
    admin/
```

Keep route-local sections colocated beside their pages and split shared
role-owned UI only after a second use case exists. Do not create empty folders
speculatively beyond the first approved implementation slice.

### Cross-role responsibility map

This table defines product intent; backend authorization is the source of truth.

| Domain | Student | Teacher | Operational Admin |
| --- | --- | --- | --- |
| Courses/groups | View own enrolments | View assigned groups | Configure and assign |
| Schedule/rooms | View own schedule | View assigned schedule | Coordinate and resolve conflicts |
| Attendance | View own records | Record/review assigned sessions when authorized | Monitor, correct, and audit |
| Assignments | View and submit own work | Create/review assigned-group work | Oversee configuration and exceptions |
| Tests | Take assigned tests | View assigned-group test context | Author, schedule, publish, and review |
| Results/progress | View permitted own results | View permitted assigned learners | Moderate, withhold, audit, and report |
| Payments | View own ledger status | View approved aggregate analytics | Manage invoice/ledger status, not provider checkout |
| Library | Consume published resources | Use linked teaching resources | Curate, review, and publish |
| Transfers | View resulting membership/status | View assigned-group requests | Review and execute authorized transfers |
| Notifications | Receive permitted notices | Receive operational notices | Draft audiences and send when backend-approved |
| Public requests | No dashboard management | No dashboard management | Triage enquiries, event registrations, and exam requests |
| Audit/reports | Own summaries only | Assigned-scope summaries | Read permitted operational history and reports |

No role may infer permission from route visibility, client state, a query
parameter, or fixture ownership.

### Contract-freeze checklist for parallel backend work

Document and review throughout the active vertical slices:

- Route inventory and stable dynamic identifiers.
- Entity relationship map and ownership.
- Status/state-machine unions and legal transitions.
- List filters, sorts, cursor needs, and detail query shapes.
- Mutation intent, validation, confirmation, idempotency, and audit needs.
- Money/currency, date/time/time-zone, locale, and file metadata rules.
- Test version, attempt, answer, submission, scoring, review, and result rules.
- Attendance session/record and schedule-conflict rules.
- Invoice, ledger, adjustment, waiver, refund, and receipt semantics without
  assuming a payment provider.
- Library asset, source, rights, localization, review, and publication rules.
- Notification audience, delivery, scheduling, and read-state rules.
- Public enquiry/event/exam request intake, consent, assignment, deduplication,
  retention, and resolution rules.
- Report metric definitions, aggregation periods, visibility, and export rules.
- Role/permission matrix for Student, Teacher, and operational Admin.
- Loading, error, empty, unavailable, permission, retry, stale, and offline
  states to add during backend integration.

Do not freeze contracts from visual labels alone. Resolve ambiguous business
rules with the user before schema or API implementation.

### Approved delivery order

1. Preserve and verify the current public/Auth/Library/Teacher baseline.
2. Add neutral domain primitives and relational fictional ids only where two or
   more dashboards need them.
3. Build the Student shell, navigation, metadata, dictionaries, and preview
   contracts.
4. Build Student Dashboard, Courses, Schedule, and Assignments.
5. Integrate the existing Library into the Student shell.
6. Build Tests catalogue and the in-memory Test Runner preview.
7. Build Results, Progress, Payments, Notifications, and Settings.
8. Verify the complete Student frontend at all target widths and locales.
9. Build the Admin shell, navigation, metadata, dictionaries, and preview
   contracts.
10. Build Admin Dashboard, Requests, Students, Teachers, Courses, Groups,
    Events, Locations, and Schedule.
11. Build Attendance, Payments, Tests/Results, Library/Imports, Transfers,
    Notifications, Audit, Reports, and Settings.
12. Verify the complete Admin frontend at all target widths and locales.
13. Run cross-role relational review and freeze the first backend contract map.
14. Extend the approved sibling backend while frontend work proceeds in parallel
    on generated-client adapters and backend-driven state handling.
15. Integrate one production vertical slice at a time; do not connect every
    screen to partial endpoints simultaneously.

### Parallel integration lanes

The active parallel lanes are:

- Backend lane owns schema, migrations, services, authorization, queues,
  storage, audit, observability, and tests.
- Frontend lane owns GraphQL operations, generated types, adapters, query/
  mutation state, accessibility, error/retry/permission UX, and replacement of
  preview disclosures.
- Data/content lane owns Telegram import review, localization completeness,
  rights metadata, seed fixtures, and production-content acceptance.
- Quality lane owns contract tests, authorization tests, end-to-end role
  journeys, responsive/accessibility regression, load tests, and release gates.
- Integrate in this order: identity/RBAC, Student Test vertical slice, Library/
  imports, course/group/schedule/attendance, results/progress, payments ledger,
  notifications, and remaining Admin operations.

### Combined frontend definition of done

The approved frontend milestone is complete only when:

- All Student and Admin routes in sections 20B and 20C exist in Uzbek, Russian,
  and English with complete responsive feature parity.
- Public, Auth, Student, Teacher, and Admin shells do not leak navigation,
  styles, themes, dictionaries, or role-specific state into one another.
- Cross-role preview entities and links are relationally consistent.
- Every visible control has an honest local, unavailable, or navigation outcome.
- No fake backend, persistence, authorization, payment, upload, delivery,
  official scoring, or destructive success exists.
- All permitted in-memory changes reset on refresh and disclose that behavior.
- Keyboard access, focus management, contrast, reduced motion, touch targets,
  semantic tables/forms, and bounded scrolling meet the accessibility rules.
- Student/Admin routes are excluded from the public sitemap and marked
  noindex/nofollow.
- Lint, typecheck, production build, targeted tests, route checks, and manual
  responsive verification pass.
- The contract-freeze checklist is documented for backend implementation.

## BACKEND PLAN

This section is an approved integration specification. The backend already
exists in the sibling `../best-server` repository; inspect and extend that
architecture in place. Do not recreate it inside this frontend, move either
repository, or duplicate domains that the backend already implements.

### Backend technology decisions

- Preserve Yarn 4 and the existing Turborepo organization inside `best-server`.
- Keep `best-react` as the single sibling Next.js web frontend for the public
  website and Student, Teacher, and operational Admin workspaces.
- Build one modular NestJS backend that exposes product functionality through a
  code-first GraphQL API using the current stable official Apollo driver.
- Use PostgreSQL as the primary transactional database and Prisma for the
  schema, migrations, generated database client, and transactions.
- Use Redis and BullMQ for persistent distributed background jobs.
- Preserve the backend's approved SeaweedFS S3-compatible object-storage
  architecture and pinned local infrastructure; do not replace it with MinIO.
- Use GraphQL Code Generator to derive frontend operation result and variable
  types from the generated GraphQL schema and authored operations.
- Use a read-only TDLib integration for Telegram channel history and media.
- Deploy the web, API, import worker, and scoring worker independently. Do not
  create one backend server per dashboard.
- Do not create an AI worker in the initial backend milestone. Define only the
  versioned contracts required for a separately approved AI milestone.

Use current stable official documentation at implementation time. In
particular, follow NestJS GraphQL and BullMQ integration guidance, Prisma
PostgreSQL migration/transaction guidance, and GraphQL Code Generator client
preset guidance rather than copying outdated setup patterns.

### Existing sibling repository structure

```text
best-react/             Separate sibling Next.js application
best-server/
  apps/
    api/                 NestJS GraphQL API
    import-worker/       Telegram and media-processing consumer
    scoring-worker/      Deterministic test-scoring consumer
  packages/
    database/            Prisma schema, migrations, seeds, and client
    graphql/             Schema, operations, and generated client types
    scoring/             Versioned deterministic scoring rules
    auth/                Shared authentication contracts
    config/              Typed environment and application configuration
    logger/              Shared structured logging
    testing/             Fixtures, factories, and integration helpers
  infrastructure/
    docker/              Local PostgreSQL, Redis, and SeaweedFS definitions
    scripts/             Safe environment and deployment helpers
```

Every workspace must own a focused responsibility. Avoid generic shared
packages that merely hide imports, and do not place domain business logic in
`packages/config` or the frontend.

### Runtime and deployment topology

```text
Browser
  -> Next.js web
  -> NestJS GraphQL API
       -> PostgreSQL
       -> Redis/BullMQ
            -> import-worker
            -> scoring-worker
       -> S3-compatible object storage
```

- Build every app as an independent artifact and container.
- Keep the API stateless so multiple replicas can run behind a load balancer.
- Scale import and scoring workers by queue workload without scaling the web or
  API unnecessarily.
- Use one PostgreSQL primary and one Redis deployment initially. Introduce
  connection pooling, replicas, partitioning, or additional services only when
  measured load requires them.
- Place the GraphQL API behind the same public origin or an approved gateway so
  secure session cookies do not depend on fragile cross-origin behavior.
- Keep operational health, readiness, and metrics endpoints outside the product
  GraphQL schema. Product data and mutations remain GraphQL-first.

### GraphQL architecture

Expose one product endpoint at `/graphql` and organize the NestJS application
by domain modules:

```text
AuthModule
UsersModule
StudentsModule
TeachersModule
AdminModule
BranchesModule
CoursesModule
EventsModule
GroupsModule
EnrolmentsModule
LessonsModule
SchedulesModule
AttendanceModule
AssignmentsModule
LibraryModule
TestsModule
AttemptsModule
ResultsModule
PaymentsModule
TransfersModule
RequestsModule
ImportsModule
AssetsModule
NotificationsModule
ReportsModule
AuditModule
```

- Use code-first GraphQL decorators and TypeScript classes as the backend schema
  source. Generate and commit or publish the resulting schema artifact for
  codegen, review, and compatibility checks.
- Do not share backend resolver models directly with the frontend. Frontend
  types must represent the fields selected by actual GraphQL operations.
- Keep resolvers thin. Place authorization and business rules in domain
  services, and data access in focused repositories/providers.
- Use DataLoader or equivalent request-scoped batching for relational fields to
  prevent N+1 queries.
- Use cursor pagination for growing lists such as resources, attempts, results,
  imports, learners, and audit records.
- Use explicit query, mutation, and subscription names. Avoid generic
  `createItem`, `updateData`, or unbounded nested queries.
- Use GraphQL subscriptions for result-ready events only when the Redis-backed
  multi-instance transport is available. Keep a polling fallback for connection
  loss and environments where subscriptions are disabled.
- Use generated client operations and fragments through GraphQL Code Generator.
  Never maintain duplicate handwritten request/response interfaces.
- Add production query depth, alias count, complexity, payload-size, timeout,
  and rate limits. Consider persisted operations before public production
  release to reduce arbitrary-query attack surface.
- Disable or restrict production schema exploration according to the final
  operational policy while keeping schema artifacts available to CI/codegen.
- Introduce GraphQL Federation only after a real domain is extracted into an
  independently owned service. Do not federate the initial modular monolith.

### Authentication and authorization

The backend milestone expands the current narrow Auth.js preview only after
explicit approval.

- Retain Auth.js for approved Google, Facebook, and Apple provider interaction,
  but replace presentation-only role state with database-backed identity,
  sessions, roles, and permissions.
- Prefer secure database-backed sessions for the shared web/API architecture.
  Store real users, provider accounts, and sessions in PostgreSQL.
- Resolve the session in the NestJS GraphQL context and load roles and
  permissions from the server. Never trust a client role, role query parameter,
  Teacher ID, Admin ID, or GraphQL input as authorization evidence.
- Support Student, Teacher, and operational Admin. Do not add Super Admin without
  fresh approval.
- Enforce authentication, role, ownership, group membership, attempt ownership,
  and field-level permissions on the server.
- Protect connected Student and Admin data only after server-side identity and
  role validation. Explicit preview routes and fixture adapters must never be
  treated as secure or expose real records. Teacher remains preview-only until
  its credential-verification scope is separately approved.
- Keep cookies secure, HttpOnly, appropriately SameSite, narrowly scoped, and
  compatible with the approved gateway/origin topology.
- Add CSRF protections where cookie-authenticated state changes require them,
  restrict origins, and do not expose provider tokens to the browser or GraphQL
  schema.
- Keep email/password credentials disabled until a separately approved secure
  credentials service exists.

### PostgreSQL and Prisma data domains

Plan the relational schema in these bounded domains.

Identity:

- `users`
- `accounts`
- `sessions`
- `roles`
- `user_roles`
- `student_profiles`
- `teacher_profiles`
- `admin_profiles`

Education:

- `branches`
- `rooms`
- `courses`
- `course_translations`
- `groups`
- `group_teachers`
- `group_members`
- `enrolments`
- `lessons`
- `lesson_materials`
- `assignments`
- `assignment_assets`
- `assignment_submissions`
- `schedules`
- `attendance_sessions`
- `attendance_records`

Public content and intake:

- `events`
- `event_translations`
- `contact_enquiries`
- `course_interest_requests`
- `event_registrations`
- `exam_requests`
- `request_assignments`
- `request_notes`

Library and assets:

- `resources`
- `resource_translations`
- `resource_categories`
- `assets`
- `resource_assets`

Tests and results:

- `tests`
- `test_versions`
- `test_sections`
- `questions`
- `question_translations`
- `choices`
- `correct_answers`
- `attempts`
- `student_answers`
- `results`
- `score_breakdowns`
- `manual_reviews`

Finance and payment status:

- `billing_periods`
- `invoices`
- `invoice_lines`
- `payment_records`
- `ledger_entries`
- `payment_adjustments`
- `waivers`
- `refund_records`
- `receipt_assets`

Telegram import:

- `telegram_sources`
- `telegram_posts`
- `telegram_assets`
- `import_jobs`
- `import_errors`
- `content_reviews`

Future evaluation:

- `rubrics`
- `rubric_versions`
- `evaluation_jobs`
- `evaluations`
- `teacher_reviews`

Platform operations:

- `transfer_requests`
- `notification_templates`
- `notification_campaigns`
- `notification_recipients`
- `notification_deliveries`
- `audit_logs`
- `outbox_events`

Schema rules:

- Use foreign keys, unique constraints, checks, indexes, and transactions to
  enforce domain invariants in addition to application validation.
- Use translation tables for product content that must be published in Uzbek,
  Russian, and English. Do not hide searchable production translations in an
  unstructured blob.
- Use PostgreSQL JSONB for raw Telegram payloads, future structured AI output,
  and genuinely variable source metadata, while keeping queried relational
  fields in typed columns.
- Make published test versions immutable and bind every attempt to one exact
  version.
- Enforce one authoritative attempt identity, answer uniqueness per
  attempt/question, legal state transitions, and scoring/result consistency at
  the database and service layers.
- Store money in integer minor units with an explicit currency and immutable
  ledger references. Derive balances from authoritative entries rather than
  trusting editable totals.
- Enforce schedule overlap, room capacity, group capacity, enrolment uniqueness,
  attendance uniqueness per learner/session, and transfer consistency in
  transactions.
- Preserve actor, reason, timestamp, and audit linkage for attendance, payment,
  enrolment, transfer, publication, and result changes.
- Use additive, reviewed migrations and safe backfills. Never edit a deployed
  migration in place or run destructive production migration commands without
  explicit review, backup, and rollback planning.

### Object-storage architecture

Do not store PDF, image, video, or audio binary data in PostgreSQL.

1. A GraphQL mutation creates an authorized upload intent and a short-lived
   signed URL.
2. The browser or worker uploads directly to object storage.
3. A confirmation mutation or worker verifies the object and marks the asset
   ready.
4. PostgreSQL stores the storage key, original name, MIME type, size, checksum,
   source, owner, visibility, processing status, and timestamps.

- Keep private resources in private buckets and issue short-lived signed
  download URLs after authorization.
- Validate MIME signature and extension, enforce size limits, calculate
  checksums, sanitize names and metadata, and add malware scanning before
  publication.
- Preserve source/license metadata and do not expose imported material until
  ownership and publication review succeed.
- Use stable storage keys rather than public vendor URLs in domain records.

### Redis and BullMQ job architecture

Plan named queues for:

```text
telegram-sync
telegram-download
media-processing
content-classification
test-scoring
notification-delivery
ai-evaluation          # disabled until separately approved
```

- Give every job an idempotency key, explicit payload version, retry policy,
  exponential backoff, timeout, progress state, structured error, and audit
  context.
- Configure failed/dead-letter handling and an operational retry path. Never
  create an infinite automatic retry loop.
- Use the transactional outbox pattern for database changes that must reliably
  enqueue work, especially final test submission and content import state.
- Treat Redis as queue/cache infrastructure, not the authoritative source for
  student answers, results, users, or imported content.
- Scale queue consumers independently and apply concurrency/rate limits per
  external provider and workload.

### Telegram import architecture

Run Telegram ingestion only in `import-worker` with approved read-only TDLib
credentials.

1. Register an approved source channel and encrypted credential/session
   reference.
2. Fetch channel history in resumable batches with a durable cursor.
3. Upsert posts by source channel and message identity.
4. Preserve publication/edit timestamps, source link, original text/caption,
   media metadata, raw payload, and import version for traceability.
5. Download PDF/image media, validate it, calculate checksums, and upload it to
   object storage.
6. Classify content using deterministic source tags/templates and approved
   rules first. Keep future AI classification optional and separately approved.
7. Normalize accepted metadata into Library/domain records.
8. Route unknown, ambiguous, incomplete, unsafe, duplicated, or failed entries
   to an operational Admin review queue.
9. Publish content to Students only after review, rights verification, and
   required localization are complete.

- Make repeated imports idempotent and resume from interruption without
  duplicating posts or files.
- Deduplicate posts by channel/message identity and media by checksum where
  appropriate.
- Never commit or paste Telegram bot tokens, `api_id`, `api_hash`, phone login
  data, or TDLib session material. Use ignored local secrets and a production
  secret manager.
- Record import counts, failures, durations, cursors, and review status for
  observability and recovery.

### Test-platform architecture

Test authoring and publication:

- Create tests as drafts with typed sections, questions, choices, assets,
  timing, navigation, review, and scoring rules.
- Validate completeness before publication.
- Create an immutable `test_version` when publishing. Editing a published test
  creates a new version rather than changing active attempts.
- Never include correct answers or private scoring rules in Student GraphQL
  payloads.

Student attempt flow:

1. Authorize the Student and test availability.
2. Create or resume one server-owned attempt for the permitted policy.
3. Deliver the exact published test version.
4. Autosave answers through idempotent mutations and durable database writes.
5. Enforce timer, expiry, navigation, and submission rules using server time.
6. Lock the attempt in a transaction and transition it to `SUBMITTED`.
7. Write a transactional outbox event for scoring.
8. Move the attempt through `SCORING` to `COMPLETED` or `REVIEW_REQUIRED`.
9. Persist result and criterion/section breakdown atomically.
10. Notify the client through a result-ready subscription with polling fallback.

Use explicit attempt states:

```text
CREATED
IN_PROGRESS
SUBMITTED
SCORING
COMPLETED
REVIEW_REQUIRED
EXPIRED
CANCELLED
```

- Keep deterministic scoring rules as pure, versioned TypeScript functions in
  `packages/scoring` so workers and tests use one implementation.
- Unit-test every scoring rule, rounding rule, partial-credit rule, and invalid
  state.
- Multiple-choice and deterministic tests may produce results immediately after
  background scoring completes.
- Writing and Speaking remain `REVIEW_REQUIRED` until teacher review or a
  separately approved AI-evaluation workflow completes.

### Dashboard frontend/backend integration order

Sections 20B-20D are active. Complete Student and Admin UI composition while
extending the existing backend as parallel vertical slices. Explicit fixture
mode remains clearly fictional; connected data requires server identity and
authorization.

Freeze each contract map before its connected UI ships, then deliver:

1. Identity, database-backed sessions, role resolution, and route/field
   authorization for Student, Teacher, and operational Admin.
2. Tests list -> Test Runner -> autosave -> submit -> deterministic scoring ->
   result, including Admin authoring/review and permitted Teacher visibility.
3. Library -> object storage -> Telegram import -> Admin review -> localized
   publication -> authorized Student access.
4. Courses, groups, enrolments, schedules, rooms, assignments, and attendance
   across Student, Teacher, and Admin projections.
5. Results history, manual review, progress aggregation, and audit.
6. Invoice/payment ledger read models and authorized operational adjustments;
   payment-provider checkout remains separately approved.
7. Notification templates, audiences, delivery jobs, read state, and recovery.
8. Profile/settings, uploads, session controls, and remaining operational
   actions.

Every slice includes GraphQL contract/schema, migrations, authorization,
service/repository behavior, generated frontend types, adapters, loading/error/
permission/retry UX, audit/observability, automated tests, and responsive
end-to-end verification.

### Future AI-evaluation boundary

Do not build or connect AI grading in the initial backend milestone. Prepare
versioned contracts for:

- Original Writing and Speaking submissions
- Speaking audio and transcription
- Rubric and rubric version
- Asynchronous evaluation job
- Criterion-level score and evidence
- Feedback and confidence
- Model and prompt version
- Teacher review and override
- Immutable audit history

Low-confidence, inconsistent, failed, or policy-sensitive evaluations must
route to human review. AI output must never overwrite the original submission
or silently replace a teacher-approved result.

### Scaling strategy

Initial deployment:

- One PostgreSQL primary with connection pooling
- One Redis deployment
- One S3-compatible object store
- One or more stateless API replicas
- Independently scalable import and scoring workers

Measured growth options:

- Add API replicas behind the load balancer.
- Scale consumers per queue depth and processing latency.
- Add PostgreSQL read replicas for proven read-heavy workloads.
- Partition attempts, answers, import logs, or audit records only after table
  growth and query plans justify it.
- Add CDN delivery and controlled caching for public/authorized media.
- Extract Test Engine, Telegram Import, Notifications, or future AI Evaluation
  into separate services only when ownership, deployment, reliability, or
  scaling evidence requires it.

Do not split Student, Teacher, and Admin into separate backend servers merely
because user counts grow. They share transactional domains; split independently
scalable workloads instead.

### Security requirements

- Server-side RBAC, ownership, and group-membership checks
- Secure HttpOnly session cookies and strict origin policy
- CSRF protection for applicable cookie-authenticated changes
- GraphQL input validation and output authorization
- Query depth, complexity, alias, payload, timeout, and rate limits
- Signed and expiring private-media access
- Secret manager and environment validation
- Sensitive-field and credential redaction in logs
- Audit events for privileged operations and result changes
- Database backup, restore drills, and reviewed migration rollback plans
- Encrypted Telegram session storage
- Correct-answer isolation from Student clients
- Dependency, container, and file-malware scanning

### Observability requirements

Propagate a correlation/request ID through GraphQL requests, database actions,
outbox events, queue jobs, and worker logs. Record only permitted identifiers
and never log credentials, raw passwords, provider tokens, private answers, or
unredacted sensitive payloads.

Monitor:

- GraphQL request and resolver latency/error rate
- Operation name, user/role context, and authorization failures
- Database connections, slow queries, locks, and migration status
- Queue depth, age, retries, dead-letter count, and processing duration
- Test autosave, submission, scoring, and result-ready latency
- Schedule conflicts, attendance completion, transfer failures, and stale
  operational queues
- Invoice/payment-ledger reconciliation failures and unauthorized adjustment
  attempts
- Telegram import cursor, throughput, duplicates, failures, and review backlog
- Notification audience size, delivery status, retry age, and provider failures
- Object-storage upload/processing failures
- API and worker health/readiness

### Test strategy

- Unit tests for scoring, validation, authorization decisions, state machines,
  classification, and storage-key generation.
- PostgreSQL integration tests for constraints, transactions, migrations,
  repositories, outbox delivery, and idempotency.
- GraphQL integration/contract tests for schema, operations, guards, pagination,
  error shapes, and generated client compatibility.
- Worker tests for retries, duplicate delivery, resume, concurrency, failure,
  and dead-letter handling.
- End-to-end Student journeys for auth, test start, autosave, resume, expiry,
  submission, scoring, live result, history, mobile, keyboard access, and
  recovery.
- End-to-end Admin journeys for request intake, learner/group/schedule
  management, attendance, payment-ledger review, test authoring/manual review,
  Library/import review, transfers, notifications, audit/report visibility,
  mobile, keyboard access, and failure recovery.
- Cross-role end-to-end tests proving that one authorized change appears only
  in permitted Student, Teacher, and Admin projections.
- Security tests for role escalation, ownership bypass, correct-answer leakage,
  operational-Admin privilege escalation, financial mutation abuse, malicious
  GraphQL queries, unsafe files, and signed-URL expiration.
- Load tests for concurrent autosave/submission, scoring queue bursts, and 500+
  Telegram item imports, plus peak attendance marking and notification batches.

### CI/CD and environments

Maintain local, test, staging, and production environments with typed required
variables and no committed secrets.

Every pull request must run:

1. Formatting
2. Linting
3. TypeScript checks
4. GraphQL schema generation and diff review
5. GraphQL client codegen consistency
6. Unit tests
7. Database and GraphQL integration tests
8. Migration validation
9. Workspace builds
10. Security and dependency checks

Production deployment order:

1. Verify backup and migration plan.
2. Apply backward-compatible database migrations.
3. Deploy API.
4. Deploy workers.
5. Deploy web.
6. Run smoke and contract tests.
7. Enable feature flags gradually.
8. Monitor and retain a rollback path.

### Implementation phases

Phase 0 — approved baseline and contract audit:

- Preserve and verify the current public, Auth, Student Library, Teacher, and
  existing backend work.
- Audit existing backend domains and GraphQL contracts before adding anything.
- Update both repositories' `AGENTS.md` files to record the active scope.

Phase 1 — Student vertical slices:

- Build the Student shell and every route, contract, fixture, interaction, and
  responsive state approved in section 20B.
- Integrate the existing Library without losing content or route ownership.
- Extend existing backend contracts and verify all three locales, authorization,
  persistence, and honest network/error states.

Phase 2 — Admin vertical slices:

- Build the operational Admin shell and every route, contract, fixture,
  interaction, and responsive state approved in section 20C.
- Extend existing backend contracts, verify audit behavior and cross-role links,
  and ensure no Super Admin capability enters scope.

Phase 3 — contract freeze and integration hardening:

- Complete the checklist in section 20D and resolve ambiguous business rules.
- Freeze compatible schema/operation versions, regenerate client types, and run
  cross-repository contract and integration verification.
- Harden the existing PostgreSQL/Prisma, Redis/BullMQ, SeaweedFS, logging,
  health, auth, and worker foundations only where the new slices require it.

Phase 4 — identity and authorization:

- Add database-backed Auth.js identity/sessions, roles, NestJS GraphQL context,
  server guards, and protected Student/Teacher/Admin boundaries.
- Replace presentation-only role state only after the secure flow is proven.

Phase 5 — first test vertical slice:

- Implement test versioning, attempts, answers, autosave, submission, outbox,
  scoring worker, result-ready notification, Admin review, and Student results
  integration.

Phase 6 — Library and Telegram:

- Implement object storage, Library GraphQL API, TDLib importer, media pipeline,
  classification, review queue, localization readiness, and protected Student
  Library integration.

Phase 7 — education operations:

- Integrate courses, groups, enrolments, schedules, rooms, assignments,
  attendance, transfers, and their Student/Teacher/Admin projections.

Phase 9 — results, progress, payments, and notifications:

- Add result history, manual review, progress aggregation, invoice/payment
  ledger operations, notification delivery, and explicitly authorized
  cross-role visibility.

Phase 10 — production hardening:

- Complete rate limits, auditing, monitoring, backup/restore, load tests,
  deployment automation, feature flags, data migration, and operational
  runbooks.

Phase 11 — future AI evaluation:

- Begin only after separate requirements, privacy, rubric, model, cost, human
  review, and implementation approval.

## 21. Exams

The public Exams page is database-backed and has this sequence:

- A three-step registration instruction
- IELTS, CEFR, and MOCK cards
- A shared IELTS/CEFR form and a MOCK variant with database session selection
- Persisted registration intake with honest API success/error feedback
- A result lookup form that opens a login-required confirmation
- Give every post-hero Exams heading and content block, including the three
  cards below “Three simple steps”, a subtle, one-time bottom-to-top entrance
  using the shared reveal system. Preserve full reduced-motion support.

Do not implement Telegram delivery, a public exam engine, questions, timers,
scoring, result storage, or certificates. The approved site-wide social-auth
flow does not expand Exams.

## 22. About us

- Brand mission
- Educational approach
- Values
- Real BEST story/timeline when supplied, otherwise a marked preview timeline
- Learning environment visual
- Real team content or clearly fictional preview teacher profiles
- Embedded anchored FAQ section
- CTA to Courses or Contact

Founding year, branch count, accreditation, and partnership placeholders are
allowed only as centralized preview data and must be replaced or removed before
production.

## 23. About FAQ section

- Keep the FAQ as an anchored section inside About, not a standalone route
- Link to it from the Footer immediately after About us
- Use an accessible accordion for the six preview questions
- Accessible buttons with `aria-expanded` and keyboard support
- Questions about applying, course choice, level checks, schedules, format
  changes, and response expectations

FAQ content must live in localized PostgreSQL records and be loaded through the
generated public GraphQL query.

## 24. Contact

- Fictional preview contact information from centralized typed data
- Accessible contact form UI
- Form fields: first name, last name, email, title, message, explicit consent
- Centre the Contact form title and its compact submit action. Keep single-line
  controls at a 48 px minimum height while leaving the message textarea content
  driven.
- Client-side feedback plus authoritative server-side validation
- Real `submitContactRequest` persistence with loading, success, and error states
- Location/map preview using an obviously fictional address until a verified
  address is supplied
- Working `mailto:` or `tel:` links only when real values are supplied

Store submitted data only in the approved intake model; never log form payloads
or expose them without Admin authorization.

## 25. Localization

- Supported locales: Uzbek (`uz`), Russian (`ru`), English (`en`).
- Uzbek is the default.
- Route and content localization must follow current App Router guidance.
- Store UI strings in typed dictionaries.
- Store Teacher Workspace strings exclusively in typed teacher dictionaries;
  every Teacher route, label, status, empty state, dialog, and preview notice
  must be complete in all three locales.
- Do not hardcode translatable interface copy inside shared components.
- The `<html lang>` value must match the active locale.
- Metadata must be localized.
- Preserve layout quality when translated labels are longer.
- Use locale-aware date formatting through `Intl.DateTimeFormat`.

If full translated marketing copy is not available, keep the dictionary
structure complete and use clearly centralized draft translations. Do not mix
languages inside one page.

## 26. Content and data modeling

Create explicit TypeScript types for public entities, for example:

- `Locale`
- `NavItem`
- `Course`
- `CourseCategory`
- `Event`
- `ResultStory`
- `LibraryResource` (student-owned)
- `ExamInfo`
- `FaqItem`
- `ContactDetails`
- `TeacherProfile`
- `TeacherDashboardMetric`
- `TeacherGroup`
- `TeacherLearner`
- `TeacherLessonSession`
- `TeacherLessonMaterial`
- `TeacherLessonAssignment`
- `TeacherLessonTest`
- `TeacherTask`
- `TeacherFinanceSnapshot`
- `TeacherScheduleEntry`
- `TeacherTransferRequest`

Use local typed data modules for the current frontend. Keep data easy to replace
with a future API or CMS without rewriting presentation components.

Fictional business facts are expected during client preview. Keep them
centralized, add a concise code comment or data-level preview marker, and do not
carry them into production as verified facts.

## 27. Components and states

Create a coherent reusable component system. Likely primitives include:

- Container
- Section
- SectionHeading
- Button and link-button variants
- Badge
- Card foundations
- CoursePosterCard
- EventCard
- ResourceCard
- ResultCard
- Accordion
- SearchField
- FilterChips
- EmptyState
- LocaleSwitcher
- MobileNavigation

Every interactive component must define relevant states:

- Default
- Hover
- Focus-visible
- Active/selected
- Disabled when applicable
- Empty
- Validation error when applicable

Every anchor with an `href` and every enabled button must use the pointer
cursor globally. Disabled buttons use `cursor: not-allowed`; do not override
these cursor states in page-level CSS without a specific interaction reason.

Use a visible, brand-consistent focus ring. Never remove outlines without an
accessible replacement.

## 28. Images and logo

- The official BEST logo is a source asset; do not redesign, distort, trace, or
  regenerate it. The user has explicitly approved recoloring the extracted
  Navbar icon to Action blue `#2563EB`.
- The approved Navbar icon is the exact vector artwork extracted from the
  supplied official PDF and stored at `public/icons/logo.svg`, recolored to the
  user-approved Action blue `#2563EB`. Do not replace, distort, trace, or
  regenerate it. Use this SVG as the site favicon and render `BEST LC` beside
  it using the main Geist font rather than embedding wordmark text into the SVG.
- Use a varied, visually interesting set of education-related images across the
  public website. Placeholder images may be selected freely to keep the design
  creative and avoid repetitive cards.
- `Random` means curated variety in the local data, not a new random choice on
  every render. Do not use `Math.random()` during rendering because image choices
  must remain stable across server rendering, hydration, refreshes, and builds.
- Keep the imagery style coherent even when subjects vary: modern education,
  bright natural light, clean architecture, authentic learning moments, and the
  approved turquoise/blue brand atmosphere.
- If a suitable education-center or building image is needed and no approved
  asset exists, generate an original **high-fidelity, production-quality** image.
  A generated building must be treated as a conceptual brand visual, not
  presented as a photograph of BEST LC's real location unless the user
  explicitly verifies that claim.
- Keep page-owned raster assets in matching directories under `public/images/`:
  `home-page`, `events-page`, `courses-page`, `results-page`, `exams-page`,
  `about-page`, and `contact-page`. Use clear, descriptive filenames and
  reference them locally through `next/image`. Reserve
  `public/images/generated/` for generated assets that have not yet been
  assigned to a page or are genuinely shared by multiple pages.
- Public page heroes may use the approved recurring 3D character trio: the same
  young boy, young girl, and cream-golden puppy. Preserve their established
  faces, hair, proportions, medium-light warm-beige skin tone, puppy identity,
  and premium matte 3D rendering style across pages. Vary only clothing, pose,
  props, and mood to match the owning page. Preview each new composition for
  user approval before integrating it, keep the final background genuinely
  transparent, and store it in the owning page image directory.
- Before presenting or integrating any generated image, inspect the complete
  frame and targeted close-up crops at full resolution. Confirm that no head,
  hair, hand, finger, limb, foot, paw, tail, clothing edge, prop, or intentional
  shadow is cropped, erased, malformed, or unintentionally transparent.
- Reject and regenerate or repair outputs containing duplicated body parts,
  extra people or animals, unrequested props, stray shapes, accidental text,
  logos, watermarks, checkerboard pixels, background remnants, halos, or other
  generated artifacts. Recheck these invariants after background extraction and
  after final WebP conversion on both light and contrasting solid backgrounds.
- Do not use watermarked images, copyrighted brand assets, or visually unrelated
  random stock photography.
- All website raster content assets must be stored and delivered as high-quality
  `.webp` files. This includes generated hero images, building concepts, course
  thumbnails, event images, student-library covers, result stories, and background
  textures.
- Official vector logos and icons are exempt: preserve supplied SVG assets, and
  use MUI's SVG icon components for interface icons. Do not rasterize vectors
  into WebP merely to satisfy the raster-image rule.
- If an approved generator outputs PNG or JPEG, convert the selected final asset
  to high-quality WebP before adding it to the project. Visually compare the
  converted image against the source and reject conversions with banding,
  blockiness, haloing, damaged transparency, or unreadable details.
- Generate or source images at a resolution appropriate to their largest actual
  display size. Hero and wide architectural imagery should normally start at
  least around 1600 px wide; card assets should retain enough resolution for
  high-density screens. Never upscale a visibly low-resolution image.
- Prefer WebP quality settings around 82–92 as a starting range, then adjust by
  visual inspection. Quality takes priority over hitting an arbitrary tiny file
  size, but do not ship unnecessarily heavy assets.
- Preserve a deliberate crop and focal point for desktop and mobile. Use
  `object-position` or separate art-directed assets when one crop cannot serve
  both layouts well.
- Use `next/image` with correct dimensions, `sizes`, responsive behavior, and
  priority only for the true above-the-fold hero image.
- Keep Next.js image optimization enabled and ensure the documented output
  formats include `image/webp`. Do not set images to `unoptimized` globally.
- Check every final image at 100% scale for generation artifacts, distorted
  faces/hands, malformed architecture, fake text, unwanted logos, watermarks,
  compression damage, and inconsistent lighting.
- Generated images should not contain baked-in UI copy or important text.
- Use consistent image aspect ratios and prevent layout shift.
- Prefer locally supplied, properly licensed images.
- Avoid hotlinking random stock images.
- Every meaningful image needs useful alt text; decorative shapes use empty alt
  text or appropriate presentation semantics.

## 29. Accessibility

Target WCAG 2.2 AA behavior:

- Semantic landmarks: header, nav, main, section, footer
- One logical `h1` per page and ordered heading hierarchy
- Full keyboard navigation
- Visible focus indicators
- Accessible mobile navigation and dialogs
- Proper labels and error association on forms
- Sufficient text and UI contrast
- No color-only communication
- Reduced-motion support
- Meaningful link text
- Alt text rules followed consistently
- Touch-friendly targets
- Accordion and filter state exposed to assistive technology

Accessibility is part of the design, not a final optional pass.

## 30. Performance

- Keep Server Components as the default.
- Limit client JavaScript and Motion usage.
- Avoid large animation dependencies beyond the approved Motion package.
- Optimize images with `next/image`.
- Use the locally bundled Geist variable font to prevent typography layout
  shifts.
- Avoid autoplay video in the initial hero.
- Lazy-load noncritical imagery.
- Prevent cumulative layout shift with explicit dimensions/aspect ratios.
- Do not animate expensive filters or large blur areas on scroll.
- Keep third-party scripts out of this milestone.
- Aim for Lighthouse scores of roughly 90+ Performance and 95+ Accessibility,
  Best Practices, and SEO on representative production builds, while treating
  real measured regressions rather than the number alone as the priority.

## 31. SEO and public metadata

- Unique localized title and description for every public route
- Canonical and language alternate strategy appropriate to the final domain
- Open Graph and social metadata
- `sitemap.ts`
- `robots.ts`
- Correct heading structure
- Descriptive internal links
- Static metadata where content is static
- `generateMetadata` only where local dynamic content requires it

Use placeholder domain configuration in one central site config until the real
production domain is supplied.

Teacher Workspace routes require localized titles and descriptions for browser
context but must use `robots: { index: false, follow: false }`, remain outside
the public sitemap, and never be linked from public marketing navigation.

## 32. Frontend form behavior

Forms are UI-only in this milestone, including Teacher Workspace profile,
password, add-learner, and other reference forms.

- Validate locally with typed state.
- Do not call an API.
- Do not write personal data to localStorage, logs, query strings, or analytics.
- Do not show a false `sent successfully` message.
- Instead show a clear development-state message such as:
  `Yuborish xizmati keyingi bosqichda ulanadi.`
- Keep form logic isolated so a future endpoint can be connected cleanly.
- Teacher preview interactions follow the explicit in-memory behavior in
  section 20A. They must identify unsaved preview state and reset on refresh.

## 33. Implementation order

Follow this sequence unless the existing repository requires a safer order:

1. Inspect the repository and preserve existing work.
2. Initialize or align the current stable Next.js App Router TypeScript project.
3. Establish strict TypeScript, linting, aliases, and Tailwind according to
   current official docs.
4. Add design tokens, typography, theme behavior, and base layout.
5. Create typed locale dictionaries, config, entity types, and local public data.
6. Build header, footer, mobile navigation, and shared UI components.
7. Build the Home page.
8. Build Courses and Events list/detail routes.
9. Build Results, Exams, About with its embedded FAQ, and Contact; maintain the
   separately approved Student Library under student ownership.
10. Add purposeful motion with reduced-motion support.
11. Add metadata, sitemap, robots, not-found UI, and final responsive polish.
12. Run full verification and fix every relevant issue.
13. Establish the shared Teacher Workspace data/contracts and implement the
    desktop side rail/top bar and mobile drawer/bottom navigation together.
14. Build Teacher Dashboard and Groups catalogue/detail route by route, finishing
    desktop and mobile compositions for each before moving to dependent flows.
15. Build Tasks, Finance, Reception, Transfer Requests, and Profile/settings
    with desktop and mobile feature parity, required preview states, and actions
    in the same iteration.
16. Verify every Teacher route and in-scope reference-video function at mobile,
    tablet, laptop, and wide-desktop widths, then run the complete repository
    checks again. Do not include the removed Teacher chat workflow.

The active sequence is sections 20B-20D: complete Student vertical slices,
complete operational Admin vertical slices, freeze generated contracts, and run
cross-repository integration/security/accessibility verification. Preserve the
public and Teacher baselines while this work proceeds.

Do not begin with animation polish before semantic layout, content hierarchy,
and responsive behavior are correct.

## 34. Verification requirements

Before declaring work complete, run and pass the repository's actual scripts,
including at minimum:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

If the project uses a different package manager, run the equivalent commands.

Also verify manually:

- Every public route renders.
- Unknown slugs render the intended not-found state.
- Locale switching works and preserves navigation context.
- Theme switching has no obvious hydration error or flash.
- Header and mobile menu work with keyboard navigation.
- Filters, search, accordions, and form validation work.
- Reduced-motion behavior is respected.
- There is no horizontal overflow at supported breakpoints.
- There are no console errors, React warnings, or broken internal links.
- The fixed light theme has sufficient contrast.
- Google, Facebook, and Apple auth success, cancellation, configuration-error,
  session, and logout states work when provider credentials are available.
- Student/Admin routes use server-authenticated authorization and connected
  backend contracts; presentation-only role state never grants access.
- Every Teacher Workspace route renders in Uzbek, Russian, and English.
- Teacher drawer, bottom navigation, locale preservation, active states, and
  back navigation work with keyboard and touch input.
- Desktop side rail/top bar and mobile drawer/bottom navigation expose the same
  complete Teacher destination set and preserve equivalent route state.
- Dashboard cards and resource previews, group search/debtor filter, learner
  actions, add-learner preview, task filtering and completion preview, finance
  month tabs, reception grid refresh, transfer-request states, and all
  profile/settings rows behave as specified in section 20A.
- Teacher session-local preview mutations reset on refresh, no business or
  personal data is persisted or transmitted, and unavailable server actions do
  not claim success.
- Teacher-only night mode remains scoped to `(teacher)` and meets contrast
  requirements without changing public, auth, or Student Library pages.
- Teacher routes are excluded from the sitemap and use noindex/nofollow metadata.
- No Teacher function exists only on mobile or only on desktop; placement may
  adapt, but feature behavior and preview disclosures remain equivalent.
- Every approved Student and Admin route renders in all three locales, is
  noindex/nofollow, and exposes complete loading, empty, error, denied, retry,
  and connected states where relevant.
- Public, Teacher, Student, and Admin satisfy the distinct design-system rules
  in section 11A at mobile, tablet, and desktop widths.
- Matching backend schema checks, unit tests, integration tests, migrations, and
  generated-client compatibility checks pass in `best-server`.

Do not hide failures with `eslint-disable`, `@ts-ignore`, unsafe casts, or skipped
build steps. Fix the underlying problem.

## 35. Definition of done

The milestone is complete only when:

- All Notion public pages are implemented.
- The project is Next.js App Router and TypeScript-only for application source.
- The approved BEST color system is applied consistently.
- The experience is minimalistic, creative, modern, and brand-specific.
- Animations are polished, purposeful, performant, and reduced-motion aware.
- The site is responsive and accessible.
- Public content is typed and centralized.
- Preview business claims are centralized, marked for replacement, and not
  treated as production-verified facts.
- The complete approved Student and operational Admin inventories in sections
  20B-20D are implemented with matching backend contracts; Parent, Super Admin,
  chat, payment-provider execution, certificates, and AI grading remain absent.
- Teacher remains within section 20A and Auth.js social-provider callbacks remain
  frontend-owned; no client-selected role is trusted as authorization.
- Every in-scope screen, section, navigation item, state, and visible function
  from the supplied Teacher reference video is present with the honest frontend
  behavior defined in section 20A; the explicitly removed Teacher chat workflow
  is excluded.
- Lint, type checking, and production build pass.
- The final handoff lists implemented routes, verification results, remaining
  placeholder business content, and any required official assets.

## 36. Agent behavior

- Read this entire file before making project changes.
- Inspect existing files before editing and preserve unrelated user work.
- Keep commits local until the user has had a chance to review the pending
  commit hashes, messages, and scope.
- Before pushing, summarize every local commit that is ahead of the target
  remote branch and wait for explicit user approval. A user message that names
  the exact remote and branch to push counts as that approval.
- Push only the reviewed commits to the explicitly approved remote and branch;
  do not create a pull request unless the user separately requests one.
- Make reasonable implementation decisions within this scope.
- Ask only when a missing choice would materially change the product.
- Do not silently broaden scope.
- Prefer official documentation and measured behavior over memory.
- Report important assumptions clearly.
- Keep the codebase clean enough for a real team to continue building the later
  student, teacher, admin, and backend milestones without rewriting the public
  frontend or the approved Teacher Workspace foundations.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
