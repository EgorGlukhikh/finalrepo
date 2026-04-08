# Component Rules

## Роли папок

- `src/components/ui` — общие UI primitives
- `src/components/layout` — shell, navigation, layout wrappers
- `src/components/branding` — общие продуктовые presentation-компоненты

## Основные правила

- Компоненты должны оставаться презентационными, если они явно не принадлежат модулю.
- Компоненты не должны обращаться к базе данных.
- Компоненты не должны принимать решения о доступе, роли или оплате.
- Auth/access/billing/progress логика остается в `src/modules`.
- Пропсы должны быть маленькими, явными и читаемыми.
- Предпочтение композиции, а не глубокой внутренней магии.

## Layout primitives

- `Container` — ширина страницы и горизонтальные отступы
- `Section` — вертикальный ритм
- `Stack`, `Inline`, `Grid` — композиция без ad-hoc wrappers
- `SectionHeader` — стандартный заголовок для внутренних экранов

## Shell-компоненты

Shell-слой должен быть небольшим и предсказуемым:
- `PublicShell`
- `AuthShell`
- `PlatformShell`
- `AdminShell`

Навигация и shell-представление живут в layout-слое, а не в страницах.

## UI primitives

Базовые компоненты должны оставаться консистентными:
- `Button`
- `Input`
- `Textarea`
- `Select`
- `Card`
- `Badge`
- `Dialog`
- `Tabs`
- `EmptyState`
- `Skeleton`
- `Separator`
- `FormField`

## Product presentation

Переиспользуемые продуктовые компоненты:
- `CourseCard`
- `StatCard`
- `ProgressPill`
- `LessonListItem`
- `InfoRow`

Они не должны превращаться в место для доменной логики.
