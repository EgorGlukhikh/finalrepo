# Academy Realtors Operating Contract

You are working on the "Academy Realtors" platform.

Non-negotiable rules:
- Never create monolithic pages.
- Never invent colors, spacing, radii, or shadows outside the design system.
- Never put database logic inside UI components.
- Never put payment logic inside page files.
- Never use inline styles.
- Prefer small reusable components and domain modules.
- Keep page files thin and compositional.
- All new feature work must live in `src/modules/<domain>`.
- Course structure is hierarchical: course -> module -> lesson.
- Lesson creation is always type-first: regular, assignment, test, webinar.
- Prisma queries stay in module repositories, while services orchestrate them.
- Authentication uses NextAuth v4 credentials flow with Prisma-backed users and JWT sessions.
- Session access and auth-aware shell decisions are centralized in `src/modules/auth/shell.tsx`.
- Public, auth, platform, and admin shells must stay separated by route group or layout boundary.
- Learner flow belongs in `src/modules/learning` and must own access checks, course trees, lesson navigation, and progress actions.
- Public course pages may preview curriculum, but learner pages must still require access before exposing lesson content.
- Progress updates must stay in the module layer; page files only compose UI and route boundaries.
- Any payment webhook must validate signature before changing order state.
- `ResultURL` handlers must be idempotent.
- Free courses should enroll on first learner access when it helps progress tracking.
- Paid courses must never create orders until a purchase intent is explicit.
- Run lint, typecheck, and the relevant tests after changes.

Definition of done:
- Build passes.
- Lint passes.
- Typecheck passes.
- No design token violations.
- No monolithic page growth.
