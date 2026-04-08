# Component Rules

## Primitives
- `src/components/ui` is for reusable primitives only.
- `src/components/layout` is for layout shells, navigation, and wrappers.
- `src/components/branding` is for generic product presentation pieces that will be reused across the LMS.

## Discipline
- Components should stay presentational unless they clearly belong in a module.
- Components must not access the database or payment systems.
- Components must not decide whether the user is authenticated, signed out, or an admin.
- Keep props small, explicit, and composable.
- Prefer composition over deeply nested internal logic.
- Use the shared token system for color, spacing, radius, shadow, and motion.
- Keep state handling subtle and consistent.

## Layout Primitives
- `Container` owns page width and horizontal padding.
- `Section` owns vertical rhythm and optional muted banding.
- `Stack`, `Inline`, and `Grid` handle composition spacing instead of ad-hoc wrappers.
- `SectionHeader` is the default way to label internal content blocks.
- Shells should stay small and route-specific:
  - `PublicShell`
  - `AuthShell`
  - `PlatformShell`
  - `AdminShell`
- Navigation and session presentation live with the shell layer, not in page files.
- Auth-aware rendering and shell decisions live in `src/modules/auth/shell.tsx`.

## UI Primitives
- Buttons, inputs, selects, and textareas must share size, radius, focus, and disabled patterns.
- Cards, badges, and pills should feel like siblings, not separate component families.
- Dialogs and tabs should stay minimal and operational.
