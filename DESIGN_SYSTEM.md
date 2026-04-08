# Design System

## Principles
- Use semantic tokens only: background, surface, muted surface, foreground, muted text, border, primary, secondary, accent, success, warning, and danger.
- Use one spacing scale based on 4px steps.
- Use one main page container width and a smaller content width when needed.
- Use one radius scale and reuse it consistently.
- Use one system font stack for the interface.
- Use one brand accent and keep it consistent.
- Keep motion minimal and purposeful.

## Implementation Rules
- Put shared visual decisions into `src/styles/theme.css`, not page files.
- Reuse primitives instead of cloning one-off UI.
- Avoid arbitrary Tailwind values unless there is a documented exception.
- Do not add decorative variation without a product reason.
- Keep the preview page aligned with the real primitives, not a separate visual language.

## Approved Primitives
- Layout: `Container`, `Section`, `Stack`, `Inline`, `Grid`, `SectionHeader`
- UI: `Button`, `Input`, `Textarea`, `Label`, `Select`, `Card`, `Badge`, `Tabs`, `Dialog`, `EmptyState`, `Skeleton`, `Separator`, `FormField`, `StatusPill`
- LMS presentation: `CourseCard`, `StatCard`, `ProgressPill`, `LessonListItem`, `InfoRow`
