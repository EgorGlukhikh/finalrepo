# DB Schema Notes

This repository keeps the LMS model intentionally small and explicit.

## Current core entities
- `User` for auth and ownership.
- `Course` for the course shell and publish state.
- `CourseModule` for ordered course sections.
- `Lesson` for ordered units with a required `lessonType`.
- `Enrollment` for access grants and purchase state.
- `LessonProgress` for per-user progress tracking.
- `Order` for paid-course purchase state.
- `PaymentEvent` for Robokassa callback logging and idempotency.

## Modeling rules
- The hierarchy is course -> module -> lesson.
- Course access is modeled with `accessType` and `priceAmount`.
- Free courses must keep `priceAmount` null.
- Paid courses must keep `priceAmount` set.
- Lesson creation starts with type selection, so `lessonType` is required.
- Module and lesson order fields support future tree-based builders.
- Progress is separate from enrollment because access and completion are different concerns.
- Orders are only created for paid courses.
- Robokassa `ResultURL` handlers must verify signature before changing order state.

## Service boundaries
- Prisma access lives in module repositories.
- Read-only query helpers can sit in `queries.ts` for clearer boundaries.
- Module services provide typed, UI-friendly data.
- Pages should not query Prisma directly.

## Future additions
- lesson content blocks
- richer billing reporting
- richer progress analytics
