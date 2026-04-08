# Page Blueprints

## Rule
- A page is a thin route adapter, not a business layer.

## Pattern
- Keep route files small.
- Compose pages from layout components and module components.
- Do not put fetch logic, payment logic, or schema logic directly in page files.
- Use route groups to keep public, auth, and platform surfaces separate.
- Internal preview or style-guide routes are allowed only for reviewing the design system.
- Product screens should reuse the shared primitives instead of inventing page-specific visuals.
- Allowed shell and placeholder routes in this phase:
  - public home placeholder
  - sign in
  - sign up
  - forgot password stub
  - platform home placeholder
  - admin home placeholder
- Pages should stay thin and defer session, guard, and navigation concerns to layouts and modules.
- Route protection belongs to layout boundaries plus `src/modules/auth/*`, not to page-level conditionals.
- Future LMS builder screens should consume a course -> module -> lesson tree from `src/modules/courses`.
