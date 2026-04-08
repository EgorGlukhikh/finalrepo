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
  - `auth`, `users`, `courses`, `enrollments`, `progress`.
- Course structure is hierarchical:
  - course -> module -> lesson.
- Lesson creation is type-first:
  - `regular`, `assignment`, `test`, `webinar`.
- Route groups are:
  - `(public)` for public shell and internal previews.
  - `(auth)` for sign-in, sign-up, and auth stubs.
  - `(platform)` for authenticated user shell.
  - `admin` for administrator shell.
- Authentication is controlled by `src/modules/auth` and `src/app/api/auth/*`.
- Session access for shells is centralized in `src/modules/auth/shell.tsx`.
- Prisma queries stay inside module repositories and service layers.

## Discipline
- Keep files small and obvious.
- Prefer boring implementations over clever abstractions.
- Do not duplicate design decisions in page files.
- Do not introduce new patterns without a clear reason.
