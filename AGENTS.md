# BEST LC Public Website — Project Instructions

## 1. Project mission

Build a production-quality public website for **BEST LC**, an education brand.
The website must feel **minimalistic, creative, bright, modern, trustworthy, and
professional**. This is a real project, not a generic demo or an admin template.

The current milestone is **frontend only**. Implement only the public website
described in the BEST LC Notion plan:

- Home
- Events
- Courses
- Results
- Exams
- About us
- Contact with an embedded FAQ section
- Language switching

Source plan:
https://strong-cartwheel-b38.notion.site/BEST-LC-3a7609e0e68d80639a23c4c941e8ad5d

## 2. Non-negotiable scope boundaries

Do not implement or scaffold any of the following in this milestone:

- Student dashboard or student account pages, except the explicitly approved
  localized Student Library catalogue described below
- Teacher dashboard or teacher account pages
- Administrator dashboard or admin tools
- Login, registration, password reset, role selection, or authentication logic
- Backend APIs, route handlers, server actions, databases, CMS, or persistence
- Payments or checkout
- Protected course lessons, progress tracking, certificates, or assignments
- A working online exam engine
- Fake integrations or buttons that pretend to perform server-side work

Public exam pages may explain exam formats, rules, dates, and registration steps,
but users must not be able to take an exam in this frontend milestone.

If a requested change expands the project into dashboards, authentication, or a
backend, stop and ask for explicit approval before implementing it.

The user has approved one narrow student-area exception: move the existing
localized Library catalogue and its detail routes from public ownership to
`/[locale]/student/library`. Its route components, feature logic, hook, CSS,
typed data, types, and dictionary must remain under student-owned directories.
The route is currently frontend-only and unprotected because authentication is
out of scope. Other student, teacher, and administrator placeholders remain
`.gitkeep`-only; obtain fresh explicit approval before implementing them.

## 2A. Client-preview content convention

This milestone is a client-preview prototype. Until the client supplies real
business content, use complete, thematic fictional placeholder data throughout
the public website so layouts, content density, filtering, detail pages, and
conversion journeys can be reviewed realistically.

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
- This convention authorizes fictional content, not fake functionality by
  default. The event-registration success state in section 7C and exam-request
  preview in section 7D are explicitly approved UI-only simulations; they do
  not add submission or persistence. Never simulate payments, authentication,
  or other backend flows without fresh explicit approval.

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
- Do not add API routes, route handlers, or server actions.

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
          WhyBest.tsx
          LearningProcess.tsx
          ResultsPreview.tsx
          UpcomingEvents.tsx
          FaqPreview.tsx
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
          Mission.tsx
          Values.tsx
          Story.tsx
          page.tsx
        contact/
          ContactHero.tsx
          ContactContent.tsx
          ContactFaq.tsx
          page.tsx
      (student)/
        student/
          library/
            LibraryHero.tsx
            LibraryCatalog.tsx
            page.tsx
            [slug]/
              ResourceHero.tsx
              ResourceContent.tsx
              RelatedResources.tsx
              page.tsx
          courses/.gitkeep
          progress/.gitkeep
          settings/.gitkeep
      (teacher)/
        teacher/
          courses/.gitkeep
          students/.gitkeep
          settings/.gitkeep
      (admin)/
        admin/
          users/.gitkeep
          courses/.gitkeep
          settings/.gitkeep
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
      ContactFaqList.tsx
    student/
      library/
        ResourceCatalog.tsx
        ResourceCard.tsx
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
  config/
  data/
    PublicExams.ts
    student/
      LibraryResources.ts
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
    teacher/.gitkeep
    admin/.gitkeep
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
    teacher/.gitkeep
    admin/.gitkeep
  lib/
  types/
    ExamPreview.ts
    student/
      Library.ts
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
`dictionaries/student/Library.ts`. Reserve `dictionaries/teacher/` and
`dictionaries/admin/` exclusively for their future role areas.

Whenever any new user-facing copy, label, FAQ, content item, or fictional
preview data is added, provide Uzbek (`uz`), Russian (`ru`), and English (`en`)
versions in the same change. Do not ship a new content value in only one or two
locales with the intention of translating it later.

All component styling must live under `src/css/` as scoped CSS Modules. Keep
one stylesheet per public page under `css/public/`, named after its route, such
as `home.module.css` or `about.module.css`. Keep reusable public primitives in
`css/public/shared.module.css`, and keep Navbar/Footer styling in
`css/layout/navbar.module.css` and `css/layout/footer.module.css`. Student
Library styles belong in `css/student/library.module.css`; reserve the empty
`css/teacher/` and `css/admin/` directories for their future role areas.

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
  registration submit, homepage Explore Courses CTA, centred-alert Close, and
  event Attend action. On fine-pointer hover, move the control upward by `2px`
  without changing its occupied layout size. Keep button text and icons
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

- Use `sonner` only as the non-blocking toast engine. Render BEST LC toast JSX
  through the headless/custom path; do not adopt Sonner's default visual theme.
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
  grouped together below the copy.
- Keep notification titles compact and messages to exactly two short
  sentences: the first states the notification outcome, and the second adds a
  warm user-facing note. Put extended explanations in the owning page or dialog
  instead of the alert.
- Keep notification types in `types/Notification.ts`, localized default copy in
  `dictionaries/public/Notifications.ts`, and liquid-glass styles under the
  `/* Notifications */` section of `css/public/shared.module.css`.
- The locale layout owns the single global `NotificationProvider`. Do not mount
  page-specific toaster instances.
- Keep ordinary non-blocking toasts at the top-right. Use the shared
  `showCenterAlert` liquid dialog only for deliberate centre-screen feedback
  such as the event-registration preview; do not reposition Sonner with CSS.
- Preserve keyboard access, Escape dismissal, dialog focus management,
  reduced-motion behavior, readable contrast, and a solid background fallback
  when `backdrop-filter` is unavailable.
- Notifications must not claim that an unimplemented payment, authentication,
  or other backend action succeeded. Event registration and the exam-request
  flow are approved exceptions: during client preview they may show centralized
  fictional success copy as explicitly authorized UI-only simulations.
- Do not connect Events `Details` or `Attend` controls to notifications or other
  actions outside the approved registration flow.

## 7C. Event registration preview

- The frontend-only event registration visual is owned by
  `features/events/EventRegistrationProvider.tsx` and opened through
  `hooks/public/events/useEventRegistration.ts` so one shared dialog serves all
  event cards.
- `Attend` opens the shared MUI registration dialog with a blurred backdrop and
  the selected upcoming-event context. For a past event, `Attend` must skip the
  form and open the shared centred alert with an error tone, a red cancel icon,
  and localized archive/registration-closed copy. Do not mount a separate
  dialog or alert per card.
- During the visual-prototype stage, the form has no validation, submission, or
  persistence. `Register` closes the form and opens a centred simulated-success
  alert with the selected event context. This is presentation-only preview
  behaviour and must remain replaceable before backend integration.
- Keep registration copy localized in Uzbek, Russian, and English under
  `dictionaries/public/EventRegistration.ts`. Replace the simulated success
  flow with validation and real submission handling when the backend contract
  becomes available.

## 7D. Exam request preview

- Keep every top-level Exams section heading block centred, including its
  eyebrow, title, and supporting description. Dialog and card headings retain
  their own content-driven alignment.
- The Exams page may simulate IELTS, CEFR, and MOCK registration requests using
  client-only forms and shared centred success alerts. No request is submitted,
  stored, transmitted to Telegram, or added to an administrator system.
- IELTS and CEFR use the shared exam form; MOCK adds a required selection from
  centralized fictional date slots. Keep the typed content in
  `data/PublicExams.ts`, localized UI copy in
  `dictionaries/public/ExamPreview.ts`, state in focused hooks under
  `hooks/public/exams/`, and rendering in `features/exams/`.
- The Results preview collects a fictional Candidate ID and birth date only in
  client state, then opens the shared login-required confirmation. It must not
  create authentication, a Student Results route, a dashboard, or persistence.
- Use the branded MUI Select menu for exam-level selection and the shared Exams
  calendar popover for date selection. Do not fall back to browser-native
  dropdown or date-picker popups whose appearance cannot follow brand tokens.
- Match each exam-registration summary gradient to its card accent using only
  darker and lighter shades of that one hue: blue for IELTS, turquoise for
  CEFR, and yellow for MOCK. Do not blend different exam accent colors within
  one summary gradient.
- Replace the simulated admin queue, Telegram follow-up, login prompt, and MOCK
  dates when the corresponding backend, authentication, admin, and student-area
  contracts are approved.

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

## 9. Light theme

The website uses one fixed light BEST LC theme. Do not add a dark/light toggle,
color-scheme state, browser-preference detection, theme persistence, dark
semantic tokens, or dark-mode locale labels unless the user explicitly
reintroduces that feature. Keep `BestThemeProvider` only as the light BEST MUI
theme integration.

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

## 12. Layout system

- Mobile-first implementation.
- Validate at approximately 375, 768, 1024, and 1440 px widths.
- Use a centered content container around 1200–1280 px.
- Maintain comfortable mobile gutters and progressively larger desktop gutters.
- Use a consistent spacing scale.
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

Every internal route link across the public and approved student UI—including
Navbar, Footer, cards, CTA buttons, locale controls, and back links—must use the
shared `ScrollToTopLink` component or the same `useScrollToTop` hook so a newly
selected route opens at the top. Hash links must retain their target-section
scrolling. Do not implement a pathname effect that overrides the browser's
normal Back/Forward scroll restoration.

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
Contact FAQ anchor (`/[locale]/contact#faq`). There is no standalone public FAQ
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

4. **Why BEST**
   - Practical learning
   - Experienced teachers
   - Result-focused approach
   - International-standard learning direction may appear as marked preview copy

5. **Learning process**
   - A concise three- or four-step visual explanation

6. **Results preview**
   - Real student outcomes or centralized fictional case-study placeholders

7. **Upcoming events preview**

8. **FAQ preview**

9. **Final CTA**
    - Clear next action leading to Courses or Contact

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
- CTA to Contact or a non-submitting frontend registration modal with the
  approved simulated-success preview state

The simulated event-registration state may confirm attendance in the preview
UI, but must not store, transmit, or log registration data.

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

The Library belongs only to the localized student route at
`/[locale]/student/library`; public navigation, home, public dictionaries,
public data, and the public sitemap must not reference it. Until authentication
is approved, this is an unprotected frontend route rather than a claim of
private access.

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
downloads, authentication, or CMS integration is authorized in this milestone.

## 21. Exams

The public Exams page is a frontend-only client preview with this sequence:

- A three-step registration instruction
- IELTS, CEFR, and MOCK cards
- A shared IELTS/CEFR form and a MOCK variant with fictional date selection
- Simulated admin-queue and Telegram-follow-up success feedback
- A result lookup form that opens a login-required confirmation
- Give every post-hero Exams heading and content block, including the three
  cards below “Three simple steps”, a subtle, one-time bottom-to-top entrance
  using the shared reveal system. Preserve full reduced-motion support.

Do not implement real registration submission, Telegram delivery, admin pages,
authentication, Student Results routes, questions, timers, scoring, result
storage, or certificates.

## 22. About us

- Brand mission
- Educational approach
- Values
- Real BEST story/timeline when supplied, otherwise a marked preview timeline
- Learning environment visual
- Real team content or clearly fictional preview teacher profiles
- CTA to Courses or Contact

Founding year, branch count, accreditation, and partnership placeholders are
allowed only as centralized preview data and must be replaced or removed before
production.

## 23. Contact FAQ section

- Keep the FAQ as an anchored section inside Contact, not a standalone route
- Link to it from the Footer immediately after About us
- Use an accessible accordion for the six contact-focused preview questions
- Accessible buttons with `aria-expanded` and keyboard support
- Questions about applying, course choice, level checks, schedules, format
  changes, and response expectations

FAQ content must live in typed data/dictionary files.

## 24. Contact

- Fictional preview contact information from centralized typed data
- Accessible contact form UI
- Form fields: first name, last name, email, title, message
- Centre the Contact form title and its compact submit action. Keep single-line
  controls at a 48 px minimum height while leaving the message textarea content
  driven.
- Client-side validation only
- Clear disclosure that backend submission is not connected during this
  milestone
- Location/map preview using an obviously fictional address until a verified
  address is supplied
- Working `mailto:` or `tel:` links only when real values are supplied

Do not send, store, or log submitted personal data.

## 25. Localization

- Supported locales: Uzbek (`uz`), Russian (`ru`), English (`en`).
- Uzbek is the default.
- Route and content localization must follow current App Router guidance.
- Store UI strings in typed dictionaries.
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
- CourseCard
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

## 32. Frontend form behavior

Forms are UI-only in this milestone.

- Validate locally with typed state.
- Do not call an API.
- Do not write personal data to localStorage, logs, query strings, or analytics.
- Do not show a false `sent successfully` message.
- Instead show a clear development-state message such as:
  `Yuborish xizmati keyingi bosqichda ulanadi.`
- Keep form logic isolated so a future endpoint can be connected cleanly.

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
9. Build Results, Exams, About, and Contact with its embedded FAQ; maintain the separately
   approved Student Library under student ownership.
10. Add purposeful motion with reduced-motion support.
11. Add metadata, sitemap, robots, not-found UI, and final responsive polish.
12. Run full verification and fix every relevant issue.

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
- No dashboard, authentication, or backend code entered the scope.

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
- No student, teacher, admin, authentication, or backend features exist.
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
  frontend.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
