# Project Rules

## Scope
- Build the LMS as a modular Next.js App Router application.
- Keep public, auth, platform, admin, and API concerns separated.
- Treat the repository as production code from the first commit.

## Architecture
- `src/app` is routing and layout composition only.
- `src/modules` owns domain behavior.
- `src/components/ui` owns reusable primitives.
- `src/components/layout` owns shell composition.
- `src/components/branding` owns brand-facing shared pieces.
- `src/lib` owns infrastructure helpers and integrations.
- `src/styles` owns global styling and tokens.
- LMS domain modules are split by concern:
  - `auth`, `users`, `courses`, `enrollments`, `progress`, `billing`.
- Course structure is hierarchical:
  - course -> module -> lesson.
- Course access is binary at the product level:
  - `FREE` courses are immediately accessible and keep `priceAmount = null`.
  - `PAID` courses require `priceAmount` and later Robokassa confirmation.
- Lesson creation is type-first:
  - `regular`, `assignment`, `test`, `webinar`.
- Route groups are:
  - `(public)` for public shell and internal previews.
  - `(auth)` for sign-in, sign-up, and auth stubs.
  - `(platform)` for authenticated user shell.
  - `admin` for administrator shell.
- Public course browsing lives at `/courses` and `/courses/[slug]`.
- Learner flow lives at `/app`, `/app/courses/[slug]`, and `/app/courses/[slug]/lessons/[lessonId]`.
- Admin operations live at `/admin`, `/admin/courses`, `/admin/users`, `/admin/enrollments`, and `/admin/orders`.
- Learner access, progress, navigation, and completion are coordinated through `src/modules/learning`.
- Authentication is controlled by `src/modules/auth` and `src/app/api/auth/*`.
- Session access for shells is centralized in `src/modules/auth/shell.tsx`.
- Course access checks are centralized in domain services, not inline in page components.
- Admin routes are protected at the server boundary through `src/modules/auth/access.ts`.
- Admin course management is an entry point into the course workspace; it should not regress into a long CRUD form.
- Enrollment revoke is only meaningful for paid or manual access; free-course access remains governed by course access type.
- Billing is isolated in `src/modules/billing`; only paid courses can create orders.
- Robokassa callbacks must be idempotent and signature-checked before any state change.
- Prisma queries stay inside module repositories and service layers.
- Read-only helpers can live in `queries.ts`; mutation helpers stay in `repository.ts`.

## Discipline
- Keep files small and obvious.
- Prefer boring implementations over clever abstractions.
- Do not duplicate design decisions in page files.
- Do not introduce new patterns without a clear reason.
